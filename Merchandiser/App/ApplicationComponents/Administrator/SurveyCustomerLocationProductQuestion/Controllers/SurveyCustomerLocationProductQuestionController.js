(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.admin.surveycustomerlocationproductquestion', {
            url: "/survey/customerlocationproductquestion",
            templateUrl: "ApplicationComponents/Administrator/SurveyCustomerLocationProductQuestion/Views/SurveyCustomerLocationProductQuestion.html"
        })
    });
    angular.module('Main').controller('SurveyCustomerLocationProductQuestionController', ['$scope', '$state', '$routeParams',
        '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyCustomerLocationProductQuestionService',
        'SelectionApplicationService',
    function controller($scope, $state, $routeParams, 
    $http, $location, $timeout, breezeservice, breeze, SurveyCustomerLocationProductQuestionService,
        SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } }
            SurveyCustomerLocationProductQuestionService.Search(predicate, ["Created asc"], 0, 100, false).then(function (data) {
                $scope.gridOptions.data = data;
            });
        }
        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            data: [],
            columnDefs: [
                { name: 'Manage', width: '120', cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html' },
                { field: 'Customer.Name', name: 'Customer Name', cellTooltip: true },
                { field: 'Location.Name', name: 'Location Name', cellTooltip: true },
                { field: 'Product.Name', name: 'Product Name', cellTooltip: true },
                { field: 'Question.Name', name: 'Question Name', cellTooltip: true }
            ]
        };
        $scope.Search();

        $scope.Edit = function (row) {
            $state.go('main.admin.surveycustomerlocation.addedit', { id: row.Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            SurveyCustomerLocationProductQuestionService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);