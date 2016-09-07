(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('merchandise', {
            url: "/merchandise",
            templateUrl: "/App/ApplicationComponents/Merchandise/CustomerLocation/MerchandiseCustomerLocation.html"
        })
    });
    angular.module('Main').controller('MerchandiseCustomerLocationController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService', 'UserService', 'CompanyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, CompanyApplicationService) {
        $scope.Search = function () {
            UserService.GetCurrentUser().then(function (data) {
                var predicate = new breeze.Predicate('CreatedBy', '==', data);
                CompanyService.Search(predicate, 0, 20, false).then(function (data) {
                    
                });
            });
        }
        $scope.Search();
    }]);
})(moment);