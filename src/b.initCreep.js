var initCreep = {
    run: function () {

    },

    // functions defined below are not allowed to change creep's memory
    // they only return a value
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
        // upgrade the controller and return the energy just used
        Creep.prototype.evo_upgradeController = function () {
            var controller = this.room.controller
            var result = this.upgradeController(controller)
            var workBodypartNum = 0
            for (var part in this.body)
                if (this.body[part].type == WORK) workBodypartNum += 1
            if (result == OK) {
                return workBodypartNum
            }
            else return 0
        }
        // harvest from a source or a mineral depot and return the amount of resources just harvested
        Creep.prototype.evo_harvest = function(){
            
        }
    }
}
module.exports = initCreep