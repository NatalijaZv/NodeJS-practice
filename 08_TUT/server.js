const exp = require("constants");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors")
const {logger} = require("./middleware/logEvents")
const errorHandler = require("./middleware/errorHandler")
const PORT = process.env.PORT || 3500;

//CUSTOM MIDDLEWARE LOGGER
app.use(logger)

//Cross Origin Resource Sharing
const whitelist = ["https://www.mypage.si", "http://127.0.0.1:5500","http:localhost:3500"]   //live server always runs on port: https://127.0.0.1:5500
//after development we should leave out "http://127.0.0.1:5500","http:localhost:3500" and leave our domain
//we created a list that is allowed to acces the backend that cors wont prevent -> we have to create the function that will allow the cors to do this:
// and this is all contained in cors options
const corsOptions = {
  origin: (origin,callback)=>{  // origin excepts a function  (origin, callback) - origin coming from whoever requested it
    if(whitelist.indexOf(origin) !== -1 || !origin){     
      callback(null,true)
    }
    else{
      callback(new Error("Not allowed by CORS"))
    }
  },
  optionSuccessStatus:200     
}
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
app.use("/subdir",express.static(path.join(__dirname,"/public")))

//WE NEED TO PROVIDE A ROUTES
app.use("/",require("./routes/root"))
app.use("/subdir",require("./routes/subdir"))
app.use("/empoyees",require("./routes/api/employees"))


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