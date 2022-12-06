const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/empoyeesController");
const ROLES_LIST = require("../../config/roles_list")
const verifyRoles = require("../../middleware/verifyRoles")
const verifyJWT = require("../../middleware/verifyJWT");


router
  .route("/")
  .get( employeesController.getAllEmpoyees)
  //with a post request we are gonna add a new employee
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
  // updating employee
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),employeesController.updateEmployee)
  //deleting employee
  .delete(verifyRoles(ROLES_LIST.Admin),employeesController.deleteEmployee);
//we could have the parameter directly in the url
router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
