//房间管理，包括：
//Creep数量和配置管理

const spawnInfo = require("./temp.config")

var manager = {
    init: function () {

    },
    run: function () {
        //10个tick运行一次
        if (Game.time % 10 != 0) return
        for (var i in Game.rooms)
            this._room.run(Game.rooms[i])
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
            for (var i in Game.creeps) {
                var creep = Game.creeps[i]
                if (creep.room.name != room.name) continue
                var creepNum = { harvester: 0, upgrader: 0, hauler: 0, builder: 0 }
                switch (creep.memory.role) {
                    case "harvester": creepNum.harvester += 1
                    case "upgrader": creepNum.upgrader += 1
                    case "hauler": creepNum.hauler += 1
                    case "builder": creepNum.builder += 1
                }
            }
            var creepNumTarget = { harvester: 2, upgrader: 1, hauler: 1, builder: 1 }
            for (var role in creepNumTarget) {
                if (creepNum[role] < creepNumTarget[role]) {
                    room.spawnQueueEnqueue(spawnInfo[role])
                }
            }
        },

        //对claim的房间
        /** @param {Room} room */
        _claimed: function (room) {

        }
    }
}

module.exports = manager