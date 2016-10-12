(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.selectcustomer', {
            url: "/selectcustomer/:redirectState",
            templateUrl: "ApplicationComponents/DataEntry/SelectCustomer/SelectCustomer.html"
        })
    });
    angular.module('Main').controller('SelectCustomerController', ['$scope', '$state', '$stateParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService', 'UserService', 'UserRoleService',
        'RoleService', 'SurveyCustomerLocationService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, UserRoleService,
        RoleService, SurveyCustomerLocationService, SelectionApplicationService) {

        $scope.Search = function () {
            var predicate = { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } };
            CustomerService.Search(predicate, ["Name asc"], 0, 20, false).then(function (data) {
                $scope.Customer = data;
            });
        }
        $scope.Search();

        $scope.Select = function (item) {
            SelectionApplicationService.SetCustomer(item);
            SelectionApplicationService.SetCustomerId(item.Id);
            $state.go('main.selectlocation');
        }

        $scope.Go = function (item) {
            SelectionApplicationService.SetCustomer(item);
            SelectionApplicationService.SetCustomerId(item.Id);
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