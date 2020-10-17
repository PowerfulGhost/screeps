const initCreep = require("./b.initCreep")
const initMemoryTree = require("./b.initMemoryTree")
const { initSturcture } = require("./b.initStructure")
const initTerrain = require("./b.initTerrain")

var initialize = {
    run: function () {
        initSturcture.run()
        initCreep.run()
        initTerrain.run()
    }
}

module.exports = initialize