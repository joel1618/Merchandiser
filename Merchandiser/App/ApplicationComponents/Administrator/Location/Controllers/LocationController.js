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
                { name: 'Manage', width: '120', cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html' },
                { field: 'Name', name: 'Name', cellTooltip: true },
                { field: 'Store', name: 'Store', cellTooltip: true },
                { field: 'AreaManager', name: 'Manager', cellTolltip: true, width: 100 },
                { field: 'Phone', name: 'Phone', cellTooltip: true, width: 100 },
                { field: 'Address', name: 'Address', cellTooltip: true },
                { field: 'City', name: 'City', cellTooltip: true, width: 125 },
                { field: 'State', name: 'State', cellTooltip: true, width: 75 },
                { field: 'Zip', name: 'Zip', cellTooltip: true, width: 75 }
            ]
        };
        $scope.Search();

        $scope.Edit = function (row) {
            $state.go('main.admin.location.addedit', { id: row.Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            LocationService.Delete(Id).then(function (data) {
                $scope.Search();
            }, function (error) {
                toastr.error(error.data, error.statusText);
            });
        }
    }]);

})(moment);