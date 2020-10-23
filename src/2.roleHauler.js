const { TASK_TYPE_HAUL } = require("./const")

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
                    if (creep.memory.target) {  //有资源来源时，预定资源
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
                    if(!creep.pos.isNearTo(target)){
                        creep.moveTo(target)
                        result = creep.transfer(target,resourceType,amount)
                    }
                    if(result == OK){   //完成任务时
                        creep.memory.target = null
                        creep.memory.taskInfo = null
                    }
                }
            }
        }
    }
}

module.exports = roleHauler