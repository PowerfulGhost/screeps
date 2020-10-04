var advancedHarv = {
    bodyparts: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
    memory: {
        role: "advancedHarv",
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
        creep.FSM(this.config.FSM)
        var state = creep.memory.state
        if (state == "move") {
            creep.moveTo(creep.memory.workingPos)
        }
        if (state == "harvest") {
            var target = Game.getObjectById(creep.memory.target)
            creep.harvest(target)
        }
    },
    /** @param {Creep} creep */
    _init: function (creep) {
        if (!creep.memory.source) {
            creep.memory.source = creep.findSource()
            creep.memory.workingPos = creep.findWorkingPos()
        }
    }

}

module.exports = advancedHarv