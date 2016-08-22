﻿(function (moment) {
    "use strict";    
    angular.module('Main').controller('CompanyUserAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'CompanyUserService', 'CompanyApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, CompanyUserService, CompanyApplicationService) {
        CompanyApplicationService.NotifyObservers();
        $scope.item = { Id : null, Name : ""}
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                CompanyUserService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                CompanyUserService.Update($scope.item.Id, $scope.item).then(function (data) {
                    $state.go('main.companyuser.addedit', { }, { reload: true, inherit: false });
                }, function (error) {
                    alert(error);
                });
            }
            else {
                $scope.item.CompanyId = CompanyApplicationService.SelectedCompany.Id;
                CompanyUserService.Create($scope.item).then(function (data) {
                    $state.go('main.companyuser.addedit', {}, { reload: true, inherit: false });
                }, function (error) {
                    alert(error);
                });
            }
        }
    }]);

})(moment);