var struTower = {
    /** @param {StructureTower} tower */
    run: function (tower) {
        // state transition
        if (_.isUndefined(tower.memory.state)) tower.memory.state = "repair"
        if (tower.memory.state == "repair") {
            enemies = tower.room.find(FIND_HOSTILE_CREEPS)
            if (enemies.length > 0) {
                tower.memory.state = "attack"
                console.log("tower" + tower.id + " attacking")
            }
        }
        if (tower.memory.state == "attack") {
            enemies = tower.room.find(FIND_HOSTILE_CREEPS)
            if (enemies.length == 0) {
                tower.memory.state = "repair"
                console.log("tower" + tower.id + " repairing")
            }
        }

        // working logic
        if (tower.memory.state == "repair") {
            var structure = tower.pos.findClosestByRange(FIND_STRUCTURES,
                {
                    filter: function (obj) {
                        return obj.structureType != STRUCTURE_WALL && obj.hits < obj.hitsMax
                    }
                })
            tower.repair(structure)
        }
        if (tower.memory.state == "attack") {
            var enemy = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
            tower.attack(enemy)
        }
    }
}

module.exports = struTower