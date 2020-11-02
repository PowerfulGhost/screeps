const { TASK_TYPE_HAUL, ERR_CREEP_NOT_REGISTED } = require("./const")

var roleHauler = {
    /** @param {Creep} creep */
    run: function (creep) {
        if (creep.memory.role != "hauler") throw new Error(creep.name + " is not a hauler.")

        if (_.isUndefined(creep.memory.taskIndex)) creep.memory.taskIndex = null
        if (creep.memory.taskIndex == null)  //无任务时持续等待任务
            creep.memory.taskIndex = creep.room.getTaskIndex(TASK_TYPE_HAUL)
        else {  //有任务时
            var taskInfo = creep.room.getTaskInfo(creep.memory.taskIndex)
            var resourceType = taskInfo.resourceType
            var load = creep.store.getUsedCapacity(resourceType)
            var amount = taskInfo.amount
            var capcaity = creep.store.getCapacity(resourceType)
            if (load < amount) {    //装载的资源小于要求数量时
                if (!creep.memory.target)   //没有资源来源时，持续寻找来源
                    creep.memory.target = creep.hauler_findResource(resourceType, capcaity - load)
                else {  //有资源来源时，预定能够填满store的量的资源
                    var target = Game.getObjectById(creep.memory.target)
                    creep.hauler_claimResource(target, resourceType, capcaity - load)
                    if (!creep.pos.isNearTo(target)) {  //并且向资源移动并获取资源
                        creep.moveTo(target)
                    }
                    var result = creep.hauler_getResource(target, resourceType, capcaity - load)
                    if (result == OK)    //成功获取资源后删除预定
                        target.unregistClaimCreep(creep.id)
                }
            }
            else {  //装载的资源量满足要求时
                creep.memory.target = taskInfo.target
                var target = Game.getObjectById(creep.memory.target)
                if (!target) return
                var result = null
                if (!creep.pos.isNearTo(target)) {
                    creep.moveTo(target)
                }
                result = creep.transfer(target, resourceType, amount)
                if (result == OK) {   //完成任务时
                    creep.room.deleteTask(creep.memory.taskIndex)
                    creep.memory.target = null
                    creep.memory.taskIndex = null
                }
            }
        }
    },
    
    init: function () {
        //寻找最近的有指定数量资源的建筑
        Creep.prototype.hauler_findResource = function (resourceType, amount) {
            var target = null
            if (!target)
                target = this.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function (obj) {
                        return (obj.structureType == STRUCTURE_CONTAINER
                            || obj.structureType == STRUCTURE_STORAGE)
                            && obj.getUnclaimedCapacity(resourceType) > amount
                    }
                })
            if (target)
                return target.id
            else
                return null
        }
        //预定建筑中指定数量的资源
        Creep.prototype.hauler_claimResource = function (target, resourceType, amount) {
            if (_.isUndefined(target)) throw new Error("Creep.hauler_claimResource(): target undefined.")
            if (_.isUndefined(target.store)) throw new Error("Creep.hauler_claimResource(): target has no store.")
            return target.registClaimCreep(this.id, resourceType, amount)
        }
        //从指定建筑中提取指定数量的资源，creep必须临近建筑
        Creep.prototype.hauler_getResource = function (target, resourceType, amount) {
            if (_.isUndefined(target)) throw new Error("Creep.hauler_getResource(): target undefined.")
            if (!target instanceof Structure) throw new Error("Creep.hauler_getResource(): target is not a structure")
            if (_.isUndefined(target.store)) throw new Error("Creep.hauler_getResource(): target has no store.")
            if (target.checkRegist(this.id, resourceType, amount) == OK)
                return this.withdraw(target, resourceType, amount)
            else
                return ERR_CREEP_NOT_REGISTED
        }
        console.log("Hauler初始化完成")
    }
}

module.exports = roleHauler