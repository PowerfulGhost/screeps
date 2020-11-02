const logger = require("./logger")

var upgrader = {
    init: function () {
        logger.trace("\t\t\t\t\tupgrader.init()")
        Creep.prototype.upgraderRun = function () { }
    }
}

module.exports = upgrader