(function (moment) {
    "use strict";    
    angular.module('Main').controller('QuestionAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'QuestionService', 'CompanyApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, QuestionService, CompanyApplicationService) {
        CompanyApplicationService.NotifyObservers();        
        $scope.item = { Id : null, Name : ""}
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                QuestionService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                QuestionService.Update($scope.item.Id, $scope.item).then(function (data) {
                    $state.go('main.question.addedit', { }, { reload: true });
                }, function (error) {
                    alert(error);
                });
            }
            else {
                 $scope.item.CompanyId = CompanyApplicationService.SelectedCompany.Id;
                QuestionService.Create($scope.item).then(function (data) {
                    $state.go('main.question.addedit', { }, { reload: true });
                }, function (error) {
                    alert(error);
                });
            }
        }
    }]);

})(moment);