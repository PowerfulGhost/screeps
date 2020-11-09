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
        Room.prototype.roomRolesRun = function () {
            var creeps = this.find(FIND_MY_CREEPS)
            for (var name in creeps) {
                var creep = creeps[name]
                if (_.isUndefined(creep.memory.role) || !creep.memory.role) {
                    logger.warn("Creep has no role: " + name + " @room " + this.name, "run")
                    continue
                }
                switch (creep.memory.role) {
                    case "builder": { creep.builderRun(); break }
                    case "harvester": { creep.harvesterRun(); break }
                    case "hauler": { creep.haulerRun(); break }
                    case "upgrader": { creep.upgraderRun(); break }
                }
            }

            var strus = this.find(FIND_MY_STRUCTURES)
            for (var i in strus) {
                var stru = strus[i]
                switch (stru.structureType) {
                    case STRUCTURE_SPAWN: { stru.spawnRun(); break }
                    case STRUCTURE_TOWER: { stru.towerRun(); break }
                }
            }
        }
    },
}

module.exports = roomRoles