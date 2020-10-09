const struSpawn = require("./stru.spawn");

var managerStru = {
    struModules:{
        spawn: struSpawn
    },
    run: function(){
        struSpawn.run()
    }
}