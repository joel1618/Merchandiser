(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('reportmain', {
            url: "/reportmain",
            templateUrl: "/App/ApplicationComponents/Report/Main/ReportMain.html"
        })
    });
    angular.module('Main').controller('ReportMainController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'ReportService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, ReportService) {
        $scope.Search = function () {
            ReportService.Search().then(function (data) {
                $scope.gridOptions.data = data;
                var keys = []
                var obj = $scope.gridOptions.data[0];
                for (var key in obj) {
                    keys.push(key)
                    if (key != 'Created' && !key.includes("Id")) {
                        $scope.gridOptions.columnDefs.push({
                            name: key
                        });
                    }
                }
                $scope.gridOptions.columnDefs.push({
                    name: 'Created', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">{{row.entity.Created | date: "MM/dd/yyyy h:mm:ss a": "UTC"}}</div>'
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
    }]);
})(moment);