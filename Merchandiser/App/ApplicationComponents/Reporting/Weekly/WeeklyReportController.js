(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.report.weeklyreport', {
            url: "/weeklyreport",
            templateUrl: "ApplicationComponents/Reporting/Weekly/WeeklyReport.html"
        })
    });
    angular.module('Main').controller('WeeklyReportController', ['$scope', '$state', '$stateParams', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'ReportService', 'SurveyHeaderService', 'SelectionApplicationService', 'UserService', 'LocationService',
    function controller($scope, $state, $stateParams, $http, $location,
        $timeout, breezeservice, breeze, ReportService, SurveyHeaderService, SelectionApplicationService, UserService, LocationService) {
        if (SelectionApplicationService.GetCompanyId() == null) {
            $state.go('main.merchandise', {
                redirectState: 'main.report.surveyreport'
            });
        }
        $scope.StartDate = moment().startOf('isoWeek').format("YYYY-MM-DD");
        $scope.EndDate = moment().add(1, "days").format("YYYY-MM-DD");

        $scope.Search = function () {
            ReportService.Search(SelectionApplicationService.GetCompanyId(), null, SelectionApplicationService.GetCustomerId(), SelectionApplicationService.GetLocationId(), null, SelectionApplicationService.GetSurveyId(), null, $scope.StartDate, $scope.EndDate, 0, 10000).then(function (data) {
                $scope.gridOptions.data = data;
                UserService.IsAdministrator(SelectionApplicationService.GetCompanyId()).then(function (data) {
                    if (data == true) {
                        $scope.gridOptions.columnDefs.splice(0, 0, {
                            name: 'Manage', width: 125, cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html'
                        });
                    }
                    else {
                        return UserService.IsDataEntry(SelectionApplicationService.GetCompanyId())
                    }
                }).then(function (data) {
                    if (data == true) {
                        $scope.gridOptions.columnDefs.splice(0, 0, {
                            name: 'Manage', width: 125, cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html'
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
                    name: 'Created', cellTooltip: true, cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">{{row.entity.Created | date: "MM/dd/yyyy h:mm:ss"}}</div>'
                });
            });
        }

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
        $scope.Search();

        $scope.Edit = function (row) {
            LocationService.Get(row.LocationId).then(function (data) {
                SelectionApplicationService.SetLocation(data);
                SelectionApplicationService.SetSurveyHeaderId(row.Id);
                $state.go('main.survey');
            });
        }

        $scope.Delete = function (id) {
            SurveyHeaderService.DeleteBulk(id).then(function (data) {
                var length = $scope.gridOptions.data.length;
                for (var index = 0; index < length; index++) {
                    if ($scope.gridOptions.data[index].Id == id) {
                        $scope.gridOptions.data.splice(index, 1);
                        length--;
                        index--;
                    }
                }
            }, function (error) {
                toastr.error("There was an error deleting the survey data.");
            });
        }
    }]);
})(moment);