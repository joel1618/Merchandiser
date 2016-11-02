
(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.report.surveyheaderreport', {
            url: "/surveyheaderreport",
            templateUrl: "ApplicationComponents/Reporting/SurveyHeader/SurveyHeaderReport.html"
        })
    });
    angular.module('Main').controller('SurveyHeaderReportController', ['$scope', '$q', '$state', '$stateParams', '$http', '$location', '$uibModal',
        '$timeout', 'breezeservice', 'breeze', 'ReportService', 'SurveyHeaderService', 'SelectionApplicationService', 'UserService',
        'LocationService', 'CustomerService', 'SurveyService', 'ImageService', 'DownloadService',
    function controller($scope, $q, $state, $stateParams, $http, $location, $uibModal,
        $timeout, breezeservice, breeze, ReportService, SurveyHeaderService, SelectionApplicationService, UserService,
        LocationService, CustomerService, SurveyService, ImageService, DownloadService) {
        if (SelectionApplicationService.GetCompanyId() == null) {
            $state.go('main.selectcompany');
        }

        $scope.StartDate = new Date(moment().startOf('isoWeek').format("YYYY-MM-DD 00:00:00"));
        $scope.EndDate = new Date(moment().add(2, "days").format("YYYY-MM-DD : 23:59:59"));
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
                   { "Company.Id": { "==": SelectionApplicationService.GetCompanyId() } },
                   { "Created": { ">=" : moment($scope.StartDate).format('YYYY-MM-DD')}},
                   { "Created": { "<=" : moment($scope.EndDate).format('YYYY-MM-DD')}}
                ]
            }
            SurveyHeaderService.Search(predicate, ["Created desc"], $scope.Page, 100, false).then(function (data) {
                $scope.data = data.Results;
            });
        }
        $scope.GetDataDown = function () {
            $scope.Page++;
            var predicate = {
                and: [
                   { "Company.Id": { "==": SelectionApplicationService.GetCompanyId() } },
                   { "Created": { ">=": moment($scope.StartDate).format('YYYY-MM-DD') } },
                   { "Created": { "<=": moment($scope.EndDate).format('YYYY-MM-DD') } }
                ]
            }
            SurveyHeaderService.Search(predicate, ["Created desc"], $scope.Page, 100, false).then(function (data) {
                $scope.gridApi.infiniteScroll.saveScrollPercentage();
                $scope.data = $scope.data.concat(data.Results);
                $scope.gridApi.infiniteScroll.dataLoaded(false, $scope.isMoreData(data.InlineCount));
            });
        }

        $scope.isMoreData = function(count){
            if (count > $scope.data.length) {
                return true;
            }
            return false;
        }

        $scope.data = [];
        $scope.gridOptions = {
            showGridFooter: true,
            enableFiltering: true,
            enableSorting: true,
            enableGridMenu: true,
            infiniteScrollRowsFromEnd: 50,
            data: 'data',
            columnDefs: [
                {
                    name: 'Detail', width: 65, cellTooltip: true, headerTooltip: true,
                    cellTemplate: '<button class="btn btn-primary btn-sm" ng-click="grid.appScope.ViewDetail(row.entity)">Detail</button>'
                },
                { name: 'Images/Notes', width: 65, cellTooltip: true, headerTooltip: true, cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/BeforeAfterNotes.html' },
                { field: 'Survey.Name', name: 'Survey Name', cellTooltip: true, headerTooltip: true },
                { field: 'Customer.Name', name: 'Customer Name', cellTooltip: true, headerTooltip: true },
                { field: 'Location.Name', name: 'Location Name', cellTooltip: true, headerTooltip: true },
                {
                    name: 'Created', cellTooltip: true, headerTooltip: true,
                    cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">{{row.entity.Created | dateLocalize | date: "MM/dd/yyyy h:mm:ss a"}}</div>'
                }
            ],
            onRegisterApi: function (gridApi) {
                gridApi.infiniteScroll.on.needLoadMoreData($scope, $scope.GetDataDown);
                //gridApi.options.loadTimeout = true;
                $scope.gridApi = gridApi;
            }
        };
        $scope.Search();

        $scope.ViewDetail = function (item) {
            SelectionApplicationService.SetSurveyHeaderId(item.Id);
            $state.go('main.report.surveyreport')
        }

        $scope.ViewNote = function (id) {
            SurveyHeaderService.Get(id).then(function (data) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ApplicationComponents/Reporting/Modal/Note/NoteModal.html',
                    controller: 'NoteModalController',
                    //size: 'lg',
                    resolve: {
                        note: function () {
                            return data.Notes;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    //modal closed
                }, function () {
                    //modal dismissed
                });
            });
        }

        $scope.ViewImage = function (id, title) {
            if (title == 'Before Image') {
                var image = "/api/v1/ImageApi/GetBeforeImage/" + id;
            }
            else {
                var image = "/api/v1/ImageApi/GetAfterImage/" + id;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'ApplicationComponents/Reporting/Modal/Image/ImageModal.html',
                controller: 'ImageModalController',
                //size: 'lg',
                resolve: {
                    title: function () {
                        return title;
                    },
                    image: function () {
                        return image
                    }
                }
            });

            modalInstance.result.then(function () {
                //modal closed
            }, function () {
                //modal dismissed
            });
        }
    }]);
})(moment);