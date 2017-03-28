var myApp = angular.module("myApp", ['ui.router', 'ngResource', 'ngAnimate', 'toastr','angularUtils.directives.dirPagination','ngMessages']);

myApp.constant('APP_CONST', {
    'API_URL': 'http://172.10.1.7:4052'
});
myApp.factory('httpRequestInterceptor', function ($q,$rootScope,$location) {
  return {
    request: function (config) {
      console.log("i am in factory");
      console.log("config", config);
      config.headers.Authorization = 'Bearer ' + localStorage.getItem('webToken')
      console.log( config.headers.Authorization );
      return config;
    },
        response: function (response) {
            console.log(response);
            var curPath = $location.path();
            $rootScope.curPage = curPath;
            console.log($rootScope.curPage)
            if (response.data.code == 200) {
                $rootScope.isLoading = true;
                // if((curPath != '/') && (curPath != '/user/registrastion')){
                //     Flash.create('danger', 'You need to log in.');
                //     $location.path('/');
                // }
            }else {
                $rootScope.isLoading = false;
                
                            
            }
        
            return response || $q.state(response);    
        }
  };
});



myApp.factory('dentistService', ['$resource', 'APP_CONST', function($resource,APP_CONST) {
    return {
        listDentists: function() {
            return $resource(APP_CONST.API_URL + '/dentists');
        },
        createDentist: function(dentist) {
            return $resource(APP_CONST.API_URL + '/dentists',dentist);
        }
        ,
        deleteDentist: function(id) {
            return $resource(APP_CONST.API_URL + '/dentists/'+id);
        },
        getDentist: function(id) {
            return $resource(APP_CONST.API_URL + '/dentists/' + id);
        },
        editDentist: function(id) {
            return $resource(APP_CONST.API_URL + '/dentists/'+id);
        }
    };


}]);
myApp.factory('appointService', ['$resource', 'APP_CONST', function($resource,APP_CONST) {
    return {
        listAppointments: function() {
            return $resource(APP_CONST.API_URL + '/appointments');
        },
        createAppointment: function(appointment) {
            return $resource(APP_CONST.API_URL + '/appointments',appointment);
        }
        ,
        deleteAppointment: function(id) {
            return $resource(APP_CONST.API_URL + '/appointments/'+id);
        }
        
    };
    

}]);
myApp.factory('adminService', ['$resource', 'APP_CONST', function($resource,APP_CONST) {
    return {
        listadminUsers: function() {
            return $resource(APP_CONST.API_URL + '/adminUsers');
        },
        createAdmin: function(adminUser) {
            return $resource(APP_CONST.API_URL + '/adminUsers',adminUser);
        }
        ,
        deleteAdmin: function(id) {
            return $resource(APP_CONST.API_URL + '/adminUsers/'+id);
        },
        adminLogin: function(){
            return $resource(APP_CONST.API_URL + '/adminUsers/adminLogin');
        },
        
    };
    

}]);


