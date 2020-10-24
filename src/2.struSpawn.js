const { calcCreepCost } = require("./util")

var struSpawn = {
    /** @param {StructureSpawn} spawn */
    run: function (spawn) {
        //在spawn空闲时并且有足够能量时从房间的spawnQueue中取出一个任务开始spawn
        if (spawn.spawning) return
        var spawnInfo = spawn.room.spawnQueueDequeue()
        if (!spawnInfo) return
        if (calcCreepCost(spawnInfo.body) > 0.9 * spawn.room.energyAvailable) return
        spawn.spawnCreep(
            spawnInfo.body,
            spawnInfo.memory.role + " " + Game.time,
            { memory: spawnInfo.memory }
        )
        console.log("Spawn" + i + " spawning " + spawnInfo.memory.role + " " + Game.time)
    }
}
module.exports = struSpawn