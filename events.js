var fs= require('fs');  //file system core module/this line imports the build in node module fs

var rs=fs.createReadStream('./hello.txt');

rs.on('open',function(){                  //open is the event and on is the method will listen to the event
                                          //call back function is executed
    console.log('The file is opened by me');
});
