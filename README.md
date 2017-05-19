# express-handling


### Using Standard Processing

If you wish for all promises to be handled as an API response, simply call standardProcessing on the response variable, passing in the 
promise that is to be handled.

```js
router.get('/', function(req, res){
  var modelCall = new Promise(function(resolve, reject){
      return resolve(new AdapterResult(200, { data: "some data" }));
  });
  res.standardProcessing(modelCall);
});

```

### Success
When a promise resolves, it is treated as success with a default code of 200.

### Failure
When a promise rejects, it is treated as a failure with a default code of 400.


**Simple data**
If simple data is returned from the promise, it will be returned with the default status code
```js
var modelCall = new Promise(function(resolve, reject){
    return resolve("Your name is Jim");
});

res.standardProcessing(modelCall);
```

```js
var modelCall = new Promise(function(resolve, reject){
    return resolve({ name: "Jim" });
});

res.standardProcessing(modelCall);
```


**Changing the status**
To return a specific status code, use the AdapterResult class, passing in the status code and object to return.

```js
router.get('/', function(req, res){
  var modelCall = new Promise(function(resolve, reject){
      return resolve(new AdapterResult(202, { data: "some data" }));
  });
  res.standardProcessing(modelCall);
});
