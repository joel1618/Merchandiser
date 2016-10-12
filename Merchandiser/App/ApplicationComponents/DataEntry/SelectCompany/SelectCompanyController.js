(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.selectcompany', {
            url: "/selectcompany/:redirectState",
            templateUrl: "ApplicationComponents/DataEntry/SelectCompany/SelectCompany.html"
        })
    });
    angular.module('Main').controller('SelectCompanyController', ['$scope', '$state', '$stateParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService', 'UserService', 'UserRoleService',
        'RoleService', 'SurveyCustomerLocationService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, UserRoleService,
        RoleService, SurveyCustomerLocationService, SelectionApplicationService) {

        $scope.Search = function () {
            CompanyService.Search(null, ["Name desc"], 0, 20, false).then(function (data) {
                $scope.Company = data;
            });
        }
        $scope.Search();

        $scope.Select = function (item) {
            SelectionApplicationService.SetCompany(item);
            SelectionApplicationService.SetCompanyId(item.Id);
            $state.go('main.selectcustomer');
        }

        $scope.Go = function (item) {
            SelectionApplicationService.SetCompany(item);
            SelectionApplicationService.SetCompanyId(item.Id);
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