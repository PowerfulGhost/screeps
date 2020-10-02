var roleUpgrader = {

    // creep's initial memory
    memory: {
        role: "upgrader",
        state: "harvest",
        source: null,
        controller: null
    },

    // running in every ticks
    /** @param {Creep} creep */
    run: function (creep) {
        // some upgrader config
        var sourceType = "source"
        
        // update controller in creep's memory
        if (creep.memory.controller == null) {
            creep.memory.controller = creep.room.controller.id
        }

        // update source in creep's memory
        if (creep.memory.source == null) {
            if (sourceType == "source") {
                var source = creep.pos.findClosestByRange(FIND_SOURCES)
                if (source != null) {
                    creep.memory.source = source.id
                }
            }
            if (sourceType == "container") {
                var source = creep.pos.findClosestByRange(FIND_STRUCTURES,
                    {
                        filter: function (obj) {
                            return (obj.structureType == STRUCTURE_CONTAINER &&
                                obj.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getFreeCapacity())
                        }
                    })
                if (source != null) {
                    creep.memory.source = source.id
                }
            }
            if (sourceType == "storage") {
                var source = creep.pos.findClosestByRange(FIND_STRUCTURES,
                    {
                        filter: function (obj) {
                            return (obj.structureType == STRUCTURE_STORAGE &&
                                obj.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getFreeCapacity())
                        }
                    })
                if (source != null) {
                    creep.memory.source = source.id
                }
            }
        }

        // state transition
        if (creep.memory.state == "harvest" && creep.store.getFreeCapacity() == 0) {
            creep.memory.state = "upgrade"
            creep.say("upgrade")
        }
        if (creep.memory.state == "upgrade" && creep.store.getUsedCapacity() == 0) {
            creep.memory.state = "harvest"
            creep.say("harvest")
        }

        // some shortcuts
        var state = creep.memory.state
        var controller = Game.getObjectById(creep.memory.controller)
        var source = Game.getObjectById(creep.memory.source)

        // working logic
        if (state == "harvest") {
            if (sourceType == "source") {
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source)
                }
            }
            if (sourceType == "container" || sourceType == "storage") {
                if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source)
                }
            }
        }
        if (state == "upgrade") {
            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller)
            }
        }
    }
}

module.exports = roleUpgrader