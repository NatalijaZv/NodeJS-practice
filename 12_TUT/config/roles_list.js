//Here we are going to create user roles (this could be in data table in DB)
//User premissions can be constructed in an assortment of ways and we are going to apply simple structure today with three different user roles

const ROLES_LIST = {            //Keys are the names of the roles
"Admin":5150,
"Editor": 1984,
"User":2001
}

module.exports = ROLES_LIST