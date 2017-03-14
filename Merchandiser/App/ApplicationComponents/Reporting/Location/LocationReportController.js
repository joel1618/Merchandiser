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
        '$timeout', 'breezeservice', 'breeze', 'SurveyHeaderService', 'SelectUserService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, NgMap, $http, $location,
        $timeout, breezeservice, breeze, SurveyHeaderService, SelectUserService, SelectionApplicationService) {
        $scope.SelectedPosition = null;
        $scope.User = null;
        
        $scope.StartDate = SelectionApplicationService.GetStartDate();
        $scope.EndDate = SelectionApplicationService.GetEndDate();
        $scope.myDate = new Date();
        $scope.MinDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() - 12,
            $scope.myDate.getDate());
        $scope.MaxDate = $scope.EndDate;
        $scope.DateChange = function () {
            SelectionApplicationService.SetStartDate($scope.StartDate);
            SelectionApplicationService.SetEndDate($scope.EndDate);
            $scope.Page = 0;
            $scope.data = [];
            $scope.Search();
        }
        var predicate = {
            and: [
                { "Company.Id": { "==": SelectionApplicationService.GetCompanyId() } }
            ]
        }

        $scope.Search = function () {
            predicate.and.length = 1;
            predicate.and.push({ "Created": { ">=": moment($scope.StartDate).format('YYYY-MM-DD') } });
            predicate.and.push({ "Created": { "<=": moment($scope.EndDate).format('YYYY-MM-DD') } });
            if ($scope.User != null && $scope.User.Id != null) { predicate.and.push({ "CreatedBy": { "==": $scope.User.Id } }) }
            if (SelectionApplicationService.GetCustomerId() != null) { predicate.and.push({ "Customer.Id": { "==": SelectionApplicationService.GetCustomerId() } }) }
            if (SelectionApplicationService.GetLocationId() != null) { predicate.and.push({ "Location.Id": { "==": SelectionApplicationService.GetLocationId() } }) }
            if (SelectionApplicationService.GetSurveyId() != null) { predicate.and.push({ "Survey.Id": { "==": SelectionApplicationService.GetSurveyId() } }) }
            SurveyHeaderService.Search(predicate, ["Created desc"], 0, 100, false).then(function (data) {
                $scope.data = data.Results;
            });
        }

        $scope.SearchUsers = function(){
            var predicateUser = {
                and: [
                    { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } }
                ]
            }
            SelectUserService.Search(predicateUser, ["LastName asc"], 0, 100, false).then(function (data) {
                $scope.users = data.Results;
            })
        }

        $timeout(
        NgMap.getMap().then(function (map) {
            $scope.map = map;
        }), 1000);
        $scope.Search();
        $scope.SearchUsers();

        $scope.SelectPosition = function (position) {
            $scope.SelectedPosition = position;
            $scope.map.panTo({ lat: $scope.SelectedPosition.Latitude, lng: $scope.SelectedPosition.Longitude });
        }

        $scope.SelectMarker = function (event, marker) {
            $scope.SelectedPosition = marker;
        }
    }]);
})(moment);