(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('merchandise', {
            url: "/merchandise",
            templateUrl: "/App/ApplicationComponents/DataEntry/CustomerLocation/MerchandiseCustomerLocation.html"
        })
    });
    angular.module('Main').controller('MerchandiseCustomerLocationController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService', 'UserService', 'UserRoleService', 'SurveyCustomerLocationService', 'CompanyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, UserRoleService, SurveyCustomerLocationService, CompanyApplicationService) {
        $scope.SelectedCompany = null;
        $scope.SelectedLocation = null;
        $scope.SelectedCustomer = null;
        $scope.SelectedSurvey = null;
        $scope.Search = function () {
            UserService.GetCurrentUser().then(function (data) {
                //http://stackoverflow.com/questions/18918470/breezejs-where-value-in-array
                var predicate = { "UserId": { "==": data } };
                //var predicate = { "UserId": { eq: { value: data, dataType: "Guid", isProperty: true } } };
                UserRoleService.SearchJson(predicate, 0, 100, false).then(function (data) {
                    var companies = data.map(function (e) { return e.CompanyId; });
                    CompanyService.SearchJson({ "Id": { in: companies } }, 0, 20, false).then(function (data) {
                        if (data.length == 1) {
                            $scope.Company = data;
                            $scope.SelectedCompany = data[0];
                            $scope.SelectCompany();
                        }
                        else {
                            $scope.Company = data;
                        }
                    }, function (error) {
                        debugger;
                    });
                }, function (error) {
                    debugger;
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
                customerId: $scope.SelectedCustomer.Customer.Id, locationId: $scope.SelectedLocation.Location.Id });
        }
    }]);
})(moment);