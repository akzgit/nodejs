const fs =require('fs');  //require is a directive which is used to load the node js modules.
const filepath = 'sample.txt';

//read the file
fs.readFile(filepath,{encoding:'utf8'},(err,data)=>{
     //print the content in the file
     console.log(data);
});





//calculate the sum of n numbers
function add(n){
var res=0;
for(var i=1;i<n;i++){
    res=res+i
}

return res;

}

console.log(add(1000000000))