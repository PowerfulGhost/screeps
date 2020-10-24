//每个房间的creep和建筑的逻辑
//每tick执行一次

const roleBulider = require("./2.roleBuilder")
const roleHarvester = require("./2.roleHarvester")
const roleHauler = require("./2.roleHauler")
const roleUpgrader = require("./2.roleUpgrader")
const struSpawn = require("./2.struSpawn")

var runner = {
    run: function () {
        for (var i in Game.rooms) {
            var room = Game.rooms[i]
            this._room.run(room)
        }
    },

    //单个房间的逻辑
    /** @param {Room} room */
    _room: {
        run: function (room) {
            if (room.controller.my)
                this._controlled(room)
        },
        //对控制的房间
        /** @param {Room} room */
        _controlled: function (room) {
            //creep
            for (var name in Game.creeps) {
                var creep = Game.creeps[name]
                if (creep.room.name != room.name) continue
                switch (creep.memory.role) {
                    case "harvester": roleHarvester.run(creep)
                    case "hauler": roleHauler.run(creep)
                    case "builder": roleBulider.run(creep)
                    case "upgrader": roleUpgrader.run(creep)
                }
            }
            //建筑
            var structures = room.find(FIND_STRUCTURES)
            for (var i in structures) {
                var structure = structures[i]
                switch (structure.structureType) {
                    case STRUCTURE_SPAWN: struSpawn.run(structure)
                }
            }
        }
    },
}

module.exports = runner