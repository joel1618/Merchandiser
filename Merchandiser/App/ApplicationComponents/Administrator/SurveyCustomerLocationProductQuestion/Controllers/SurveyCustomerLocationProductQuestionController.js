(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.admin.surveycustomerlocationproductquestion', {
            url: "/survey/customerlocationproductquestion",
            templateUrl: "ApplicationComponents/Administrator/SurveyCustomerLocationProductQuestion/Views/SurveyCustomerLocationProductQuestion.html"
        })
    });
    angular.module('Main').controller('SurveyCustomerLocationProductQuestionController', ['$scope', '$state', '$routeParams',
        '$http', '$q', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyCustomerLocationProductQuestionService',
        'SelectionApplicationService',
    function controller($scope, $state, $routeParams,
    $http, $q, $location, $timeout, breezeservice, breeze, SurveyCustomerLocationProductQuestionService,
        SelectionApplicationService) {
        $scope.Page = 0;
        var predicate = {
            and: [
                { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } }
            ]
        }
        $scope.Search = function () {
            SurveyCustomerLocationProductQuestionService.Search(predicate, ["RowOrder asc"], 0, 100, false).then(function (data) {
                $scope.data = data.Results;
            });
        }
        $scope.gridOptions = {
            showGridFooter: true,
            enableFiltering: true,
            enableSorting: true,
            data: 'data',
            columnDefs: [
                { name: 'Manage', width: '120', cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html' },
                { field: 'Customer.Name', name: 'Customer Name', cellTooltip: true },
                { field: 'Location.Name', name: 'Location Name', cellTooltip: true },
                { field: 'Product.Name', name: 'Product Name', cellTooltip: true },
                { field: 'Question.Name', name: 'Question Name', cellTooltip: true },
                { field: 'RowOrder', width: '120', name: 'Order', cellTooltip: true }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                gridApi.draggableRows.on.rowDropped($scope, function (info, dropTarget) {
                    //$scope.Reorder();
                });
                gridApi.core.on.filterChanged($scope, function (column) {
                    var grid = this.grid;
                    if (angular.isDefined($scope.filterTimeout)) {
                        $timeout.cancel($scope.filterTimeout);
                    }
                    $scope.filterTimeout = $timeout(function () {
                        $scope.filterChanged(grid.columns);
                    }, 1000);
                });

                gridApi.infiniteScroll.on.needLoadMoreData($scope, $scope.GetDataDown);
            },
            rowTemplate: '<div grid="grid" class="ui-grid-draggable-row" draggable="true"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader, \'custom\': true }" ui-grid-cell></div></div>',
        };
        $scope.Search();

        $scope.filterChanged = function (gridColumns) {
            var equalsColumns = ["RowOrder"];
            predicate.and.length = 1;
            angular.forEach(gridColumns, function (column) {
                if (typeof column.filters !== 'undefined' && column.filters !== null &&
                        column.filters.length > 0 && column.filters[0].term != null && column.filters[0].term.trim().length > 0) {

                    var operandName = "contains"; var fieldName = column.field; var termName = column.filters[0].term;
                    if (equalsColumns.contains(column.field)) {
                        operandName = "==";
                    }
                    var filter = {};
                    var field = {}
                    field[operandName] = termName;
                    filter[fieldName] = field;
                    predicate.and.push(filter);
                }
            });
            $scope.Search();
        }

        $scope.GetDataDown = function () {
            $scope.Page++;
            SurveyCustomerLocationProductQuestionService.Search(predicate, ["Created desc"], $scope.Page, 100, false).then(function (data) {
                $scope.gridApi.infiniteScroll.saveScrollPercentage();
                $scope.data = $scope.data.concat(data.Results);
                $scope.gridApi.infiniteScroll.dataLoaded(false, $scope.isMoreData(data.InlineCount));
            });
        }

        $scope.isMoreData = function (count) {
            if (count > $scope.data.length) {
                return true;
            }
            return false;
        }

        $scope.Edit = function (row) {
            $state.go('main.admin.surveycustomerlocationproductquestion.addedit', { id: row.Id }, { reload: false });
        }

        //TODO: Reorder button.  Don't do on drop.  
        $scope.Reorder = function () {
            //validate
            if (!$scope.ValidateForOrdering()) {
                return;
            }
            //reorder
            var promises = [], promise = {};
            for (var i = 0; i < $scope.data.length; i++) {
                var row = $scope.data[i];
                row.RowOrder = i
                var promise = SurveyCustomerLocationProductQuestionService.Update(row.Id, row).then(function (data) {
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
                promises.push(promise);
            }
            $q.all(promises).then(function () {
                $scope.Search();
            });
        }

        //TODO: Button and group by customer location and filter based on current selection.  Need validation as well in there.
        $scope.ReorderAll = function () {
            //validate
            if (!$scope.ValidateForOrdering()) {
                return;
            }
            var promise = {}, promises = [];
            angular.forEach($scope.data, function (item, index) {
                var predicate = {
                    and: [
                        { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } },
                        { "ProductId": { "==": item.ProductId } },
                        { "QuestionId": { "==": item.QuestionId } }
                    ]
                }
                promise = SurveyCustomerLocationProductQuestionService.Search(predicate, ["Created asc"], 0, 100, false).then(function (data) {
                    for (var j = 0; j < data.Results.length; j++) {
                        var row = data.Results[j];
                        row.RowOrder = index;
                        SurveyCustomerLocationProductQuestionService.Update(row.Id, row).then(function (data) {

                        });
                    }
                });
                promises.push(promise);
                $q.all(promises).then(function () {
                    $scope.Search();
                })
            });
        }

        $scope.ValidateForOrdering = function () {
            var customer = $scope.data[0].CustomerId;
            var location = $scope.data[0].LocationId;
            for (var i = 0; i < $scope.data.length; i++) {
                if (customer != $scope.data[i].CustomerId) {
                    toastr.error("The grouping does not contain just one customer.  Please filter down to just one customer first before ordering.");
                    return false;
                }
                if (location != $scope.data[i].LocationId) {
                    toastr.error("The grouping does not contain just one location.  Please filter down to just one location first before ordering.");
                    return false;
                }
            }
            return true;
        }

        $scope.Delete = function (Id) {
            SurveyCustomerLocationProductQuestionService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);