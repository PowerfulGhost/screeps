const roleBulider = require("./2.roleBuilder")
const roleHarvester = require("./2.roleHarvester")
const roleHauler = require("./2.roleHauler")
const roleUpgrader = require("./2.roleUpgrader")
const struSpawn = require("./2.struSpawn")

var runner = {
    run: function(){
        //各种creep
        roleHarvester.run()
        roleUpgrader.run()
        roleHauler.run()
        roleBulider.run()
        //各种建筑
        struSpawn.run()
    }
}

module.exports = runner