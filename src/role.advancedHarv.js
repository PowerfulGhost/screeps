var advancedHarv = {
    bodyparts: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
    memory: {
        role: "advancedHarv",
        source: null,
        ticksToWorkplace: 0
    },

    /** @param {Creep} creep */
    run: function (creep) {
        if (!creep.memory.source) {
            creep.memory.source = this._findSource(creep)
        } else {
            var source = Game.getObjectById(creep.memory.source)
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
                creep.memory.ticksToWorkplace += 1
            }
        }
        // if (creep.ticksToLive < creep.memory.ticksToWorkplace) {
        //     Game.spawns["Spawn1"].spawnCreep(
        //         this.bodyparts,
        //         "advancedHarv" + Game.time,
        //         { memory: this.memory }
        //     )
        // }

    },

    _findSource: function (creep) {
        var sources = creep.room.find(FIND_SOURCES)
        for (var name in sources) {
            var source = sources[name]
            if (source.memory.harvester == undefined ||
                source.memory.harvester == null ||
                source.memory.harvester == creep.id) {
                source.memory.harvester = creep.id
                return source.id
            }
        }
        return null
    },
}

module.exports = advancedHarv