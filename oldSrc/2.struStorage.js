var struStorage = {
    /** @param {StructureStorage} storage */
    run:function(storage){
    },
    
    init:function(){
        // 获得未被预定的特定资源的数量
        StructureStorage.prototype.getUnclaimedCapacity = function (resourceType) {
            if (_.isUndefined(this.memory.claimRegist)) this.memory.claimRegist = {}
            var claimedAmount = 0
            for (var i in this.memory.claimRegist)
                if (this.memory.claimRegist[i].resourceType == resourceType)
                    claimedAmount += this.memory.claimRegist[i].amount
            return this.store.getUsedCapacity(resourceType) - claimedAmount
        }
        // 登记预定资源
        StructureStorage.prototype.registClaimCreep = function (creepID, resourceType, amount) {
            var unclaimedAmount = this.getUnclaimedCapacity(resourceType)
            if (unclaimedAmount < amount) return ERR_NOT_ENOUGH_UNCLAIMED_RESOURCE
            if (_.isUndefined(this.memory.claimRegist)) this.memory.claimRegist = {}
            this.memory.claimRegist[creepID] = { resourceType: resourceType, amount: amount }
            return OK
        }
        // 检查特定项目是否在登记表中
        StructureStorage.prototype.checkRegist = function (creepID, resourceType, amount) {
            if (_.isUndefined(this.memory.claimRegist)) this.memory.claimRegist = {}
            for (var i in this.memory.claimRegist)
                if (
                    i == creepID
                    && this.memory.claimRegist[i].resourceType == resourceType
                    && this.memory.claimRegist[i].amount == amount
                ) return OK
            return ERR_CREEP_NOT_REGISTED
        }
        // 从登记表中删除记录
        StructureStorage.prototype.unregistClaimCreep = function (creepID) {
            if (_.isUndefined(this.memory.claimRegist)) this.memory.claimRegist = {}
            for (var id in this.memory.claimRegist)
                if (id == creepID) {
                    delete this.memory.claimRegist[id]
                    return OK
                }
            return ERR_CREEP_NOT_REGISTED
        }
    }
}
module.exports = struStorage