const worldRunner = require("./1.1.0  worldRunner")
const logger = require("./logger")

var runner = {
    init: function () {
        logger.trace("\trunner.init()")
        worldRunner.init()
    },
    run: function () {
        logger.trace("\trunner.run()")
        worldRunner.run()
    }
}

module.exports = runner