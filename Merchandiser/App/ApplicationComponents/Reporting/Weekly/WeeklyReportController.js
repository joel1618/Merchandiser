(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.report.weeklyreport', {
            url: "/weeklyreport",
            templateUrl: "/App/ApplicationComponents/Reporting/Weekly/WeeklyReport.html"
        })
    });
    angular.module('Main').controller('SurveyReportController', ['$scope', '$state', '$stateParams', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'ReportService', 'SurveyHeaderService', 'SelectionApplicationService', 'UserService', 'LocationService',
    function controller($scope, $state, $stateParams, $http, $location,
        $timeout, breezeservice, breeze, ReportService, SurveyHeaderService, SelectionApplicationService, UserService, LocationService) {

    }]);
})(moment);