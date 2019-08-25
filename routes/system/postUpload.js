var cloud = require('../../server/lib/Cloudinary/cloudinaryConfig');

module.exports = (req, res) => {
    try {
        const cloudImage = req.files.image.path
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
        return res.status(500).json({
            success: false,
            msg: 'There was a problem with stripe.',
            errors: [{ error: error.message, trace: error.trace }]
        })
    }
}