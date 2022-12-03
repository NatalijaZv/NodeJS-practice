const usersDB = {
    users: require("../model/users.json"),
    setUsers: function (data) {
      this.users = data;
    },
  };
  const jwt = require("jsonwebtoken");
  require("dotenv").config();
  const path = require("path");
  
  const handleRefreshToken =  (req, res) => {
    //we wont be loking for password , but we will be looking for a cookies
    const cookies = req.cookies
    //here we are checking if we have cookie, if we have it, we also check it if there is jwt property
    if (!cookies?.jwt) {
      return res.sendStatus(401)   
    }
  
    const refreshToken = cookies.jwt

    const foundUser = usersDB.users.find((person) => person.refreshToken === refreshToken);
    if (!foundUser) {
      return res.sendStatus(403); //Forbidden
    }
    //EVALUATE JWT
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err || foundUser.username !== decoded.username){
                return res.sendStatus(403)
            }
            const accessToken = jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:"30s"}
            )
            res.json({accessToken})
        }
    )}

  module.exports = { handleRefreshToken };
  