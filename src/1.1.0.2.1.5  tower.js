const logger = require("./logger")

var tower = {
    init: function () {
        logger.trace("\t\t\t\t\ttower.init()")
        StructureTower.prototype.towerRun = function () { }
    }
}

module.exports = tower