function getMaxIndex(arr) {
    var max = arr[0]
    var maxIndex = 0
    for (var i in arr) {
        if (arr[i] > max) {
            max = arr[i]
            maxIndex = i
        }
    }
    return maxIndex
}
function getMinIndex(arr) {
    var min = arr[0]
    var minIndex = 0
    for (var i in arr) {
        if (arr[i] < min) {
            min = arr[i]
            minIndex = i
        }
    }
    return minIndex
}
function zeroMean(obj, maxAbs) {
    var sum = 0
    var N = 0
    for (var index in obj) {
        sum += obj[index]
        N += 1
    }
    var mean = sum / N
    var max = 0
    var ret = {}
    for (var index in obj) {
        ret[index] = obj[index] - mean
        if (Math.abs(ret[index]) > max)
            max = Math.abs(ret[index])
    }
    var scaleRatio = maxAbs / max
    for (var index in ret) ret[index] *= scaleRatio
    return ret
}

module.exports = { getMaxIndex, getMinIndex, zeroMean }