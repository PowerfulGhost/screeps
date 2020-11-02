var terrMineral = {
    /** @param {Mineral} mineral */
    run: function(mineral){
    },
    init:function(){
        //给Mineral定义memory属性
        Object.defineProperty(Mineral.prototype, "memory", {
            configurable: true,
            get: function () {
                if (_.isUndefined(this.room.memory["terrain"]))
                    this.room.memory["terrain"] = {}
                if (_.isUndefined(this.room.memory.terrain["minerals"]))
                    this.room.memory.terrain["minerals"] = {}
                if (_.isUndefined(this.room.memory.terrain.minerals[this.id]))
                    this.room.memory.terrain.minerals[this.id] = {}
                return this.room.memory.terrain.minerals[this.id]
            },
            set: function (value) {
                if (_.isUndefined(this.room.memory["terrain"]))
                    this.room.memory["terrain"] = {}
                if (_.isUndefined(this.room.memory.terrain["minerals"]))
                    this.room.memory.terrain["minerals"] = {}
                if (_.isUndefined(this.room.memory.terrain.minerals[this.id]))
                    this.room.memory.terrain.minerals[this.id] = {}
                this.room.memory.terrain.minerals[this.id] = value
            }
        })
        //设定工作地点并且发布一个建造container的任务
        Mineral.prototype.setWorkPos = function () {
            var path = null
            var storage = this.room.find(FIND_STRUCTURES, {
                filter: function (obj) { return obj.structureType == STRUCTURE_STORAGE }
            })
            if (storage.length > 0)
                path = this.pos.findPathTo(storage[0].pos)
            var workPos = new RoomPosition(this.pos.x + path[0].dx, this.pos.y + path[0].dy, this.room.name)
            this.memory.workPos = { x: workPos.x, y: workPos.y }
            this.room.setTask({
                taksType: TASK_TYPE_BUILD,
                piority: 3,
                structureType: STRUCTURE_CONTAINER,
                x: workPos.x,
                y: workPos.y,
                room: workPos.roomName
            })
        }
        //检查是否已经有非死亡的creep绑定该mineral
        Mineral.prototype.isOccupied = function () {
            if (_.isUndefined(this.memory.harvester)) this.memory.harvester = null
            if (this.memory.harvester && !Game.getObjectById(this.memory.harvester))
                this.memory.harvester = null
            if (this.memory.harvester) return true
            else return false
        }
        //登记harvester
        Mineral.prototype.registHarvester = function (creepID) {
            if (this.memory.harvester && Game.getObjectById(this.memory.harvester))
                throw new Error("Mineral.registHarvest(): this Mineral already has a living harvester.")
            this.memory.harvester = creepID
        }
    }
}
module.exports = terrMineral