var myApp = angular.module("myApp", ['ui.router', 'ngResource', 'ngAnimate', 'toastr','angularUtils.directives.dirPagination','ngMessages']);

myApp.constant('APP_CONST', {
    'API_URL': 'http://172.10.1.7:4052'
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


