const roleBulider = require("./role.builder");
const roleHarvester = require("./role.harvester");
const roleHauler = require("./role.hauler");
const roleUpgrader = require("./role.upgrader");

var managerRole = {
    roleModules: {
        harvester: roleHarvester,
        hauler: roleHauler,
        upgrader: roleUpgrader,
        builder: roleBulider
    },
    config: {
        creepNum: {
            harvester: 1,
            hauler: 1,
            upgrader: 0,
            builder: 0,
        }
    },

    run: function () {
        this._deleteDeadCreepMem()
        var creepCount = this._roleBehaviourCtrl()
        this._roleNumControl(creepCount)
    },
    // 删除死亡creep的记忆
    _deleteDeadCreepMem: function () {
        for (var name in Memory.creeps)
            if (!Game.creeps[name]){
                delete Memory.creeps[name]
                console.log(name + "'s memory deleted")
            }
    },
    // 角色行为控制
    _roleBehaviourCtrl: function () {
        var creepCount = {
            harvester: 0,
            hauler: 0,
            upgrader: 0,
            builder: 0
        }
        for (var name in Game.creeps) {
            var creep = Game.creeps[name]
            var role = creep.memory.role
            creepCount[role] += 1
            switch (role) {
                case "harvester": { roleHarvester.run(creep); break }
                case "hauler": { roleHauler.run(creep); break }
                case "upgrader": { roleUpgrader.run(creep); break }
                case "builder": { roleBulider.run(creep); break }
            }
        }
        return creepCount
    },
    // 角色数量控制
    _roleNumControl: function (creepCount) {
        var creepNum = this.config.creepNum
        for (var role in creepNum) {
            if (creepCount[role] < creepNum[role]) {
                Game.spawns["Spawn1"].spawnCreep(
                    this.roleModules[role].bodyparts,
                    role + Game.time,
                    { memory: this.roleModules[role].memory }
                )
            }
        }
    }
}

module.exports = managerRole