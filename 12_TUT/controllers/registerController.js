const User = require("../model/User")
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  //when we first pull this information in, the request is going to have user and password
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  //check for duplicate username in the db in our mongoDB
  // we need to get duplicate from out User module
  const duplicate = await User.findOne({username:user}).exec()    //we need to call .exec -> because we use async and await 
  if (duplicate) {
    return res.sendStatus(409); //HTTP status code 409 stands for CONFLICT
  }
  //we need to create new user using bcrypt to hash the password
  try {
    //ENCRYPT PASSWORD USING bcrypt
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //create and store the new user
    //1.varianta (najhitrejša)
    const result = await User.create({
      "username": user,
      "password": hashedPwd
    });
    //2.varianta
    // const newUser = new User({
    //   "username": user,
    //   "password": hashedPwd
    // }) 
    // const result = await newUser.save()
 console.log(result)

    res.status(201).json({"success":`New user ${user} created`})
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {handleNewUser}
