const fs =  require('fs');

const content =  "Hello world!"

fs.writeFile("./writefile.txt", content,err=>{
if(err)console.log(err);
});