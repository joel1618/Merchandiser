(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.selectcompany', {
            url: "/selectcompany/:redirectState",
            templateUrl: "ApplicationComponents/DataEntry/SelectCompany/SelectCompany.html"
        })
    });
    angular.module('Main').controller('SelectCompanyController', ['$scope', '$state', '$stateParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'blockUIConfig',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService', 'UserService', 'UserRoleService',
        'RoleService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze, blockUIConfig,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, UserRoleService,
        RoleService, SelectionApplicationService) {

        blockUIConfig.Message = 'Loading...';
        $scope.Search = function () {
            CompanyService.Search(null, ["Name desc"], 0, 20, false).then(function (data) {
                if (data.length == 1) {
                    $scope.Select(data[0]);
                }
                else {
                    $scope.Company = data;
                }
            });
        }
        $scope.Search();

        $scope.Select = function (item) {
            SelectionApplicationService.SetCompany(item);
            SelectionApplicationService.SetCompanyId(item.Id);
            $state.go('main.selectcustomer');
        }

        $scope.Continue = function () {
            $state.go('main.selectcustomer');
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