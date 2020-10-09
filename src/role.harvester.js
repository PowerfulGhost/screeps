var roleHarvester = {
    bodyparts: [WORK, MOVE],
    // bodyparts: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
    memory: {
        role: "harvester",
        state: "move",
        target: null,
        ticksToWorkplace: 0,
        workingPos: null
    },
    config: {
        resourceType: RESOURCE_ENERGY,
        FSM: {
            move: {
                harvest: { cond0: { inWorkingPos: true } }
            }
        }
    },

    /** @param {Creep} creep */
    run: function (creep) {
        this._init(creep)
        if (creep.memory.workingPos) {
            creep.FSM(this.config.FSM)
            var state = creep.memory.state
            if (state == "move") {
                console.log("moving")
                console.log(creep.memory.workingPos)
                creep.moveTo(creep.memory.workingPos)
            }
            if (state == "harvest") {
                var target = Game.getObjectById(creep.memory.target)
                creep.harvest(target)
            }
        }
    },
    /** @param {Creep} creep */
    _init: function (creep) {
        if (!creep.memory.target) {
            console.log("initHarv")
            creep.memory.target = creep.findSource()
            console.log(creep.memory.target)
            creep.memory.workingPos = creep.findWorkingPos()
            console.log(creep.memory.workingPos)
            console.log("initHarvEnd")
        }
    }
}

module.exports = roleHarvester