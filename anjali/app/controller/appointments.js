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
