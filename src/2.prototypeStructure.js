var prototypeStructure = {
    run: function () {
        // 给所有建筑定义memory属性，在Memory.rooms.roomname.structures.structureType中
        Object.defineProperty(Structure.prototype, "memory", {
            configurable: true,
            get: function () {
                if (_.isUndefined(this.room.memory["structures"]))
                    this.room.memory["structures"] = {}
                if (_.isUndefined(this.room.memory.structures[this.structureType]))
                    this.room.memory.structures[this.structureType] = {}
                if (_.isUndefined(this.room.memory.structures[this.structureType][this.id]))
                    this.room.memory.structures[this.structureType][this.id] = {}
                return this.room.memory.structures[this.structureType][this.id]
            },
            set: function (value) {
                if (_.isUndefined(this.room.memory["structures"]))
                    this.room.memory["structures"] = {}
                if (_.isUndefined(this.room.memory.structures[this.structureType]))
                    this.room.memory.structures[this.structureType] = {}
                if (_.isUndefined(this.room.memory.structures[this.structureType][this.id]))
                    this.room.memory.structures[this.structureType][this.id] = {}
                this.room.memory.structures[this.structureType][this.id] = value
            }
        })
    },
}
module.exports = prototypeStructure