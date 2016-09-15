(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('survey', {
            url: "/survey/:companyId/:surveyId/:customerId/:locationId/:surveyHeaderId",
            templateUrl: "/App/ApplicationComponents/DataEntry/Survey/MerchandiseSurvey.html"
        })
    });
    angular.module('Main').controller('MerchandiseSurveyController', ['$scope', '$state', '$stateParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService',
        'UserService', 'SurveyCustomerLocationService', 'SurveyProductQuestionService', 'CompanyApplicationService', 'SurveyHeaderService', 'SurveyDetailService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService,
        UserService, SurveyCustomerLocationService, SurveyProductQuestionService, CompanyApplicationService, SurveyHeaderService, SurveyDetailService) {
        
        $scope.Header = {
            CompanyId: $stateParams.companyId, SurveyId: $stateParams.surveyId,
            CustomerId: $stateParams.customerId, LocationId: $stateParams.locationId
        }
        $scope.Detail = [];
        $scope.Search = function () {
            if ($stateParams.surveyHeaderId != undefined && $stateParams.surveyHeaderId != null && $stateParams.surveyHeaderId != "") {
                var predicate = new breeze.Predicate('Id', '==', $stateParams.surveyHeaderId);
                SurveyHeaderService.Search(predicate, 0, 1, false).then(function (data) {
                    $scope.Header = data[0];
                })
                predicate = new breeze.Predicate('SurveyHeaderId', '==', $stateParams.surveyHeaderId);
                SurveyDetailService.Search(predicate, 0, 100, false).then(function (data) {
                    $scope.Detail = data;
                });
            }
            else
            {
                var predicate = new breeze.Predicate('SurveyId', '==', $stateParams.surveyId);
                SurveyProductQuestionService.Search(predicate, 0, 100, false).then(function (data) {
                    $scope.Detail = data;
                });
            }
        }
        $scope.Search();

        $scope.setBeforeImage = function (element) {
            $scope.currentFile = element.files[0];
            var reader = new FileReader();

            reader.onload = function (event) {
                $scope.Header.BeforeImage = event.target.result
                $scope.$apply()

            }
            // when the file is read it triggers the onload event above.
            reader.readAsDataURL(element.files[0]);
        }

        $scope.setAfterImage = function (element) {
            $scope.currentFile = element.files[0];
            var reader = new FileReader();

            reader.onload = function (event) {
                $scope.Header.AfterImage = event.target.result
                $scope.$apply()

            }
            // when the file is read it triggers the onload event above.
            reader.readAsDataURL(element.files[0]);
        }

        $scope.Save = function () {
            //TODO: Update
            if ($stateParams.surveyHeaderId != undefined && $stateParams.surveyHeaderId != null && $stateParams.surveyHeaderId != "") {
                SurveyHeaderService.Update($scope.Header.Id, $scope.Header).then(function (data) {
                    angular.forEach($scope.Detail, function (value, key) {
                        SurveyDetailService.Update(value.Id, {
                            Id: value.Id,
                            Answer: value.Answer
                        })
                    })
                })
            }
            //TODO: Create
            else {
                debugger;
                SurveyHeaderService.Create($scope.Header).then(function (data) {
                    angular.forEach($scope.Detail, function (value, key) {
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