const statistic = require("./1.0  statistic")
const runner = require("./1.1  runner")
const executor = require("./1.2  executor")
const logger = require("./logger")

var initialize = {
    init: function () {
        logger.trace("initialize.init()")
        statistic.init()
        runner.init()
        executor.init()
    }
}

module.exports = initialize