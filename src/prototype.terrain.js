var prototypeTerrain = {
    run: function () {
        if (_.isUndefined(Memory.terrain)) Memory.terrain = {}

        this._source()
    },
    _source: function () {
        // add memory property to source
        Object.defineProperty(Source.prototype, 'memory', {
            configurable: true,
            get: function () {
                if (!Memory.terrain.sources) Memory.terrain.sources = {};
                if (!Memory.terrain.sources[this.id]) Memory.terrain.sources[this.id] = {}
                return Memory.terrain.sources[this.id]
            },
            set: function (value) {
                if (!Memory.terrain.sources) Memory.terrain.sources = {}
                Memory.terrain.sources[this.id] = value;
            }
        });

        // find the valid working position nearby which is closest to the Spawn1
        Source.prototype.findWorkingPos = function () {
            var x = this.pos.x
            var y = this.pos.y
            var terrain = this.room.getTerrain()
            var xList = [x - 1, x, x + 1]
            var yList = [y - 1, y, y + 1]
            var validPosList = []
            for (var i in xList) {
                for (var j in yList) {
                    var tile = terrain.get(xList[i], yList[j])
                    if (tile == 0 || tile == TERRAIN_MASK_SWAMP)
                        validPosList.push(new RoomPosition([xList[i], yList[j]], this.pos.roomName))
                }
            }
            var distList = []
            var spawnPos = Game.spawns["Spawn1"].pos
            for (var i in validPosList) {
                distList.push(validPosList[i].getRangeTo(spawnPos))
            }
            var min = Math.min.apply(null, distList)
            var index = distList.indexOf(min)
            return validPosList[index]
        }
    }
}

module.exports = prototypeTerrain