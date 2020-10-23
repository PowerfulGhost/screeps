var prototypeStructure = {
    run: function () {
        this._general()
        this._tower()
    },
    _general: function () { },
    _tower: function () {
        // 给StructureTower定义memory属性
        Object.defineProperty(StructureTower.prototype, "memory", {
            configurable: true,
            get: function () {
                if (_.isUndefined(this.room.memory["structures"]))
                    this.room.memory["structures"] = {}
                if (_.isUndefined(this.room.memory.structures["towers"]))
                    this.room.memory.structures["towers"] = {}
                if (_.isUndefined(this.room.memory.structures.towers[this.id]))
                    this.room.memory.structures.towers[this.id] = {}
                return this.room.memory.structures.towers[this.id]
            },
            set:function(value){
                if (_.isUndefined(this.room.memory["structures"]))
                    this.room.memory["structures"] = {}
                if (_.isUndefined(this.room.memory.structures["towers"]))
                    this.room.memory.structures["towers"] = {}
                if (_.isUndefined(this.room.memory.structures.towers[this.id]))
                    this.room.memory.structures.towers[this.id] = {}
                this.room.memory.structures.towers[this.id] = value
            }
        })
    }
}
module.exports = prototypeStructure