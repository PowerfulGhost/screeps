var prototypeStructure = {
    run: function () {
        console.log("init: structure")
        this._spawn()
        this._tower()
    },
    _spawn: function () {
        StructureSpawn.prototype.enqueue = function (bodyparts, name, opt) {
            if (!this.memory.spawnQueue) this.memory.spawnQueue = []
            this.memory.spawnQueue.push({ bodyparts: bodyparts, name: name, opts: opts })
        }
        StructureSpawn.prototype.dequeue = function () {
            if (!this.memory.spawnQueue) return undefined
            return this.memory.spawnQueue.shift()
        }
    },
    _tower: function () {
        // add memory property to tower
        Object.defineProperty(StructureTower.prototype, "memory",
            {
                configurable: true,
                get: function () {
                    if (_.isUndefined(Memory.structure.towers)) {
                        Memory.structure.towers = {}
                    }
                    if (!_.isObject(Memory.structure.towers)) {
                        return undefined
                    }
                    if (_.isUndefined(Memory.structure.towers[this.id])) {
                        Memory.structure.towers[this.id] = {}
                    }
                    return Memory.structure.towers[this.id]
                },
                set: function (value) {
                    if (_.isUndefined(Memory.structure.towers)) Memory.structure.towers = {}
                    if (!_.isObject(Memory.structure.towers)) throw new Error("Could not set tower memory")
                    Memory.structure.towers[this.id] = value
                }
            })
    }
}
module.exports = prototypeStructure