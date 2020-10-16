const { zeroMean } = require("./util")
var obj = {
    a: 3,
    b: 4,
    d: 5,
}

console.log(obj)
var o = zeroMean(obj, 1)
console.log(obj)
console.log(o)