//房间管理，包括：
//Creep数量和配置管理
//死亡Creep的内存回收
//各种地形的逻辑
//不一定每个tick都执行

const terrSource = require("./2.terrSource")
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
        this._deadCreepMemoryClear()
        //5个tick运行一次
        this._destoriedStructureMemoryClear()
        //10个tick运行一次
        if (Game.time % 10 != 0) return
        for (var i in Game.rooms)
            this._room.run(Game.rooms[i])
    },
    //清理死亡creep的记忆
    _deadCreepMemoryClear: function () {
        for (var i in Memory.creeps) {
            var creep = Game.creeps[i]
            if (!creep) delete Memory.creeps[i]
        }
    },
    //清理被摧毁的建筑的记忆
    _destoriedStructureMemoryClear: function () {
        for (var roomName in Memory.rooms)
            for (var struType in Memory.rooms[roomName].structures)
                for (var id in Memory.rooms[roomName].structures[struType])
                    if (!Game.getObjectById(id)) delete Memory.rooms[roomName].structures[struType][id]
    },
    //单个房间的管理
    _room: {
        /** @param {Room} room */
        run: function (room) {
            if (room.controller.my) //这里条件可能有问题
                this._controlled(room)
            else
                this._claimed(room)
        },

        //对已控制的房间
        /** @param {Room} room */
        _controlled: function (room) {
            //非自动化数量管理
            var creepNum = { harvester: 0, upgrader: 0, hauler: 0, builder: 0 }
            var creepNumTarget = { harvester: 1, upgrader: 1, hauler: 1, builder: 0 }
            for (var i in Game.creeps) {
                var creep = Game.creeps[i]
                if (creep.room.name != room.name) continue
                console.log(creep.memory.role)
                switch (creep.memory.role) {
                    case "harvester": { creepNum.harvester += 1; break }
                    case "upgrader": { creepNum.upgrader += 1; break }
                    case "hauler": { creepNum.hauler += 1; break }
                    case "builder": { creepNum.builder += 1; break }
                }
            }
            console.log(creepNum.hauler)
            for (var role in creepNumTarget) {
                if (creepNum[role] < creepNumTarget[role]) {
                    room.spawnQueueEnqueue(spawnInfo[role])
                    console.log("enqueued")
                }
            }
            //source规划
            var sources = room.find(FIND_SOURCES)
            for (var i in sources) {
                var source = sources[i]
                terrSource.run(source)
            }
        },

        //对claim的房间
        /** @param {Room} room */
        _claimed: function (room) {

        }
    }
}

module.exports = manager