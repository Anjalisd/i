myApp.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
    if(localStorage.getItem('webToken')){
    $httpProvider.defaults.headers.common = {
      Authorization : 'Bearer ' + localStorage.getItem('webToken')
    };
  }
  var checklogin = function(){
                        var token = localStorage.getItem('webToken');         
                        if(token!= null){
                            return true;
                        }else{
                            window.location = '/';
                        }
                    };
  
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state("appointment", {
            url: "/req_appointment",

            views: {
                "header": {
                    templateUrl: "/app/header.html"
                },
                "content": {
                    templateUrl: "/app/appointment.html"
                },
                "footer": {
                    templateUrl: "/app/footer.html"
                }

            }
        })
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
                    controller: 'PatientCtrl'
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
                    controller: "GetpatientsCtrl",

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
                    controller: "GetpatientsCtrl",

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
                    checklogin : checklogin
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