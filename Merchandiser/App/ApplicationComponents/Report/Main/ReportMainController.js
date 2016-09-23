(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('reportmain', {
            url: "/reportmain/:companyId/:surveyId/:customerId/:locationId/:surveyHeaderId",
            templateUrl: "/App/ApplicationComponents/Report/Main/ReportMain.html"
        })
    });
    angular.module('Main').controller('ReportMainController', ['$scope', '$state', '$routeParams', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'ReportService','SurveyHeaderService',
    function controller($scope, $state, $routeParams, $http, $location,
        $timeout, breezeservice, breeze, ReportService, SurveyHeaderService) {
        $scope.Search = function () {
            ReportService.Search(null, null, null, null, null, null, null, 0, 10000).then(function (data) {
                $scope.gridOptions.data = data;
                $scope.gridOptions.columnDefs.push({
                    name: 'Manage', cellTemplate: '/App/ApplicationComponents/Report/Main/CellTemplates/EditDelete.html'
                });
                var keys = []
                var obj = $scope.gridOptions.data[0];
                for (var key in obj) {
                    keys.push(key)
                    if (key != 'Created' && !key.includes("Id")) {
                        $scope.gridOptions.columnDefs.push({
                            name: key, cellTooltip: true
                        });
                    }
                }
                $scope.gridOptions.columnDefs.push({
                    name: 'Created', cellTooltip: true, cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">{{row.entity.Created | date: "MM/dd/yyyy h:mm:ss a": "UTC"}}</div>'
                });
            });
        }
        $scope.Search();

        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            enableGridMenu: true,
            exporterCsvFilename: 'myFile.csv',
            exporterPdfOrientation: 'portrait',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 500,
            data: [],
            columnDefs: [
              //{ name: 'Id' },
              //{ name: 'ProductName' },
              //{ name: 'LocationName' },
              //{ name: 'CustomerName' },
              //{ name: 'Question' },
              //{ name: 'Answer' },
              //{ name: $scope.gridOptions.data[0] },
              //{ name: 'Created', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">{{row.entity.Created | date: "MM/dd/yyyy h:mm:ss a": "UTC"}}</div>' }
              //{ name: 'cumulativeWidgets', field: 'widgets', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">{{grid.appScope.cumulative(grid, row)}}</div>' }
            ]
        };

        $scope.Edit = function (row) {
            debugger;
            $state.go('survey', {
                companyId: row.CompanyId, surveyId: row.SurveyId,
                customerId: row.CustomerId, locationId: row.LocationId, surveyHeaderId: row.Id
            });
        }

        $scope.Delete = function(id){
            SurveyHeaderService.DeleteBulk(id).then(function (data) {
                var index = $scope.gridOptions.data.map(function (e) { return e.Id; }).indexOf(id);
                debugger;
                $scope.gridOptions.data.splice(index, 1);
            }, function (error) {
                toastr.error("There was an error deleting the survey data.");
            });
        }
    }]);
})(moment);