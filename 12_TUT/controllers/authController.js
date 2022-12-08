const User = require("../model/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const handleLogin = async (req, res) => {
  //we expect to get user and password
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  const foundUser = await User.findOne({username:user}).exec()
  if (!foundUser) {
    return res.sendStatus(401); //status code 401 means UNAUTHORIZED
  }
  //IF WE FIND USER WE NEED TO EVALUATE PASSWORD
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      { UserInfo: { username: foundUser.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //SAVING REFRESH TOKEN WITH CURRENT USER
   foundUser.refreshToken = refreshToken
   const result = await foundUser.save()
   console.log(result)

    //The res.cookie() function is used to set the cookie name to value. The value parameter may be a string or object converted to JSON.
    //res.cookie(name, value [, options])

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: false,   //when production we have to set secure:true
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};
module.exports = { handleLogin };
