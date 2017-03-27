var express = require('express');
var router = express.Router();
var DentistCtrl = require("./../app/controller/dentists");
//var PdentistsCtrl = require("./../app/controller/registers");
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

router.get('/', DentistCtrl.getAllDentistsinfo);
router.get('/:id', DentistCtrl.getdentistDetails);
router.post('/', DentistCtrl.addDentist);

router.post('/:id', DentistCtrl.updateDentist);
router.delete('/:id', DentistCtrl.deleteDentist);

module.exports = router;