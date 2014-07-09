var http = require('http');
var express = require('express');
var app = express();

//Using only the static server
app.use(express.static('./public'));


//Catch all routes send to index.html
app.get('/*', function(req, res) {
    res.sendfile('./public/index.html');
});


http.createServer(app).listen(3001, function() {
    console.log('HospitalNet started on Port 3001');
});