const { getMinAndIndex } = require("./util")
var roleHarvester = {
    /** @param {Creep} creep */
    run: function (creep) {
        if (creep.memory.role != "harvester") throw new Error(creep.name + " is not a harvester.")
        if (_.isUndefined(creep.memory.target)) creep.memory.target = null

        //满配harvester
        //一个source只有一个harvester开采
        if (creep.getActiveBodyparts(WORK) >= 5) {
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
        }
        //低配harvester
        //一个source周围可以有多个harvester开采
        else {
            if (!creep.memory.target) {
                //harvester无目标时，寻找最空闲的source
                var target = creep.harvester_findMinHarvesterTarget()
                if (target) creep.memory.target = target.id
            }
            if (creep.memory.target) {
                //移动到source并采集
                var target = Game.getObjectById(creep.memory.target)
                if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target)
                    creep.harvest(target)
                }
            }
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
        //寻找最空闲的source
        Creep.prototype.harvester_findMinHarvesterTarget = function () {
            var sources = this.room.find(FIND_SOURCES)
            var harvesterCount = []
            for (var i in sources) {
                var source = sources[i]
                harvesterCount.push(
                    source.pos.findInRange(FIND_MY_CREEPS, 1, {
                        filter: function (obj) { return obj.memory.role == "harvester" }
                    }).length
                )
            }
            return sources[getMinAndIndex(harvesterCount)["index"]]
        }
        console.log("Harvester初始化完成")
    }
}

module.exports = roleHarvester