myApp.controller('AdminUsersCtrl', function($scope, adminService, $resource, $location, toastr, $stateParams) {

    $scope.login = function(adminUser) {
        adminService.adminLogin().save(adminUser, function(response) {

            if (response.code == 200) {
                /* step-2 save token */
                localStorage.setItem('webToken', response.data.token);
                alert('logged in successful')
                    //toastr.success('logged in successfully');
                    //console.log(localStorage.getItem('webToken'));
                $location.path("/patients")
            } else {
                //toastr.info('Sorry try again');
                alert('Enter correct password')
                    // window.location = '/#/login';
            }
        })

    }


    $scope.getAdminUsers = function() {
        adminService.listadminUsers().get(function(response) {
            console.log('response', response);
            if (response.code == 200) {
                toastr.success('list of all the Admin Users!!')
                $scope.adminUsers = response.data;
            } else {
                console.log("err");
            }
        });
    };
    $scope.addAdmin = function() {
        $location.path('createAdmin');
    }
    $scope.createAdmin = function(adminUser) {

        adminService.createAdmin().save(adminUser, function(response) {
            toastr.success('adminUser added successfully', 'New Admin')
            console.log('response', response);
        })
        $location.path('adminUsers');
    };
    $scope.deleteAdmin = function(id) {
        adminService.deleteAdmin(id).delete(function(response) {
            console.log(response);
            if (response.code == 200) {
                console.log("admin deleted");
                toastr.success('deleted successfully', 'success')
            } else {
                console.log("err");
            }
        });
        $scope.getAdminUsers();
    }

        // $scope.updateDentist = function(id) {
        //     $location.path('/editDentist/' + id);
        // };
        // $scope.getdentistDetails = function() {
        //     console.log("ssssssss");
        //     dentistService.getDentist($stateParams.id).get(function(response) {
        //         if (response.code == 200) {
        //             $scope.dentist = response.data[0];
        //             toastr.info('Edit required credentials','Update Product')

        //         } else {
        //             console.log("err", response.message);
        //         }
        //     });
        // };



        // $scope.editDentist = function(dentist) {
        //     console.log(dentist);

        //     dentistService.editDentist(dentist._id).save(dentist, function(response) {

        //         console.log('response', response);

        //     });
        //      $location.path('dentists');
        // }



});


myApp.controller('MainCtrl', function($scope, $resource, $http, $location, toastr, $stateParams, $rootScope) {
    var token = localStorage.getItem('webToken');
    console.log("mainctrllll",token);
    var role = localStorage.getItem('webrole');
    console.log("mainctrllll",role);
    if (token != null && role=='false') {
        $rootScope.isuserlogin = true;
        $scope.isadminlogin = false;
        console.log("user login");
        $location.path('/home');
        console.log('enter inside login tab')
        
    } else  if (token != null && role== 'true') {
        $rootScope.isuserlogin = false;
         $scope.isadminlogin = true;
         console.log("admin login");
         // $location.path('/patients')
    }
    else{
        $rootScope.isuserlogin=false;
        $scope.isadminlogin=false;
    }
    $scope.logout = function() {
        var sure = confirm("Are you sure you want to log out?")
        if (sure) {
            localStorage.removeItem('webToken');
            //toastr.success("You are logout");
            alert('you are logout');
            window.location = '/';
        }
    };
    $scope.loggedUser = function() {
        console.log("myprofile")
        $http.get("/patients/myProfile/")
            .then(function(response) {
                if (response.data.code == 200) {

                    console.log("anjal", response);
                    $rootScope.patient = response.data.data;
                }
            });
    }
  $scope.login = function(patient) {
        $http.post("http://172.10.1.7:4052/patients/login", patient).then(function(response) {

            if (response.data.code == 200) {
                /* step-2 save token */
                localStorage.setItem('webToken', response.data.data.token);
                localStorage.setItem('webrole', response.data.data.role);
                toastr.success('logged in successful')
                console.log("ghfgdrtyrtyyrtyytryrtyrt");
                 $rootScope.isuserlogin = true;
                 $location.path('/home');
                    //toastr.success('logged in successfully');
                    //console.log(localStorage.getItem('webToken'));
            } else {
                //toastr.info('Sorry try again');
                 $rootScope.isuserlogin = false;
                alert('Enter correct password')
                window.location = '/#/login';
            }
        })

    }


});
// myApp.controller('MyCtrl', function($scope, $resource, $http, $location, toastr, $stateParams, $rootScope) {
//     var token = localStorage.getItem('webToken');
//     if (token != null) {
//         $scope.isadminuserlogin = true;
//         console.log('enter inside login tab')
//     } else {
//         $scope.isadminuserlogin = false;
//     }
//     $scope.logout = function() {
//         var sure = confirm("Are you sure you want to log out?")
//         if (sure) {
//             localStorage.removeItem('webToken');
//             //toastr.success("You are logout");
//             alert('you are logout');
//             window.location = '/';
//         }
//     };

// });
myApp.controller('DentistCtrl', function($scope, dentistService, $resource, $location, toastr, $stateParams) {



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
            toastr.success('Dentist added successfully', 'New dentist')
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
                toastr.info('Edit required credentials', 'Update Product')

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
        $location.path('/dentists');
    }



});
myApp.controller('PatientCtrl', function($scope, $http, toastr, $location) {
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
   
});
myApp.controller('GetpatientsCtrl', function($scope, $location, $http, toastr, $stateParams, $rootScope) {
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
        var sure = confirm("Are you sure you want to delete")
        if (sure) {
            $http.delete("http://172.10.1.7:4052/patients/" + id)
                .then(function(response) {
                    console.log(response);
                    if (response.data.code == 200) {
                        console.log("patient deleted");
                    } else {
                        console.log("err");
                    }
                });

        }
        $scope.getPatients();
    }


    $scope.getpatientDetails = function() {
        console.log("anj");
        $http.get("/patients/" + $stateParams.patient)
            .then(function(response) {
                if (response.data.code == 200) {

                    console.log("anjaliu yyyyyy", response);
                    $scope.patient = response.data.data[0];
                }
            });
    }

    $scope.updatePatient = function(id) {
        console.log("aa")
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
        $location.path("/myProfile");
    }
});
myApp.controller('AppointmentsCtrl', function($scope, appointService, $resource, $location, toastr, $stateParams) {



    $scope.getAppointments = function() {
        appointService.listAppointments().get(function(response) {
            console.log('response', response);
            if (response.code == 200) {
                toastr.success('list of all appointments!!')
                $scope.appointments = response.data;
            } else {
                console.log("err");
            }
        });
    };

    $scope.addAppointment = function() {
        $location.path('createAppointment');
    }
    $scope.createAppointment = function(appointment) {
        appointService.createAppointment().save(appointment, function(response) {
            toastr.success('appointment created')
            console.log('response', response);
        })
        $location.path('appointments');
    };

    $scope.deleteAppointment = function(id) {
        var sure = confirm("Are you sure you want to delete")
        if (sure) {
            appointService.deleteAppointment(id).delete(function(response) {
                console.log(response);
                if (response.code == 200) {
                    console.log("Appointment deleted");
                    toastr.success('deleted successfully', 'success')
                } else {
                    console.log("err");
                }
            });
        }
        $scope.getAppointments();
    }




});