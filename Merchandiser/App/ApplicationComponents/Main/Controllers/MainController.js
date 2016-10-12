(function (moment) {
    "use strict";
    angular.module('Main').controller('MainController', ['$scope', '$http', '$window', '$state', 'UserService', 'SelectionApplicationService',
    function controller($scope, $http, $window, $state, UserService, SelectionApplicationService) {

        UserService.GetCurrentUsername().then(function(data){
            $scope.Username = data;
        });
        $scope.GoTo = function (state) {
            SelectionApplicationService.SetSurveyHeaderId(null);
            SelectionApplicationService.SetRedirectState(state);
            if (state == 'main.admin.company.addedit') {
                SelectionApplicationService.Clear();
                $state.go(state);
            }
            else {
                $state.go('main.selectcompany');
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