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
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService', 'UserService', 'SurveyCustomerLocationService', 'CompanyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, SurveyCustomerLocationService, CompanyApplicationService) {
        $scope.SelectedCompany = null;
        $scope.SelectedLocation = null;
        $scope.SelectedCustomer = null;
        $scope.SelectedSurvey = null;
        $scope.Search = function () {
            UserService.GetCurrentUser().then(function (data) {
                var predicate = new breeze.Predicate('CreatedBy', '==', data);
                CompanyService.Search(null, 0, 20, false).then(function (data) {
                    if (data.length == 1) {
                        $scope.Company = data;
                        $scope.SelectedCompany = data[0];
                        $scope.SelectCompany();
                    }
                    else {
                        $scope.Company = data;
                    }
                });
            });
        }
        $scope.Search();

        $scope.SelectCompany = function () {
            $scope.LocationSearch($scope.SelectedCompany.Id);
        }

        $scope.LocationSearch = function (companyId) {
            var predicate = new breeze.Predicate('CompanyId', '==', companyId);
            SurveyCustomerLocationService.Search(predicate, 0, 100, false).then(function (data) {
                $scope.Location = data;
            });
        }

        $scope.SelectLocation = function () {
            $scope.CustomerSearch($scope.SelectedCompany.Id, $scope.SelectedLocation.Location.Id);
        }

        $scope.CustomerSearch = function (companyId, locationId) {
            var p1 = new breeze.Predicate('CompanyId', '==', companyId);
            var p2 = new breeze.Predicate('LocationId', '==', locationId);
            var predicate = new breeze.Predicate.and([p1, p2]);
            SurveyCustomerLocationService.Search(predicate, 0, 100, false).then(function (data) {
                $scope.Customer = data;
            });
        }

        $scope.SelectCustomer = function () {
            $scope.SurveySearch($scope.SelectedCompany.Id, $scope.SelectedLocation.Location.Id, $scope.SelectedCustomer.Customer.Id);
        }

        $scope.SurveySearch = function (companyId, locationId, customerId) {
            var p1 = new breeze.Predicate('CompanyId', '==', companyId);
            var p2 = new breeze.Predicate('LocationId', '==', locationId);
            var p3 = new breeze.Predicate('CustomerId', '==', customerId);
            var predicate = new breeze.Predicate.and([p1, p2, p3]);
            SurveyCustomerLocationService.Search(predicate, 0, 100, false).then(function (data) {
                $scope.Survey = data;
            });
        }

        $scope.SelectSurvey = function () {
            $state.go('survey', {
                companyId: $scope.SelectedCompany.Id, surveyId: $scope.SelectedSurvey.Survey.Id,
                customerId: $scope.SelectedCustomer.Id, locationId: $scope.SelectedLocation.Id });
        }
    }]);
})(moment);