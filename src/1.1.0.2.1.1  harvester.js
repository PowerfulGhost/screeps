const logger = require("./logger")

var harvester = {
    init: function () {
        logger.trace("\t\t\t\t\tharvester.init()")
        Creep.prototype.harvesterRun = function () { }
    }
}

module.exports = harvester