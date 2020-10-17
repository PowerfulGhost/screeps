var initSturcture = {
    run: function () {
        this._spawnFunction()
    },
    _spawnFunction: function () {
        StructureSpawn.prototype.enqueue = function (value) {
            if (_.isUndefined(this.memory["spawnQueue"])) this.memory["spawnQueue"] = []
            this.memory.spawnQueue.pusn(value)
        }
        StructureSpawn.prototype.getQueueLength = function () {
            if (_.isUndefined(this.memory["spawnQueue"])) this.memory["spawnQueue"] = []
            return this.memory.spawnQueue.length
        }
        // get a breedInfo form the queue and spawn it when energy is enough
        StructureSpawn.prototype.evo_spawnCreep = function () {
            if (this.memory.spawnQueue.length > 0) {
                var breedInfo = this.memory.spawnQueue[0]
                var cost = 0
                for (var bodypartName in breedInfo.newBodypart)
                    cost += breedInfo.newBodypart[bodypartName] * BODYPART_COST[bodypartName]
                if (cost < 0.7 * this.room.energyCapacityAvailable) {
                    this.spawnCreep(
                        getFlattenBodypartArray(breedInfo.newBodypart),
                        breedInfo.role + " " + Game.time,
                        {
                            memory: {
                                id: null, role: breedInfo.role, work: null, target: null,
                                rolePosibility: breedInfo.newPosibility,
                                evolutionInfo: {
                                    bodypartScore: { work: 0, carry: 0, move: 0 },
                                    workScore: { harvest: 0, upgrade: 0, haul: 0, build: 0 }
                                }
                            }
                        }
                    )   //end spawnCreep
                    this.memory.spawnQueue.shift()
                }
            }   //end if
        }   // end evo_spawnCreep

    }   // end _spawnFunction
}

module.exports = { initSturcture }

// utility functions
function getFlattenBodypartArray(newBodypart) {
    var arr = []
    for (var bodypartName in newBodypart) {
        for (var i = 0; i < newBodypart[bodypartName]; i++)
            arr.push(bodypartName)
    }
    return arr
}