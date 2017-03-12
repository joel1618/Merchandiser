(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.admin.surveycustomerlocationproductquestion2.addedit', {
            url: "/addedit/:id",
            templateUrl: "ApplicationComponents/Administrator/SurveyCustomerLocationProductQuestion2/Views/SurveyCustomerLocationProductQuestionAddEdit2.html",
        })
    });
    angular.module('Main').controller('SurveyCustomerLocationProductQuestionAddEditController2', ['$scope', '$state', '$stateParams', '$routeParams',
    '$http', '$q', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyCustomerLocationProductQuestionService',
        'CustomerService', 'LocationService', 'ProductService', 'QuestionService', 'SelectionApplicationService', 'blockUIConfig',
    function controller($scope, $state, $stateParams, $routeParams,
        $http, $q, $location, $timeout, breezeservice, breeze, SurveyCustomerLocationProductQuestionService,
        CustomerService, LocationService, ProductService, QuestionService, SelectionApplicationService, blockUIConfig) {
            
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

        $scope.Search();
    }]);

})(moment);