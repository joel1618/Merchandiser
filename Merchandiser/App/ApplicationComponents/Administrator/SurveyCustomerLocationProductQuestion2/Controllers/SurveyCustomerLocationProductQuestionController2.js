(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.admin.surveycustomerlocationproductquestion2', {
            url: "/survey/surveycustomerlocationproductquestion2",
            templateUrl: "ApplicationComponents/Administrator/SurveyCustomerLocationProductQuestion2/Views/SurveyCustomerLocationProductQuestion2.html"
        })
    });
    angular.module('Main').controller('SurveyCustomerLocationProductQuestionController2', ['$scope', '$state', '$routeParams', 'uiGridConstants',
        '$http', '$q', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyCustomerLocationProductQuestionService',
        'SelectionApplicationService', 'BuildSurveyService',
    function controller($scope, $state, $routeParams, uiGridConstants,
    $http, $q, $location, $timeout, breezeservice, breeze, SurveyCustomerLocationProductQuestionService,
        SelectionApplicationService, BuildSurveyService) {

        $scope.SelectedCustomer = null;
        $scope.SelectedLocation = null;
        $scope.SelectedProduct = null;
        $scope.SelectedQuestion = null;

        $scope.Search = function () {
            $scope.SearchCustomer();
            $scope.SearchLocation();
            $scope.SearchProduct();
            $scope.SearchQuestion();
        }

        $scope.SearchCustomer = function () {
            var predicate = {
                and: [
                    {
                        or: [
                           { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } },
                           { "SurveyId": { "==": null } }
                        ]
                    },
                    { "CustomerId": { "!=": null } }
                ]
            }

            var sort = ["CustomerCreated desc"];
            BuildSurveyService.Search(predicate, sort, 0, 100, false).then(function (data) {
                $scope.Customers = data;
            });
        }

        $scope.SearchLocation = function () {
            var predicate = {
                and: [
                    {
                        or: [
                           { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } },
                           { "SurveyId": { "==": null } }
                        ]
                    },
                    { "LocationId": { "!=": null } }
                ]
            }
            var sort = ["LocationCreated desc"];
            BuildSurveyService.Search(predicate, sort, 0, 100, false).then(function (data) {
                $scope.Locations = data;
            });
        }

        $scope.SearchProduct = function () {
            var predicate = {
                and: [
                    {
                        or: [
                           { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } },
                           { "SurveyId": { "==": null } }
                        ]
                    },
                    { "ProductId": { "!=": null } }
                ]
            }
            var sort = ["ProductCreated desc"];
            BuildSurveyService.Search(predicate, sort, 0, 100, false).then(function (data) {
                $scope.Products = data;
            });
        }

        $scope.SearchQuestion = function () {
            var predicate = {
                and: [
                    {
                        or: [
                           { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } },
                           { "SurveyId": { "==": null } }
                        ]
                    },
                    { "QuestionId": { "!=": null } }
                ]
            }
            var sort = ["QuestionCreated desc"];
            BuildSurveyService.Search(predicate, sort, 0, 100, false).then(function (data) {
                $scope.Questions = data;
            });
        }

        $scope.AddCustomer = function (Id) {

        }

        $scope.DeleteCustomer = function (Id) {

        }

        $scope.AddLocation = function (Id) {

        }

        $scope.DeleteLocation = function (Id) {

        }

        $scope.AddProduct = function (Id) {

        }

        $scope.DeleteProduct = function (Id) {

        }

        $scope.AddQuestion = function (Id) {

        }

        $scope.DeleteQuestion = function (Id) {

        }


        $scope.Delete = function (Id) {
            SurveyCustomerLocationProductQuestionService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }

        $scope.Search();
    }]);

})(moment);