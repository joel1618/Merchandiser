﻿(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyService', 'SelectionApplicationService', 'SurveyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyService, SelectionApplicationService, SurveyApplicationService) {
        $scope.Search = function () {
            var predicate = { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } }
            SurveyService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                $scope.items = data;
                if (data.length == 1) {
                    $scope.Select(data[0].Id);
                }
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.admin.survey.addedit', { id: Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            SurveyService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }

        $scope.Select = function (Id) {
            SurveyService.Get(Id).then(function (data) {
                SurveyApplicationService.SetSelectedSurvey(data);
                SelectionApplicationService.SetSurveyId(data.Id);
            });
        }
    }]);

})(moment);