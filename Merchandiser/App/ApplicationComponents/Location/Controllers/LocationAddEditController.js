﻿(function (moment) {
    "use strict";    
    angular.module('Main').controller('LocationAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'LocationService', 'CompanyApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, LocationService, CompanyApplicationService) {
        CompanyApplicationService.NotifyObservers();
        $scope.item = { Id : null, Name : ""}
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                LocationService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                LocationService.Update($scope.item.Id, $scope.item).then(function (data) {
                    $state.go('main.location.addedit', { }, { reload: true });
                }, function (error) {
                    alert(error);
                });
            }
            else {
                $scope.item.CompanyId = CompanyApplicationService.SelectedCompany.Id;
                LocationService.Create($scope.item).then(function (data) {
                    $state.go('main.location.addedit', {}, { reload: true });
                }, function (error) {
                    alert(error);
                });
            }
        }
    }]);

})(moment);