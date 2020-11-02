const initialize = require("./1.initialize")
const manager = require("./1.manager")
const runner = require("./1.runner")

initialize.run()
module.exports.loop = function () {
    manager.run()
    runner.run()
}