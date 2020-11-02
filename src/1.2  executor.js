const logger = require("./logger")

var executor = {
    init: function () {
        logger.trace("\texecuter.init()")
    },
    run: function () {
        logger.trace("\texecuter.run()")
    }
}

module.exports = executor