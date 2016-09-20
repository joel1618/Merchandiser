(function (moment) {
    "use strict";
    angular.module('Main').controller('UserRoleAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'UserRoleService', 'RoleService', 'CompanyApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location,
        $timeout, breezeservice, breeze, UserRoleService, RoleService, CompanyApplicationService) {
        CompanyApplicationService.NotifyObservers();

        $scope.Init = function () {
            $scope.item = { Id: null, Name: "" }
        }
        $scope.Init();
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                UserRoleService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
            RoleService.Search(null, 0, 5, false).then(function (data) {
                $scope.Roles = data;
            });
        }
        $scope.Search();

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                UserRoleService.Update($scope.item.Id, $scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    alert(error);
                });
            }
            else {
                $scope.item.CompanyId = CompanyApplicationService.SelectedCompany.Id;
                $scope.item.RoleId = $scope.item.Role.Id;
                UserRoleService.Create($scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    toastr.error("The username does not exist.");
                });
            }
        }
    }]);

})(moment);