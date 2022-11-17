const express = require("express");
const router = express.Router();
const path = require("path");
const { route } = require("../subdir");
const data = {};
data.employees = require("../../data/employees.json");

router
  .route("/")
  .get((req, res) => {
    res.json(data.employees);
  })
  //with a post request we are gonna add a new employee
  .post((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  // updating employee
  .put((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  //deleting employee
  .delete((req, res) => {
    res.json({ id: req.body.id });
  });
//we could have the parameter directly in the url
router.route("/:id").get((req, res) => {
  res.json({ id: req.params.id });
});

module.exports = router;
