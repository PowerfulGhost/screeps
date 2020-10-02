var roleBulider = {
    bodyparts: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    memory: {
        role: "builder",
        state: "idle",
        target: null,
        resourceType: RESOURCE_ENERGY
    },
    config: {
        resourceType: RESOURCE_ENERGY,
        hitsLimit: 100000,
        FSM: {
            get: {
                build: { cond0: { full: true }, cond1: { target: false, empty: false } },
                idle: { cond0: { target: false, empty: true } }
            },
            build: {
                get: { cond0: { empty: true } },
                idle: { cond0: { empty: false, target: false } }
            },
            idle: {
                get: { cond0: { target: true } }
            }
        }
    },
    /** @param {Creep} creep */
    run: function (creep) {
        // state transition
        creep.FSM(this.config.FSM)

        // working logic
        var state = creep.memory.state
        if (state == "idle") {
            creep.memory.target = creep.findSite(this.config.hitsLimit)
        }
        if (state == "get") {
            creep.memory.target = creep.findResourceTarget()
            console.log(creep.memory.target)
            creep.getFromResourceTarget(creep.memory.target)
        }
        if(state == "build"){
            creep.memory.target = creep.findSite()
            creep.buildOrRepairTarget(creep.memory.target)
        }
    },
}

module.exports = roleBulider
