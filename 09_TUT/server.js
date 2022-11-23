const exp = require("constants");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const {logger} = require("./middleware/logEvents")
const errorHandler = require("./middleware/errorHandler")
const PORT = process.env.PORT || 3500;

//CUSTOM MIDDLEWARE LOGGER
app.use(logger)


app.use(cors(corsOptions))   //cors()-> means our backend is open to anyone - thats why u need a whitelist and corsOptions

//1. WE NEED TO BUILT-IN MIDDLEWARE TO HANDLE URLENCODED DATA
app.use(express.urlencoded({extended:false})) //

//2. BUILT-IN MIDDLEWARE FOR JSON
app.use(express.json())
//app.use we often use to apply middleware to all routes that are coming in
//just like HTTP methods(get,post,delete...) this all work as a waterfall
//this middleware its for handling urlencoded data (form data) -> what comes in the url, then we can put data aout as a parameter
//built- in middleware for json(this is for json, not for form data(if json data is submited we need to be able to get those parameters or data))

//3. SERVE STATIC FILES
app.use("/",express.static(path.join(__dirname,"/public")))


//WE NEED TO PROVIDE A ROUTES
app.use("/",require("./routes/root"))
app.use("/employees",require("./routes/api/employees"))


app.all("*", (req, res) => {
  res.status(404)
  if(req.accepts("html")){
    res.sendFile(path.join(__dirname,"views","404.html"))
  }
  else if(req.accepts("json")){
    res.json({error: "404 Not Found"})
  }
  else{
    res.type("txt").send("404 Not Found")
  }
});
//costum error handling
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server runnin on post ${PORT}`);
});