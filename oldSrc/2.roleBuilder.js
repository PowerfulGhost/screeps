const { TASK_TYPE_HAUL } = require("./const")

var roleBulider = {
    /** @param {Creep} creep */
    run: function (creep) {
        if (creep.memory.role != "builder") throw new Error(creep.name + " is not a builder.")
        if (!creep.memory.target) {
            var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)
            if (target) creep.memory.target = target.id
        }
        else {
            var target = Game.getObjectById(creep.memory.target)
            if (creep.build(target) == ERR_NOT_IN_RANGE)
                creep.moveTo(target)
        }
        creep.builder_setTask()
    },
    
    init: function () {
        //在能量不足时自动发出任务
        Creep.prototype.builder_setTask = function () {
            if (_.isUndefined(this.memory.taskAvaliable)) this.memory.taskAvaliable = true
            if (this.store.getUsedCapacity(RESOURCE_ENERGY) == 0 && this.memory.taskAvaliable == true) {
                this.room.setTask({
                    taskType: TASK_TYPE_HAUL,
                    piority: 2,
                    target: this.id,
                    resourceType: RESOURCE_ENERGY,
                    amount: this.store.getCapacity(RESOURCE_ENERGY)
                })
                this.memory.taskAvaliable = false
            }
            if (this.store.getUsedCapacity(RESOURCE_ENERGY) > 0.5 * this.store.getCapacity(RESOURCE_ENERGY)) {
                this.memory.taskAvaliable = true
            }
        }
        console.log("Builder初始化完成")
    }
}

module.exports = roleBulider
