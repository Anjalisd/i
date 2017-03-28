var express = require('express');
var router = express.Router();
var AppointmentsCtrl = require("./../app/controller/appointments");
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

router.get('/', passport.authenticate('bearer', { session: false }),AppointmentsCtrl.getAllAppointments);
router.post('/', AppointmentsCtrl.addAppointment);
router.delete('/:id', AppointmentsCtrl.deleteAppointment);
router.get('/myAppointments/:id',AppointmentsCtrl.logUser);
// router.get('/:id', AppointmentsCtrl.getappointmentDetails);
// router.post('/:id', AppointmentsCtrl.updateAppointment);
module.exports = router;