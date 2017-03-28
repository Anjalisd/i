var dentists = require("./../model/dentists");


exports.getAllDentistsinfo = function(req, res){
dentists.find({}).exec(function(err, dentists){  
   if(err){
      res.json({code: 400, message: "Error occurred while fetching dentists"});
     }else if(dentists && dentists.length)
      {

  res.json({code: 200, data: dentists})
     }else{

  res.json({code: 404, message: "No records found"})
      }


  
});

}
exports.getdentistDetails = function(req, res){
var id = req.params.id;
dentists.find({"_id":id}).exec(function(err, sd){  
   if(err){
      res.json({code: 400, message: "Error occurred while fetching dentist"});
     }else if(dentists && dentists.length)
      {

        res.json({code: 200, data: sd})
     }else{

         res.json({code: 404, message: "No records found"})
      }


  
});

}

exports.addDentist = function(req, res){
  var dentist = new dentists(req.body);
  dentist.save(function(err){
     if(err){ res.json({code: 404, message: "" }) }
     else{
       res.json({code: 200, data: dentist })
      }


      console.log("ok");
  })  


}



exports.updateDentist = function(req, res){
  console.log("updatedentistsinfo", req.params.id, req.body); 

 dentists.update({_id: req.params.id}, { $set: req.body }, function(err, dentists){ 
    if(err){ res.json({code: 404, message: err}) }
     else{
       res.json({code: 200, data: dentists })
      }
  })
}
exports.deleteDentist = function(req, res){
 // console.log("updatedentistsinfo", req.params.id, req.body); 

 dentists.remove({_id: req.params.id}).exec( function(err, dentists){ 
    if(err){ res.json({code: 404, message: err}) }
     else{
       res.json({code: 200, message:"dentist deleted" ,data: dentists })
      }
  })


}
// exports.logIn = function(req, res){
// dentists.find({"username":req.body.username,"password":req.body.password}).exec(function(err, dentists){  
//    if(err){
//       res.json({code: 400, message: "Error occurred while fetching dentists"});
//      }else if(dentists && dentists.length)
//       {

//   res.json({code: 200, message: "logged in successfully"})
//      }else{

//   res.json({code: 404, message: "please enter correct password"})
//       }
//       })



