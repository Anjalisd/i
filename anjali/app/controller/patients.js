var patients = require("./../model/patients");
var jsonwebtoken = require('jsonwebtoken');


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
exports.loggedUser = function(req, res){
var id = req.user.id;
patients.findById({"_id":id}).exec(function(err, sd){  
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

exports.addPatient = function(req, res){
  var patient = new patients(req.body);
  patient.save(function(err){
     if(err){ res.json({code: 404, message: "" }) }
     else{
       res.json({code: 200, data: patient })
      }


      console.log("ok");
  })  


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
// }
// else
// {
//  res.json({code:400,message:'Oops!Check Again'});
// }


