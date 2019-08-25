const {
    name,
    version,
    description
} = require('../../package.json')

const ping = async (_req, res) => {
    res.status(200).json({
        name,
        description,
        version,
        /** The process.uptime() method returns the number of seconds the current Node.js process has been running. */
        uptime: process.uptime()
    })
}

module.exports = ping;