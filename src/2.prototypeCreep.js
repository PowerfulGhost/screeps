// Creep原型扩展
var prototypeCreep = {
    run: function () {
        //获得指定类型的身体部件的数量
        Creep.prototype.getBodypartNum = function (bodypartType) {
            count = 0
            for (var i in this.body)
                if (this.body[i].type == bodypartType) count += 1
            return count
        }
        
    }
}

module.exports = prototypeCreep