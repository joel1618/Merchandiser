﻿(function (moment) {
    "use strict";
    angular.module('Main').controller('UserRoleAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'UserRoleService', 'CustomerService', 'RoleService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location,
        $timeout, breezeservice, breeze, UserRoleService, CustomerService, RoleService, SelectionApplicationService) {
        $scope.Init = function () {
            $scope.item = { Id: null, Name: "" }
            $scope.focus = true;
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
            var predicate = { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } };
            CustomerService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                $scope.Customers = data;
            });
        }
        $scope.Search();

        $scope.Save = function () {
            if (!$scope.Validate()) {
                return false;
            }
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                UserRoleService.Update($scope.item.Id, $scope.item).then(function (data) {
                    var index = $scope.$parent.gridOptions.data.map(function (e) { return e.Id; }).indexOf(data.data.Id);
                    $scope.$parent.gridOptions.data.splice(index, 1, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error);
                });
            }
            else {
                $scope.item.CompanyId = SelectionApplicationService.GetCompanyId();
                $scope.item.RoleId = $scope.item.Role.Id;
                if ($scope.item.Customer != undefined) {
                    $scope.item.CustomerId = $scope.item.Customer.Id;
                }
                UserRoleService.Create($scope.item).then(function (data) {
                    $scope.$parent.gridOptions.data.splice(0, 0, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error);
                });
            }
        }

        $scope.Validate = function () {
            if ($scope.item.Role.Name != "Customer") {
                $scope.item.Customer = null;
            }

            if ($scope.item.Role.Name == "Customer" && $scope.item.Customer == null) {
                toastr.error("A customer must be selected.");
                return false;
            }
            return true;
        }
    }]);

})(moment);