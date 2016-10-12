(function (moment) {
    "use strict";    
    angular.module('Main').controller('QuestionController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'QuestionService', 'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, QuestionService, SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } }
            QuestionService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                $scope.gridOptions.data = data;
            });
        }
        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            data: [],
            columnDefs: [
                { name: 'Manage', width: '120', cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html' },
                { field: 'Name', name: 'Customer Name', cellTooltip: true },
                { field: 'IsRequired', name: 'Required', cellTooltip: true},
                { field: 'IsTrueFalse', name: 'True False', cellTooltip: true}
            ]
        };
        $scope.Search();

        $scope.Edit = function (row) {
            $state.go('main.admin.question.addedit', { id: row.Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            QuestionService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);