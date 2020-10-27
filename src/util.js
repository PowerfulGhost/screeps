//通过creep的body数组计算其spawn成本
function calcCreepCost(body) {
    var cost = 0
    for (var i in body) {
        var part = body[i]
        cost += BODYPART_COST[part]
    }
    return cost
}
function getMinAndIndex(arr) {
    var min = Number.POSITIVE_INFINITY
    var index = -1
    for (var i in arr) {
        if (arr[i] < min) {
            min = arr[i]
            index = i
        }
    }
    return { min: min, index: index }
}
module.exports = {
    calcCreepCost,
    getMinAndIndex
}