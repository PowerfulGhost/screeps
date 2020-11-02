const { TASK_TYPE_HAUL, TASK_TYPE_BUILD, TASK_TYPE_SPAWN, STRUCTURES_ALL } = require("./const")

var prototypeRoom = {
    run: function () {
        this._taskPool()
    },
    //任务池相关的函数
    _taskPool: function () {
        //向任务池中添加一个任务
        Room.prototype.setTask = function (taskInfo) {
            if (_.isUndefined(this.memory["taskPool"]))
                this.memory["taskPool"] = []
            if (this.memory.taskPool.length == 0)
                taskInfo.id = 0
            else
                taskInfo.id = this.memory.taskPool[this.memory.taskPool.length - 1].id + 1
            this.memory.taskPool.push(taskInfo)
        }
        //从任务池中获得指定任务类型的优先级最高的任务的id
        Room.prototype.getTaskID = function (taskType) {
            if (_.isUndefined(this.memory["taskPool"])) {
                this.memory["taskPool"] = []
                return null
            }
            var maxPiority = -1
            var id = -1
            for (var i in this.memory.taskPool) {
                var taskInfo = this.memory.taskPool[i]
                if (taskInfo.handler) continue
                if (taskInfo.taskType != taskType) continue
                if (taskInfo.piority > maxPiority) {
                    maxPiority = taskInfo.piority
                    id = this.memory.taskPool[i].id
                }
            }
            if (id != -1) return id
            else return null
        }
        //从任务池中获得指定任务类型的所有任务的id
        Room.prototype.getAllTaskID = function (taskType) {
            var idList = []
            if (_.isUndefined(this.memory["taskPool"])) this.memory["taskPool"] = []
            for (var i in this.memory.taskPool)
                if (this.memory.taskPool[i].taskType == taskType)
                    idList.push(this.memory.taskPool[i])
            return idList
        }
        //从任务池中获得指定序号的任务信息
        Room.prototype.getTaskInfo = function (id) {
            return _.find(this.memory.taskPool, function (obj) { return obj.id == id })
        }
        //给任务登记执行者
        Room.prototype.registHandlerToTask = function (handler, id) {
            var handlerID = null
            if (_.isString(handler))
                handlerID = handler
            else if (!_.isUndefined(handler.id))
                handlerID = handler.id
            else throw new Error("Room.registHandlerToTask(): handler must be a string or an object with id property.")
        }
        //删除任务
        Room.prototype.deleteTask = function (taskIndex) {
            this.memory.taskPool.splice(taskIndex, 1)
        }
        //取消登记在任务上的执行者
        Room.prototype.unregistHandlerToTask = function (taskIndex) {
            this.memory.taskPool[taskIndex]["handler"] = null
        }
    }
}
var protocolRoom = {
    //生成特定格式的taskInfo
    generateTaskInfo: function (taskType, piority, handler = null, otherInfo) {
        if (taskType != TASK_TYPE_HAUL && taskType != TASK_TYPE_BUILD && taskType != TASK_TYPE_SPAWN)
            throw new Error("generateTaskInfo(): taskType invalid")
        if (!_.isNumber(piority)) throw new Error("generateTaskInfo(): invalid piority")
        if (piority < 1 || piority > 5) throw new Error("generateTaskInfo(): piority must within [1,5]")
        if (!_.isObject(otherInfo)) throw new Error("generateTaskInfo(): invalid otherInfo")
        switch (taskType) {
            case TASK_TYPE_HAUL: {
                var keys = ["target", "resourceType", "amount"]
                for (var i in keys)
                    if (_.isUndefined(otherInfo[keys[i]])) throw new Error("generateTaskInfo(): " + key + " is undefined in otherInfo.")
                if (!_.isString(otherInfo.target)) throw new Error("generateTaskInfo(): target must be an id string.")
                if (!_.include(RESOURCES_ALL, otherInfo.resourceType)) throw new Error("generateTaskInfo(): resourceType must be RESOURCE_* const.")
                if (!Number.isInteger(otherInfo.amount) || otherInfo.amount <= 0) throw new Error("generateTaskInfo(): amount must be a positive integer.")
                return { taskType: taskType, piority: piority, handler: handler, target: otherInfo.target, resourceType: otherInfo.resourceType, amount: otherInfo.amount }
            }
            case TASK_TYPE_BUILD: {
                var keys = ["structureType", "x", "y", "room"]
                for (var i in keys)
                    if (_.isUndefined(otherInfo[keys[i]])) throw new Error("generateTaskInfo(): " + key + " is undefined in otherInfo.")
                if (!_.include(STRUCTURES_ALL, otherInfo.structureType)) throw new Error("generateTaskInfo(): invalid structureType.")
                if (!_.isNumber(otherInfo.x)) throw new Error("generateTaskInfo(): x must be a number.")
                if (!_.isNumber(otherInfo.y)) throw new Error("generateTaskInfo(): y must be a number.")
                if (!Number.isInteger(otherInfo.x) || otherInfo.x < 0 || otherInfo.x > 49) throw new Error("generateTaskInfo(): x must be an integer within [0,49].")
                if (!Number.isInteger(otherInfo.y) || otherInfo.y < 0 || otherInfo.y > 49) throw new Error("generateTaskInfo(): y must be an integer within [0,49].")
                if (!_.include(Object.keys(Game.rooms), otherInfo.room)) throw new Error("generateTaskInfo(): invalid room name.")
                return { taskType: taskType, piority: piority, handler: handler, structureType: otherInfo.structureType, x: otherInfo.x, y: otherInfo.y, room: otherInfo.room }
            }
            case TASK_TYPE_SPAWN: {
                var keys = ["role", "body"]
                for (var i in keys)
                    if (_.isUndefined(otherInfo[keys[i]])) throw new Error("generateTaskInfo(): " + key + " is undefined in otherInfo.")
                if (otherInfo.role != "harvester" && otherInfo.role != "hauler" && otherInfo.role != "builder" && otherInfo.role != "upgrader")
                    throw new Error("generateTaskInfo(): role must be harvester, hauler, builder or upgrader.")
                if (!_.isArray(otherInfo.body))
                    throw new Error("generateTaskInfo(): body must be an array contains bodypart constants.")
                return { taskType: taskType, piority: piority, handler: handler, role: otherInfo.role, body: otherInfo.body, }
            }
        }
    }
}
module.exports = { prototypeRoom, protocolRoom }