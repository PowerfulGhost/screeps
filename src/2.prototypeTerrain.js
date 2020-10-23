var prototypeTerrain = {
    run:function(){
        this._source()
    },
    _source:function(){
        //给Source定义memory属性
        Object.defineProperty(Source.prototype, "memory", {
            configurable:true,
            get:function(){
                if(_.isUndefined(this.room.memory["sources"]))
                    this.room.memory["sources"] = {}
                if(_.isUndefined(this.room.memory.sources[this.id]))
                    this.room.memory.sources[this.id] = {}
                return this.room.memory.sources[this.id]
            },
            set:function(value){
                if(_.isUndefined(this.room.memory["sources"]))
                    this.room.memory["sources"] = {}
                if(_.isUndefined(this.room.memory.sources[this.id]))
                    this.room.memory.sources[this.id] = {}
                this.room.memory.sources[this.id] = value
            }
        })
    }
}
module.exports = prototypeTerrain