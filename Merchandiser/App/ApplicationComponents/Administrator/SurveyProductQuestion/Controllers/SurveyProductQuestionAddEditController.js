(function (moment) {
    "use strict";
    angular.module('Main').controller('SurveyProductQuestionAddEditController', ['$scope', '$q', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyProductQuestionService',
        'ProductService', 'QuestionService', 'SelectionApplicationService',
    function controller($scope, $q, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyProductQuestionService,
        ProductService, QuestionService, SelectionApplicationService) {

        $scope.Init = function () {
            $scope.item = { Id: null }
            $scope.focus = true;
            $scope.copyItem = { Id: null }
        }
        $scope.Init();
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
            $scope.item.ProductName = item.Name;
        }

        $scope.SelectCopyProduct = function (item, model, label) {
            $scope.copyItem.ProductId = item.Id;
            $scope.copyItem.ProductName = item.Name;
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

        $scope.CopyQuestion = function () {
            var promise = {}, promises = [];
            var predicate = {
                and: [
                   { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } },
                   { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } }
                ]
            }
            SurveyProductQuestionService.Search(predicate, ["RowOrder asc"], 0, 1, false).then(function (data) {
                var rowOrder = data.InlineCount;
                predicate = {
                    and: [
                       { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } },
                       { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } },
                       { "Product.Id": { "==": $scope.item.ProductId } }
                    ]
                }
                SurveyProductQuestionService.Search(predicate, ["RowOrder asc"], 0, 100, false).then(function (data) {
                    for (var i = 0; i < data.Results.length; i++) {
                        var item = {
                            ProductId: $scope.copyItem.ProductId,
                            QuestionId: data.Results[i].Question.Id,
                            RowOrder: rowOrder,
                            CompanyId: SelectionApplicationService.GetCompanyId(),
                            SurveyId: SelectionApplicationService.GetSurveyId()
                        }
                        var promise = SurveyProductQuestionService.Create(item).then(function (data) {

                        });
                        rowOrder++;
                        promises.push(promise);
                    }
                    $q.all(promises).then(function () {
                        toastr.success($scope.item.ProductName + " questions have been copied to product " + $scope.copyItem.ProductName);
                        $scope.copyItem = { Id: null }
                    });
                });
            });
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