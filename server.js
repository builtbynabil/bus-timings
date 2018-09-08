var path = require("path");
var express = require("express");
var app = express();
var port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname,"website")));

app.listen(port,function(){
    console.log("Listening");
    
})