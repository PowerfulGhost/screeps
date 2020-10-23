const { calcCreepCost } = require("./util")

var struSpawn = {
    run: function () {
        //在spawn空闲时并且有足够能量时从房间的spawnQueue中取出一个任务开始spawn
        for (var i in Game.spawns) {
            var spawn = Game.spawns[i]
            if (spawn.spawning) continue
            var spawnInfo = spawn.room.spawnQueueDequeue()
            if (!spawnInfo) break
            // if (calcCreepCost(spawnInfo.body) > 0.9 * spawn.room.energyAvailable) break
            spawn.spawnCreep(
                spawnInfo.body,
                spawnInfo.memory.role + " " + Game.time,
                { memory: spawnInfo.memory }
            )
            console.log("Spawn" + i + " spawning " + spawnInfo.memory.role + " " + Game.time)
        }
    }
}
module.exports = struSpawn