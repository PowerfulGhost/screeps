const initCreep = require("./b.initCreep")
const initMemoryTree = require("./b.initMemoryTree")
const initRoom = require("./b.initRoom")
const { initSturcture } = require("./b.initStructure")
const initTerrain = require("./b.initTerrain")

var initialize = {
    run: function () {
        initRoom.run()
        initSturcture.run()
        initCreep.run()
        initTerrain.run()
    }
}

module.exports = initialize