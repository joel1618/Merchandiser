(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.report.locationreport', {
            url: "/locationreport",
            templateUrl: "ApplicationComponents/Reporting/Location/LocationReport.html"
        })
    });
    angular.module('Main').controller('LocationReportController', ['$scope', '$state', '$stateParams', 'NgMap', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'SurveyHeaderService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, NgMap, $http, $location,
        $timeout, breezeservice, breeze, SurveyHeaderService, SelectionApplicationService) {
        $scope.SelectedPosition = null;

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
            //$scope.gridOptions.columnDefs = [];
            $scope.Search();
        }

        $scope.Search = function () {
            var predicate = {
                and: [
                    { "Company.Id": { "==": SelectionApplicationService.GetCompanyId() } },
                    { "Created": { ">=": moment($scope.StartDate).format('YYYY-MM-DD') } },
                    { "Created": { "<=": moment($scope.EndDate).format('YYYY-MM-DD') } }
                ]
            }
            if (SelectionApplicationService.GetCustomerId() != null) { predicate.and.push({ "Customer.Id": { "==": SelectionApplicationService.GetCustomerId() } }) }
            if (SelectionApplicationService.GetLocationId() != null) { predicate.and.push({ "Location.Id": { "==": SelectionApplicationService.GetLocationId() } }) }
            if (SelectionApplicationService.GetSurveyId() != null) { predicate.and.push({ "Survey.Id": { "==": SelectionApplicationService.GetSurveyId() } }) }
            SurveyHeaderService.Search(predicate, ["Created desc"], 0, 100, false).then(function (data) {
                $scope.data = data;
            });
        }
        NgMap.getMap().then(function (map) {
            $scope.map = map;
        });
        $scope.Search();

        $scope.SelectPosition = function (position) {
            $scope.SelectedPosition = position;
            $scope.map.panTo({ lat: $scope.SelectedPosition.Latitude, lng: $scope.SelectedPosition.Longitude });
        }

        $scope.SelectMarker = function (event, marker) {
            $scope.SelectedPosition = marker;
        }
    }]);
})(moment);