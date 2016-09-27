(function (moment) {
    "use strict";
    angular.module('Main').controller('MainController', ['$scope', '$http', '$state', 'UserService', 'CompanyApplicationService', 'SurveyApplicationService', 'SelectionApplicationService',
    function controller($scope, $http, $state, UserService, CompanyApplicationService, SurveyApplicationService, SelectionApplicationService) {

        UserService.GetCurrentUsername().then(function(data){
            $scope.Username = data;
        });
        $scope.GoTo = function (state) {
            if (state == 'main.admin.company.addedit') {
                $state.go(state);
            }
            else {
                if (SelectionApplicationService.GetCompanyId() == null) {
                    $state.go('merchandise', { redirectState: state });
                }
                else {
                    if (state == 'main.survey') {
                        if (SelectionApplicationService.GetSurveyId() == null) {
                            $state.go('merchandise', { redirectState: state });
                        }
                        else {
                            $state.go(state);
                        }
                    }
                    else if (state == 'main.reportmain') {
                        $state.go(state);
                    }
                    else if (state == 'main.map') {
                        $state.go(state);
                    }
                }
            }
        }

        $scope.Logout = function () {
            $http.post('/Account/LogOff');
        }
    }]);

})(moment);