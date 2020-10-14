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

module.exports = {getMaxIndex, getMinIndex}