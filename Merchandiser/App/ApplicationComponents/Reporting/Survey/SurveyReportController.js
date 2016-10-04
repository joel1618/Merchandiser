﻿(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.report.surveyreport', {
            url: "/surveyreport",
            templateUrl: "ApplicationComponents/Reporting/Survey/SurveyReport.html"
        })
    });
    angular.module('Main').controller('SurveyReportController', ['$scope', '$q', '$state', '$stateParams', '$http', '$location', '$uibModal',
        '$timeout', 'breezeservice', 'breeze', 'ReportService', 'SurveyHeaderService', 'SelectionApplicationService', 'UserService',
        'LocationService', 'CustomerService', 'SurveyService', 'MapService', 'ImageService', 'DownloadService',
    function controller($scope, $q, $state, $stateParams, $http, $location, $uibModal,
        $timeout, breezeservice, breeze, ReportService, SurveyHeaderService, SelectionApplicationService, UserService,
        LocationService, CustomerService, SurveyService, MapService, ImageService, DownloadService) {
        if (SelectionApplicationService.GetCompanyId() == null) {
            $state.go('main.merchandise', {
                redirectState: 'main.report.surveyreport'
            });
        }
        $scope.StartDate = moment().subtract(365, "days").format("YYYY-MM-DD");
        $scope.EndDate = moment().add(2, "days").format("YYYY-MM-DD");
        $scope.Page = 0;
        $scope.PageSize = 100;
        $scope.Search = function () {
            ReportService.Search(SelectionApplicationService.GetCompanyId(), null, SelectionApplicationService.GetCustomerId(),
                SelectionApplicationService.GetLocationId(), null, SelectionApplicationService.GetSurveyId(), null,
                $scope.StartDate, $scope.EndDate,
                $scope.Page, $scope.PageSize).then(function (data) {
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
                    $scope.gridOptions.columnDefs.splice(1, 0, {
                        name: 'Before', width: 75, cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/BeforeImage.html'
                    });
                    $scope.gridOptions.columnDefs.splice(2, 0, {
                        name: 'After', width: 75, cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/AfterImage.html'
                    });
                    $scope.gridOptions.columnDefs.splice(3, 0, {
                        name: 'Notes', width: 75, cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/Notes.html'
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

        $scope.GetDataDown = function () {
            $scope.Page++;
            ReportService.Search(SelectionApplicationService.GetCompanyId(), null, SelectionApplicationService.GetCustomerId(),
                SelectionApplicationService.GetLocationId(), null, SelectionApplicationService.GetSurveyId(), null,
                $scope.StartDate, $scope.EndDate,
                $scope.Page, $scope.PageSize).then(function (data) {
                    $scope.gridApi.infiniteScroll.saveScrollPercentage();
                    $scope.gridOptions.data.concat(data);
                });
        }
        
        $scope.gridOptions = {};
        $scope.gridOptions.data = [];
        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            enableGridMenu: true,
            infiniteScrollRowsFromEnd: 100,
            //exporterCsvFilename: 'myFile.csv',
            //exporterPdfOrientation: 'portrait',
            //exporterPdfPageSize: 'LETTER',
            //exporterPdfMaxGridWidth: 500,
            data: [],
            columnDefs: [],
            onRegisterApi: function (gridApi) {
                gridApi.infiniteScroll.on.needLoadMoreData($scope, $scope.GetDataDown);
                $scope.gridApi = gridApi;
            }
        };
        $scope.Search();

        $scope.Edit = function (row) {
            SelectionApplicationService.SetSurveyHeaderId(row.Id);
            var promises = [];
            promises.push(LocationService.Get(row.LocationId).then(function (data) {
                SelectionApplicationService.SetLocation(data);
            }));
            promises.push(CustomerService.Get(row.CustomerId).then(function (data) {
                SelectionApplicationService.SetCustomer(data);
            }));
            promises.push(SurveyService.Get(row.SurveyId).then(function (data) {
                SelectionApplicationService.SetSurvey(data);
            }));
            $q.all(promises).then(function () {
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

        $scope.ViewNote = function (id) {
            MapService.Get(id).then(function (data) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ApplicationComponents/Reporting/Modal/Note/NoteModal.html',
                    controller: 'NoteModalController',
                    size: 'lg',
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
                size: 'lg',
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

        $scope.Download = function () {
            window.open('/DownloadApi/Get/', '_blank', '');
        }
    }]);
})(moment);