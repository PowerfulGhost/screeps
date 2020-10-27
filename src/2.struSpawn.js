const { TASK_TYPE_HAUL, TASK_TYPE_SPAWN } = require("./const")
const { calcCreepCost } = require("./util")

var struSpawn = {
    /** @param {StructureSpawn} spawn */
    run: function (spawn) {
        //在spawn空闲时并且有足够能量时从房间的spawnQueue中取出一个任务开始spawn
        spawn.spawnStart()
        //在spawn能量不足时发布任务
        spawn.setTask()
    },

    init: function () {
        //在spawn空闲时并且有足够能量时从房间的spawnQueue中取出一个任务开始spawn
        StructureSpawn.prototype.spawnStart = function () {
            console.log("spawnStart")
            if (this.spawning) return
            var taskIndex = this.room.getTaskIndex(TASK_TYPE_SPAWN)
            console.log(taskIndex)
            if (!taskIndex) return
            this.room.registHandlerToTask(taskIndex)
            var spawnInfo = this.room.getTaskInfo(taskIndex)
            var body = spawnInfo.body
            if (this.room.energyAvailable < calcCreepCost(body)) return
            var role = spawnInfo.role
            var creepName = this.room.name + "_" + this.name + "_" + role + "_" + Game.time
            this.spawnCreep(body, creepName, { memory: { role: role } })
            console.log(creepName + " is spawning in " + this.name)
        }
        //在spawn能量不足时发布任务
        StructureSpawn.prototype.setTask = function () {
            if (_.isUndefined(this.memory.taskAvaliable)) this.memory.taskAvaliable = false
            if (this.store.getUsedCapacity(RESOURCE_ENERGY) == 0 && this.memory.taskAvaliable) {
                this.room.setTask({
                    taskType: TASK_TYPE_HAUL,
                    piority: 1,
                    target: spawn.id,
                    resourceType: RESOURCE_ENERGY,
                    amount: spawn.store.getCapacity()
                })
                this.memory.taskAvaliable = false
            }
            if (this.store.getFreeCapacity(RESOURCE_ENERGY) == 0)
                this.memory.taskAvaliable = true

        }
    },
}
module.exports = struSpawn