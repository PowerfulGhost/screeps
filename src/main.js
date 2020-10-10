const initialize = require("./a.initialize")
const manager = require("./a.manager")
const runner = require("./a.runner")

initialize.run()
module.exports.loop = function(){
    manager.run()
    runner.run()
}