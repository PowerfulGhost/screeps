const logger = require("./logger")

var outerHauler = {
    init: function(){
        logger.trace("\t\t\t\touterHauler.init()")
        Creep.prototype.outerHaulerRun = function(){}
    }
}

module.exports = outerHauler