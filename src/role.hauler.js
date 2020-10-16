var roleHauler = {
    memory: {
        role: "hauler",
        state: "get",
        target: null
    },
    bodyparts: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
    /** @param {Creep} creep */
    run: function (creep) {
        // state transition
        var state = creep.memory.state
        var full = (creep.store.getFreeCapacity() == 0)
        var empty = (creep.store.getUsedCapacity() == 0)
        if (state == "get") {
            if (full || (empty && !creep.memory.target)) {
                creep.memory.state = "send"
                creep.say("send")
            }
            if (empty && !creep.memory.target) {
                creep.memory.state = "idle"
                creep.say("idle")
            }
        }
        if (state == "send") {
            if (empty) {
                creep.memory.state = "get"
                creep.say("get")
            }
            if (!empty && !creep.memory.target) {
                creep.memory.state = "idle"
                creep.say("idle")
            }
        }
        if (state == "idle") {
            if (empty && creep.memory.target) {
                creep.memory.state = "get"
                creep.say("get")
            }
            if (!empty && creep.memory.target) {
                creep.memory.state = "send"
                creep.say("send")
            }
        }

        // working logic
        var state = creep.memory.state
        if (state == "get") {
            creep.memory.target = this._findEnergy(creep)
            var target = Game.getObjectById(creep.memory.target)
            if (target) {
                if (target instanceof Resource) {
                    if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target)
                    }
                } else if (target instanceof StructureContainer) {
                    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target)
                    }
                }
            }
        }
        if (state == "send") {
            creep.memory.target = this._findReceiver(creep)
            var target = Game.getObjectById(creep.memory.target)
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target)
                }
            }
        }
        if (state == "idle") {
            if (empty) {
                creep.memory.target = this._findEnergy(creep)
            }
            else {
                creep.memory.target = this._findReceiver(creep)
            }
        }
    },

    /** @param {Creep} creep */
    _findEnergy: function (creep) {
        var energy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES,
            {
                filter: function (obj) {
                    return obj.resourceType == RESOURCE_ENERGY && obj.amount >  creep.store.getCapacity()
                }
            })
        if (!energy) {
            energy = creep.pos.findClosestByRange(FIND_STRUCTURES,
                {
                    filter: function (obj) {
                        return obj.structureType == STRUCTURE_CONTAINER &&
                            obj.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getCapacity(RESOURCE_ENERGY)
                    }
                })
        }
        if (!energy) return null
        else return energy.id
    },

    /** @param {Creep} creep */
    _findReceiver: function (creep) {
        var receiver = creep.pos.findClosestByRange(FIND_MY_STRUCTURES,
            {
                filter: function (obj) {
                    return (obj.structureType == STRUCTURE_EXTENSION ||
                        obj.structureType == STRUCTURE_SPAWN) &&
                        obj.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                }
            })
        if (receiver) return receiver.id
        else {
            receiver = creep.pos.findClosestByRange(FIND_MY_STRUCTURES,
                {
                    filter: function (obj) {
                        return obj.structureType == STRUCTURE_TOWER &&
                            obj.store.getFreeCapacity(RESOURCE_ENERGY) > 0.3 * obj.store.getCapacity(RESOURCE_ENERGY)
                    }
                })
        }
        if (receiver) return receiver.id
        else {
            receiver = creep.pos.findClosestByRange(FIND_MY_STRUCTURES,
                {
                    filter: function (obj) {
                        return obj.structureType == STRUCTURE_STORAGE &&
                            obj.store.getFreeCapacity(RESOURCE_ENERGY) > 0.5 * obj.store.getCapacity(RESOURCE_ENERGY)
                    }
                })
        }
        if (receiver) return receiver.id
        else {
            receiver = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function (obj) {
                    return obj.memory.role == "upgrader" && obj.store.getFreeCapacity(RESOURCE_ENERGY) > 0.7 * obj.store.getCapacity(RESOURCE_ENERGY)
                }
            })
        }
        if (receiver) return receiver.id
        else return null
    }
}

module.exports = roleHauler