const ip = require("ip");

module.exports = {
    "hostname": ip.address(),
    "port": process.env.port || "3001",
}