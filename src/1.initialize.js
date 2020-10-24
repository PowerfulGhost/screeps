const manager = require("./1.manager")
const prototypeCreep = require("./2.prototypeCreep")
const prototypeRoom = require("./2.prototypeRoom")
const prototypeStructure = require("./2.prototypeStructure")
const prototypeTerrain = require("./2.prototypeTerrain")
const roleHarvester = require("./2.roleHarvester")
const roleHauler = require("./2.roleHauler")
const roleUpgrader = require("./2.roleUpgrader")
var initialize = {
    run: function () {
        manager.init()              //manager初始化

        prototypeCreep.run()        //Creep原型扩展
        prototypeRoom.run()         //Room原型扩展
        prototypeStructure.run()    //Structure以及其子类原型扩展
        prototypeTerrain.run()      //各种地形对象的原型扩展

        roleHauler.init()           //Hauler专用的函数的原型扩展
        roleHarvester.init()        //Harvester专用的函数的原型扩展
        roleUpgrader.init()         //Upgrader专用的函数的原型扩展
        console.log("初始化完毕")
    }
}

module.exports = initialize