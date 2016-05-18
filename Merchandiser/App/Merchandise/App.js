var controlpanel = angular.module('Merchandise', ['ngRoute', 'ui.grid', 'ui.bootstrap', 'breeze.angular', 'Services']);

controlpanel.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {           
            templateUrl: '../App/Merchandise/Views/Merchandise.html'
        })
        //.when('/controlpanel/:id', {
        //    templateUrl: '../App/Merchandise/views/controlpanel.html'
        //})
        .otherwise({
            redirectTo: '/'
        });
}])