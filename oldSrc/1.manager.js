//房间管理，包括：
//Creep数量和配置管理
//死亡Creep的内存回收
//各种地形的逻辑
//不一定每个tick都执行

const manageControlledRoom = require("./2.manageControlledRoom")
const { TASK_TYPE_HAUL, TASK_TYPE_BUILD } = require("./const")
const spawnInfo = require("./temp.config")

var manager = {
    init: function () {
        //构造Memory树
        for (var roomName in Game.rooms) Game.rooms[roomName].memory
        for (var roomName in Memory.rooms)
            if (_.isUndefined(Memory.rooms[roomName].structures))
                Memory.rooms[roomName].structures = {}
        if (_.isUndefined(Memory.rooms[roomName].terrain))
            Memory.rooms[roomName].terrain = {}
    },

    run: function () {
        //1个tick运行一次
        //清理死亡creep的记忆
        this._deadCreepMemoryClear()

        //5个tick运行一次
        //清理被摧毁的建筑的记忆
        if (Game.time % 5)
            this._destoriedStructureMemoryClear()

        //10个tick运行一次
        //单个房间的管理
        if (Game.time % 10) return
        for (var i in Game.rooms)
            this._room.run(Game.rooms[i])
    },

    _deadCreepMemoryClear: function () {
        for (var i in Memory.creeps) {
            var creep = Game.creeps[i]
            if (!creep) delete Memory.creeps[i]
        }
    },

    _destoriedStructureMemoryClear: function () {
        for (var roomName in Memory.rooms)
            for (var struType in Memory.rooms[roomName].structures)
                for (var id in Memory.rooms[roomName].structures[struType])
                    if (!Game.getObjectById(id)) delete Memory.rooms[roomName].structures[struType][id]
    },

    _room: {
        /** @param {Room} room */
        run: function (room) {
            if (room.controller.my) //这里条件可能有问题
                manageControlledRoom.run(room)
            else
                this._claimed(room)
        },

        //对已控制的房间
        /** @param {Room} room */
        _controlled: function (room) {
            //非自动化数量管理
            creepNumCtrl(room)
            //taskPool管理
            taskPoolManage(room)
            //生成建筑工地
            setConstructionSite(room)
        },
        //对claim的房间
        /** @param {Room} room */
        _claimed: function (room) {
        }
    }
}

module.exports = manager

//非自动化数量管理
/** @param {Room} room */
function creepNumCtrl(room) {
    var creepNum = { harvester: 0, upgrader: 0, hauler: 0, builder: 0 }
    var creepNumTarget = { harvester: 1, upgrader: 1, hauler: 1, builder: 1 }
    for (var i in Game.creeps) {
        var creep = Game.creeps[i]
        if (creep.room.name != room.name) continue
        switch (creep.memory.role) {
            case "harvester": { creepNum.harvester += 1; break }
            case "upgrader": { creepNum.upgrader += 1; break }
            case "hauler": { creepNum.hauler += 1; break }
            case "builder": { creepNum.builder += 1; break }
        }
    }
    for (var role in creepNumTarget) {
        if (creepNum[role] < creepNumTarget[role]) {
            room.spawnQueueEnqueue(spawnInfo[role])
        }
    }
}

//taskPool管理
/** @param {Room} room */
function taskPoolManage(room) {
    for (var i in room.memory.taskPool) {
        var task = room.memory.taskPool[i]
        if (task.taskType == TASK_TYPE_HAUL) {
            if (!Game.getObjectById(task.target))
                room.deleteTask(i)
            if (!Game.getObjectById(task.creepID))
                room.unregistHandlerToTask(i)
        }
    }
}

//从taskPool中获得build任务生成建筑工地
/** @param {Room} room */
function setConstructionSite(room) {
    var taskIndex = room.getTaskIndex(TASK_TYPE_BUILD)
    var taskInfo = room.getTaskInfo(taskIndex)
    var pos = new RoomPosition(taskInfo.x, taskInfo.y, taskInfo.room)
    if (pos.createConstructionSite(taskInfo.structureType) == OK)
        room.deleteTask(taskIndex)
    else
        console.log("setConstructionSite(): failed to createConstructionSite")
}