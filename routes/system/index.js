const {
    name,
    version,
    description
} = require('../../package.json');
var cloud = require('../../server/lib/Cloudinary/cloudinaryConfig');

/** @module routes/system/index */

/**
 * @function ping
 * @description Handles requests to the /ping route, sends a JSON object to the client
 *              containing the application Name, Description, Version, and the Uptime in seconds
 *
 * @param {Object} req Request 
 * @param {Object} res Response
 */
let ping = (req, res) => {

    res.status(200).json({
        name,
        description,
        version,
        /* The process.uptime() method returns the number of seconds the current Node.js process has been running. */
        uptime: process.uptime()
    })
}

/**
 * @function upload
 * @description Handles requests to the /upload route, it uploads an image to Cloudinary cloud
 *              and sends a JSON object to the client indicating if it was succesful, a short message
 *              and the image data
 *
 * @param {Object} req Request
 * @param {Object} res Response
 */
let upload = (req, res) => {
    try {
        /* Capture file path */
        const cloudImage = req.files.image.path
            /* Capture data of file */
        const { image_name, user_id } = req.body;

        cloud.uploads(cloudImage, {
                folder: user_id + '/',
                public_id: image_name
            })
            .then((result) => {
                res.status(201).json({
                    success: true,
                    msg: 'You have successfully uploaded the image',
                    data: [{
                        image_name,
                        url: result.url,
                        image_id: result.id
                    }]
                })
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'There was a problem with stripe.',
            errors: [{ error: error.message, trace: error.trace }]
        })
    }
}


module.exports = {
    ping,
    upload
};