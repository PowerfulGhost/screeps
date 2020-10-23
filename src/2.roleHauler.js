const { TASK_TYPE_HAUL, ERR_CREEP_NOT_REGISTED } = require("./const")

var roleHauler = {
    run: function () {
        for (var i in Game.creeps) {
            var creep = Game.creeps[i]
            if (creep.memory.role != "hauler") continue

            if (creep.memory.taskInfo == null)  //无任务时持续等待任务
                creep.memory.taskInfo = creep.room.getTask(TASK_TYPE_HAUL)
            else {  //有任务时
                var taskInfo = creep.memory.taskInfo
                var resourceType = taskInfo.resourceType
                var load = creep.store.getUsedCapacity(resourceType)
                var amount = taskInfo.amount
                if (load < amount) {    //装载的资源小于要求数量时
                    if (!creep.memory.target)   //没有资源来源时，持续寻找来源
                        creep.memory.target = creep.findResource(resourceType, amount - load)
                    else {  //有资源来源时，预定资源
                        var target = Game.getObjectById(creep.memory.target)
                        creep.claimResource(target, resourceType, amount - load)
                        if (!creep.pos.isNearTo(target)) {  //并且向资源移动并获取资源
                            creep.moveTo(target)
                            creep.getResource(target, resourceType, amount - load)
                        }
                    }
                }
                else {  //装载的资源量满足要求时
                    creep.memory.target = creep.memory.taskInfo.target
                    var target = Game.getObjectById(creep.memory.target)
                    var result = null
                    if (!creep.pos.isNearTo(target)) {
                        creep.moveTo(target)
                        result = creep.transfer(target, resourceType, amount)
                    }
                    if (result == OK) {   //完成任务时
                        creep.memory.target = null
                        creep.memory.taskInfo = null
                    }
                }
            }
        }
    },
    init: function () {
        Creep.prototype.findResource = function (resourceType, amount) {
            var target = null
            if (!target)
                target = this.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function (obj) {
                        return (obj.structureType == STRUCTURE_CONTAINER
                            || obj.structureType == STRUCTURE_STORAGE)
                            && obj.store.getUnclaimedCapacity(resourceType) > amount
                    }
                })
            if (target)
                return target.id
            else
                return null
        }
        Creep.prototype.claimResource = function (target, resourceType, amount) {
            if (_.isUndefined(target)) throw new Error("Creep.claimResource(): target undefined.")
            if (_.isUndefined(target.store)) throw new Error("Creep.claimResource(): target has no store.")
            target.store.registCreep(this.id, resourceType, amount)
        }
        Creep.prototype.getResource = function (target, resourceType, amount) {
            if (_.isUndefined(target)) throw new Error("Creep.getResource(): target undefined.")
            if (!target instanceof Structure) throw new Error("Creep.getResource(): target is not a structure")
            if (_.isUndefined(target.store)) throw new Error("Creep.getResource(): target has no store.")
            if (target.store.checkRegist(this.id, resourceType, amount)) 
                return this.withdraw(target, resourceType, amount)
            else
                return ERR_CREEP_NOT_REGISTED
        }
    }
}

module.exports = roleHauler