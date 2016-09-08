(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyProductQuestionAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyProductQuestionService',
        'CompanyApplicationService', 'SurveyApplicationService', 'ProductService','QuestionService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyProductQuestionService,
        CompanyApplicationService, SurveyApplicationService, ProductService, QuestionService) {

        CompanyApplicationService.NotifyObservers();
        SurveyApplicationService.NotifyObservers();

        $scope.Init = function(){
            $scope.item = { Id : null }
        }
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                SurveyProductQuestionService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.SearchProducts = function (value) {
            var p1 = new breeze.Predicate('Name', "substringof", value);
            var p2 = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
            var predicate = new breeze.Predicate.and([p1, p2]);
            return ProductService.Search(predicate, 0, 20, false).then(function (data) {
                return data;
            });
        }

        $scope.SelectProduct = function (item, model, label) {
            $scope.item.ProductId = item.Id;
        }

        $scope.SearchQuestions = function (value) {
            var p1 = new breeze.Predicate('Name', "substringof", value);
            var p2 = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
            var predicate = new breeze.Predicate.and([p1, p2]);
            return QuestionService.Search(predicate, 0, 20, false).then(function (data) {
                return data;
            });
        }

        $scope.SelectQuestion = function (item, model, label) {
            $scope.item.QuestionId = item.Id;
        }

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                SurveyProductQuestionService.Update($scope.item.Id, $scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    alert(error);
                });
            }
            else {
                $scope.item.CompanyId = CompanyApplicationService.SelectedCompany.Id;
                $scope.item.SurveyId = SurveyApplicationService.SelectedSurvey.Id;
                SurveyProductQuestionService.Create($scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    alert(error);
                });
            }
        }
    }]);

})(moment);