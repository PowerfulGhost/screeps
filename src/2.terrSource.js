const { TASK_TYPE_BUILD } = require("./const")

var terrSource = {
    /** @param {Source} source */
    run: function (source) {
        // 每10tick运行一次
        if (Game.time % 10) return
        source.setWorkPos()
        source.isOccupied()
    },

    init: function () {
        //给Source定义memory属性
        Object.defineProperty(Source.prototype, "memory", {
            configurable: true,
            get: function () {
                if (_.isUndefined(this.room.memory["terrain"]))
                    this.room.memory["terrain"] = {}
                if (_.isUndefined(this.room.memory.terrain["sources"]))
                    this.room.memory.terrain["sources"] = {}
                if (_.isUndefined(this.room.memory.terrain.sources[this.id]))
                    this.room.memory.terrain.sources[this.id] = {}
                return this.room.memory.terrain.sources[this.id]
            },
            set: function (value) {
                if (_.isUndefined(this.room.memory["terrain"]))
                    this.room.memory["terrain"] = {}
                if (_.isUndefined(this.room.memory.terrain["sources"]))
                    this.room.memory.terrain["sources"] = {}
                if (_.isUndefined(this.room.memory.terrain.sources[this.id]))
                    this.room.memory.terrain.sources[this.id] = {}
                this.room.memory.terrain.sources[this.id] = value
            }
        })
        //设定工作地点并且发布一个建造container的任务
        Source.prototype.setWorkPos = function () {
            if (!_.isUndefined(this.memory.workPos)) return
            var path = null
            var target = this.room.find(FIND_STRUCTURES, {
                filter: function (obj) { return obj.structureType == STRUCTURE_STORAGE }
            })
            if (target.length == 0) {
                target = this.room.controller
                if (!target) target = new RoomPosition(25, 25, this.room.name)
            }
            else
                target = target[0]
            path = this.pos.findPathTo(target)
            var workPos = new RoomPosition(this.pos.x + path[0].dx, this.pos.y + path[0].dy, this.room.name)
            this.memory.workPos = { x: workPos.x, y: workPos.y }
            this.room.setTask({
                taskType: TASK_TYPE_BUILD,
                piority: 3,
                structureType: STRUCTURE_CONTAINER,
                x: workPos.x,
                y: workPos.y,
                room: workPos.roomName
            })
        }
        //获取工作地点
        Source.prototype.getWorkPos = function () {
            return new RoomPosition(this.memory.workPos.x, this.memory.workPos.y, this.room.name)
        }
        //检查是否已经有非死亡的creep绑定该source
        Source.prototype.isOccupied = function () {
            if (_.isUndefined(this.memory.harvester)) this.memory.harvester = null
            if (this.memory.harvester && !Game.getObjectById(this.memory.harvester))
                this.memory.harvester = null
            if (this.memory.harvester) return true
            else return false
        }
        //登记harvester
        Source.prototype.registHarvester = function (creepID) {
            if (this.memory.harvester && Game.getObjectById(this.memory.harvester))
                throw new Error("Source.registHarvest(): this source already has a living harvester.")
            this.memory.harvester = creepID
        }
    },
}

module.exports = terrSource