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
            if (this.spawning) return
            var taskIndex = this.room.getTaskIndex(TASK_TYPE_SPAWN)
            if (!taskIndex) return
            var spawnInfo = this.room.getTaskInfo(taskIndex)
            var body = spawnInfo.body
            if (this.room.energyAvailable < calcCreepCost(body)) return
            this.room.registHandlerToTask(this.id, taskIndex)
            var role = spawnInfo.role
            var creepName = this.room.name + "_" + this.name + "_" + role + "_" + Game.time
            this.spawnCreep(body, creepName, { memory: { role: role } })
            console.log(creepName + " is spawning in " + this.name)
            this.room.deleteTask(taskIndex)
        }
        //在spawn能量不足时发布任务
        StructureSpawn.prototype.setTask = function () {
            if (_.isUndefined(this.memory.taskAvaliable)) this.memory.taskAvaliable = false
            if (this.store.getUsedCapacity(RESOURCE_ENERGY) < this.store.getCapacity(RESOURCE_ENERGY) && this.memory.taskAvaliable) {
                this.room.setTask({
                    taskType: TASK_TYPE_HAUL,
                    piority: 1,
                    target: this.id,
                    resourceType: RESOURCE_ENERGY,
                    amount: this.store.getFreeCapacity(RESOURCE_ENERGY)
                })
                this.memory.taskAvaliable = false
            }
            if (this.store.getFreeCapacity(RESOURCE_ENERGY) == 0)
                this.memory.taskAvaliable = true
        }
    },
}
module.exports = struSpawn