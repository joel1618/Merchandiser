(function (moment) {
    "use strict";    
    angular.module('Main').controller('CompanyController', ['$scope', '$state', '$routeParams', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'CompanyService', 'CompanyApplicationService',
        'UserService', 'RoleService', 'UserRoleService', 'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location,
        $timeout, breezeservice, breeze, CompanyService, CompanyApplicationService,
        UserService, RoleService, UserRoleService, SelectionApplicationService) {
        $scope.Search = function () {
            CompanyService.AdminSearch(null, ["Name desc"], 0, 20, false).then(function (data) {
                $scope.items = data;
                if (data.length == 1) {
                    $scope.Select(data[0].Id);
                }
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.admin.company.addedit', { id: Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            CompanyService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
        
        $scope.Select = function (Id) {
            CompanyService.Get(Id).then(function (data) {
                //CompanyApplicationService.SetSelectedCompany(data);
                SelectionApplicationService.SetCompanyId(data.Id);
                SelectionApplicationService.SetCompany(data);
            });
        }
        
    }]);

})(moment);