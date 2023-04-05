const fs = require("fs");

fs.readFile("./1.txt", (err, data) => {
  if(err) throw err;
  console.log(data.toString());
})