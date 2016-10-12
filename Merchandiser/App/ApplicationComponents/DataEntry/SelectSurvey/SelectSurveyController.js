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
        
        $scope.Search = function () {
            var predicate = {
                and: [
                   { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } },
                   { "CustomerId": { '==': SelectionApplicationService.GetCustomerId() } },
                   { "LocationId": { "==": SelectionApplicationService.GetLocationId() } }
                ]
            }
            SurveyCustomerLocationService.Search(predicate, ["Created asc"], 0, 100, false).then(function (data) {
                $scope.Survey = data;
            });
        }
        $scope.Search();

        $scope.Select = function (item) {
            SelectionApplicationService.SetSurvey(item.Survey);
            SelectionApplicationService.SetSurveyId(item.Survey.Id);
            $state.go(SelectionApplicationService.GetRedirectState());
        }

        $scope.Go = function (item) {
            SelectionApplicationService.SetSurvey(item.Survey);
            SelectionApplicationService.SetSurveyId(item.Survey.Id);
            $state.go(SelectionApplicationService.GetRedirectState());
        }

        $scope.IsGoShown = function () {
            if (SelectionApplicationService.GetRedirectState() == 'main.survey') {
                return false;
            }
            else {
                return true;
            }
        }
    }]);
})(moment);