var initTerrain = {
    run: function () {
        this._source()
    },
    _source: function () {
        Source.prototype.getHarvesterNum = function () {
            var thisID = this.id
            var adjacentHarvesterList = this.pos.findInRange(FIND_CREEPS, 1, {
                filter: function (creep) {
                    return creep.memory.target == thisID
                }
            })
            return adjacentHarvesterList.length
        }
    }
}
module.exports = initTerrain
