const logger = require("./logger")

var spawn = {
    init: function () {
        logger.trace("\t\t\t\t\tspawn.init()")
        StructureSpawn.prototype.spawnRun = function () { }
    }
}

module.exports = spawn