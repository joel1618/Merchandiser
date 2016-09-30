(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.merchandise', {
            url: "/merchandise/:redirectState",
            templateUrl: "/App/ApplicationComponents/DataEntry/CustomerLocation/MerchandiseCustomerLocation.html"
        })
    });
    angular.module('Main').controller('MerchandiseCustomerLocationController', ['$scope', '$state', '$stateParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService', 'UserService', 'UserRoleService',
        'RoleService', 'SurveyCustomerLocationService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, UserRoleService,
        RoleService, SurveyCustomerLocationService, SelectionApplicationService) {
        $scope.RedirectState = $stateParams.redirectState;
        $scope.SelectedCompany = { Id: null };
        $scope.IsAdministrator = false;
        $scope.SelectedLocation = { Location: { Id: null }, Id: null };
        $scope.SelectedCustomer = { Customer: { Id: null }, Id: null };
        $scope.SelectedSurvey = { Survey: { Id: null }, Id: null, SurveyId: null };
        $scope.UserId = null;
        $scope.Search = function () {
            CompanyService.Search(null, ["Name desc"], 0, 20, false).then(function (data) {
                if (data.length == 1) {
                    $scope.Company = data;
                    $scope.SelectedCompany = data[0];
                    $scope.SelectCompany();
                }
                else {
                    $scope.Company = data;
                }
            });
        }
        $scope.Search();

        $scope.SelectCompany = function () {
            SelectionApplicationService.SetCompanyId($scope.SelectedCompany.Id);
            $scope.CustomerSearch($scope.SelectedCompany.Id);
        }

        $scope.CustomerSearch = function (companyId) {
            var predicate = { "CompanyId": { '==': companyId } };
            CustomerService.Search(predicate, ["Name asc"], 0, 20, false).then(function (data) {
                $scope.Customer = data;
            });
        }

        $scope.SelectCustomer = function () {
            SelectionApplicationService.SetCustomer($scope.SelectedCustomer);
            SelectionApplicationService.SetCustomerId($scope.SelectedCustomer.Id);
            $scope.LocationSearch($scope.SelectedCompany.Id, $scope.SelectedCustomer.Id);
        }

        $scope.LocationSearch = function (companyId, customerId) {
            var predicate = { "CompanyId": { "==": companyId } }
            LocationService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                if (data.length == 1) {
                    $scope.Location = data;
                    $scope.SelectedLocation = data[0];
                    $scope.SelectLocation();
                }
                else {
                    $scope.Location = data;
                }
            });
        }

        $scope.SelectLocation = function () {            
            SelectionApplicationService.SetLocation($scope.SelectedLocation);
            SelectionApplicationService.SetLocationId($scope.SelectedLocation.Id);
            $scope.SurveySearch($scope.SelectedCompany.Id, $scope.SelectedCustomer.Id, $scope.SelectedLocation.Id);
        }

        $scope.SurveySearch = function (companyId, customerId, locationId) {
            var predicate = {
                and: [
                   { "CompanyId": { "==": companyId } },
                   { "CustomerId": { '==': customerId } },
                   { "LocationId": { "==": locationId } }
                ]
            }
            SurveyCustomerLocationService.Search(predicate, ["Created asc"], 0, 100, false).then(function (data) {
                $scope.Survey = data;
            });
        }

        $scope.SelectSurvey = function () {
            SelectionApplicationService.SetSurvey($scope.SelectedSurvey.Survey);
            SelectionApplicationService.SetSurveyId($scope.SelectedSurvey.SurveyId);
            $state.go($stateParams.redirectState);
        }

        $scope.IsGoShown = function () {
            if ($stateParams.redirectState == 'main.survey') {
                return false;
            }
            else {
                return true;
            }
        }
    }]);
})(moment);