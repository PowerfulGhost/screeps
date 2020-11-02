const builder = require("./1.1.0.2.1.0  builder")
const harvester = require("./1.1.0.2.1.1  harvester")
const hauler = require("./1.1.0.2.1.2  hauler")
const upgrader = require("./1.1.0.2.1.3  upgrader")
const spawn = require("./1.1.0.2.1.4  spawn")
const tower = require("./1.1.0.2.1.5  tower")
const logger = require("./logger")

var roomRoles = {
    init: function () {
        logger.trace("\t\t\t\troomRoles.init()")
        builder.init()
        harvester.init()
        hauler.init()
        upgrader.init()
        spawn.init()
        tower.init()
    },
    run: function () {
        logger.trace("\t\t\t\troomRoles.run()")
    }
}

module.exports = roomRoles