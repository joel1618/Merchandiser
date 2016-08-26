(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyProductQuestionAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyProductQuestionService',
        'CompanyApplicationService', 'SurveyApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyProductQuestionService, 
    CompanyApplicationService, SurveyApplicationService) {
        CompanyApplicationService.NotifyObservers();
        SurveyApplicationService.NotifyObservers();
        $scope.item = { Id : null, Name : ""}
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                SurveyProductQuestionService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                SurveyProductQuestionService.Update($scope.item.Id, $scope.item).then(function (data) {
                    $state.go('main.surveyproductquestion.addedit', { }, { reload: true, inherit: false });
                }, function (error) {
                    alert(error);
                });
            }
            else {
                $scope.item.CompanyId = CompanyApplicationService.SelectedCompany.Id;
                SurveyProductQuestionService.Create($scope.item).then(function (data) {
                    $state.go('main.surveyproductquestion.addedit', {}, { reload: true, inherit: false });
                }, function (error) {
                    alert(error);
                });
            }
        }
    }]);

})(moment);