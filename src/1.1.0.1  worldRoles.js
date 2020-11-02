const outerHarvester = require("./1.1.0.1.0  outerHarvester")
const outerHauler = require("./1.1.0.1.1  outerHauler")
const logger = require("./logger")

var worldRoles = {
    init: function () {
        logger.trace("\t\t\tworldRoles.init()")
        outerHarvester.init()
        outerHauler.init()
    },
    run: function () {
        logger.trace("\t\t\tworldRoles.run()")
    }
}

module.exports = worldRoles