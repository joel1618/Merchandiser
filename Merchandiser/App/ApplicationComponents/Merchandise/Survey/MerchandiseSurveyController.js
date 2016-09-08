(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('survey', {
            url: "/survey/:companyId/:surveyId/:customerId/:locationId/:surveyHeaderId",
            templateUrl: "/App/ApplicationComponents/Merchandise/Survey/MerchandiseSurvey.html"
        })
    });
    angular.module('Main').controller('MerchandiseSurveyController', ['$scope', '$state', '$stateParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService',
        'UserService', 'SurveyCustomerLocationService', 'SurveyProductQuestionService', 'CompanyApplicationService', 'SurveyHeaderService', 'SurveyDetailService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService,
        UserService, SurveyCustomerLocationService, SurveyProductQuestionService, CompanyApplicationService, SurveyHeaderService, SurveyDetailService) {
        
        $scope.Search = function () {
            if ($stateParams.surveyHeaderId != undefined && $stateParams.surveyHeaderId != null && $stateParams.surveyHeaderId != "") {
                var predicate = new breeze.Predicate('SurveyHeaderId', '==', $stateParams.surveyHeaderId);
                SurveyDetailService.Search(predicate, 0, 100, false).then(function (data) {
                    $scope.ProductQuestion = data;
                });
            }
            else
            {
                var predicate = new breeze.Predicate('SurveyId', '==', $stateParams.surveyId);
                SurveyProductQuestionService.Search(predicate, 0, 100, false).then(function (data) {
                    $scope.ProductQuestion = data;
                });
            }
        }
        $scope.Search();

        $scope.Save = function () {
            //TODO: Update
            if ($stateParams.surveyHeaderId != undefined && $stateParams.surveyHeaderId != null && $stateParams.surveyHeaderId != "") {
                angular.forEach($scope.ProductQuestion, function (value, key) {
                    SurveyDetailService.Update(value.Id, {
                        Id: value.Id,
                        Answer: value.Answer
                    })
                })
            }
            //TODO: Create
            else {
                SurveyHeaderService.Create({
                    CompanyId: $stateParams.companyId, SurveyId: $stateParams.surveyId,
                    CustomerId: $stateParams.customerId, LocationId: $stateParams.locationId
                }).then(function (data) {
                    angular.forEach($scope.ProductQuestion, function (value, key) {
                        SurveyDetailService.Create({
                            CompanyId: $stateParams.companyId, SurveyHeaderId: data.Id,
                            ProductId: value.Product.Id, QuestionId: value.Question.Id,
                            Answer: value.Answer
                        })
                    })
                })
            }
        }
    }]);
})(moment);