// branch: test
var init = require("initialize")

var terrainSource = require("./terrain.source")
var struTower = require("stru.tower")
const managerRole = require("./manager.role")

init.run()
module.exports.loop = function () {
    console.log("==========  tick" + Game.time + "  ==========")
    terrainSource.run()
    managerRole.run()

    for (var name in Game.rooms) {
        var room = Game.rooms[name]
        var towers = room.find(FIND_STRUCTURES,
            {
                filter: function (obj) {
                    return obj.structureType == STRUCTURE_TOWER
                }
            })
        for (var towerName in towers) {
            var tower = towers[towerName]
            struTower.run(tower)
        }
    }
}