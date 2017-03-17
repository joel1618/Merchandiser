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
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService', 'blockUIConfig',
        'UserService', 'SurveyCustomerLocationProductQuestionService', 'SurveyHeaderService', 'SurveyDetailService', 'ImageService',
        'SelectionApplicationService', 'SelectCustomerLocationProductQuestionService',
    function controller($scope, $q, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, blockUIConfig,
        UserService, SurveyCustomerLocationProductQuestionService, SurveyHeaderService, SurveyDetailService, ImageService,
        SelectionApplicationService, SelectCustomerLocationProductQuestionService) {
        
        blockUIConfig.autoBlock = true;
        blockUIConfig.message = 'Saving...';

        if ((SelectionApplicationService.GetCompanyId() == null || SelectionApplicationService.GetCustomerId() == null ||
            SelectionApplicationService.GetLocationId() == null || SelectionApplicationService.GetSurveyId() == null) && SelectionApplicationService.GetSurveyHeaderId() == null) {
            $state.go('main.selectcompany');
        }
        $scope.previousElementId = "input0";
        $scope.BeforeImage = null;
        $scope.AfterImage = null;
        $scope.IsAdministrator = false;
        $scope.Company = SelectionApplicationService.GetCompany(); $scope.Survey = SelectionApplicationService.GetSurvey();
        $scope.Customer = SelectionApplicationService.GetCustomer(); $scope.Location = SelectionApplicationService.GetLocation();
        $scope.Header = {
            BeforeImage: null, AfterImage: null, Latitude: null, Longitude: null, Notes: null,
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
                    $scope.Survey = data.Results[0].Survey;
                    $scope.Header = data.Results[0];
                })
                var predicate = { "SurveyHeaderId": { "==": SelectionApplicationService.GetSurveyHeaderId() } };
                SurveyDetailService.Search(predicate, ["Created desc"], 0, 100, false).then(function (data) {
                    $scope.Detail = data;
                });
                $scope.BeforeImage = "/api/v1/ImageApi/GetBeforeImage/" + SelectionApplicationService.GetSurveyHeaderId();
                $scope.AfterImage = "/api/v1/ImageApi/GetAfterImage/" + SelectionApplicationService.GetSurveyHeaderId();
            }
            else {
                var predicate = {
                    and: [
                       { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } },
                       { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } },
                       { "CustomerId": { '==': SelectionApplicationService.GetCustomerId() } },
                       { "LocationId": { "==": SelectionApplicationService.GetLocationId() } }
                    ]
                }
                SelectCustomerLocationProductQuestionService.Search(predicate, ["RowOrder desc"], 0, 100, false).then(function (data) {
                    $scope.Survey = data.Results[0].Survey;
                    $scope.Header.Address = data.Results[0].Location.Address;
                    $scope.Header.AreaManager = data.Results[0].Location.AreaManager;
                    $scope.Header.City = data.Results[0].Location.City;
                    $scope.Header.State = data.Results[0].Location.State;
                    $scope.Header.Zip = data.Results[0].Location.Zip;
                    $scope.Header.Phone = data.Results[0].Location.Phone;
                    $scope.Header.LocationName = data.Results[0].Location.Name;
                    $scope.Header.CustomerName = data.Results[0].Customer.Name;
                    $scope.Detail = data.Results;
                });
            }

            UserService.IsAdministrator(SelectionApplicationService.GetCompanyId()).then(function (data) {
                $scope.IsAdministrator = data;
            });
        }
        $scope.Search();

        $scope.sort = {
            column: ['RowOrder', 'Product.Name'],
            descending: false
        };
        $scope.changeSorting = function (column) {
            var sort = $scope.sort;

            if (sort.column[0] == column) {
                sort.descending = !sort.descending;
            } else {
                sort.column[0] = column;
                sort.descending = false;
            }
        };

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
                    });
                });
                var item = { Header: $scope.Header, Details: details };
                promise = SurveyHeaderService.UpdateBulk($scope.Header.Id, item).then(function(data){
                    promises.push(promise);
                    promise = ImageService.CreateBeforeImage($scope.Header.BeforeImage, data.data.Id);
                    promises.push(promise);
                    promise = ImageService.CreateAfterImage($scope.Header.AfterImage, data.data.Id);
                    promises.push(promise);
                    $q.all(promises).then(function () {
                        toastr.success("Save successful.");
                    });
                }, function (error) {
                    toastr.error(error);
                });
            }
            else {
                var details = [];
                var companyId = SelectionApplicationService.GetCompanyId();
                angular.forEach($scope.Detail, function (value, key) {
                    details.push({
                        CompanyId: companyId,
                        ProductId: value.Product.Id,
                        ProductTypeDetailId: value.ProductTypeDetail != null ? value.ProductTypeDetail.Id : null,
                        QuestionId: value.Question.Id,
                        Answer: value.Answer
                    });
                });
                var item = { Header: $scope.Header, Details: details };
                promise = SurveyHeaderService.CreateBulk(item).then(function (data) {
                    promise = ImageService.CreateBeforeImage($scope.Header.BeforeImage, data.data.Id);
                    promises.push(promise);
                    promise = ImageService.CreateAfterImage($scope.Header.AfterImage, data.data.Id);
                    promises.push(promise);
                    $q.all(promises).then(function () {
                        blockUIConfig.Message = 'Loading...';
                        toastr.success("Save successful.");
                        SelectionApplicationService.Clear();
                        SelectionApplicationService.SetRedirectState('main.survey');
                        $state.go('main.selectcompany');
                    });
                }, function(error){
                    toastr.error(error);
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
            if (SelectionApplicationService.GetSurveyHeaderId() != null ) {
                ImageService.DeleteBeforeImage(SelectionApplicationService.GetSurveyHeaderId()).then(function () {
                    $scope.Header.IsBeforeImage = false;
                    if (SelectionApplicationService.GetSurveyHeaderId() != null) {
                        SurveyHeaderService.Update($scope.Header.Id, $scope.Header).then(function () {

                        });
                    }
                });
            }
            else {
                $scope.Header.IsBeforeImage = false;
            }
        }

        $scope.DeleteAfterImage = function () {
            $scope.AfterImage = null;
            $scope.Header.AfterImage = null;
            if (SelectionApplicationService.GetSurveyHeaderId() != null) {
                ImageService.DeleteAfterImage(SelectionApplicationService.GetSurveyHeaderId()).then(function () {
                    $scope.Header.IsAfterImage = false;
                    if (SelectionApplicationService.GetSurveyHeaderId() != null) {
                        SurveyHeaderService.Update($scope.Header.Id, $scope.Header).then(function () {

                        });
                    }
                });
            }
            else {
                $scope.Header.IsAfterImage = false;
            }
        }

        $scope.OnBlur = function (event) {
            if (event.currentTarget.id.includes("input")) {
                $scope.previousElementId = event.currentTarget.id;
            }
        }

        $scope.NextInput = function () {
            var index = Number(parseInt($scope.previousElementId.substring(5, 7))) + Number(1);
            document.getElementById('input' + index).focus();
        }

        $scope.PrevInput = function () {
            var index = Number(parseInt($scope.previousElementId.substring(5, 7))) - Number(1);
            document.getElementById('input' + index).focus();
        }

        $timeout(function () {
            var element = document.getElementById('input0');
            if (element != null) {
                element.focus();
            }
        }, 500);
        
    }]);
})(moment);