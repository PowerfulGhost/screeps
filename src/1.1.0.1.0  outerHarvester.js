const logger = require("./logger")

var outerHarvester = {
    init: function () {
        logger.trace("\t\t\t\touterHarvester.init()")
        Creep.prototype.outerHarvesterRun = function () { }
    }
}

module.exports = outerHarvester