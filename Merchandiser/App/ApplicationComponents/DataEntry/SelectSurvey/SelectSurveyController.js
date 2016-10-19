(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.selectsurvey', {
            url: "/selectsurvey/:redirectState",
            templateUrl: "ApplicationComponents/DataEntry/SelectSurvey/SelectSurvey.html"
        })
    });
    angular.module('Main').controller('SelectSurveyController', ['$scope', '$state', '$stateParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService', 'UserService', 'UserRoleService',
        'RoleService', 'SurveyCustomerLocationService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, UserRoleService,
        RoleService, SurveyCustomerLocationService, SelectionApplicationService) {
        
        $scope.Survey = [];
        $scope.Search = function () {
            if(SelectionApplicationService.GetRedirectState() == 'main.survey') {
                var predicate = {
                    and: [
                       { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } },
                       { "CustomerId": { '==': SelectionApplicationService.GetCustomerId() } },
                       { "LocationId": { "==": SelectionApplicationService.GetLocationId() } }
                    ]
                }
                SurveyCustomerLocationService.Search(predicate, ["Created asc"], 0, 100, false).then(function (data) {
                    angular.forEach(data, function (value, key) {
                        $scope.Survey.push({
                            Id: value.Survey.Id,
                            Name: value.Survey.Name
                        })
                    });
                });
            }
            else {
                var predicate = {
                    and: [
                       { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } }
                    ]
                }
                SurveyService.Search(predicate, ["Created asc"], 0, 100, false).then(function (data) {
                    $scope.Survey = data;
                });
            }
        }
        $scope.Search();

        $scope.Select = function (item) {
            SurveyService.Get(item.Id).then(function (data) {
                SelectionApplicationService.SetSurvey(data);
                SelectionApplicationService.SetSurveyId(data.Id);
                $state.go(SelectionApplicationService.GetRedirectState());
            });
        }

        $scope.Continue = function () {
            $state.go(SelectionApplicationService.GetRedirectState());
        }

        $scope.IsContinueShown = function () {
            if (SelectionApplicationService.GetRedirectState() == 'main.survey') {
                return false;
            }
            else {
                return true;
            }
        }
    }]);
})(moment);