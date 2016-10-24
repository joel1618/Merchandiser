
(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.report.surveyheaderreport', {
            url: "/surveyheaderreport",
            templateUrl: "ApplicationComponents/Reporting/SurveyHeader/SurveyHeaderReport.html"
        })
    });
    angular.module('Main').controller('SurveyReportController', ['$scope', '$q', '$state', '$stateParams', '$http', '$location', '$uibModal',
        '$timeout', 'breezeservice', 'breeze', 'ReportService', 'SurveyHeaderService', 'SelectionApplicationService', 'UserService',
        'LocationService', 'CustomerService', 'SurveyService', 'MapService', 'ImageService', 'DownloadService',
    function controller($scope, $q, $state, $stateParams, $http, $location, $uibModal,
        $timeout, breezeservice, breeze, ReportService, SurveyHeaderService, SelectionApplicationService, UserService,
        LocationService, CustomerService, SurveyService, MapService, ImageService, DownloadService) {
        if (SelectionApplicationService.GetCompanyId() == null) {
            $state.go('main.selectcompany');
        }

        $scope.StartDate = new Date(moment().format("YYYY"), moment().format("MM") - 1, moment().startOf('isoWeek').format("DD"));
        $scope.EndDate = new Date(moment().format("YYYY"), moment().format("MM") - 1, moment().add(2, "days").format("DD"));
        $scope.myDate = new Date();
        $scope.MinDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() - 12,
            $scope.myDate.getDate());
        $scope.MaxDate = $scope.EndDate;
        $scope.DateChange = function () {
            $scope.Page = 0;
            $scope.data = [];
            $scope.gridOptions.columnDefs = [];
            $scope.Search();
        }

        $scope.Search = function () {
            var predicate = {
                and: [
                   { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } },
                   { "Created": { ">=" : moment($scope.StartDate).format('YYYY-MM-DD')}},
                   { "Created": { "<=" : moment($scope.EndDate).format('YYYY-MM-DD')}}
                ]
            }
            SurveyHeaderService.Search(predicate, ["Created desc"], $scope.Page, 100, false).then(function (data) {
                $scope.data = data;
            });
        }
        $scope.GetDataDown = function () {
            $scope.Page++;
            var predicate = {
                and: [
                   { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } },
                   { "Created": { ">=": moment($scope.StartDate).format('YYYY-MM-DD') } },
                   { "Created": { "<=": moment($scope.EndDate).format('YYYY-MM-DD') } }
                ]
            }
            SurveyHeaderService.Search(predicate, ["Created desc"], $scope.Page, 100, false).then(function (data) {
                $scope.gridApi.infiniteScroll.saveScrollPercentage();
                $scope.data = $scope.data.concat(data);
            });
        }

        $scope.data = [];
        $scope.gridOptions = {
            showGridFooter: true,
            enableFiltering: true,
            enableSorting: true,
            enableGridMenu: true,
            infiniteScrollRowsFromEnd: 100,
            data: 'data',
            columnDefs: [
                //{ name: 'Manage', width: '120', cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html' },
                //{ field: 'Name', name: 'Name', cellTooltip: true }
            ],
            onRegisterApi: function (gridApi) {
                gridApi.infiniteScroll.on.needLoadMoreData($scope, $scope.GetDataDown);
                $scope.gridApi = gridApi;
            }
        };
        $scope.Search();

        $scope.Select = function (item) {
            SelectionApplicationService.SetSurveyHeaderId(item.Id);
            $state.go('main.report.surveyreport')
        }
    }]);
})(moment);