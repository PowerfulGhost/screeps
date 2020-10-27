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
            this.memory.taskPool.push(taskInfo)
        }
        //从任务池中获得指定任务类型的优先级最高的任务的序号
        Room.prototype.getTaskIndex = function (taskType) {
            if (_.isUndefined(this.memory["taskPool"])) {
                this.memory["taskPool"] = []
                return null
            }
            var maxPiority = -1
            var index = -1
            for (var i in this.memory.taskPool) {
                var taskInfo = this.memory.taskPool[i]
                if (taskInfo.handler) continue
                if (taskInfo.taskType != taskType) continue
                if (taskInfo.piority > maxPiority) {
                    maxPiority = taskInfo.piority
                    index = i
                }
            }
            if (index != -1) return index
            else return null
        }
        //从任务池中获得指定任务类型的所有任务的序号
        Room.prototype.getAllTaskIndices = function (taskType) {
            var indices = []
            if (_.isUndefined(this.memory["taskPool"])) this.memory["taskPool"] = []
            for (var i in this.memory.taskPool)
                if (this.memory.taskPool[i].taskType == taskType)
                    indices.push(i)
            return indices
        }
        //从任务池中获得指定序号的任务信息
        Room.prototype.getTaskInfo = function (taskIndex) {
            return this.memory.taskPool[taskIndex]
        }
        //给任务登记执行者
        Room.prototype.registHandlerToTask = function (handler, taskIndex) {
            if (_.isString(handler))
                this.memory.taskPool[taskIndex]["handler"] = handler
            else if (!_.isUndefined(handler.id))
                this.memory.taskPool[taskIndex]["handler"] = handler.id
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

module.exports = prototypeRoom