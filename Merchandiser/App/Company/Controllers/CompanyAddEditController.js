(function (moment) {
    "use strict";    
    angular.module('Main').controller('CompanyAddEditController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'CompanyService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, CompanyService) {
        $scope.item = { Id : null, Name : ""}
        $scope.Search = function () {
            var p1 = new breeze.Predicate('Id', '==', $routeParams.id);
            CompanyService.Search(p1, 0, 1, false).then(function (data) {
                $scope.item = data;
            });
        }
        $scope.Search();

        $scope.Save = function () {
            if ($scope.item.Id !== null) {
                CompanyService.Update($scope.item.Id, $scope.item).then(function (data) {
                    $state.go('main.company', { }, { reload: true });
                }, function (error) {
                    alert(error);
                });
            }
            else {
                CompanyService.Create($scope.item).then(function (data) {
                    $state.go('main.company', { }, { reload: true });
                }, function (error) {
                    alert(error);
                });
            }
        }
    }]);

})(moment);