var prototypeCreep = require("prototype.creep")
var initialize = {
    run: function () {
        console.log("init")
        
        // add custom methods to the prototype of Creep
        prototypeCreep.run()

        // add sturcture property to Memory
        if(_.isUndefined(Memory.structure)){
            Memory.structure = {}
        }

        // add memory property to source
        Object.defineProperty(Source.prototype, 'memory', {
            configurable: true,
            get: function () {
                if (_.isUndefined(Memory.sources)) {
                    Memory.sources = {};
                }
                if (!_.isObject(Memory.sources)) {
                    return undefined;
                }
                return Memory.sources[this.id] =
                    Memory.sources[this.id] || {};
            },
            set: function (value) {
                if (_.isUndefined(Memory.sources)) {
                    Memory.sources = {};
                }
                if (!_.isObject(Memory.sources)) {
                    throw new Error('Could not set source memory');
                }
                Memory.sources[this.id] = value;
            }
        });

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