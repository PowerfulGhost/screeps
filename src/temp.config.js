var spawnInfo = {
    harvester: {
        body: [WORK, WORK, MOVE],
        memory: {
            role: "harvester",
            target: null
        }
    },
    upgrader: {
        body: [WORK, CARRY, MOVE],
        memory: {
            role: "upgrader",
            target: null
        }
    },
    hauler: {
        body: [CARRY, CARRY, MOVE],
        memory: {
            role: "hauler",
            taskInfo:null,
            state: null,
            target: null
        }
    },
    builder: {
        body: [WORK, CARRY, MOVE],
        memory: {
            role: "builder",
            state: null,
            target: null
        }
    }
}
module.exports = spawnInfo