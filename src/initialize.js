const prototypeCreep = require("./prototypeCreep")
const prototypeStructure = require("./prototypeStructure")
const prototypeTerrain = require("./prototypeTerrain")
var initialize = {
    run: function () {
        prototypeCreep.run()        //Creep原型扩展
        prototypeStructure.run()    //Structure以及其子类原型扩展
        prototypeTerrain.run()      //各种地形对象的原型扩展
        console.log("初始化完毕")
    }
}

module.exports = initialize