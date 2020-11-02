const logger = require("./logger")

var taskManager = {
    init: function () {
        logger.trace("\t\t\t\t\ttaskManager.init()")
        Room.prototype.taskManagerRun = function () { }
    }
}

module.exports = taskManager