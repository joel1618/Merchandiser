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
        'RoleService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, UserRoleService,
        RoleService, SelectionApplicationService) {

        $scope.Search = function () {
            var predicate = { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } };
            CustomerService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                if (data.length == 1) {
                    $scope.Select(data[0]);
                }
                else {
                    $scope.Customer = data;
                }
            });
        }
        $scope.Search();

        $scope.Select = function (item) {
            SelectionApplicationService.SetCustomer(item);
            SelectionApplicationService.SetCustomerId(item.Id);
            $state.go('main.selectlocation');
        }

        $scope.Continue = function () {
            $state.go('main.selectlocation');
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