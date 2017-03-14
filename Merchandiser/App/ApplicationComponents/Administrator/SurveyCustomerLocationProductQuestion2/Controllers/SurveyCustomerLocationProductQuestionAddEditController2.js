(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.admin.surveycustomerlocationproductquestion2.addedit', {
            url: "/addedit/:id",
            templateUrl: "ApplicationComponents/Administrator/SurveyCustomerLocationProductQuestion2/Views/SurveyCustomerLocationProductQuestionAddEdit2.html",
        })
    });
    angular.module('Main').controller('SurveyCustomerLocationProductQuestionAddEditController2', ['$scope', '$state', '$resource', '$stateParams', '$routeParams',
    '$http', '$q', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyCustomerLocationProductQuestionService',
        'CustomerService', 'LocationService', 'ProductService', 'QuestionService', 'SelectionApplicationService', 'blockUIConfig',
    function controller($scope, $state, $resource, $stateParams, $routeParams,
        $http, $q, $location, $timeout, breezeservice, breeze, SurveyCustomerLocationProductQuestionService,
        CustomerService, LocationService, ProductService, QuestionService, SelectionApplicationService, blockUIConfig) {
        
        $scope.Init = function () {
            blockUIConfig.autoBlock = true;
            $scope.BuildSurveyViewModel = {
                Customers: [],
                Locations: [],
                Products: [],
                Questions: [],
                PopulateExisting: false,
                SurveyId: SelectionApplicationService.GetSurveyId(),
                CompanyId: SelectionApplicationService.GetCompanyId()
            }
        }
        $scope.Init();

        $scope.Search = function () { 
            $scope.SearchCustomer();
            $scope.SearchLocation();
            $scope.SearchProduct();
            $scope.SearchQuestion();
        }
            
        var predicate = { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } };
        $scope.SearchCustomer = function () {
            CustomerService.Search(predicate, ["Created asc"], 0, 1000, false).then(function (data) {
                $scope.Customers = data;
            });
        }

        $scope.SearchLocation = function () {
            LocationService.Search(predicate, ["Created asc"], 0, 1000, false).then(function (data) { 
                $scope.Locations = data;
            });
        }

        $scope.SearchProduct = function () {
            ProductService.Search(predicate, ["Created asc"], 0, 1000, false).then(function (data) {
                $scope.Products = data;
            });
        }

        $scope.SearchQuestion = function () {
            QuestionService.Search(predicate, ["Created asc"], 0, 1000, false).then(function (data) {
                $scope.Questions = data;
            });
        }

        $scope.AddCustomer = function (item) {
            delete item.$id; delete item.$$hashKey; delete item.$type;
            $scope.BuildSurveyViewModel.Customers.push(item);
            $scope.Customers.splice($scope.Customers.indexOf(item), 1);
        }
        $scope.AddLocation = function (item) {
            delete item.$id; delete item.$$hashKey; delete item.$type;
            $scope.BuildSurveyViewModel.Locations.push(item);
            $scope.Locations.splice($scope.Locations.indexOf(item), 1);
        }
        $scope.AddProduct = function (item) {
            delete item.$id; delete item.$$hashKey; delete item.$type;
            $scope.BuildSurveyViewModel.Products.push(item);
            $scope.Products.splice($scope.Products.indexOf(item), 1);
        }
        $scope.AddQuestion = function (item) {
            delete item.$id; delete item.$$hashKey; delete item.$type;
            $scope.BuildSurveyViewModel.Questions.push(item);
            $scope.Questions.splice($scope.Questions.indexOf(item), 1);
        }

        $scope.Save = function () {
            $http.post('/breeze/BuildSurveyApi/Create', $scope.BuildSurveyViewModel).then(function () {
                toastr.success("Save successful");
                $scope.Init();
                $scope.$parent.Search();
            }, function () {
                toastr.error("There was an error");
            });
        }

        $scope.Search();
    }]);

})(moment);