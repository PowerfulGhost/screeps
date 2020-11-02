const logger = require("./logger")

var builder = {
    init: function () {
        logger.trace("\t\t\t\t\tbuilder.init()")
        Creep.prototype.builderRun = function () { }
    }
}

module.exports = builder