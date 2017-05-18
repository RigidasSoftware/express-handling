function AdapterResult(code, data){

    this.code = code;
    this.hasCode = function(){
        return !!this.code;
    };
    this.data = data;

    this.redirect = '';
    this.isRedirect = function(){
        return !!this.redirect;
    }
} 
AdapterResult.redirect = function(page){
    var result = new AdapterResult();
    result.redirect = page;
    return result;
}

module.exports = AdapterResult;