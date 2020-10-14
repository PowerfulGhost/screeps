var init = require("initialize")
var roleHarvester = require("role.harvester")
var roleUpgrader = require("role.upgrader")
var roleBuilder = require("role.builder")
var roleAdvancedHarv = require("role.advancedHarv")
var roleHauler = require("role.hauler")

var struSource = require("stru.source")
var struTower = require("stru.tower")

init.run()
module.exports.loop = function () {
    struSource.run()
    var harvesterCount = 0
    var upgraderCount = 0
    var builderCount = 0
    var advHarvCount = 0
    var haulerCount = 0 
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name]
            console.log("Memory " + name + " deleted")
        }
    }
    for (var name in Game.creeps) {
        var creep = Game.creeps[name]
        if (creep.memory.role == "harvester") {
            harvesterCount += 1
            roleHarvester.run(creep)
        }
        if (creep.memory.role == "upgrader") {
            upgraderCount += 1
            roleUpgrader.run(creep)
        }
        if (creep.memory.role == "builder") {
            builderCount += 1
            roleBuilder.run(creep)
        }
        if(creep.memory.role == "hauler"){
            haulerCount += 1
            roleHauler.run(creep)
        }
        if(creep.memory.role == "advancedHarv"){
            advHarvCount += 1
            roleAdvancedHarv.run(creep)
        }
    }

    for(var name in Game.rooms){
        var room = Game.rooms[name]
        var towers = room.find(FIND_STRUCTURES,
            {filter:function(obj){
                return obj.structureType == STRUCTURE_TOWER
            }})
        for(var towerName in towers){
            var tower = towers[towerName]
            struTower.run(tower)
        }
    }

    var spawn = Game.spawns["Spawn1"]
    if (harvesterCount < 0) {
        spawn.spawnCreep(
            [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
            "harvester" + Game.time,
            { memory: roleHarvester.memory }
        )
    }
    if (upgraderCount < 3) {
        spawn.spawnCreep(
            [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE],
            "upgrader" + Game.time,
            { memory: roleUpgrader.memory }
        )
    }
    if (builderCount < 1) {
        spawn.spawnCreep(
            roleBuilder.bodyparts,
            "builder" + Game.time,
            { memory: roleBuilder.memory }
        )
    }
    if(advHarvCount < 2){
        spawn.spawnCreep(
            roleAdvancedHarv.bodyparts,
            "advancedHarv"+Game.time,
            {memory:roleAdvancedHarv.memory}
        )
    }
    if(haulerCount < 3){
        spawn.spawnCreep(
            roleHauler.bodyparts,
            "hauler"+Game.time,
            {memory:roleHauler.memory}
        )
    }
    if (spawn.spawning) {
        console.log("Spawning " + spawn.spawning.name)
    }
}