# 任务信息的格式
    taskInfo = {
        taskType: TASK_TYPE_*,
        piority: 1~5
        // taskType == TASK_TYPE_HAUL
        target: id
        resourceType: RESOURCE_*
        amount: #amount

        // taskType == TASK_TYPE_BUILD
        structureType: STRUCTURE_*
        x: #x
        y: #y
        room: roomName
    }