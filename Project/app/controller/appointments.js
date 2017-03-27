var appointments = require("./../model/appointments");

exports.getAllAppointments = function(req, res){
appointments.find({}).exec(function(err, appointments){  
   if(err){
      res.json({code: 400, message: "Error occurred while fetching appointments"});
     }else if(appointments && appointments.length)
      {

  res.json({code: 200, data: appointments})
     }else{

  res.json({code: 404, message: "No records found"})
      }


  
});

}
exports.logUser = function(req, res){
// var id = req.user.id;
// var anj=req.user.appointments.id;
// console("i m app id",anj);
appointments.findById({"_id":req.params.id}).exec(function(err, sd){  
   if(err){
      res.json({code: 400, message: "Error occurred while fetching patient"});
     }else if(appointments && appointments.length)
      {

        res.json({code: 200, data: sd});
     }else{

         res.json({code: 404, message: "No records found"});
      }


  
});

}
exports.addAppointment = function(req, res){
  var appointment = new appointments(req.body);
  appointment.save(function(err){
     if(err){ res.json({code: 404, message: "" }) }
     else{
       res.json({code: 200, data: appointment })
      }


      console.log("ok");
  })  


}
exports.deleteAppointment = function(req, res){
 // console.log("updateappointmentsinfo", req.params.id, req.body); 

 appointments.remove({_id: req.params.id}).exec( function(err, appointments){ 
    if(err){ res.json({code: 404, message: err}) }
     else{
       res.json({code: 200, message:"appointment deleted" ,data: appointments })
      }
  })


}
// exports.getappointmentDetails = function(req, res){
// var id = req.params.id;
// appointments.find({"_id":id}).exec(function(err, sd){  
//    if(err){
//       res.json({code: 400, message: "Error occurred while fetching dentist"});
//      }else if(appointments && appointments.length)
//       {

//         res.json({code: 200, data: sd})
//      }else{

//          res.json({code: 404, message: "No records found"})
//       }


  
// });
// }
// exports.updateAppointment = function(req, res){
//   console.log("updateappointmentsinfo", req.params.id, req.body); 

//  appointments.update({_id: req.params.id}, { $set: req.body }, function(err, appointments){ 
//     if(err){ res.json({code: 404, message: err}) }
//      else{
//        res.json({code: 200, data: appointments })
//       }
//   })
// }
