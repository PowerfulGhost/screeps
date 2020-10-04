var struSource = {
    /** @param {Source} source */
    run: function (source) {
        for (var name in Game.rooms) {
            var room = Game.rooms[name]
            var sources = room.find(FIND_SOURCES)
            for (var sourceName in sources) {
                var source = sources[sourceName]
                if (source.memory.harvester) {
                    var harvester = Game.getObjectById(source.memory.harvester)
                    if (!harvester) {
                        source.memory.harvester = null
                    }
                }
            }
        }
    }
}

module.exports = struSource