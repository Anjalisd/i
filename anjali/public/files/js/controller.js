myApp.controller('MainCtrl', function($scope, $resource,$http, $location,toastr,$stateParams,$rootScope) {
   var token = localStorage.getItem('webToken');         
        if(token!= null){
            $scope.isuserlogin = true;
            console.log('enter inside login tab')
        }else{
            $scope.isuserlogin = false;
        }
        $scope.logout = function(){
            localStorage.removeItem('webToken');
            toastr.success("You are logout");
            window.location = '/';
        }; 
        $scope.loggedUser = function() {
        console.log("myprofile")
        $http.get("/patients/myProfile")
            .then(function(response) {
                if(response.data.code==200){

                console.log("anjal",response);
                $rootScope.patient = response.data.data;
            }
            });
    } 
});
myApp.controller('DentistCtrl', function($scope, dentistService, $resource, $location,toastr,$stateParams) {



    $scope.getDentists = function() {
            dentistService.listDentists().get(function(response) {
                console.log('response', response);
                if (response.code == 200) {
                      toastr.success('list of all the dentists!!')
                    $scope.dentists = response.data;
                } else {
                    console.log("err");
                }
            });
    };
    $scope.addDentist = function() {
        $location.path('createDentist');
    }
    $scope.createDentist = function(dentist) {

        dentistService.createDentist().save(dentist, function(response) {
            toastr.success('Dentist added successfully','New dentist')
            console.log('response', response);
        })
        $location.path('dentists');
    };
$scope.deleteDentist = function(id) {
        dentistService.deleteDentist(id).delete(function(response) {
            console.log(response);
            if (response.code == 200) {
                console.log("Dentist deleted");
                toastr.success('deleted successfully', 'success')
            } else {
                console.log("err");
            }
        });
        $scope.getDentists();
    }
    $scope.updateDentist = function(id) {
        $location.path('/editDentist/' + id);
    };
    $scope.getdentistDetails = function() {
        console.log("ssssssss");
        dentistService.getDentist($stateParams.id).get(function(response) {
            if (response.code == 200) {
                $scope.dentist = response.data[0];
                toastr.info('Edit required credentials','Update Product')
                
            } else {
                console.log("err", response.message);
            }
        });
    };

   

    $scope.editDentist = function(dentist) {
        console.log(dentist);

        dentistService.editDentist(dentist._id).save(dentist, function(response) {

            console.log('response', response);

        });
         $location.path('dentists');
    }



});
myApp.controller('PatientCtrl', function($scope, $http,toastr,$location) {
    console.log("PatientCtrl")
    $scope.submit = function(patient) {
        $http.post("http://172.10.1.7:4052/patients", patient).then(function(response) {
                console.log("Registration successful");
                toastr.success('you are registered successful');
            },
            function err(response) {
                console.log("err")
            });
        $location.path('login');

    }
    $scope.login = function(patient) {
       $http.post("http://172.10.1.7:4052/patients/login", patient).then(function(response) {
               
                 if(response.data.code == 200)
              {                 
                /* step-2 save token */
                localStorage.setItem('webToken', response.data.data.token);
                toastr.success('logged in successfully');
                //console.log(localStorage.getItem('webToken'));
                window.location = '/';
              }
              else
              {
                toastr.info('Sorry try again');
                window.location = '/';
              }
            })

          }

});
myApp.controller('GetpatientsCtrl', function($scope, $location, $http, toastr,$stateParams,$rootScope) {
    $scope.getPatients = function() {
            $http.get("http://172.10.1.7:4052/patients")
                .then(function(response) {
                    console.log(response);
                    if (response.data.code == 200) {
                        $scope.patients = response.data.data;
                    } else {
                        alert("not found");
                    }
                }, function(response) {
                    alert('err');
                });
        }
        // $scope.init=function(){
        //   $scope.getpatients();
        // }

    $scope.deletePatient = function(id) {
        $http.delete("http://172.10.1.7:4052/patients/" + id)
            .then(function(response) {
                console.log(response);
                if (response.data.code == 200) {
                    console.log("patient deleted");
                } else {
                    console.log("err");
                }
            });
        $scope.getPatients();
    }
    
    
    // $scope.getpatientDetails = function() {
    //     console.log("anj");
    //     $http.get("/patients/"+$stateParams.patient)
    //         .then(function(response) {
    //             if(response.data.code==200){

    //             console.log("anjaliu yyyyyy",response);
    //             $rootScope.patient = response.data.data[0];
    //         }
    //         });
    // }
    
    $scope.updatePatient = function(id) {
        $location.path("/edit/" + id);
    }
    $scope.edit = function(patient) {
        console.log(patient);
        $http.post("/patients/" + patient._id, patient).then(function(response) {
                console.log("updated")
            },
            function(response) {
                console.log("err")
            });
    }
});
// myApp.controller('AppointmentsCtrl', function($scope, appointService, $resource, $location,toastr,$stateParams) {



//     $scope.getAppointments = function() {
//             productService.listProducts().get(function(response) {
//                 console.log('response', response);
//                 if (response.code == 200) {
//                       toastr.success('list of all the products!!')
//                     $scope.products = response.data;
//                 } else {
//                     console.log("err");
//                 }
//             });
//     };
//     $scope.addProduct = function() {
//         $location.path('createProduct');
//     }
//     $scope.createProduct = function(product) {

//         productService.createProduct().save(product, function(response) {
//             toastr.success('Product added successfully','New product')
//             console.log('response', response);
//         })
//         $location.path('products');
//     };

//     $scope.deleteProduct = function(id) {
//         productService.deleteProduct(id).delete(function(response) {
//             console.log(response);
//             if (response.code == 200) {
//                 console.log("Product deleted");
//                 toastr.success('deleted successfully', 'success')
//             } else {
//                 console.log("err");
//             }
//         });
//         $scope.getProducts();
//     }
   



// });