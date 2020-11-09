var logger = {
    _loggerSelection: ["trace", "debug", "info", "warn", "error", "fatal"],
    _loggerDisplayDomain: [null, "init", "run"],
    trace: function (info, domain = null) {
        if (this._loggerSelection.includes("trace") && this._loggerDisplayDomain.includes(domain))
            console.log("[ TRACE ] :" + info)
    },
    debug: function (info, domain = null) {
        if (this._loggerSelection.includes("debug") && this._loggerDisplayDomain.includes(domain))
            console.log("[ DEBUG ] :" + info)
    },
    info: function (info, domain = null) {
        if (this._loggerSelection.includes("info") && this._loggerDisplayDomain.includes(domain))
            console.log("[ INFO ]  :" + info)
    },
    warn: function (info, domain = null) {
        if (this._loggerSelection.includes("warn") && this._loggerDisplayDomain.includes(domain))
            console.log("[ WARN ]  :" + info)
    },
    fatal: function (info, domain = null) {
        if (this._loggerSelection.includes("fatal") && this._loggerDisplayDomain.includes(domain))
            console.log("[ FATAL ] :" + info)
    }
}

module.exports = logger