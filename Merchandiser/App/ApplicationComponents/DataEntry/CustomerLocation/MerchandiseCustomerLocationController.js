(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('merchandise', {
            url: "/merchandise/:redirectState",
            templateUrl: "/App/ApplicationComponents/DataEntry/CustomerLocation/MerchandiseCustomerLocation.html"
        })
    });
    angular.module('Main').controller('MerchandiseCustomerLocationController', ['$scope', '$state', '$stateParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService', 'UserService', 'UserRoleService',
        'RoleService', 'SurveyCustomerLocationService', 'CompanyApplicationService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, UserRoleService,
        RoleService, SurveyCustomerLocationService, CompanyApplicationService) {
        $scope.RedirectState = $stateParams.redirectState;
        $scope.SelectedCompany = { Id: null };
        $scope.IsAdministrator = false;
        $scope.SelectedLocation = { Location: { Id: null }, Id: null };
        $scope.SelectedCustomer = { Customer: { Id: null }, Id: null };
        $scope.SelectedSurvey = { Survey: { Id: null }, Id: null };
        $scope.UserId = null;
        $scope.Search = function () {
            UserService.GetCurrentUser().then(function (data) {
                $scope.UserId = data;
                var predicate = { "UserId": { "==": data } };
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
                    });
                });
            });
        }
        $scope.Search();

        $scope.SelectCompany = function () {
            $scope.CustomerSearch($scope.SelectedCompany.Id);
        }

        $scope.CustomerSearch = function (companyId) {
            var predicate = {
                or: [
                   { "Name": { '==': "Administrator" } },
                   { "Name": { '==': "Data Entry" } }
                ]
            }
            RoleService.SearchJson(predicate, 0, 2, false).then(function (data) {
                var roles = data.map(function (e) { return e.Id; });
                var predicate = {
                    and: [
                       { "UserId": { '==': $scope.UserId } },
                       { "RoleId": { in: roles } },
                       { "CompanyId": { '==': companyId } }
                    ]
                }
                UserRoleService.SearchJson(predicate, 0, 100, false).then(function (data) {
                    //Admin for the selected company show all customers
                    if (data.length > 0) {
                        $scope.IsAdministrator = true;
                        var predicate = new breeze.Predicate('CompanyId', '==', companyId);
                        SurveyCustomerLocationService.Search(predicate, 0, 100, false).then(function (data) {
                            $scope.Customer = data;
                        });
                    }
                    //Not an admin so must be a customer so only show customers they are associated with.
                    else {
                        var predicate = {
                            and: [
                               { "UserId": { "==": $scope.UserId } },
                               { "CompanyId": { '==': companyId } }
                            ]
                        }
                        UserRoleService.SearchJson(predicate, 0, 100, false).then(function (data) {
                            var customers = data.map(function (e) { return e.CustomerId; });
                            CustomerService.SearchJson({ "Id": { in: customers } }, 0, 20, false).then(function (data) {
                                $scope.Customer = data;
                            });
                        });
                    }
                });
            });         
        }

        $scope.SelectCustomer = function () {
            $scope.LocationSearch($scope.SelectedCompany.Id, $scope.SelectedCustomer.Customer.Id);
        }

        $scope.LocationSearch = function (companyId, customerId) {
            var p1 = new breeze.Predicate('CompanyId', '==', companyId);
            var p2 = new breeze.Predicate('CustomerId', '==', customerId);
            var predicate = new breeze.Predicate.and([p1, p2]);
            SurveyCustomerLocationService.Search(predicate, 0, 100, false).then(function (data) {
                $scope.Location = data;
            });
        }

        $scope.SelectLocation = function () {
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
            $state.go($stateParams.redirectState, {
                companyId: $scope.SelectedCompany.Id, surveyId: $scope.SelectedSurvey.Survey.Id,
                customerId: $scope.SelectedCustomer.Customer.Id, locationId: $scope.SelectedLocation.Location.Id
            });
        }

        $scope.IsGoShown = function () {
            if ($stateParams.redirectState == 'reportmain' || $stateParams.redirectState == 'map') {
                return true;
            }
            else {
                return false;
            }
        }

        $scope.IsGoDisabled = function () {
            if ($scope.SelectedCompany.Id != null) {
                if ($scope.IsAdministrator == true) {
                    return false;
                }
                else {
                    if ($scope.SelectCustomer.Id != null) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            }
            else {
                return true;
            }
        }
    }]);
})(moment);