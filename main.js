//web based node js example
var http= require('http');

//create server
http.createServer(function(request,response){
    //sending the http header with a http status code 200, content-type:text/plain
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.end('Working in NodeJS. It is a web based example.\n');

}).listen(8080);

console.log('Server is running on port 8080');