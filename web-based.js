var http=require("http");

http.createServer(function(req,res){
    res.writeHead(200, {'Content-type':'text/plain'});
    res.end("Welcome to NodeJS");
}).listen(8080);

console.log('server is running');

//200: Success
//300: Redirection
//400 :Client error