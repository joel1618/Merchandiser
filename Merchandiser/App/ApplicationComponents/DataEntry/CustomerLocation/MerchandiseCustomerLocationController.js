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
        'RoleService', 'SurveyCustomerLocationService', 'CompanyApplicationService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, UserRoleService,
        RoleService, SurveyCustomerLocationService, CompanyApplicationService, SelectionApplicationService) {
        $scope.RedirectState = $stateParams.redirectState;
        $scope.SelectedCompany = { Id: null };
        $scope.IsAdministrator = false;
        $scope.SelectedLocation = { Location: { Id: null }, Id: null };
        $scope.SelectedCustomer = { Customer: { Id: null }, Id: null };
        $scope.SelectedSurvey = { Survey: { Id: null }, Id: null, SurveyId: null };
        $scope.UserId = null;
        $scope.Search = function () {
            UserService.GetCurrentUser().then(function (data) {
                $scope.UserId = data;
                var predicate = { "UserId": { "==": data } };
                UserRoleService.SearchJson(predicate, 0, 100, false).then(function (data) {
                    var companies = data.map(function (e) { return e.CompanyId; });
                    CompanyService.Search({ "Id": { in: companies } }, 0, 20, false).then(function (data) {
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
            SelectionApplicationService.SetCompanyId($scope.SelectedCompany.Id);
            $scope.CustomerSearch($scope.SelectedCompany.Id);
        }

        $scope.CustomerSearch = function (companyId) {
            //Admin for the selected company show all customers
            var promise = UserService.IsAdministrator(companyId);
            promise.then(function (data) {
                if (data == true) {
                    $scope.IsAdministrator = true;
                    var predicate = new breeze.Predicate('CompanyId', '==', companyId);
                    SurveyCustomerLocationService.SearchJson({ "CompanyId": { '==': companyId } }, ["Customer.Name asc"], 0, 20, false).then(function (data) {
                        $scope.Customer = data;
                    });
                }
                else {
                    return UserService.IsDataEntry(companyId);
                }
            }).then(function (data) {
                if (data == true) {
                    $scope.IsAdministrator = true;
                    var predicate = new breeze.Predicate('CompanyId', '==', companyId);
                    SurveyCustomerLocationService.SearchJson({ "CompanyId": { '==': companyId } }, ["Customer.Name asc"], 0, 20, false).then(function (data) {
                        $scope.Customer = data;
                    });
                }
                else {
                    return UserService.IsCustomer(companyId);
                }
            }).then(function (data) {
                if (data == true) {
                    var predicate = {
                        and: [
                           { "UserId": { "==": $scope.UserId } },
                           { "CompanyId": { '==': companyId } }
                        ]
                    }
                    UserRoleService.SearchJson(predicate, 0, 100, false).then(function (data) {
                        var customers = data.map(function (e) { return e.CustomerId; });
                        SurveyCustomerLocationService.SearchJson({ "CustomerId": { in: customers } }, ["Customer.Name asc"], 0, 20, false).then(function (data) {
                            if (data.length == 1) {
                                $scope.Customer = data;
                                $scope.SelectedCustomer = data[0];
                                $scope.SelectCustomer();
                            }
                            else {
                                $scope.Customer = data;
                            }
                        });
                    });
                }
            });
        }

        $scope.SelectCustomer = function () {
            SelectionApplicationService.SetCustomerId($scope.SelectedCustomer.Customer.Id);
            $scope.LocationSearch($scope.SelectedCompany.Id, $scope.SelectedCustomer.Customer.Id);
        }

        $scope.LocationSearch = function (companyId, customerId) {
            var predicate = {
                and: [
                   { "CompanyId": { "==": companyId } },
                   { "CustomerId": { '==': customerId } }
                ]
            }
            SurveyCustomerLocationService.SearchJson(predicate, ["Location.Name asc"], 0, 100, false).then(function (data) {
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
            SelectionApplicationService.SetLocationId($scope.SelectedLocation.Location.Id);
            $scope.SurveySearch($scope.SelectedCompany.Id, $scope.SelectedLocation.Location.Id, $scope.SelectedCustomer.Customer.Id);
        }

        $scope.SurveySearch = function (companyId, locationId, customerId) {
            var predicate = {
                and: [
                   { "CompanyId": { "==": companyId } },
                   { "CustomerId": { '==': customerId } },
                   { "LocationId": { "==": locationId } }
                ]
            }
            SurveyCustomerLocationService.SearchJson(predicate, ["Survey.Name asc"], 0, 100, false).then(function (data) {
                $scope.Survey = data;
            });
        }

        $scope.SelectSurvey = function () {
            SelectionApplicationService.SetSurveyId($scope.SelectedSurvey.SurveyId);
            $state.go($stateParams.redirectState);
        }

        $scope.IsGoShown = function () {
            if ($stateParams.redirectState == 'main.reportmain' || $stateParams.redirectState == 'main.map') {
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
                    if ($scope.SelectedCustomer.Id != null) {
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