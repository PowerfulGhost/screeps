const { TASK_TYPE_HAUL } = require("./const")

var roleUpgrader = {
    /** @param {Creep} creep */
    run: function (creep) {
        if (creep.memory.role != "upgrader") return

        if (!creep.memory.target)
            creep.memory.target = creep.room.controller.id
        else {
            //creep在controller旁边时才进行升级
            var target = Game.getObjectById(creep.memory.target)
            if (creep.pos.isNearTo(target)) {
                creep.upgradeController(target)
                creep.upgrader_setTask()
            }
            else
                creep.moveTo(target)
        }

    },
    init: function () {
        //在能量不足时自动发布任务要求能量
        Creep.prototype.upgrader_setTask = function () {
            if (_.isUndefined(this.memory.taskAvaliable)) this.memory.taskAvaliable = true
            if (this.store.getUsedCapacity(RESOURCE_ENERGY) == 0 && this.memory.taskAvaliable == true) {
                this.room.setTask({
                    taskType: TASK_TYPE_HAUL,
                    piority: 2,
                    target:this.id,
                    resourceType: RESOURCE_ENERGY,
                    amount: this.store.getCapacity(RESOURCE_ENERGY)
                })
                console.log("task set")
                this.memory.taskAvaliable = false
            }
            if (this.store.getUsedCapacity(RESOURCE_ENERGY) > 0.5 * this.store.getCapacity(RESOURCE_ENERGY)){
                this.memory.taskAvaliable = true
                console.log("true")
                console.log(_.isUndefined(this.memory.taskAvaliable))
            }
        }
    }
}

module.exports = roleUpgrader