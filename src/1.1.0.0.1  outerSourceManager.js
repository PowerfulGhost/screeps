const logger = require("./logger")

var outerSourceManager = {
    init: function () {
        logger.trace("\t\t\t\touterSourceManager.init()")
    },
    run: function () {
        logger.trace("\t\t\t\touterSourceManager.run()")
    }
}

module.exports = outerSourceManager