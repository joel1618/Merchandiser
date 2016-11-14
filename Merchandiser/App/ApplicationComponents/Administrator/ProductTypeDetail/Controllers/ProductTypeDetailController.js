(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.admin.producttypedetail', {
            url: "/producttypedetail",
            templateUrl: "ApplicationComponents/Administrator/ProductTypeDetail/Views/ProductTypeDetail.html"
        })
    });
    angular.module('Main').controller('ProductTypeDetailController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'ProductService',
        'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, ProductService,
        SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } }
            ProductService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
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
                { field: 'ProductCategory.Name', name: 'Category Name', cellTooltip: true }
            ]
        };
        $scope.Search();

        $scope.Edit = function (row) {
            $state.go('main.admin.product.addedit', { id: row.Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            ProductService.Delete(Id).then(function (data) {
                $scope.Search();
            }, function (error) {
                toastr.error(error.data, error.statusText);
            });
        }
    }]);

})(moment);