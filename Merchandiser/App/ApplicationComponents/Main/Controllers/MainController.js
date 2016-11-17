(function (moment) {
    "use strict";
    angular.module('Main').controller('MainController', ['$scope', '$http', '$window', '$state', 'UserService', 'SelectionApplicationService',
    function controller($scope, $http, $window, $state, UserService, SelectionApplicationService) {

        UserService.GetCurrentUsername().then(function (data) {
            $scope.Username = data;
        });
        $scope.GoTo = function (state) {
            if (state == 'main.admin.company.addedit') {
                SelectionApplicationService.Clear();
                $state.go(state);
            }
            else {
                SelectionApplicationService.Clear();

                SelectionApplicationService.SetRedirectState(state);
                $state.go('main.selectcompany');
            }
        }

        $scope.Logout = function () {
            SelectionApplicationService.Clear();
            $http.post('/Account/LogOff').then(function (data) {
                $window.location.reload();
            });
        }

        SelectionApplicationService.RegisterObserver(function () {
            $scope.Role = SelectionApplicationService.GetRole();
        })
    }]);

})(moment);