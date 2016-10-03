(function (moment) {
    "use strict";    
    angular.module('Main').controller('LocationController', ['$scope', '$state', '$routeParams', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'LocationService', 'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location,
        $timeout, breezeservice, breeze, LocationService, SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } }
            LocationService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                $scope.gridOptions.data = data;
            });
        }
        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            data: [],
            columnDefs: [
                { name: 'Manage', cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html' },
                { field: 'Name', name: 'Customer Name', cellTooltip: true }
            ]
        };
        $scope.Search();

        $scope.Edit = function (row) {
            $state.go('main.admin.location.addedit', { id: row.Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            LocationService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);