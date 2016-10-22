(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyProductQuestionController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyProductQuestionService',
        'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyProductQuestionService,
        SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } }
            SurveyProductQuestionService.Search(predicate, ["RowOrder desc"], 0, 100, false).then(function (data) {
                $scope.gridOptions.data = data;
            });
        }
        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            onRegisterApi: function (gridApi) {
                gridApi.draggableRows.on.rowDropped($scope, function (info, dropTarget) {
                    //console.log("Dropped", info);
                    debugger;
                    alert('droppped');
                });
            },
            rowTemplate: '<div grid="grid" class="ui-grid-draggable-row" draggable="true"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader, \'custom\': true }" ui-grid-cell></div></div>',
            data: [],
            columnDefs: [
                { name: 'Manage', width: '120', cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html' },
                { field: 'Product.Name', name: 'Product Name', cellTooltip: true },
                { field: 'Question.Name', name: 'Question Name', cellTooltip: true },
                { field: 'RowOrder', name: 'Order', cellTooltip: true }
            ]
        };
        $scope.Search();

        $scope.Edit = function (row) {
            $state.go('main.admin.surveyproductquestion.addedit', { id: row.Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            SurveyProductQuestionService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);