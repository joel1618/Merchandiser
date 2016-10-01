(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.report.surveyreport', {
            url: "/surveyreport",
            templateUrl: "/App/ApplicationComponents/Reporting/Survey/SurveyReport.html"
        })
    });
    angular.module('Main').controller('SurveyReportController', ['$scope', '$state', '$stateParams', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'ReportService', 'SurveyHeaderService', 'SelectionApplicationService', 'UserService', 'LocationService',
    function controller($scope, $state, $stateParams, $http, $location,
        $timeout, breezeservice, breeze, ReportService, SurveyHeaderService, SelectionApplicationService, UserService, LocationService) {
        if (SelectionApplicationService.GetCompanyId() == null) {
            $state.go('main.merchandise', {
                redirectState: 'main.report.surveyreport'
            });
        }
        $scope.Search = function () {
            ReportService.Search(SelectionApplicationService.GetCompanyId(), null, SelectionApplicationService.GetCustomerId(), SelectionApplicationService.GetLocationId(), null, SelectionApplicationService.GetSurveyId(), null, 0, 10000).then(function (data) {
                $scope.gridOptions.data = data;
                UserService.IsAdministrator(SelectionApplicationService.GetCompanyId()).then(function (data) {
                    if (data == true) {
                        $scope.gridOptions.columnDefs.splice(0,0,{
                            name: 'Manage', cellTemplate: '/App/ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html'
                        });
                    }
                    else {
                        return UserService.IsDataEntry(SelectionApplicationService.GetCompanyId())
                    }
                }).then(function (data) {
                    if (data == true) {
                        $scope.gridOptions.columnDefs.splice(0, 0, {
                            name: 'Manage', cellTemplate: '/App/ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html'
                        });
                    }                    
                });
                $scope.gridOptions.columnDefs.push({
                    field: 'CustomerName', name: 'Customer Name', cellTooltip: true
                });
                $scope.gridOptions.columnDefs.push({
                    field: 'LocationName', name: 'Location Name', cellTooltip: true
                });
                $scope.gridOptions.columnDefs.push({
                    field: 'SurveyName', name: 'Survey Name', cellTooltip: true
                });
                $scope.gridOptions.columnDefs.push({
                    field: 'ProductName', name: 'Product Name', cellTooltip: true
                });
                var keys = []
                var obj = $scope.gridOptions.data[0];
                for (var key in obj) {
                    keys.push(key)
                    if ((key != 'Created' && !key.includes("Id") && !key.includes("Name"))) {
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
            columnDefs: []
        };

        $scope.Edit = function (row) {
            LocationService.Get(row.LocationId).then(function (data) {
                SelectionApplicationService.SetLocation(data);
                SelectionApplicationService.SetSurveyHeaderId(row.Id);
                $state.go('main.survey');
            });
        }

        $scope.Delete = function(id){
            SurveyHeaderService.DeleteBulk(id).then(function (data) {
                //var index = $scope.gridOptions.data.map(function (e) { return e.Id; }).indexOf(id);
                //$scope.gridOptions.data.splice(index, 1);
                $scope.Search();
            }, function (error) {
                toastr.error("There was an error deleting the survey data.");
            });
        }
    }]);
})(moment);