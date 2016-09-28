(function (moment) {
    "use strict";    
    angular.module('Main').controller('QuestionController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'QuestionService', 'CompanyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, QuestionService, CompanyApplicationService) {
        $scope.Search = function () {
            var predicate = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
            QuestionService.Search(predicate, 0, 100, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.admin.question.addedit', { id: Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            QuestionService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);