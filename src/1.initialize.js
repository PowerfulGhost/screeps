const prototypeCreep = require("./2.prototypeCreep")
const prototypeRoom = require("./2.prototypeRoom")
const prototypeStructure = require("./2.prototypeStructure")
const prototypeTerrain = require("./2.prototypeTerrain")
var initialize = {
    run: function () {
        prototypeOthers.run()       //除了下面几个之外的原型扩展
        prototypeCreep.run()        //Creep原型扩展
        prototypeRoom.run()         //Room原型扩展
        prototypeStructure.run()    //Structure以及其子类原型扩展
        prototypeTerrain.run()      //各种地形对象的原型扩展
        console.log("初始化完毕")
    }
}

module.exports = initialize