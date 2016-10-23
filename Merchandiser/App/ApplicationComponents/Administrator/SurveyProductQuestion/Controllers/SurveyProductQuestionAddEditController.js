(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyProductQuestionAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyProductQuestionService',
        'ProductService','QuestionService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyProductQuestionService,
        ProductService, QuestionService, SelectionApplicationService) {

        $scope.Init = function(){
            $scope.item = { Id: null }
            $scope.focus = true;
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
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                SurveyProductQuestionService.Update($scope.item.Id, $scope.item).then(function (data) {
                    var index = $scope.$parent.gridOptions.data.map(function (e) { return e.Id; }).indexOf(data.data.Id);
                    $scope.$parent.gridOptions.data.splice(index, 1, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
            else {
                $scope.item.CompanyId = SelectionApplicationService.GetCompanyId();
                $scope.item.SurveyId = SelectionApplicationService.GetSurveyId();
                $scope.item.RowOrder = $scope.$parent.gridOptions.data.length;
                SurveyProductQuestionService.Create($scope.item).then(function (data) {
                    $scope.$parent.gridOptions.data.splice($scope.$parent.gridOptions.data.length, 0, data.data);
                    $scope.$parent.gridOptions.gridApi.core.scrollTo($scope.gridOptions.data[$scope.gridOptions.data.length - 1], $scope.gridOptions.columnDefs[0]);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
        }
    }]);

})(moment);