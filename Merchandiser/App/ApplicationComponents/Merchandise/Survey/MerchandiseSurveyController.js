(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('survey', {
            url: "/survey/:id",
            templateUrl: "/App/ApplicationComponents/Merchandise/Survey/MerchandiseSurvey.html"
        })
    });
    angular.module('Main').controller('MerchandiseSurveyController', ['$scope', '$state', '$stateParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService', 'UserService', 'SurveyCustomerLocationService', 'SurveyProductQuestionService', 'CompanyApplicationService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, SurveyCustomerLocationService, SurveyProductQuestionService, CompanyApplicationService) {
        $scope.Search = function () {
            var predicate = new breeze.Predicate('SurveyId', '==', $stateParams.id);
            SurveyProductQuestionService.Search(predicate, 0, 100, false).then(function (data) {
                $scope.ProductQuestion = data;
            });
        }
        $scope.Search();
    }]);
})(moment);