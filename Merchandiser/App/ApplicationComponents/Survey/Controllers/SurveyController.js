(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyService', 'CompanyApplicationService', 'SurveyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyService, CompanyApplicationService, SurveyApplicationService) {
        $scope.Search = function () {
            var p1 = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
            //var p2 = new breeze.Predicate('Longitude', '<', 1);
            //var predicate = new breeze.Predicate.and([p1, p2]);
            SurveyService.Search(p1, 0, 20, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Create = function () {
            $state.go('main.survey.addedit', { id: null }, { reload: true });
        }

        $scope.Edit = function (Id) {
            $state.go('main.survey.addedit', { id: Id }, { reload: true });
        }

        $scope.Delete = function (Id) {
            SurveyService.Delete(Id).then(function (data) {
                $state.go('main.survey.addedit', { id: Id }, { reload: true });
            })
        }

        $scope.Select = function (Id) {
            SurveyService.Get(Id).then(function (data) {
                SurveyApplicationService.SetSelectedSurvey(data);
            });
        }
    }]);

})(moment);