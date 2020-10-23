var roleUpgrader = {
    run:function(){
        for(var i in Game.creeps){
            var creep = Game.creeps[i]
            if(creep.memory.role != "upgrader") continue

            if(!creep.memory.target)
                creep.memory.target = creep.room.controller.id
            else{
                //creep在controller旁边时才进行升级
                var target = Game.getObjectById(creep.memory.target)
                if(creep.pos.isNearTo(target))
                    creep.upgradeController(target)
                else
                    creep.moveTo(target)
            }
        }
    }
}

module.exports = roleUpgrader