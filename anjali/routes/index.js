var express = require('express');
var router = express.Router();
var PatientsRoute = require("./patients");

var DentistsRoute = require("./dentists");
//var RegiRoute = require("./registers");


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.use("/patients", PatientsRoute);
router.use("/dentists", DentistsRoute);

module.exports = router;
