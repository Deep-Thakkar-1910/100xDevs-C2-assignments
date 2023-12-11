const fs = require('fs');
const { resolve } = require('path');

const promise = new Promise((resolve,reject)=>{fs.readFile("./cleanme.txt", "utf-8", (err, data) => {
    if (err) reject(new Error("Invalid file"));
    else resolve(data);
  });
});

promise.then(function (data) {
    newData=data.toString().replace(/\s+/g," ");
    return newData;
}).then(function (data) {
    fs.writeFile("./cleanme.txt",data,err=>{
        if(err)console.log(err);
    })
})