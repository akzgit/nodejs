//asynchronous write to a file

const fs =require('fs');

fs.writeFile('sample.txt','Asynchronous write to a file',err=>{
    if(err){
        console.log(err);
    }
    console.log('written');
})

//append
fs.appendFile('sample.txt',"whenever writing to an exsting file, always use appendFile().",
err=>{
    if(err){
        console.log(err);
        }
    console.log('append successfully');    
});

fs.readFile('sample.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log('File contents:', data);
});

