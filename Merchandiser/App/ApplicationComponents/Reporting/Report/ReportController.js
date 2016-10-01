(function (moment) {
    "use strict";    
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.report', {
            url: "/report",
            templateUrl: "/App/ApplicationComponents/Reporting/Report/Report.html"
        })
    });
    angular.module('Main').controller('ReportController', ['$scope', '$state', 'SelectionApplicationService',
    function controller($scope, $state, SelectionApplicationService) {
    }]);

})(moment);