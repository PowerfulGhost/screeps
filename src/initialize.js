const prototypeCreep = require("./prototype.creep")
const prototypeTerrain = require("./prototype.terrain")
const prototypeStructure = require("./prototype.structure")

var initialize = {
    run: function () {
        console.log("init")
        // add sturcture property to Memory
        if (_.isUndefined(Memory.structure)) {
            Memory.structure = {}
        }
        prototypeCreep.run()
        prototypeTerrain.run()
        prototypeStructure.run()
    }
}

module.exports = initialize