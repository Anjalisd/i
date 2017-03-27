myApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
            //   if(localStorage.getItem('webToken')){
            //   $httpProvider.defaults.headers.common = {
            //     Authorization : 'Bearer ' + localStorage.getItem('webToken')
            //   };
            // }
            

            // var checklogin = function() {
            //     var token = localStorage.getItem('webToken');
            //     if (token != null) {
            //         return true;
            //     } else {
            //         window.location = '/';
            //     }
            // };
            var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
                var deferred = $q.defer();
                $http.get('http://172.10.1.7:4052/patients/checklogin').success(function(response) {
                    deferred.resolve();
                });
                return deferred.promise;
            };
        $httpProvider.interceptors.push('httpRequestInterceptor');
    $urlRouterProvider.otherwise('/home');

    $stateProvider
    .state("emergency", {
            url: "/emergency",
            views: {
                "header": {
                    templateUrl: "/app/header.html"

                },
                "content": {
                    templateUrl: "/app/emergency.html"
                },
                "footer": {
                    templateUrl: "/app/footer.html"
                }
            }
        })
    .state("ambulance", {
            url: "/ambulance",
            views: {
                "header": {
                    templateUrl: "/app/header.html"

                },
                "content": {
                    templateUrl: "/app/ambulance.html"
                },
                "footer": {
                    templateUrl: "/app/footer.html"
                }
            }
        })
     .state("adminLogin", {
            url: "/adminLogin",
            views: {
                "header": {
                    templateUrl: "/app/header.html",
                    
                },
                "content": {
                    templateUrl: "/app/adminLogin.html",
                    controller: 'AdminUsersCtrl'
                },
                "footer": {
                templateUrl: "/app/footer.html"
            }

            }
        })
    .state("adminUsers", {
            url: "/adminUsers",

            views: {
                "header": {
                    templateUrl: "/app/adminHead.html"
                },
                "content": {
                    templateUrl: "/app/adminUsers.html",
                    controller: "AdminUsersCtrl"
                },
                "footer": {
                    templateUrl: "/app/footer.html"
                }

            }
        })
        .state("createAdmin", {
            url: "/createAdmin",

            views: {
                "header": {
                    templateUrl: "/app/header.html"
                },
                "content": {
                    templateUrl: "/app/addAdmin.html",
                    controller: "AdminUsersCtrl"
                },
                "footer": {
                    templateUrl: "/app/footer.html"
                }

            }
        })
        .state("appointments", {
            url: "/all_appointments",

            views: {
                "header": {
                    templateUrl: "/app/adminHead.html"
                },
                "content": {
                    templateUrl: "/app/appointments.html",
                    controller: "AppointmentsCtrl"
                },
                "footer": {
                    templateUrl: "/app/footer.html"
                }

            }
        })
        .state("appointment", {
            url: "/my_appointments/:id",

            views: {
                "header": {
                    templateUrl: "/app/header.html"
                },
                "content": {
                    templateUrl: "/app/appointment.html",
                    controller: "MainCtrl",
                },
                "footer": {
                    templateUrl: "/app/footer.html"
                }

            }
        })
        .state("addAppointment", {
            url: "/addAppointment",

            views: {
                "header": {
                    templateUrl: "/app/header.html"
                },
                "content": {
                    templateUrl: "/app/addAppointment.html",
                    controller: "AppointmentsCtrl"
                },
                "footer": {
                    templateUrl: "/app/footer.html"
                }

            }
        })
        // .state("editAppointment", {
        //     url: "/editAppointment/:id",

        //     views: {
        //         "header": {
        //             templateUrl: "/app/header.html"
        //         },
        //         "content": {
        //             templateUrl: "/app/updateAppointment.html",
        //             controller: "AppointmentsCtrl"

        //         },
        //         "footer": {
        //             templateUrl: "/app/footer.html"
        //         }
        //     }

            
        // })
        .state("createDentist", {
            url: "/createDentist",
            views: {
                "header": {
                    templateUrl: "/app/header.html"
                },
                "content": {
                    templateUrl: "app/addDentist.html",
                    controller: "DentistCtrl"
                },
                "footer": {
                    templateUrl: "/app/footer.html"
                }
            }
        })

    .state("dentists", {
            url: "/dentists",
            views: {
                "header": {
                    templateUrl: "/app/header.html"

                },
                "content": {
                    templateUrl: "/app/dentists.html",
                    controller: "DentistCtrl"

                },
                "footer": {
                    templateUrl: "/app/footer.html"
                }
            },
            
        })
        .state("editDentist", {
            url: "/editDentist/:id",

            views: {
                "header": {
                    templateUrl: "/app/header.html"
                },
                "content": {
                    templateUrl: "/app/updateDentist.html",
                    controller: "DentistCtrl",

                },

            }
        })
        .state("home", {
            url: "/home",
            views: {
                "header": {
                    templateUrl: "/app/header.html"

                },
                "content": {
                    templateUrl: "/app/home.html"
                },
                "footer": {
                    templateUrl: "/app/footer.html"
                }
            }
        })
        .state("login", {
            url: "/login",
            views: {
                "header": {
                    templateUrl: "/app/header.html",
                    
                },
                "content": {
                    templateUrl: "/app/login.html",
                    controller: 'MainCtrl'
                },
                "footer": {
                templateUrl: "/app/footer.html"
            }

            }
        })


    .state("register", {
        url: "/register",

        views: {
            "header": {
                templateUrl: "/app/header.html"
            },
            "content": {
                templateUrl: "/app/register.html",
                controller: "PatientCtrl"
            },
            "footer": {
                templateUrl: "/app/footer.html"
            }
        }
    })

    .state("patient", {
            url: "/myProfile",

            views: {
                "header": {
                    templateUrl: "/app/header.html"
                },
                "content": {
                    templateUrl: "/app/patient.html",
                    controller: "MainCtrl",

                },
                "footer": {
                    templateUrl: "/app/footer.html"
                }
            }
        })

    .state("patients", {
            url: "/patients",

            views: {
                "header": {
                    templateUrl: "/app/header.html"
                },
                "content": {
                    templateUrl: "/app/patients.html",
                    controller: "GetpatientsCtrl"

                },
                "footer": {
                    templateUrl: "/app/footer.html"
                }
            }
        })
        .state("edit", {
            url: "/edit/:patient",

            views: {
                "header": {
                    templateUrl: "/app/header.html"
                },
                "content": {
                    templateUrl: "/app/edit.html",
                    controller: "GetpatientsCtrl"

                }
            }

            
        })
        .state("dns", {
            url: "/dns",

            views: {
                "header": {
                    templateUrl: "/app/header.html"
                },
                "content": {
                    templateUrl: "/app/dns.html"
                    

                },
                 "footer": {
                    templateUrl: "/app/footer.html"
                }
            },

            resolve:{
                    checklogin : checkLoggedin
                }
                
            
        })
        .state("aboutus", {
            url: "/aboutus",

            views: {
                "header": {
                    templateUrl: "/app/header.html"
                },
                "content": {
                    templateUrl: "/app/aboutus.html"
                    

                },
                 "footer": {
                    templateUrl: "/app/footer.html"
                }
            }
        })
        .state("dentist", {
            url: "/dentist",

            views: {
                "header": {
                    templateUrl: "/app/header.html"
                },
                "content": {
                    templateUrl: "/app/dentist.html"
                    

                },
                
            }
        });
})