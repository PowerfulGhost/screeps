const logger = require("./logger")

var expandManager = {
    init: function(){
        logger.trace("\t\t\t\texpandManager.init()")
    },
    run: function(){
        logger.trace("\t\t\t\texpandManager.run()")
    }
}

module.exports = expandManager