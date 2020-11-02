const logger = require("./logger")

var worldTaskManager = {
    init: function () {
        logger.trace("\t\t\t\tworldTaskManager.init()")
    },
    run: function () {
        logger.trace("\t\t\t\tworldTaskManager.run()")
    }
}

module.exports = worldTaskManager