var advancedHarv = {
    bodyparts: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
    memory: {
        role: "advancedHarv",
        target: null,
        ticksToWorkplace: 0,
        workingPos: null
    },
    config: {
        resourceType: RESOURCE_ENERGY,
        FSM: {
            move: { harvest: { inWorkingPos: true } }
        }
    },

    /** @param {Creep} creep */
    run: function (creep) {
        creep.FSM(this.config.FSM)

        var state = creep.memory.state
        if (state == "move") {
            if (!creep.memory.source) {
                creep.memory.source = creep.findSource()
                creep.memory.pos = creep.findWorkingPos()
            }
            if (!creep.memory.workingPos.roomName) console.warn("advancedHarv @(" + creep.pos.x + "," + creep.pos.y + "," + creep.pos.roomName + ") has no workingPos")
            else creep.moveTo(creep.memory.workingPos)
        }
        if(state == "harvest"){
            var target = Game.getObjectById(creep.memory.target)
            creep.harvest(target)
        }
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