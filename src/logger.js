var logger = {
    _loggerSelection: ["trace", "debug", "info", "warn", "error", "fatal"],
    trace: function (info) {
        if (this._loggerSelection.includes("trace"))
            console.log("[ TRACE ] :" + info)
    },
    debug: function (info) {
        if (this._loggerSelection.includes("debug"))
            console.log("[ DEBUG ] :" + info)
    },
    info: function (info) {
        if (this._loggerSelection.includes("info"))
            console.log("[ INFO ]  :" + info)
    },
    warn: function (info) {
        if (this._loggerSelection.includes("warn"))
            console.log("[ WARN ]  :" + info)
    },
    fatal: function (info) {
        if (this._loggerSelection.includes("fatal"))
            console.log("[ FATAL ] :" + info)
    }
}

module.exports = logger