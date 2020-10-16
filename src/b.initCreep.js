const { getMinIndex, zeroMean } = require("./util")

var initCreep = {
    run: function () {
        // this._creepMemoryInit() // init creep's memory tree
        this._creepGeneralFunction()  // general functions for all creeps
        this._creepWorkerFunction()  // functions for harvesters, upgraders, haulers and builders
    },

    // _creepMemoryInit: function () {
    //     Object.defineProperty(Creep.prototype, "memory", {
    //         configurable: true,
    //         set: function(){

    //         },
    //         get: function () {

    //         },
    //     })
    // },

    /* 
    functions defined below are not allowed to change creep's memory
    they only return a value
    so called "pesudo functional programming paradigm"
    */

    // general functions for all creeps
    _creepGeneralFunction: function () {
        Creep.prototype.getBodypartNum = function (bodypartType) {
            var count = 0
            for (var part in this.body)
                if (this.body[part].type == bodypartType)
                    count += 1
            return count
        }
        Creep.prototype.getBreedInfo = function () {
            var role = this.memory.role

            // calculate nextgen's role posibility
            var rolePosibility = this.memory.rolePosibility
            var roleScore = this.memory.evolutionInfo.roleScore
            var zmRoleScore = zeroMean(roleScore, 0.1)
            var newPosibility = {}
            for (var workName in rolePosibility)
                newPosibility[workName] = rolePosibility[workName] + zmRoleScore[workName]

            // calculate nextget's bodypart number
            var bodypartScore = this.memory.evolutionInfo.bodypartScore
            var zmBodypartScore = zeroMean(bodypartScore, 1)
            var newBodypart = {}
            for (var bodypartName in zmBodypartScore)
                newBodypart[bodypartName] =
                    this.getBodypartNum(bodypartName) + Math.ceil(zmBodypartScore[bodypartName])

            return {
                role: role,
                newPosibility: newPosibility,
                newBodypart: newBodypart
            }
        }
        Creep.prototype.breed = function () {
            var breedInfo = this.getBreedInfo()
            var spawnList = this.room.find(FIND_MY_SPAWNS)

            // find the spawn with shortest spawnQueue
            var spawnQueueLengthList = []
            for (var index in spawnList) {
                var spawn = spawnList[index]
                spawnQueueLengthList.push(spawn.getQueueLength())
            }
            var minIndex = getMinIndex(spawnQueueLengthList)
            var spawn = spawnList[minIndex]

            spawn.enqueue(breedInfo)
        }
    },

    // functions for workers(harvesters, builders, haulers and upgraders)
    _creepWorkerFunction: function () {
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

        // UPGRADER
        // upgrade the controller and return the energy just used
        Creep.prototype.evo_upgradeController = function () {
            var controller = this.room.controller
            var result = this.upgradeController(controller)
            var workBodypartNum = this.getBodypartNum(WORK)
            if (result == OK) return workBodypartNum
            else return 0
        }

        // HARVESTER
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

        // BUILDER
        // build the target, return the energy just used to build
        Creep.prototype.evo_build = function () {
            var constructionSite = Game.getObjectById(this.memory.target)
            var result = this.build(constructionSite)
            var workBodypartNum = this.getBodypartNum(WORK)
            if (result == OK) return 5 * workBodypartNum
            else return 0
        }
        // repaire the target, return the energy just used to build
        Creep.prototype.evo_repair = function () {
            var damagedStru = Game.getObjectById(this.memory.target)
            var result = this.repair(damagedStru)
            var workBodypartNum = this.getBodypartNum(WORK)
            if (result == OK) return workBodypartNum
            else return 0
        }

        // HAULER
        // transfer resource(energy by default) to target, return the amount of resurce just transfered
        Creep.prototype.evo_transfer = function (resourceType = RESOURCE_ENERGY) {
            var transferTarget = Game.getObjectById(this.memory.target)
            var storeBefore = this.store.getUsedCapacity(resourceType)
            var result = this.transfer(transferTarget, resourceType)
            var storeAfter = this.store.getUsedCapacity(resourceType)
            if (result == OK) return storeBefore - storeAfter
            else return 0
        }
    }
}
module.exports = initCreep