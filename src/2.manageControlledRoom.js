const { TASK_TYPE_HAUL, TASK_TYPE_SPAWN } = require("./const")

var manageControlledRoom = {
    /** @param {Room} room */
    run: function (room) {
        this._taskPoolManage(room)
        this._creepNumManage(room)
    },

    //任务池管理
    /** @param {Room} room */
    _taskPoolManage: function (room) {
        for (var i in room.memory.taskPool) {
            var task = room.memory.taskPool[i]
            if (task.taskType == TASK_TYPE_HAUL) {  //对于搬运任务
                if (!Game.getObjectById(task.target))
                    room.deleteTask(i)              // 如果任务发布者消失，取消任务
                if (!Game.getObjectById(task.creepID))
                    room.unregistHandlerToTask(i)     // 如果任务接受者消失，取消其与任务的绑定
            }
        }
    },

    //creep数量管理
    /** @param {Room} room */
    _creepNumManage: function (room) {
        var rcl = room.controller.level
        if (rcl <= 2) {
            var creepNumTarget = {
                harvester: 6,
                builder: 1,
                hauler: 6,
                upgrader: 4
            }
            setSpawnTask(room, creepNumTarget)
        }
        else {
            var creepNumTarget = {
                harvester: 2,
                builder: 1,
                hauler: 2,
                upgrader: 2
            }
            setSpawnTask(room, creepNumTarget)
        }
    },

    _constructionManage: function(room){
        
    }
}
module.exports = manageControlledRoom


//辅助函数

//统计room中的creep量，如果不足则增加spawn任务
/** @param {Room} room */
function setSpawnTask(room, target) {
    var creeps = room.find(FIND_MY_CREEPS)
    var allSpawnTaskIndices = room.getAllTaskIndices(TASK_TYPE_SPAWN)
    for (var role in target) {
        //统计现有的和队列中的creep角色数量
        var count = 0
        for (var i in creeps)
            if (creeps[i].memory.role == role) count += 1
        for (var i in allSpawnTaskIndices)
            if (room.memory.taskPool[allSpawnTaskIndices[i]].role == role) count += 1
        //队列中补足剩余的量
        for (var i = 0; i < target[role] - count; i++)
            room.setTask({
                taskType: TASK_TYPE_SPAWN,
                piroity: 1,
                role: role,
                body: calcBodypart(room, role)
            })
    }
}

//根据房间中可用的最大能量计算相应角色的bodypart
/** @param {Room} room */
function calcBodypart(room, role) {
    var energyCap = room.energyCapacityAvailable
    switch (role) {
        case "harvester": {
            if (energyCap > 650) return [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE]
            else {
                var groupCost = 2 * BODYPART_COST[WORK] + BODYPART_COST[MOVE]
                var groupNum = Math.floor(energyCap / groupCost)
                return getBodypartArray({
                    WORK: 2 * groupNum,
                    MOVE: groupNum
                })
            }
        }
        case "hauler": {
            var groupCost = 2 * BODYPART_COST[CARRY] + BODYPART_COST[MOVE]
            var groupNum = Math.floor(energyCap / groupCost)
            return getBodypartArray({
                CARRY: 2 * groupNum,
                MOVE: groupNum
            })
        }
        case "upgrader": {
            var groupCost = 2 * BODYPART_COST[WORK] + BODYPART_COST[MOVE]
            var groupNum = Math.floor(energyCap / groupCost)
            return getBodypartArray({
                WORK: 2 * groupNum,
                MOVE: groupNum
            })
        }
        case "builder": {
            var groupCost = BODYPART_COST[WORK] + BODYPART_COST[CARRY] + BODYPART_COST[MOVE]
            var groupNum = Math.floor(groupCost)
            return getBodypartArray({
                WORK: groupNum,
                CARRY: groupNum,
                MOVE: groupNum
            })
        }
    }
}

//把bodypartInfo变成array形式
function getBodypartArray(bodypartInfo) {
    var array = []
    for (var bodypart in bodypartInfo) {
        for (var i = 0; i < bodypartInfo[bodypart]; i++)
            array.push(bodypart.toLowerCase())
    }
    return array
}