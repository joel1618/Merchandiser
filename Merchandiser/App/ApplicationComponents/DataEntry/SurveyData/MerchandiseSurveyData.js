(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('surveydata', {
            url: "/surveydata/",
            templateUrl: "/App/ApplicationComponents/DataEntry/SurveyData/MerchandiseSurveyData.html"
        })
    });
    angular.module('Main').controller('MerchandiseSurveyDataController', ['$scope', '$state', '$stateParams', '$http', '$location', '$timeout', 'uiGridConstants', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService',
        'UserService', 'SurveyCustomerLocationService', 'SurveyProductQuestionService', 'SurveyHeaderService', 'SurveyDetailService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, uiGridConstants, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService,
        UserService, SurveyCustomerLocationService, SurveyProductQuestionService, SurveyHeaderService, SurveyDetailService) {


        $scope.grid = {
            options: {
                showGridFooter: true,
                enableFiltering: true,
                enableSorting: true,
                headerTooltip: true,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                },
                enableGridMenu: true,
                exporterCsvFilename: 'data.csv',
                exporterPdfOrientation: 'portrait',
                exporterPdfPageSize: 'LETTER',
                exporterPdfMaxGridWidth: 450,
                data: null,
                columnDefs: [
                    { field: 'Id', displayName: '', width: '60', enableFiltering: false, enableSorting: false, cellTemplate: '<div><button class="btn btn-danger btn-sm" ng-click="grid.appScope.vm.functions.data.delete(row.entity.Id)">Delete</button></div>' },
                    { field: 'Id', headerTooltip: true, displayName: 'Id' },
                    //{ field: 'EmployeeId', cellTooltip: true, headerTooltip: true, displayName: 'Employee Id (unique)' },
                    //{ field: 'FirstName', cellTooltip: true, headerTooltip: true, displayName: 'First Name' },
                    //{ field: 'LastName', cellTooltip: true, headerTooltip: true, displayName: 'Last Name' },
                    //{ field: 'ElectionPeriod', cellTooltip: true, headerTooltip: true, displayName: 'Election Period (unique)', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.ElectionPeriod | date: "MM/dd/yyyy"}}</div>' },
                    //{ field: 'AmountDueDate', cellTooltip: true, headerTooltip: true, displayName: 'Amount Due Date', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.AmountDueDate | date: "MM/dd/yyyy"}}</div>' },
                    //{ field: 'SharesVesting', cellTooltip: true, headerTooltip: true, displayName: 'Shares Vesting' },
                    //{ field: 'IsViewed', cellTooltip: true, headerTooltip: true, displayName: 'Is Viewed' },
                    //{ field: 'ElectionType', cellTooltip: true, headerTooltip: true, displayName: 'Election Type' },
                    //{ field: 'Created', cellTooltip: true, headerTooltip: true, displayName: 'Created', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.Created | date: "MM/dd/yyyy"}}</div>' }
                ]
            }
        }

        $scope.Search = function () {
            
        }
    }]);
})(moment);