const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");
class Emitter extends EventEmitter {}
//initialize object
const myEmitter = new Emitter();

//add listener for the log event
myEmitter.on("log", (msg, fileName) => logEvents(msg, fileName)); // on means in listening

//DEFINING A PORT FOR WEB SERVER

const PORT = process.env.PORT || 3500; //we will use 3500, if we would host this somewhere we would use process.env.PORT, and it would be different value

//SERVE FUNCTION
const serveFile = async (filePath, contentType, response) => {
  try {
    //problem is, that img does not load correctly because of utf8 encoding, so we need do check if content type is img
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes("image") ? "utf8" : ""
    );
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
      "Content-Type": contentType,
    });
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (err) {
    console.log(err);
    myEmitter.emit("log", `${err.name}: ${err.message}`, "errLog.txt");
    response.statusCode = 500;
    response.end();
  }
};

//CREATE HTTP SERVER

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");

  //1. method (not efficient - we will have a statemend for every adress that came in and for every file)
  // if(res.url === "/" || res.url === "index.html"){
  //     res.statusCode = 200
  //     res.setHeader("Content -Type", "text/html")  //setting header of http response
  //     //response.setHeader(name, value)
  //     //  name <String>: It accepts the name of the header and it is case-insensitive.
  //     //  value <any>: It can accept any values like objects, string, integer, Array, etc.
  //     path= path.join(__dirname,"views","index.html")
  //     fs.readFile(path,"utf8",(err,rawData)=>{
  //         res.end(rawData)
  //     })
  // }
  //2. method, problem is that its not dynamic, just like 1. method
  //   switch (req.url) {
  //     case "/":
  //       res.statusCode = 200;
  //       path = path.join(__dirname, "views", "index.html");
  //       fs.readFile(path, "utf8", (err, rawData) => {
  //         res.end(rawData);
  //       });
  //       break;
  //   }
  //returns extension of files example: path.extname("index.html"); return: .html

  const extension = path.extname(req.url);
  let contentType;
  //we will set the contentType using switch statement
  //there are several posibilities for file extensions
  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
    default:
      contentType = "text/html";
  }
  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);
  // if there is no extensions and the last caracter in req.url is not /
  // this statement makes .html extension not required in the browser
  if (!extension && req.url.slice(-1) !== "/") {
    filePath += ".html";
  }
  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    //if file exists we will serve the file
    serveFile(filePath, contentType, res);
    console.log("File exists");
  } else {
    // error : 404 or 301 redirect
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        //serve a 404 response
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});
//SERVER STILL NEEDS TO LISTEN FOR REQUEST
server.listen(PORT, () => {
  console.log(`Server runnin on post ${PORT}`);
});


