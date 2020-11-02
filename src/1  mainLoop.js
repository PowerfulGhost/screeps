const statistic = require("./1.0  statistic")
const runner = require("./1.1  runner")
const executor = require("./1.2  executor")
const logger = require("./logger")

var mainLoop = {
    run: function () {
        logger.trace("mainLoop.run()")
        statistic.run()
        runner.run()
        executor.run()
    }
}

module.exports = mainLoop