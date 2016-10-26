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
        'RoleService', 'SurveyCustomerLocationProductQuestionService', 'SelectionApplicationService', 'SelectSurveyService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, UserRoleService,
        RoleService, SurveyCustomerLocationProductQuestionService, SelectionApplicationService, SelectSurveyService) {
        
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
                SelectSurveyService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                    $scope.Survey = data;
                });
            }
            else {
                var predicate = {
                    and: [
                       { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } }
                    ]
                }
                SurveyService.Search(predicate, ["Created asc"], 0, 100, false).then(function (data) {
                    if (SelectionApplicationService.GetRole() == "Customer") {
                        $state.go(SelectionApplicationService.GetRedirectState());
                    }
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