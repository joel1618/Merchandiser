﻿(function (moment) {
    "use strict";
    angular.module('Main').controller('MainController', ['$scope', '$http', '$window', '$state', 'UserService', 'SelectionApplicationService',
    function controller($scope, $http, $window, $state, UserService, SelectionApplicationService) {

        UserService.GetCurrentUsername().then(function(data){
            $scope.Username = data;
        });
        $scope.GoTo = function (state) {
            SelectionApplicationService.SetSurveyHeaderId(null);
            if (state == 'main.admin.company.addedit') {
                SelectionApplicationService.Clear();
                $state.go(state);
            }
            else {
                if (SelectionApplicationService.GetCompanyId() == null) {
                    $state.go('main.merchandise', { redirectState: state });
                }
                else {
                    if (state == 'main.survey') {
                        $state.go('main.merchandise', { redirectState: state });
                        //if (SelectionApplicationService.GetSurveyId() == null) {
                        //    $state.go('main.merchandise', { redirectState: state });
                        //}
                        //else {
                        //    $state.go(state);
                        //}
                    }
                    else if (state == 'main.report.surveyreport') {
                        $state.go('main.merchandise', { redirectState: state });
                        //$state.go(state);
                    }
                    else if (state == 'main.map') {
                        $state.go('main.merchandise', { redirectState: state });
                        //$state.go(state);
                    }
                }
            }
        }

        $scope.Logout = function () {
            SelectionApplicationService.Clear();
            $http.post('/Account/LogOff').then(function(data){
                $window.location.reload();
            });
        }
    }]);

})(moment);