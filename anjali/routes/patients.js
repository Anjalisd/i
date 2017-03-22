var express = require('express');
var router = express.Router();
var PatientsCtrl = require("./../app/controller/patients");
//var PatientsCtrl = require("./../app/controller/registers");
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var jsonwebtoken = require('jsonwebtoken');

passport.use(new Strategy(
  function(token, callback) {
	jsonwebtoken.verify(token, 'shhhhh', function(err, decoded) {
		if(err){
			console.log(err);
			callback('Invalid token');
		}else{
			console.log(decoded)
			callback(false,decoded);
		}
	});
}));

router.get('/',passport.authenticate('bearer', { session: false }),PatientsCtrl.getAllPatientsinfo);
//router.get('/:id',passport.authenticate('bearer', { session: false }),PatientsCtrl.getPatientDetails);
router.get('/myProfile',passport.authenticate('bearer', { session: false }),PatientsCtrl.loggedUser);
router.post('/', PatientsCtrl.addPatient);
router.post('/login', PatientsCtrl.logIn);
router.post('/:id', PatientsCtrl.updatePatient);
router.delete('/:id', PatientsCtrl.deletePatient);


module.exports = router;