var patients = require("./../model/patients");
var appointmentsModel = require("./../model/appointments");
var jsonwebtoken = require('jsonwebtoken');

exports.addPatient = function(req, res){
  var patient = new patients(req.body);
   // var contact = req.body.contact;
   //  var username= req.body.username;
   //  var password = req.body.password;
    //  var age = req.body.age;
     //  var city = req.body.city;
    //   if(req.body.username && req.body.contact && req.body.age&&req.body.city && req.body.
    //     password){

    //   if(!req.body.contact.toString().match(/^[0-9]{10}$/g)){
    //   var response ={
    //         code: 400,
    //         message: "Contact number is not a valid no.",
          
    //     }
    //     else if (!req.body.password.toString().match(/^[a-z]{6}$/g)) 
    // var response ={
    //         code: 400,
    //         message: "password must have all the lower case letters and ",
          
    //     }}
    //      
    //    
    
  patient.save(function(err){
     if(err){ res.json({code: 404, message: "" }) }
     else{
       res.json({code: 200, data: patient })
      }


      console.log("ok");
  })  


}
exports.addAppointment = function(req, res){
  var appointment = new appointmentsModel(req.body);
  appointment.save(function(err){
      patients.update({_id: req.user.id}, {$push:{appointments:appointment}}, function(err, patients){ 
    if(err){ res.json({code: 404, message: err}) }
     else{
       res.json({code: 200, data: patients })
      }
  })
  })  


}

exports.getAllPatientsinfo = function(req, res){
patients.find({}).exec(function(err, patients){  
   if(err){
      res.json({code: 400, message: "Error occurred while fetching patients"});
     }else if(patients && patients.length)
      {

  res.json({code: 200, data: patients})
     }else{

  res.json({code: 404, message: "No records found"})
      }
  
});

}
exports.checklogin= function(req,res){
  res.json({code: 200, message: "auth"});
}

exports.loggedUser = function(req, res){
var id = req.user.id;
patients.findById({"_id":id}).populate('appointments').exec(function(err, sd){  
   if(err){
      res.json({code: 400, message: "Error occurred while fetching patient 2222"});
     }else if(patients && patients.length)
      {

        res.json({code: 200, data: sd})
     }else{

         res.json({code: 404, message: "No records found"})
      }


  
});

}

exports.getPatientDetails = function(req, res){
var id = req.params.id;
patients.find({"_id":id}).exec(function(err, sd){  
   if(err){
      res.json({code: 400, message: "Error occurred while fetching patient"});
     }else if(patients && patients.length)
      {

        res.json({code: 200, data: sd})
     }else{

         res.json({code: 404, message: "No records found"})
      }


  
});

}





exports.updatePatient = function(req, res){
  console.log("updatepatientsinfo", req.params.id, req.body); 

 patients.update({_id: req.params.id}, { $set: req.body }, function(err, patients){ 
    if(err){ res.json({code: 404, message: err}) }
     else{
       res.json({code: 200, data: patients })
      }
  })
}
exports.deletePatient = function(req, res){
 // console.log("updatepatientsinfo", req.params.id, req.body); 

 patients.remove({_id: req.params.id}).exec( function(err, patients){ 
    if(err){ res.json({code: 404, message: err}) }
     else{
       res.json({code: 200, message:"patient deleted" ,data: patients })
      }
  })


}
exports.logIn = function(req, res){
patients.findOne({"username":req.body.username,"password":req.body.password}).exec(function(err, details){  
        
           if (details){
          var payload = {
                id: details._id
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
                token: token,
                role: details.isAdmin
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
// }
// else
// {
//  res.json({code:400,message:'Oops!Check Again'});
// }


