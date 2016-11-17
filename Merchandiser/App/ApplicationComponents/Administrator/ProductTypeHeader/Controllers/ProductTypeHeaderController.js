(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.admin.producttypeheader', {
            url: "/producttypeheader",
            templateUrl: "ApplicationComponents/Administrator/ProductTypeHeader/Views/ProductTypeHeader.html"
        })
    });
    angular.module('Main').controller('ProductTypeHeaderController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'ProductTypeHeaderService',
        'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, ProductTypeHeaderService,
        SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } }
            ProductTypeHeaderService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                $scope.gridOptions.data = data;
                if (data != null && data.length == 1) {
                    $scope.Select(data[0].Id);
                }

            });
        }
        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            data: [],
            columnDefs: [
                { name: 'Manage', width: '180', cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/SelectEditDelete.html' },
                { field: 'Name', name: 'Name', cellTooltip: true }
            ]
        };
        $scope.Search();

        $scope.Edit = function (row) {
            $state.go('main.admin.producttypeheader.addedit', { id: row.Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            ProductTypeHeaderService.Delete(Id).then(function (data) {
                $scope.Search();
            }, function (error) {
                toastr.error(error.data, error.statusText);
            });
        }

        $scope.Select = function (Id) {
            ProductTypeHeaderService.Get(Id).then(function (data) {
                SelectionApplicationService.SetProductTypeHeader(data);
            });
        }
    }]);

})(moment);