var roleHarvester = {
    run: function () {
        for (var i in Game.creeps) {
            var creep = Game.creeps[i]
            if (creep.memory.role != "harvester") continue

            if (!creep.memory.target)
                //creep无目标source时获取目标source
                creep.memory.target = creep.harvester_findTarget()
            else{
                var target = Game.getObjectById(creep.memory.target)
                var workPos = target.memory.workPos
                //移动到source旁的工作地点并采集
                if(creep.pos.isEqualTo(workPos.x,workPos.y))
                    creep.harvest(target)
                else
                    creep.moveTo(workPos.x,workPos.y)
            }
        }
    }
}

module.exports = roleHarvester