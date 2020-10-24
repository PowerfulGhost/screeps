var roleHarvester = {
    /** @param {Creep} creep */
    run: function (creep) {
        if (creep.memory.role != "harvester") return

        if (!creep.memory.target)
            //creep无目标source时获取目标source
            creep.memory.target = creep.harvester_findTarget()
        else {
            var target = Game.getObjectById(creep.memory.target)
            var workPos = target.getWorkPos()
            //移动到source旁的工作地点并采集
            if (creep.pos.isEqualTo(workPos))
                creep.harvest(target)
            else
                creep.moveTo(workPos)
        }
    },
    init: function () {
        // 寻找没有harvester的source
        Creep.prototype.harvester_findTarget = function () {
            var sources = this.room.find(FIND_SOURCES)
            var minerals = this.room.find(FIND_MINERALS)
            for (var i in sources) {
                var source = sources[i]
                if (!source.isOccupied()) {
                    this.harvester_occupy(source.id)
                    return source.id
                }
            }
            for (var i in minerals) {
                var mineral = minerals[i]
                if (!mineral.isOccupied()) {
                    this.harvester_occupy(mineral.id)
                    return mineral.id
                }
            }
            return null
        }
        // 绑定source
        Creep.prototype.harvester_occupy = function (sourceID) {
            var source = Game.getObjectById(sourceID)
            if (source.isOccupied()) throw new Error("harvester_occupy(): target is already occupied.")
            source.registHarvester(this.id)
        }
        console.log("Harvester初始化完成")
    }
}

module.exports = roleHarvester