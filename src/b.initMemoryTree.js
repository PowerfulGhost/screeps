var initMemoryTree = {
    run: function () {
        console.log("rewite memory tree")
        this._rewite(Memory, this.memoryTreeStructure)
        console.log("memory tree rewitten")
    },
    _rewite: function (node, stru) {
        if (!_.isEmpty(stru)) {
            for (var name1 in node) {
                if (_.isUndefined(stru[name1])) {   // node exists in memory tree but not in the blueprint
                    delete node[name1]           // trim the node off
                    console.log(Object.keys(stru))
                    console.log(name1 + " deleted")
                }
            }
        }
        for (var name2 in stru) {
            if (_.isUndefined(node[name2])) {  // when there is no corrsponding node in memory tree
                node[name2] = stru[name2]     // append new empty node(and its subtree) in memory tree
            }
            else {
                if (_.isEmpty(stru[name])) {   // leaf node
                    // do nothing
                }
                else {
                    this._rewite(node[name2], stru[name2])    // enter next layer
                }
            }
        }
    },
    memoryTreeStructure: {
        creeps: {
            workers: {},
            worriers: {},
            others: {},
        },
        rooms: {
            structures: {
                spawns: {},
            },
            terrain: {
                sources: {},
            },
        },
        flags: {}
    }
}
module.exports = initMemoryTree