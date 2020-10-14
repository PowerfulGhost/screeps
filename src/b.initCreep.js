const { getMinIndex } = require("./util")

var initCreep = {
    run: function () {
        this.general()
        this._worker()
    },

    /* 
    functions defined below are not allowed to change creep's memory
    they only return a value
    so called "pesudo functional programming paradigm"
    */

    // general functions for all creeps
    general: function () {
        Creep.prototype.getBodypartNum = function (bodypartType) {
            var count = 0
            for (var part in this.body)
                if (this.body[part].type == bodypartType)
                    count += 1
            return count
        }
        // Creep.prototype.findSourceID = function () {
        //     var sourceIDList = this.room.memory.terrain.sources
        //     var sourceNum = sourceIDList.length
        //     for (var index in sourceIDList){
        //         var sourceID = sourceIDList[index]
        //         var source = Game.getObjectById(sourceID)
        //     }
        // }
    },

    // functions for workers(harvesters, builders, repairers and upgraders)
    _worker: function () {
        // choose a role randomly based on the posibilities in creep's memory
        Creep.prototype.getRandomRole = function () {
            var pHarv = this.memory.rolePosibility.harvest
            var pUpgrade = this.memory.rolePosibility.upgrade
            var pHaul = this.memory.rolePosibility.haul
            var pBulid = this.memory.rolePosibility.build
            var pAll = pHarv + pUpgrade + pHaul + pBulid
            var rand = Math.random() * pAll
            var step1 = pHarv
            var step2 = step1 + pUpgrade
            var step3 = step2 + pHaul
            if (rand < step1) return "harvest"
            if (rand < step2) return "upgrade"
            if (rand < step3) return "haul"
            return "build"
        }

        /*
        UPGRADER
        */
        // upgrade the controller and return the energy just used
        Creep.prototype.evo_upgradeController = function () {
            var controller = this.room.controller
            var result = this.upgradeController(controller)
            var workBodypartNum = this.getBodypartNum(WORK)
            if (result == OK) return workBodypartNum
            else return 0
        }

        /*
        HARVESTER
        */
        // get the source with minimum number of harvest around it, return the ID
        // this function should be called when the creep decided to become a harvester
        Creep.prototype.evo_getSourceID = function () {
            var sourceIDList = this.room.memory.terrain.sources
            var sourceHarvesterNumList = []
            for (var index in sourceIDList) {
                var source = Game.getObjectById(sourceIDList[index])
                var harvesterNum = source.getHarvesterNum()
                sourceHarvesterNumList.push(harvesterNum)
            }
            var minIndex = getMinIndex(sourceHarvesterNumList)
            return sourceIDList[minIndex]
        }
        // harvest from a source or a mineral depot and return the amount of resources just harvested
        // if the creep is not in the position, move to the source
        Creep.prototype.evo_harvest = function () {
            var source = Game.getObjectById(this.memory.target)
            var result = this.harvest(source)
            var workBodypartNum = this.getBodypartNum(WORK)
            if (result == OK) return 2 * workBodypartNum
            else return 0
        }

        /*
        BUILDER
        */
        Creep.prototype.evo_build = function () {
            var constructionSite = Game.getObjectById(this.memory.target)
            var result = this.build(constructionSite)
            var workBodypartNum = this.getBodypartNum(WORK)
            if (result == OK) return 5 * workBodypartNum
            else return 0
        }
    }
}
module.exports = initCreep