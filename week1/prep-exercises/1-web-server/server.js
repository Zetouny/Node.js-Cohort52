/**
 * Exercise 3: Create an HTTP web server
 */

const http = require("http");
const fs = require("fs");

let server = http.createServer(function (req, res) {
  let filePath = `.${req.url}`;
  if (filePath === "./favicon.ico") return; // I had to prevent this buggy thing!!

  if (filePath === "./") {
    filePath = "./index.html";
    res.setHeader("Content-Type", "text/html");
  }

  if (filePath === "./index.js") {
    res.setHeader("Content-Type", "text/javascript");
  }

  if (filePath === "./style.css") {
    res.setHeader("Content-Type", "text/css");
  }

  const readFile = fs.readFileSync(filePath, "utf8", (error, data) => {
    if (error) {
      return console.log(error);
    }
    return data;
  });

  res.write(readFile);
  res.end();
});

server.listen(3000); // The server starts to listen on port 3000
