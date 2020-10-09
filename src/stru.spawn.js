var struSpawn = {
    /** @param {StructureSpawn} spawn */
    run: function (spawn) {
        if (!spawn.spawning) {
            var spawnInfo = spawn.dequeue()
            if (spawnInfo) {
                spawn.spawnCreep(spawnInfo.bodyparts, spawnInfo.name, spawnInfo.opts)
                console.log(spawn.name + " spawning " + spawnInfo.name)
            }
        }
    }
}

module.exports = struSpawn