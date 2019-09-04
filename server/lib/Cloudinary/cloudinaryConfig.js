const cloudinary = require('cloudinary').v2;

/** @module server/lib/Cloudinary/cloudinaryConfig */

/* Cloudinary Cookinat's Data */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
/**
 * @function
 * @description Uploads a file in Cookinat's cloud at Cloudinary
 *
 * @param {Object} file
 * @returns Returns an object containing the URL of the uploaded file and the id
 */
exports.uploads = (file) => {
    return new Promise(resolve => {
        /* Cloudinary upload function */
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id
            })
        }, { resource_type: "auto" })
    })
}