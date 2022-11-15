const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

//EXPRESS HANDLES ROUTES LIKE WATERFALL
//we define our first route
//we specify what http method we want
// ^/$ | index.(html)?  means: this must begin with / and it must end with / or /index.html  -> (.html)? means that .html is optional
app.get("^/$|index(.html)?", (req, res) => {
  // res.sendFile("./views/index.html",{root: __dirname})  //1. varianta: in root we define exactly where we can find views file(where we can find index.html)
  res.sendFile(path.join(__dirname, "views", "index.html")); //2.varianta
});
// if express does not find the page, the express automatically sets the correct status code and content type
app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});
//REDIRECT
app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html"); //-> there is one thing missing: response code->one will be send by default-302, but we want 301, so we need to specify at the beggining of redirect
});

// ROUTE handlers
  //1. varianta - chaining
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next()   //calls next function in the chain
  },
  (req, res) => {
    res.send("Hello World");
  }
);
  //2. varianta: functions
const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req,res,next) => {
    console.log("two")
    next()
}
const three = (req,res) => {
    console.log("three")
    res.send("Finished")
}

app.get("/chain(.html)?",[one,two,three])


//AT THE END OF THE ROUTES, WE NEED TO PUT DEFAULT - CATCH ALL
app.get("/*", (req, res) => {
  //     "/*"- means select all
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  // express will send costum 404, even if dont we supply it
  //but we want to send our constum 404 page
  // we need to chain in the status code manually, because its going to be
});

app.listen(PORT, () => {
  console.log(`Server runnin on post ${PORT}`);
});

