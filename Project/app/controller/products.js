var products = require("./../model/products");


exports.getAllProducts = function(req, res){
products.find({}).exec(function(err, products){  
   if(err){
    	res.json({code: 400, message: "Error occurred while fetching products"});
     }else if(products && products.length)
      {

 	res.json({code: 200, data: products})
     }else{

	res.json({code: 404, message: "No records found"})
      }


  
});

}

exports.getProductdetails = function(req, res) {
    var id = req.params.id;
    products.findById({
        "_id": id
    }).exec(function(err, products) {
        console.log(products);

        if (err) {
            res.json({
                code: 400,
                message: "Error occurred while fetching products"
            });
        } else if (products) {
            res.json({
                code: 200,
                data: products
            })
        } else {

            res.json({
                code: 404,
                message: "No records found"
            })
        }
    });
}


exports.addProduct = function(req, res){
  var product = new products(req.body);
  product.save(function(err){
     if(err){ res.json({code: 404, message: "" }) }
     else{
       res.json({code: 200, data: product })
      }
  })  


}



exports.updateProduct = function(req, res){
  console.log("updateProduct", req.params.id, req.body); 

 products.update({_id: req.params.id}, { $set: req.body }, function(err, products){ 
    if(err){ res.json({code: 404, message: err}) }
     else{
       res.json({code: 200, data: products })
      }
  })
}
exports.deleteProduct = function(req, res){
 // console.log("updateproductsinfo", req.params.id, req.body); 

 products.remove({_id: req.params.id}).exec( function(err, products){ 
    if(err){ res.json({code: 404, message: err}) }
     else{
       res.json({code: 200, message:"user deleted" ,data: products })
      }
  })


}