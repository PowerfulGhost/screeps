//通过creep的body数组计算其spawn成本
function calcCreepCost(body) {
    var cost = 0
    for (var i in body) {
        var part = body[i]
        cost += BODYPART_COST[part]
    }
    return cost
}
module.exports = { calcCreepCost }