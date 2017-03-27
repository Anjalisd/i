var express = require('express');
var router = express.Router();
var PatientsRoute = require("./patients");

var DentistsRoute = require("./dentists");
var AppointmentsRoute = require("./appointments");
var AdminUsersRoute =require("./adminUsers");
//var RegiRoute = require("./registers");


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.use("/patients", PatientsRoute);
router.use("/dentists", DentistsRoute);
router.use("/appointments", AppointmentsRoute);
router.use("/adminUsers", AdminUsersRoute);

module.exports = router;
