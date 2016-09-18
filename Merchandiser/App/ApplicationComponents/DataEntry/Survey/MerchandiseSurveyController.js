(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('survey', {
            url: "/survey/:companyId/:surveyId/:customerId/:locationId/:surveyHeaderId",
            templateUrl: "/App/ApplicationComponents/DataEntry/Survey/MerchandiseSurvey.html"
        })
    });
    angular.module('Main').controller('MerchandiseSurveyController', ['$scope', '$q', '$state', '$stateParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService',
        'UserService', 'SurveyCustomerLocationService', 'SurveyProductQuestionService', 'CompanyApplicationService', 'SurveyHeaderService', 'SurveyDetailService', 'ImageService',
    function controller($scope, $q, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService,
        UserService, SurveyCustomerLocationService, SurveyProductQuestionService, CompanyApplicationService, SurveyHeaderService, SurveyDetailService, ImageService) {
        
        $scope.beforeImageIsChanged = false;
        $scope.afterImageIsChanged = false;
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
                $scope.BeforeImage = "/api/v1/ImageApi/GetBeforeImage/" + $stateParams.surveyHeaderId;
                $scope.AfterImage = "/api/v1/ImageApi/GetAfterImage/" + $stateParams.surveyHeaderId;                
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
            $scope.beforeImageIsChanged = true;
            var reader = new FileReader();
            $scope.Header.BeforeImage = element.files[0];
            reader.onload = function (event) {
                $scope.BeforeImage = event.target.result;
                $scope.$apply();
            }
            reader.readAsDataURL(element.files[0]);
        }

        $scope.setAfterImage = function (element) {
            $scope.afterImageIsChanged = true;
            var reader = new FileReader();
            $scope.Header.AfterImage = element.files[0];
            reader.onload = function (event) {
                $scope.AfterImage = event.target.result;
                $scope.$apply();
            }
            reader.readAsDataURL(element.files[0]);
        }

        $scope.Save = function () {
            var promises = [];
            var promise = null;
            if (!$scope.Validate()) {
                return false;
            }
            if ($stateParams.surveyHeaderId != undefined && $stateParams.surveyHeaderId != null && $stateParams.surveyHeaderId != "") {
                SurveyHeaderService.Update($scope.Header.Id, $scope.Header).then(function (data) {
                    angular.forEach($scope.Detail, function (value, key) {
                        promise = SurveyDetailService.Update(value.Id, {
                            Id: value.Id,
                            Answer: value.Answer
                        });
                        promises.push(promise);
                    })
                    if ($scope.beforeImageIsChanged) {
                        promise = ImageService.CreateBeforeImage($scope.Header.BeforeImage, data.data.Id);
                        promises.push(promise);
                    }
                    if ($scope.afterImageIsChanged) {
                        promise = ImageService.CreateAfterImage($scope.Header.AfterImage, data.data.Id);
                        promises.push(promise);
                    }
                });
            }
            else {
                SurveyHeaderService.Create($scope.Header).then(function (data) {
                    angular.forEach($scope.Detail, function (value, key) {
                        promise = SurveyDetailService.Create({
                            CompanyId: $stateParams.companyId, SurveyHeaderId: data.data.Id,
                            ProductId: value.Product.Id, QuestionId: value.Question.Id,
                            Answer: value.Answer
                        });
                        promises.push(promise);
                    });
                    promise = ImageService.CreateBeforeImage($scope.Header.BeforeImage, data.data.Id);
                    promise = ImageService.CreateAfterImage($scope.Header.AfterImage, data.data.Id);
                    promises.push(promise);
                });
            }
            $q.all([promises]).then(function () {
                toastr.success("Save successful.");
            })
        }

        $scope.Validate = function () {
            var fileSizeBeforeImage = 0; var fileSizeAfterImage = 0;
            if ($scope.Header.BeforeImage != undefined && $scope.Header.BeforeImage != null) {
                var fileSizeBeforeImage = $scope.Header.BeforeImage.size; // in bytes
            }
            if ($scope.Header.AfterImage != undefined && $scope.Header.AfterImage != null) {
                var fileSizeAfterImage = $scope.Header.AfterImage.size; // in bytes
            }
            if (fileSizeBeforeImage > 3096000 || fileSizeAfterImage > 3096000) {
                alert('File size is more then ' + 3 + ' Megabytes.');
                return false;
            }
            return true;
        }
    }]);
})(moment);