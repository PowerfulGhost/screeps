const worldManager = require("./1.1.0.0  worldManager")
const worldRoles = require("./1.1.0.1  worldRoles")
const roomRunner = require("./1.1.0.2  roomRunner")
const logger = require("./logger")

var worldRunner = {
    init: function () {
        logger.trace("\t\tworldRunner.init()")
        worldManager.init()
        worldRoles.init()
        roomRunner.init()
    },
    run: function () {
        logger.trace("\t\tworldRunner.run()")
        worldManager.run()
        worldRoles.run()
        roomRunner.run()
    }
}

module.exports = worldRunner