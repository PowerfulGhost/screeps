const logger = require("./logger")

var constructionManager = {
    init : function(){
        logger.trace("\t\t\t\t\tconstructionManager.init()")
        Room.prototype.constructionManagerRun = function(){ }
    }
}

module.exports = constructionManager