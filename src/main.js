const initialize = require("./0  initialize")
const mainLoop = require("./1  mainLoop")

initialize.init()
module.exports.loop = function () {
    mainLoop.run()
}