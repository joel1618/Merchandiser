(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyProductQuestionController', ['$scope', '$state', '$q', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyProductQuestionService',
        'SelectionApplicationService',
    function controller($scope, $state, $q, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyProductQuestionService,
        SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } }
            SurveyProductQuestionService.Search(predicate, ["RowOrder asc"], 0, 100, false).then(function (data) {
                $scope.gridOptions.data = data.Results;
            });
        }
        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: false,
            onRegisterApi: function (gridApi) {
                $scope.gridOptions.gridApi = gridApi;
                gridApi.draggableRows.on.rowDropped($scope, function (info, dropTarget) {
                    $scope.Reorder();
                });
            },
            rowTemplate: '<div grid="grid" class="ui-grid-draggable-row" draggable="true"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader, \'custom\': true }" ui-grid-cell></div></div>',
            data: [],
            columnDefs: [
                { name: 'Manage', width: '120', cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html' },
                { field: 'Product.Name', name: 'Product Name', cellTooltip: true },
                { field: 'Question.Name', name: 'Question Name', cellTooltip: true },
                { field: 'RowOrder', width: '120', name: 'Order', cellTooltip: true }
            ]
        };
        $scope.Search();

        $scope.Edit = function (row) {
            $state.go('main.admin.surveyproductquestion.addedit', { id: row.Id }, { reload: false });
        }

        $scope.Reorder = function () {
            var promises = [], promise = {};
            for (var i = 0; i < $scope.gridOptions.data.length; i++) {
                var row = $scope.gridOptions.data[i];
                row.RowOrder = i
                var promise = SurveyProductQuestionService.Update(row.Id, row).then(function (data) {
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
                promises.push(promise);
            }
            $q.all(promises).then(function () {
                $scope.Search();
            });
        }

        $scope.Delete = function (Id) {
            SurveyProductQuestionService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);