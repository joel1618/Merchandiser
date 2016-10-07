(function (moment) {
    "use strict";    
    angular.module('Main').controller('UserRoleController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'UserRoleService', 'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, UserRoleService, SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = new breeze.Predicate('CompanyId', '==', SelectionApplicationService.GetCompanyId());
            UserRoleService.Search(predicate, 0, 100, false).then(function (data) {
                $scope.gridOptions.data = data;
            });
        }
        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            data: [],
            columnDefs: [
                { name: 'Manage', width: '120',  cellTemplate: '<span class="btn btn-danger btn-sm" ng-click="grid.appScope.Delete(row.entity.Id)">Delete</span>' },
                { field: 'User.UserName', name: 'User', cellTooltip: true },
                { field: 'Role.Name', name: 'Role', cellTooltip: true },
                { field: 'Customer.Name', name: 'Customer', cellTooltip: true }
            ]
        };
        $scope.Search();

        $scope.Delete = function (Id) {
            UserRoleService.Delete(Id).then(function (data) {
                $scope.Search();
            }, function (error) {
                toastr.error(error.data.Message);
            });
        }
    }]);

})(moment);