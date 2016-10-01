(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.survey', {
            url: "/survey",
            templateUrl: "ApplicationComponents/DataEntry/Survey/MerchandiseSurvey.html"
        })
    });
    angular.module('Main').controller('MerchandiseSurveyController', ['$scope', '$q', '$state', '$stateParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService',
        'UserService', 'SurveyCustomerLocationService', 'SurveyProductQuestionService', 'SurveyHeaderService', 'SurveyDetailService', 'ImageService',
        'SelectionApplicationService',
    function controller($scope, $q, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService,
        UserService, SurveyCustomerLocationService, SurveyProductQuestionService, SurveyHeaderService, SurveyDetailService, ImageService, SelectionApplicationService) {
        
        if ((SelectionApplicationService.GetCompanyId() == null || SelectionApplicationService.GetCustomerId() == null ||
            SelectionApplicationService.GetLocationId() == null || SelectionApplicationService.GetSurveyId() == null) && SelectionApplicationService.GetSurveyHeaderId() == null) {
            $state.go('main.merchandise', {
                redirectState: 'main.survey'
            });
        }
        $scope.BeforeImage = null;
        $scope.AfterImage = null;
        $scope.Header = {
            BeforeImage: null, AfterImage: null, Latitude: null, Longitude: null, Notes: null,
            Company: SelectionApplicationService.GetCompany(), Survey: SelectionApplicationService.GetSurvey(),
            Customer: SelectionApplicationService.GetCustomer(), Location: SelectionApplicationService.GetLocation(),
            CompanyId: SelectionApplicationService.GetCompanyId(), SurveyId: SelectionApplicationService.GetSurveyId(),
            CustomerId: SelectionApplicationService.GetCustomerId(), LocationId: SelectionApplicationService.GetLocationId()
        }
        navigator.geolocation.getCurrentPosition(function (position) {
            $scope.Header.Latitude = position.coords.latitude;
            $scope.Header.Longitude = position.coords.longitude;
        });
        $scope.Detail = [];

        $scope.Search = function () {
            if (SelectionApplicationService.GetSurveyHeaderId() != null) {
                var predicate = { "Id": { "==": SelectionApplicationService.GetSurveyHeaderId() } };
                SurveyHeaderService.Search(predicate, ["Created desc"], 0, 1, false).then(function (data) {
                    $scope.Header = data[0];
                })
                var predicate = { "SurveyHeaderId": { "==": SelectionApplicationService.GetSurveyHeaderId() } };
                SurveyDetailService.Search(predicate, ["Created desc"], 0, 100, false).then(function (data) {
                    $scope.Detail = data;
                });
                $scope.BeforeImage = "/api/v1/ImageApi/GetBeforeImage/" + SelectionApplicationService.GetSurveyHeaderId();
                $scope.AfterImage = "/api/v1/ImageApi/GetAfterImage/" + SelectionApplicationService.GetSurveyHeaderId();
            }
            else {
                var predicate = { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } };
                SurveyProductQuestionService.Search(predicate, ["Created desc"], 0, 100, false).then(function (data) {
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
            if (SelectionApplicationService.GetSurveyHeaderId() != null) {
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
                        CompanyId: SelectionApplicationService.GetCompanyId(),
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
                        SelectionApplicationService.Clear();
                        //SelectionApplicationService.SetSurveyHeaderId(data.data.Id);
                        //$scope.Search();
                        $state.go('main.merchandise', {
                            redirectState: 'main.survey'
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
            if (SelectionApplicationService.GetSurveyHeaderId() != undefined && SelectionApplicationService.GetSurveyHeaderId() != null && SelectionApplicationService.GetSurveyHeaderId() != "") {
                ImageService.DeleteBeforeImage(SelectionApplicationService.GetSurveyHeaderId()).then(function () {

                });
            }
        }

        $scope.DeleteAfterImage = function () {
            $scope.AfterImage = null;
            $scope.Header.AfterImage = null;
            angular.element(document.querySelector('#AfterImage')).empty();
            if (SelectionApplicationService.GetSurveyHeaderId() != undefined && SelectionApplicationService.GetSurveyHeaderId() != null && SelectionApplicationService.GetSurveyHeaderId() != "") {
                ImageService.DeleteAfterImage(SelectionApplicationService.GetSurveyHeaderId()).then(function () {

                });
            }
        }
    }]);
})(moment);