const logger = require("./logger")

var hauler = {
    init: function(){
        logger.trace("\t\t\t\t\thauler.init()")
        Creep.prototype.haulerRun = function(){}
    }
}

module.exports = hauler