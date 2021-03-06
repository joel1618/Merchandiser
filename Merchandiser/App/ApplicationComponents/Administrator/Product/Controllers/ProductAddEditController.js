﻿(function (moment) {
    "use strict";    
    angular.module('Main').controller('ProductAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'ProductService', 'ProductCategoryService', 'ProductTypeHeaderService', 'SelectionApplicationService', 'blockUIConfig',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location,
        $timeout, breezeservice, breeze, ProductService, ProductCategoryService, ProductTypeHeaderService, SelectionApplicationService, blockUIConfig) {
       
        $scope.Init = function () {
            $scope.item = { Id: null, Name: "" }
            $scope.focus = true;
        }
        $scope.Init();
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                ProductService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.SearchProductCategories = function (value) {
            var predicate = {
                and: [
                   { "Name": { "substringof": value } },
                   { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } }
                ]
            }
            return ProductCategoryService.Search(predicate, ["Name asc"], 0, 20, false).then(function (data) {
                return data;
            });
        }

        $scope.SelectProductCategory = function (item, model, label) {
            $scope.item.ProductCategoryId = item.Id;
        }

        $scope.SearchProductTypes = function (value) {
            blockUIConfig.autoBlock = false;
            var predicate = {
                and: [
                   { "Name": { "substringof": value } },
                   { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } }
                ]
            }
            return ProductTypeHeaderService.Search(predicate, ["Name asc"], 0, 20, false).then(function (data) {
                blockUIConfig.autoBlock = true;
                return data;
            });
        }

        $scope.SelectProductType = function (item, model, label) {
            $scope.item.ProductTypeHeaderId = item.Id;
        }

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                ProductService.Update($scope.item.Id, $scope.item).then(function (data) {
                    var index = $scope.$parent.gridOptions.data.map(function (e) { return e.Id; }).indexOf(data.data.Id);
                    $scope.$parent.gridOptions.data.splice(index, 1, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
            else {
                $scope.item.CompanyId = SelectionApplicationService.GetCompanyId();
                ProductService.Create($scope.item).then(function (data) {
                    $scope.$parent.gridOptions.data.splice(0, 0, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
        }
    }]);

})(moment);