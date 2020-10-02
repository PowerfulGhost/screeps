var roleHarvester = {
    // harvester's initial memory
    memory: {
        role: "harvester",
        state: "harvest",
        source: null,
        target: null,
    },

    // running in every ticks
    /** @param {Creep} creep */
    run: function (creep) {

        // state transition
        var state = creep.memory.state
        var target = creep.memory.target
        if (state == "harvest") {
            if (!target) {
                creep.memory.target = this._findSource(creep)
            }
            if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                creep.memory.state = "transfer"
                creep.memory.target = this._findTransferTarget(creep)
                creep.say("transfer")
            }
        }
        if (state == "transfer") {
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                creep.memory.state = "harvest"
                creep.memory.target = creep.memory.source
                creep.say("harvest")
            } else if (!creep.memory.target) {
                creep.memory.state = "idle"
                creep.say("idle")
            }
        }
        if (state == "idle") {
            if (creep.memory.target = this._findTransferTarget(creep)) {
                creep.memory.state = "transfer"
                creep.say("transfer")
            }
        }

        // working logic
        var state = creep.memory.state
        var target = Game.getObjectById(creep.memory.target)
        if (state == "harvest") {
            if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target)
            }
        }
        if (state == "transfer") {
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target)
            }
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_FULL) {
                creep.memory.target = this._findTransferTarget(creep)
            }
        }

        if (creep.ticksToLive == 1) {
            var sources = creep.room.find(FIND_SOURCES)
            for (name in sources) {
                var source = sources[name]
                if (source.memory.harvester == creep.id) {
                    source.memory.harvester = null
                    creep.suicide()
                    return
                }
            }
        }
    },


    /** @param {Creep} creep */
    _findSource: function (creep) {
        var sources = creep.room.find(FIND_SOURCES)
        for (var name in sources) {
            var source = sources[name]
            if (source.memory.harvester == undefined ||
                source.memory.harvester == null ||
                source.memory.harvester == creep.id) {
                source.memory.harvester = creep.id
                creep.memory.source = source.id
                return source.id
            }
        }
        return null
    },

    /** @param {Creep} creep */
    _findTransferTarget: function (creep) {
        var transferTarget = Game.getObjectById(creep.memory.target)
        var newTarget = null
        if (transferTarget == null ||
            transferTarget instanceof Source ||
            transferTarget.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            newTarget = creep.pos.findClosestByRange(FIND_MY_STRUCTURES,
                {
                    filter: function (obj) {
                        if ((obj.structureType == STRUCTURE_SPAWN ||
                            obj.structureType == STRUCTURE_EXTENSION ||
                            obj.structureType == STRUCTURE_STORAGE) &&
                            obj.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                            return true
                        }
                        else return false
                    }
                })
        }
        if (newTarget) return newTarget.id
        else {
            newTarget = creep.pos.findClosestByRange(FIND_MY_STRUCTURES,
                {
                    filter: function (obj) {
                        return obj.structureType == STRUCTURE_TOWER &&
                            obj.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    }
                })
        }
        if (newTarget) return newTarget.id
        else return null
    }
}

module.exports = roleHarvester