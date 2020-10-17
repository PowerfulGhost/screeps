var runWorker = {
    run: function () {
        for (var creepName in Game.creeps) {
            var creep = Game.creeps[creepName]
            if (creep.memory.role == "worker") {
                if ((CREEP_LIFE_TIME - creep.ticksToLive) % 300 == 0) {
                    creep.getRandomRole()
                    if (creep.memory.work == "harvest")
                        creep.memory.target = creep.evo_getSourceID()
                    else
                        creep.memory.target == null
                }
                switch (creep.memory.work) {
                    case "harvest": { this._harvestLogic(creep); break }
                    case "upgrade": { this._upgradeLogic(creep); break }
                    case "haul": { this._haulLogic(creep); break }
                    case "build": { this._buildLogic(creep); break }
                }
            }
        }
    },  // end run()

    /** @param {Creep} creep */
    _harvestLogic(creep) {
        var source = Game.getObjectById(creep.memory.target)
        if (!creep.pos.isNearTo(source)) creep.moveTo(source)
        else var score = creep.evo_harvest()
        creep.memory.evolutionInfo.workScore.harvest += score
    },
    /** @param {Creep} creep */
    _upgradeLogic(creep) {
        var controller = creep.room.controller
        if (!creep.pos.inRangeTo(controller, 3)) creep.moveTo(controller)
        else var score = creep.evo_upgradeController()
        creep.memory.evolutionInfo.workScore.upgrade += score
    },
    /** @param {Creep} creep */
    _haulLogic(creep){
        
    }
}
