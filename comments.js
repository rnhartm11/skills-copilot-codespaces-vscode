// create web server
// 1. load http module
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
// 2. create server
http.createServer(function(req, res) {
    var uri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(), uri);
    console.log('filename: ' + filename);
    var extname = path.extname(filename);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
        case '.mp3':
            contentType = 'audio/mp3';
            break;
    }
    fs.exists(filename, function(exists) {
        if (!exists) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Not Found\n');
            res.end();
            return;
        }
        if (fs.statSync(filename).isDirectory()) filename += '/index.html';
        fs.readFile(filename, 'binary', function(err, file) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write(err + '\n');
                res.end();
                return;
            }
            res.writeHead(200, { 'Content-Type': contentType });
            res.write(file, 'binary');
            res.end();
        });
    });
}).listen(8124);
console.log('Server running at http://