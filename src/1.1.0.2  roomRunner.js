const roomManager = require("./1.1.0.2.0  roomManager")
const roomRoles = require("./1.1.0.2.1  roomRoles")
const logger = require("./logger")

var roomRunner = {
    init: function () {
        logger.trace("\t\t\troomRunner.init()")
        roomManager.init()
        roomRoles.init()
    },
    run:function(){
        logger.trace("\t\t\troomRunner.run()")
    }
}

module.exports = roomRunner