(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.admin.surveycustomerlocationproductquestion2', {
            url: "/survey/surveycustomerlocationproductquestion2",
            templateUrl: "ApplicationComponents/Administrator/SurveyCustomerLocationProductQuestion/Views/SurveyCustomerLocationProductQuestion2.html"
        })
    });
    angular.module('Main').controller('SurveyCustomerLocationProductQuestionController2', ['$scope', '$state', '$routeParams', 'uiGridConstants',
        '$http', '$q', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyCustomerLocationProductQuestionService',
        'SelectionApplicationService',
    function controller($scope, $state, $routeParams, uiGridConstants,
    $http, $q, $location, $timeout, breezeservice, breeze, SurveyCustomerLocationProductQuestionService,
        SelectionApplicationService) {

    }]);

})(moment);