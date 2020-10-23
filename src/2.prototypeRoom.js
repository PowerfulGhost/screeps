var prototypeRoom = {
    run: function () {
        this._spawnQueue()
        this._taskPool()
    },
    //spawnQueue相关的函数
    _spawnQueue: function () {
        //把一个spawn任务和信息加入spawnQueue
        Room.prototype.spawnQueueEnqueue = function (spawnInfo) {
            if (_.isUndefined(this.memory["spawnQueue"]))
                this.memory["spawnQueue"] = []
            this.memory.spawnQueue.push(spawnInfo)
        }
        //从spawnQueue中取出一个spawn任务
        Room.prototype.spawnQueueDequeue = function () {
            if (_.isUndefined(this.memory["spawnQueue"])) {
                this.memory["spawnQueue"] = []
                return null
            }
            return this.memory.spawnQueue.shift()
        }
    },
    //任务池相关的函数
    _taskPool: function () {
        //向任务池中添加一个任务
        Room.prototype.setTask = function (taskInfo) {
            if (_.isUndefined(this.memory["taskPool"]))
                this.memory["taskPool"] = []
            this.memory.taskPool.push(taskInfo)
        }
        //从任务池中取出指定任务类型的优先级最高的任务
        Room.prototype.getTask = function (taskType) {
            if (_.isUndefined(this.memory["taskPool"])) {
                this.memory["taskPool"] = []
                return null
            }
            var ret = null
            var maxPiority = -1
            var index = -1
            for (var i in this.memory.taskPool) {
                var taskInfo = this.memory.taskPool[i]
                if (taskInfo.taskType != taskType) continue
                if (taskInfo.piority > maxPiority) {
                    ret = taskInfo
                    maxPiority = taskInfo.piority
                    index = i
                }
            }
            this.memory.taskPool.splice(i,1)
            return ret
        }
    }
}

module.exports = prototypeRoom