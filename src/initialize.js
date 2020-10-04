const prototypeCreep = require("./prototype.creep")
const prototypeTerrain = require("./prototype.terrain")

var initialize = {
    run: function () {
        console.log("init")

        // add sturcture property to Memory
        if(_.isUndefined(Memory.structure)){
            Memory.structure = {}
        }

        prototypeCreep.run()
        prototypeTerrain.run()

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

module.exports = initialize