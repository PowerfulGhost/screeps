const manager = require("./1.manager")
const prototypeCreep = require("./2.prototypeCreep")
const prototypeStructure = require("./2.prototypeStructure")
const { prototypeRoom } = require("./2.prototypeRoom")
const prototypeTerrain = require("./2.prototypeTerrain")
const roleBulider = require("./2.roleBuilder")
const roleHarvester = require("./2.roleHarvester")
const roleHauler = require("./2.roleHauler")
const roleUpgrader = require("./2.roleUpgrader")
const terrSource = require("./2.terrSource")
const terrMineral = require("./2.terrMineral")
const struContainer = require("./2.struContainer")
const struStorage = require("./2.struStorage")
const struSpawn = require("./2.struSpawn")

var initialize = {
    run: function () {
        //manager初始化
        manager.init()              //manager初始化

        //原型扩展
        //通用
        prototypeCreep.run()        //Creep原型扩展
        prototypeRoom.run()         //Room原型扩展
        prototypeStructure.run()    //Structure以及其子类原型扩展
        prototypeTerrain.run()      //各种地形对象的原型扩展

        //角色
        roleHauler.init()           //Hauler专用的函数的原型扩展
        roleHarvester.init()        //Harvester专用的函数的原型扩展
        roleUpgrader.init()         //Upgrader专用的函数的原型扩展
        roleBulider.init()          //Builder专用的函数的原型扩展

        //建筑
        struSpawn.init()
        struContainer.init()
        struStorage.init()

        //地形
        terrSource.init()
        terrMineral.init()
        console.log("初始化完毕")
    }
}

module.exports = initialize