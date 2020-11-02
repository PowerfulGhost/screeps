const expandManager = require("./1.1.0.0.0  expandManager")
const outerSourceManager = require("./1.1.0.0.1  outerSourceManager")
const worldTaskManager = require("./1.1.0.0.2  worldTaskManager")
const logger = require("./logger")

var worldManager = {
    init: function () {
        logger.trace("\t\t\tworldManager.init()")
        expandManager.init()
        outerSourceManager.init()
        worldTaskManager.init()
    },
    run: function () {
        logger.trace("\t\t\tworldManager.run()")
        expandManager.run()
        outerSourceManager.run()
        worldTaskManager.run()
    }
}

module.exports = worldManager