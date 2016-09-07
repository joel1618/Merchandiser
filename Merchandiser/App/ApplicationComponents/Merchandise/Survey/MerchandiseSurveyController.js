(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('survey', {
            url: "/survey/:id",
            templateUrl: "/App/ApplicationComponents/Merchandise/Survey/MerchandiseSurvey.html"
        })
    });
    angular.module('Main').controller('MerchandiseSurveyController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService', 'UserService', 'SurveyCustomerLocationService', 'SurveyProductQuestionService', 'CompanyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, SurveyCustomerLocationService, SurveyProductQuestionService, CompanyApplicationService) {
        alert('hit survey');
    }]);
})(moment);