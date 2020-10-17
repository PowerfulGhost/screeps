var initSturcture = {
    run: function () {
        this._spawnFunction()
    },
    _spawnFunction: function () {
        Object.defineProperty(StructureSpawn.prototype, "memory", {
            configurable: true,
            set: function (value) {
                if (_.isUndefined(this.room.memory["structures"]))
                    this.room.memory["structures"] = {}
                if (_.isUndefined(this.room.memory.structures["spawns"]))
                    this.room.memory.structures["spawns"] = {}
                this.room.memoize.structures.spawns[this.id] = value
            },
            get: function (value) {
                if (_.isUndefined(this.room.memory["structures"]))
                    this.room.memory["structures"] = {}
                if (_.isUndefined(this.room.memory.structures["spawns"]))
                    this.room.memory.structures["spawns"] = {}
                if (_.isUndefined(this.room.structures.spawns[this.id]))
                    this.room.memory.structures.spawns[this.id] = {}
                return this.room.memory.structures.spawns[this.id]
            }
        })
    }
}

module.exports = { initSturcture }