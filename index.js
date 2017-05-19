var http = require('http'),
    AdapterResult = require('./adapter-result');


http.ServerResponse.prototype.success = function(message, code){
    code = code || 200;

    if(typeof message === "boolean" || message){
        
        if(message.constructor && message instanceof AdapterResult){
            if(message.hasCode()){
                code = message.code;
            }
            message = message.data;
        }
        this.status(code).json(message);
    }
    else {
        this.sendStatus(code);
    }
    return this;
}

http.ServerResponse.prototype.failure = function(message, code){

    if(message.stack){
        message = message.message;
    }

    this.success(message, code || 500);
    return this;
}

http.ServerResponse.prototype.standardProcessing = function(func) {
    var self = this;

    if(func instanceof Promise){

        promise.then(function(result){
            return self.success(result);
        }, function(error){
            return self.failure(error);
        });

    }
    else if (func instanceof Function) {
        try {
            return self.success(func());
        }
        catch (e) {
            return self.failure(e);
        }
    }
    else {
        return self.success(func);
    }

};

function globalHandler(err, req, res, next){
    res.failure(err);
}

var AdapterResult = require('./adapter-result');

module.exports = {
    AdapterResult,
    globalHandler
}