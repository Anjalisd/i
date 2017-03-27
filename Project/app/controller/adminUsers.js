var adminUsers = require("./../model/adminUsers");
var jsonwebtoken = require('jsonwebtoken');


exports.getAllAdmins = function(req, res){
 adminUsers.find({}).exec(function(err, adminUsers){  
   if(err){
      res.json({code: 400, message: "Error occurred while fetching users"});
     }else if(adminUsers && adminUsers.length)
      {

  res.json({code: 200, data: adminUsers})
     }else{

  res.json({code: 404, message: "No records found"})
      }


  
});

}
exports.addAdmin = function(req, res){
  var adminUser = new adminUsers(req.body);
  adminUser.save(function(err){
     if(err){ res.json({code: 404, message: "" }) }
     else{
       res.json({code: 200, data: adminUser })
      }


      console.log("ok");
  });
 }   
 exports.deleteAdmin = function(req, res){
 // console.log("updatedentistsinfo", req.params.id, req.body); 

 adminUsers.remove({_id: req.params.id}).exec( function(err, adminUsers){ 
    if(err){ res.json({code: 404, message: err}) }
     else{
       res.json({code: 200, message:"admin deleted" ,data: adminUsers })
      }
  })


}
exports.checklogin= function(req,res){
  res.json({code: 200, message: "auth"});
}
exports.logIn = function(req, res){
console.log("hello anji");
adminUsers.findOne({"username":req.body.username,"password":req.body.password}).exec(function(err, adminUser){  
        
                   if (adminUser){
          var payload = {
                id: adminUser._id
            };
        
        console.log(payload);
        var token = jsonwebtoken.sign(payload, 'shhhhh');
        //userinfo is the Payload
        //2nd is the secret key
        //3rd is options then we can give a callback if required
        console.log(token);
        // return the information including token as JSON
        res.json({
            code: 200,
            message: 'Succesfully Logged in',
            data: {
                token: token
            }
        });

     }else {
        res.json({
            code: 404,
            message: "Check Credentials"
        });
    }
});
}
