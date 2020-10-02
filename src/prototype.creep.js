// add some methods to the prototype of Creep
var prototypeCreep = {
    run: function () {
        // a single FSM implementation
        // this FSM can only changes the state, it can't give creep a new target
        Creep.prototype.FSM = function (fsmConfig) {
            // some shortcuts
            var state = this.memory.state
            var resType = this.memory.resourceType
            var otherStates = fsmConfig[state]   // state transition condition of current state
            // loop over all other states
            for (var stateName in otherStates) {
                var cond = otherStates[stateName]
                var allCondValue = false   // this value decides if the state is going to be switched
                // loop over all conditions 
                for (var condName in cond) {
                    var singleConds = cond[condName]
                    var condValue = true
                    // loop over all single conditions
                    for (var singleCondName in singleConds) {
                        var value = undefined
                        switch (singleCondName) {
                            case "full": { value = (this.store.getFreeCapacity(resType) == 0); break }
                            case "empty": { value = (this.store.getUsedCapacity(resType) == 0); break }
                            case "target": { value = (this.memory.target != null); break }
                            case "inWorkingPos": { value = (this.pos.x == this.memory.workingPos.x && this.pos.y == this.memory.workingPos.y); break }
                        }
                        if (_.isUndefined(value)) throw new Error("Creep.FSM: unidentified condition: " + singleCondName)
                        value = (value == singleConds[singleCondName])
                        condValue &= value
                    }
                    allCondValue |= condValue
                }
                if (allCondValue == true) { this.memory.state = stateName; this.say(stateName); break }
            }
        }

        // FOR ALL CREEPS
        // find resource target cloest to the creep by a priority list, return the target's id
        // if the creep already has a valid target, the priority won't work
        Creep.prototype.findResourceTarget = function (resourceType = RESOURCE_ENERGY,
            priority = [FIND_DROPPED_RESOURCES, STRUCTURE_STORAGE]) {
            if (this.memory.role == "harvester") throw new Error("Creep.getResourceTarget: this method is not for harvesters. Use getSource() instead.")
            var creepFreeCapacity = this.store.getFreeCapacity(resourceType)
            if (this.memory.target) {
                var target = Game.getObjectById(this.memory.target)
                if (target instanceof Source)
                    return this.memory.target
                if (target && target.store)
                    if (Game.getObjectById(this.memory.target).store.getUsedCapacity(resourceType) > creepFreeCapacity)
                        return this.memory.target
            }
            for (var index in priority) {
                var targetType = priority[index]
                if (targetType == FIND_DROPPED_RESOURCES) {
                    var target = this.pos.findClosestByRange(FIND_DROPPED_RESOURCES,
                        {
                            filter: function (resource) {
                                return resource.resourceType == resourceType
                            }
                        })
                    if (target) return target.id
                }
                else {
                    var target = this.pos.findClosestByRange(FIND_STRUCTURES,
                        {
                            filter: function (stru) {
                                return stru.structureType == targetType &&
                                    stru.store.getUsedCapacity(resourceType) > creepFreeCapacity
                            }
                        })
                    if (target) return target.id
                }
            }
            return null
        }

        // pick up or withdraw resource from ground or a sturcture, if not in range, move to the target
        Creep.prototype.getFromResourceTarget = function (target, resourceType = RESOURCE_ENERGY) {
            if (_.isString(target)) { target = Game.getObjectById(target) }
            if (target instanceof Resource) {
                if (this.pickup(target) == ERR_NOT_IN_RANGE) this.moveTo(target)
            }
            if (target instanceof Structure) {
                if (this.withdraw(target, resourceType) == ERR_NOT_IN_RANGE) this.moveTo(target)
            }
        }

        // HARVESTERS
        // find a source not occupied by a harvester and regist this creep to the source and return source's id
        Creep.prototype.findSource = function (sourceType = FIND_SOURCES) {
            if (this.memory.role != "harvester" && this.memory.role != "advancedHarv") throw new Error("Creep.findSource(): this method is only for harvesters.")
            if (this.memory.source) throw new Error("Creep.findSource(): this creep already has a source to harvest.")
            var sources = this.room.find(sourceType)
            for (var index in sources) {
                var source = sources[index]
                if (!source.memory.harvester || source.memory.harvester == this.id) {
                    source.memory.harvester = this.id
                    return source.id
                }
            }
            console.log("Creep.findSource(): all sources have been occupied.")
            return null
        }

        //HARVESTERS & UPGRADERS
        // find the working position of the creep, in most situations, a container
        Creep.prototype.findWorkingPos = function () {
            var role = this.memory.role
            if (role != "harvester" && role != "advancedHarv" && role != "upgrader") throw new Error("Creep.findWorkingPos(): this method is for harvesters and upgraders.")
            var target = Game.getObjectById(this.memory.target)
            if (!target) throw new Error("Creep.findWorkingPos(): this creep has no target.")
            if (role == "harvester" || role == "advancedHarv") {
                if (!(target instanceof Source)) throw new Error("Creep.findWorkingPos(): harvester's target is not a Source.")
                var container = target.pos.findInRange(FIND_STRUCTURES, 1, { filter: function (stru) { return stru.structureType == STRUCTURE_CONTAINER } })[0]
                if (!container) {
                    console.warn("Source" + target.id + " @(" + target.pos.x + "," + target.pos.y + "," + target.pos.roomName + ") has no container nearby.")
                    return new RoomPosition(null, null, null)
                } else return container.pos
            }
            if (role == "upgrader") {
                if (!(target instanceof StructureController)) throw new Error("Creep.findWorkingPos(): upgrader's target is not a StructureController")
                var container = target.pos.findInRange(FIND_STRUCTURES, 3, { filter: function (stru) { return stru.structureType == STRUCTURE_CONTROLLER } })[0]
                if (!container) {
                    console.warn("Controller @(" + target.pos.x + "," + target.pos.y + "," + target.pos.roomName + ") has no container nearby.")
                    return new RoomPosition(null, null, null)
                } else return container.pos
            }
        }

        // BUILDERS
        // find the closest construction site or repairable structure with its hits < hitsLimit
        // if the creep already has a target, the function checks if the target is valid, if valid, the function do nothing
        Creep.prototype.findSite = function (hitsLimit = 100000) {
            if (this.memory.role != "builder") throw new Error("Creep.findSite(): this method is only for builders")
            if (this.memory.target) {
                var target = Game.getObjectById(this.memory.target)
                if (target instanceof ConstructionSite)
                    return this.memory.target
                if (target instanceof Structure)
                    if (target.hits < target.hitsMax && target.hits < hitsLimit)
                        return this.memory.target
            }
            var target = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)
            if (target) return target.id

            target = this.pos.findClosestByRange(FIND_STRUCTURES,
                {
                    filter: function (stru) {
                        return stru.hits < stru.hitsMax && stru.hits < hitsLimit
                    }
                })
            if (target) return target.id

            return null
        }
        // build or repair the target
        Creep.prototype.buildOrRepairTarget = function (target) {
            if (_.isString(target)) target = Game.getObjectById(target)
            if (target instanceof ConstructionSite) {
                if (this.build(target) == ERR_NOT_IN_RANGE) this.moveTo(target)
            }
            else {
                if (this.repair(target) == ERR_NOT_IN_RANGE) this.moveTo(target)
            }
        }
    }
}

module.exports = prototypeCreep