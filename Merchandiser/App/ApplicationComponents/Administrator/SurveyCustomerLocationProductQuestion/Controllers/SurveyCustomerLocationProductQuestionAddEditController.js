﻿(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.admin.surveycustomerlocationproductquestion.addedit', {
            url: "/addedit/:id",
            templateUrl: "ApplicationComponents/Administrator/SurveyCustomerLocationProductQuestion/Views/SurveyCustomerLocationProductQuestionAddEdit.html",
        })
    });
    angular.module('Main').controller('SurveyCustomerLocationProductQuestionAddEditController', ['$scope', '$state', '$stateParams', '$routeParams',
    '$http', '$q', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyCustomerLocationProductQuestionService',
        'CustomerService', 'LocationService', 'ProductService', 'QuestionService', 'SelectionApplicationService', 'blockUIConfig',
    function controller($scope, $state, $stateParams, $routeParams,
        $http, $q, $location, $timeout, breezeservice, breeze, SurveyCustomerLocationProductQuestionService,
        CustomerService, LocationService, ProductService, QuestionService, SelectionApplicationService, blockUIConfig) {
        blockUIConfig.autoBlock = false;
        $scope.Init = function () {
            $scope.item = {
                Question: { Name: null },
                Location: { Name: null },
                Customer: { Name: null },
                Product: { Name: null },
                Id: null, CustomerId: null, LocationId: null, ProductId: null
            }
            $scope.itemCopy = {
                Question: { Name: null },
                Location: { Name: null },
                Customer: { Name: null },
                Product: { Name: null },
                Id: null, CustomerId: null, LocationId: null, ProductId: null
            }
            $scope.focus = true;
        }
        $scope.Init();
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                SurveyCustomerLocationProductQuestionService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.SearchCustomers = function (value) {
            var predicate = {
                and: [
                   { "Name": { "substringof": value } },
                   { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } }
                ]
            }
            return CustomerService.Search(predicate, ["Name asc"], 0, 20, false).then(function (data) {
                return data;
            });
        }

        $scope.SelectCustomer = function (item, model, label) {
            $scope.item.CustomerId = item.Id;
        }

        $scope.SelectCustomerCopy = function (item, model, label) {
            $scope.itemCopy.CustomerId = item.Id;
        }

        $scope.SearchLocations = function (value) {
            var predicate = {
                and: [
                   { "Name": { "substringof": value } },
                   { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } }
                ]
            }
            return LocationService.Search(predicate, ["Name asc"], 0, 20, false).then(function (data) {
                return data;
            });
        }

        $scope.SelectLocation = function (item, model, label) {
            $scope.item.LocationId = item.Id;
        }

        $scope.SelectLocationCopy = function (item, model, label) {
            $scope.itemCopy.LocationId = item.Id;
        }

        $scope.SearchProducts = function (value) {
            var predicate = {
                and: [
                   { "Name": { "substringof": value } },
                   { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } }
                ]
            }
            return ProductService.Search(predicate, ["Name asc"], 0, 20, false).then(function (data) {
                return data;
            });
        }

        $scope.SelectProduct = function (item, model, label) {
            $scope.item.ProductId = item.Id;
            $scope.item.ProductName = item.Name;
        }

        $scope.SelectProductCopy = function (item, model, label) {
            $scope.itemCopy.ProductId = item.Id;
            $scope.itemCopy.ProductName = item.Name;
        }

        $scope.SearchQuestions = function (value) {
            var predicate = {
                and: [
                   { "Name": { "substringof": value } },
                   { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } }
                ]
            }
            return QuestionService.Search(predicate, ["Name asc"], 0, 20, false).then(function (data) {

                return data;
            });
        }

        $scope.SelectQuestion = function (item, model, label) {
            $scope.item.QuestionId = item.Id;
        }

        $scope.Save = function () {
            blockUIConfig.autoBlock = true;
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                SurveyCustomerLocationProductQuestionService.Update($scope.item.Id, $scope.item).then(function (data) {
                    blockUIConfig.autoBlock = false;
                    var index = $scope.$parent.gridOptions.data.map(function (e) { return e.Id; }).indexOf(data.data.Id);
                    $scope.$parent.data.splice(index, 1, data.data);
                    $scope.Init();
                }, function (error) {
                    blockUIConfig.autoBlock = false;
                    toastr.error(error.data, error.statusText);
                });
            }
            else {
                $scope.item.CompanyId = SelectionApplicationService.GetCompanyId();
                $scope.item.SurveyId = SelectionApplicationService.GetSurveyId();
                SurveyCustomerLocationProductQuestionService.Create($scope.item).then(function (data) {
                    blockUIConfig.autoBlock = false;
                    $scope.$parent.data.splice(0, 0, data.data);
                    $scope.item.QuestionId = null; $scope.item.Question.Name = null;
                    //$scope.Init();
                }, function (error) {
                    blockUIConfig.autoBlock = false;
                    toastr.error(error.data, error.statusText);
                });
            }
        }

        $scope.Copy = function () {
            blockUIConfig.autoBlock = true;
            var predicate = {
                and: [
                   { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } },
                   { "SurveyId": { '==': SelectionApplicationService.GetSurveyId() } },
                   { "CustomerId": { '==': $scope.item.CustomerId } }
                ]
            }
            if ($scope.item.LocationId != null) { predicate.and.push({ "LocationId": { '==': $scope.item.LocationId } }) }
            if ($scope.item.ProductId != null) { predicate.and.push({ "ProductId": { '==': $scope.item.ProductId } }) }
            if ($scope.item.QuestionId != null) { predicate.and.push({ "QuestionId": { '==': $scope.item.QuestionId } }) }
            var promise = {}, promises = [];
            SurveyCustomerLocationProductQuestionService.Search(predicate, ["RowOrder asc"], 0, 100, false).then(function (data) {
                for (var i = 0; i < data.Results.length; i++) {
                    var item = {
                        CompanyId: SelectionApplicationService.GetCompanyId(),
                        SurveyId: SelectionApplicationService.GetSurveyId(),
                        RowOrder: data.Results[i].rowOrder,
                        CustomerId: $scope.itemCopy.CustomerId,
                        LocationId: $scope.itemCopy.LocationId,
                        ProductId: $scope.itemCopy.ProductId,
                        QuestionId: $scope.itemCopy.QuestionId,
                    }
                    if ($scope.itemCopy.LocationId == null) {
                        item.LocationId = data.Results[i].Location.Id;
                    }
                    if ($scope.itemCopy.ProductId == null) {
                        item.ProductId = data.Results[i].Product.Id;
                    }
                    if ($scope.itemCopy.QuestionId == null) {
                        item.QuestionId = data.Results[i].Question.Id;
                    }
                    promise = SurveyCustomerLocationProductQuestionService.Create(item).then(function (data) {

                    });
                    //$scope.$parent.gridOptions.data.push(data);
                    promises.push(promise);                   
                }
                $q.all(promises).then(function () {
                    blockUIConfig.autoBlock = false;
                    toastr.success("The specified survey data has been copied over.");
                    $scope.itemCopy = { Id: null }
                    $scope.$parent.Search();
                });
            });
        }
    }]);

})(moment);