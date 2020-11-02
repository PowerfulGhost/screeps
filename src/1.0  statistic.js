const logger = require("./logger")

var statistic = {
    init: function () {
        logger.trace("\tstatistic.init()")
    },
    run: function () {
        logger.trace("\tstatistic.run()")
    }
}

module.exports = statistic