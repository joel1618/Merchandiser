(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyProductQuestionController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyProductQuestionService',
        'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyProductQuestionService,
        SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } }
            SurveyProductQuestionService.Search(predicate, ["Created asc"], 0, 100, false).then(function (data) {
                $scope.gridOptions.data = data;
            });
        }
        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            data: [],
            columnDefs: [
                { name: 'Manage', cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html' },
                { field: 'Product.Name', name: 'Product Name', cellTooltip: true },
                { field: 'Question.Name', name: 'Question Name', cellTooltip: true }
            ]
        };
        $scope.Search();

        $scope.Edit = function (row) {
            $state.go('main.admin.surveyproductquestion.addedit', { id: row.Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            SurveyProductQuestionService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);