const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  //when we first pull this information in, the request is going to have user and password
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  //check for duplicate username in the db (in our example we uses our .json file to simulate db)
  const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate) {
    return res.sendStatus(409); //HTTP status code 409 stands for CONFLICT
  }
  //we need to create new user using bcrypt to hash the password
  try {
    //ENCRYPT PASSWORD USING bcrypt
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //store the new user
    const newUser = {
      "username": user,
      "roles":{"User":2001},
      "password": hashedPwd,

    };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users)
    res.status(201).json({"success":`New user ${user} created`})
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {handleNewUser}
