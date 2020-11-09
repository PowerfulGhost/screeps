const constructionManager = require("./1.1.0.2.0.0  constructionManager")
const taskManager = require("./1.1.0.2.0.1  taskManager")
const logger = require("./logger")

var roomManager = {
    init: function () {
        logger.trace("\t\t\t\troomManager.init()")
        constructionManager.init()
        taskManager.init()
        Room.prototype.roomManagerRun = function () {
            this.constructionManagerRun()
            this.taskManagerRun()
        }
    },
}

module.exports = roomManager