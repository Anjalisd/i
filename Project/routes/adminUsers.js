var express = require('express');
var router = express.Router();
var AdminUsersCtrl = require("./../app/controller/adminUsers");
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

router.get('/', AdminUsersCtrl.getAllAdmins);
// router.get('/:id', DentistCtrl.getdentistDetails);
router.post('/', AdminUsersCtrl.addAdmin);
router.post('/adminLogin', AdminUsersCtrl.logIn);
router.get('/checklogin',passport.authenticate('bearer', { session: false }),AdminUsersCtrl.checklogin);

// router.post('/:id', DentistCtrl.updateDentist);
router.delete('/:id', AdminUsersCtrl.deleteAdmin);

module.exports = router;