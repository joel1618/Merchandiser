(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.admin.productcategory', {
            url: "/productcategory",
            templateUrl: "ApplicationComponents/Administrator/ProductCategory/Views/ProductCategory.html"
        })
    });
    angular.module('Main').controller('ProductCategoryController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'ProductCategoryService',
        'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, ProductCategoryService,
        SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } }
            ProductCategoryService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                $scope.gridOptions.data = data;

            });
        }
        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            data: [],
            columnDefs: [
                { name: 'Manage', cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html' },
                { field: 'Name', name: 'Product Category Name', cellTooltip: true }
            ]
        };
        $scope.Search();

        $scope.Edit = function (row) {
            $state.go('main.admin.productcategory.addedit', { id: row.Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            ProductCategoryService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);