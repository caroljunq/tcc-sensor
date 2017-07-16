var http = require('http');
var fs = require('fs');
var people = require('./app/js/app.js');

function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./app/index.html', null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found!');
        } else {
            response.write(data);
            // response.write(people);
        }
        response.end();
    });
}

people.numPeople('output.txt');

http.createServer(onRequest).listen(8080);
