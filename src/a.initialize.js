const initCreep = require("./b.initCreep")
const initMemoryTree = require("./b.initMemoryTree")
const initTerrain = require("./b.initTerrain")

var initialize = {
    run: function () {
        initCreep.run()
        initTerrain.run()
    }
}

module.exports = initialize