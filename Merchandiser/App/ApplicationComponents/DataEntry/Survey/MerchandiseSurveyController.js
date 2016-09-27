(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.survey', {
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
        $scope.BeforeImage = null;
        $scope.AfterImage = null;
        $scope.Header = {
            BeforeImage: null, AfterImage: null, Latitude: null, Longitude: null,
            CompanyId: $stateParams.companyId, SurveyId: $stateParams.surveyId,
            CustomerId: $stateParams.customerId, LocationId: $stateParams.locationId
        }
        navigator.geolocation.getCurrentPosition(function (position) {
            $scope.Header.Latitude = position.coords.latitude;
            $scope.Header.Longitude = position.coords.longitude;
        });
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
            else {
                var predicate = new breeze.Predicate('SurveyId', '==', $stateParams.surveyId);
                SurveyProductQuestionService.Search(predicate, 0, 100, false).then(function (data) {
                    $scope.Detail = data;
                });
            }
        }
        $scope.Search();

        $scope.setBeforeImage = function (element) {
            var reader = new FileReader();
            $scope.Header.BeforeImage = element.files[0];
            reader.onload = function (event) {
                $scope.BeforeImage = event.target.result;
                $scope.$apply();
            }
            reader.readAsDataURL(element.files[0]);
        }

        $scope.setAfterImage = function (element) {
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
                var details = [];
                angular.forEach($scope.Detail, function (value, key) {
                    details.push({
                        Id: value.Id,
                        Answer: value.Answer
                    })
                });
                var item = { Header: $scope.Header, Details: details };
                promise = SurveyHeaderService.UpdateBulk($scope.Header.Id, item).then(function(data){
                    promises.push(promise);
                    promise = ImageService.CreateBeforeImage($scope.Header.BeforeImage, data.data.Id);
                    promises.push(promise);
                    promise = ImageService.CreateAfterImage($scope.Header.AfterImage, data.data.Id);
                    promises.push(promise);
                    $q.all([promises]).then(function () {
                        toastr.success("Save successful.");
                    });
                });
            }
            else {
                var details = [];
                angular.forEach($scope.Detail, function (value, key) {
                    details.push({
                        CompanyId: $stateParams.companyId,
                        ProductId: value.Product.Id,
                        QuestionId: value.Question.Id,
                        Answer: value.Answer
                    })
                });
                var item = { Header: $scope.Header, Details: details };
                promise = SurveyHeaderService.CreateBulk(item).then(function (data) {
                    promise = ImageService.CreateBeforeImage($scope.Header.BeforeImage, data.data.Id);
                    promises.push(promise);
                    promise = ImageService.CreateAfterImage($scope.Header.AfterImage, data.data.Id);
                    promises.push(promise);
                    $q.all([promises]).then(function () {
                        toastr.success("Save successful.");
                        $state.go('survey', {
                            companyId: $stateParams.companyId, surveyId: $stateParams.surveyId,
                            customerId: $stateParams.customerId, locationId: $stateParams.locationId, surveyHeaderId: data.data.Id
                        });
                    });
                });
                promises.push(promise);  
            }
        }

        $scope.Validate = function () {
            var fileSizeBeforeImage = 0; var fileSizeAfterImage = 0;
            if ($scope.Header.BeforeImage != null) {
                var fileSizeBeforeImage = $scope.Header.BeforeImage.size; // in bytes
            }
            if ($scope.Header.AfterImage != null) {
                var fileSizeAfterImage = $scope.Header.AfterImage.size; // in bytes
            }
            if (fileSizeBeforeImage > 3096000 || fileSizeAfterImage > 3096000) {
                alert('File size is more then ' + 3 + ' Megabytes.');
                return false;
            }
            return true;
        }

        $scope.DeleteBeforeImage = function () {
            $scope.BeforeImage = null;
            $scope.Header.BeforeImage = null; 
            if ($stateParams.surveyHeaderId != undefined && $stateParams.surveyHeaderId != null && $stateParams.surveyHeaderId != "") {
                ImageService.DeleteBeforeImage($stateParams.surveyHeaderId).then(function () {

                });
            }
        }

        $scope.DeleteAfterImage = function () {
            $scope.AfterImage = null;
            $scope.Header.AfterImage = null;
            angular.element(document.querySelector('#AfterImage')).empty();
            if ($stateParams.surveyHeaderId != undefined && $stateParams.surveyHeaderId != null && $stateParams.surveyHeaderId != "") {
                ImageService.DeleteAfterImage($stateParams.surveyHeaderId).then(function () {

                });
            }
        }
    }]);
})(moment);