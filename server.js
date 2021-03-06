const http = require("http");
const os = require("os");
const fs = require("fs");
const host = "127.0.0.1";
const port = 5001;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Access-Control-Allow-Origin", "*");
  //  res.writeHead = 200;
  let path = "./pages/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/sys":
      path += "sys.html";
      res.statusCode = 201;
      break;
    default:
      path += "404.html";
      // res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead = 404;
      res.write("Error: File not found");
    } else {
      res.write(data);
    }
    res.end();
  });

  const data = {
    hostname: os.hostname(),
    platform: os.platform(),
    architecture: os.arch(),
    numberOfCPUS: os.cpus(),
    networkInterfaces: os.networkInterfaces(),
    uptime: os.uptime(),
  };
  fs.writeFile("osinfo.json", JSON.stringify(data), (err, res) => {
    // res.statusCode(200);
    // res.setHeader("Content-Type", "text/plain");
    if (err) {
      console.log(err);
    } else {
      console.log("Your OS info has been saved successfully!");
    }
  });
});
server.listen(port, host, () => {
  console.log(`Server running at ${host}:${port}`);
});
