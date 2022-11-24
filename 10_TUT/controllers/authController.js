const usersDB = {
    users: require("../model/users.json"),
    setUsers: function (data) {
      this.users = data;
    },
  };
  const bcrypt = require("bcrypt")
  const handleLogin = async (req,res)=>{
      //we expect to get user and password 
    const { user, pwd } = req.body;
    if (!user || !pwd) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    const foundUser = usersDB.users.find(person => person.username === user)
    if(!foundUser){
        return res.sendStatus(401);  //status code 401 means UNAUTHORIZED
    }
    //IF WE FIND USER WE NEED TO EVALUATE PASSWORD
    const match = await bcrypt.compare(pwd, foundUser.password)
    if(match){
        //create JWTs
        res.json({"success":`User ${user} is logged in`})
    }
    else{
        res.sendStatus(401)
    }
  }
  module.exports = {handleLogin}