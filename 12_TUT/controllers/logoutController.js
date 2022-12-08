const User = require("../model/User") 
const handleLogout = async (req, res) => {
  //On client also delete the access token - we can do that on the backend, we need to do that in the memory of the client app
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }
  const refreshToken = cookies.jwt;
  // is refresh token in DB?
  const foundUser = await User.findOne({refreshToken}).exec()
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite:"None",secure:true });
    return res.sendStatus(204);
  }
  //Delete refresh token in db
  foundUser.refreshToken = ""
  const result = await foundUser.save()
  console.log(result)
  res.clearCookie("jwt", {httpOnly:true, sameSite:"None",secure:true}) 
  res.sendStatus(204)
};

module.exports = { handleLogout };
