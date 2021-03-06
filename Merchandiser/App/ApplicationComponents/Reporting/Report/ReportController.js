﻿(function (moment) {
    "use strict";    
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.report', {
            url: "/report",
            templateUrl: "ApplicationComponents/Reporting/Report/Report.html"
        })
    });
    angular.module('Main').controller('ReportController', ['$scope', '$state', 'SelectionApplicationService',
    function controller($scope, $state, SelectionApplicationService) {
        $scope.SelectedCompany = SelectionApplicationService.GetCompany();
        $scope.SelectedCustomer = SelectionApplicationService.GetCustomer();
        $scope.SelectedLocation = SelectionApplicationService.GetLocation();
        $scope.SelectedSurvey = SelectionApplicationService.GetSurvey();
        $scope.SelectedSurveyHeaderId = SelectionApplicationService.GetSurveyHeaderId();
        SelectionApplicationService.RegisterObserver(function () {
            $scope.SelectedSurveyHeaderId = SelectionApplicationService.GetSurveyHeaderId();
        })

        $scope.ClearSelectedSurveyHeaderId = function () {
            $scope.SelectedSurveyHeaderId = null;
            SelectionApplicationService.SetSurveyHeaderId(null);
            $state.go('main.report.surveyheaderreport');
        }
    }]);

})(moment);