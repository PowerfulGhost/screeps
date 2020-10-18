var initRoom = {
    run: function(){
        this._task()
    },
    _task: function(){
        // publish a task to the task pool
        Room.prototype.setTaskInfo = function(taskInfo){
            if(_.isUndefined(this.memory["taskPool"]))
                this.memory["taskPool"] = []
            this.memory.taskPool.push(taskInfo)
        }
        // get the task from task pool with given task type and highest piority
        Room.prototype.getTaskInfo = function(taskType){
            var taskInfo = null
            var maxPiority = -1
            if(_.isUndefined(this.memory["taskPool"]))
                this.memory["taskPool"] = []
            for(var i in this.memory.taskPool){
                var info = this.memory.tasks[i]
                if(info.taskType == taskType && info.taskPiority > maxPiority){
                    taskInfo = info
                    maxPiority = info.taskPiority
                }
            }
            return taskInfo
        }
    }
}

module.exports = initRoom