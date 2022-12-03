const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/empoyeesController");
const verifyJWT = require("../../middleware/verifyJWT");


router
  .route("/")
  .get(verifyJWT, employeesController.getAllEmpoyees)
  //with a post request we are gonna add a new employee
  .post(employeesController.createNewEmployee)
  // updating employee
  .put(employeesController.updateEmployee)
  //deleting employee
  .delete(employeesController.deleteEmployee);
//we could have the parameter directly in the url
router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
