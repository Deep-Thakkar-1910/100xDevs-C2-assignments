const fs = require("fs");

const promise = new Promise((resolve, reject) => {
  fs.readFile("./readfile.txt", "utf-8", (err, data) => {
    if (err) reject(new Error("Invalid file"));
    else resolve(data);
  });
});

promise
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err.message);
  });

for (let i = 0; i < 1000000; i++) {}
