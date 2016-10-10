(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyService, SelectionApplicationService) {
        
        $scope.Init = function(){
            $scope.item = { Id: null, Name: "" }
            $scope.focus = true;
        }
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                SurveyService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                SurveyService.Update($scope.item.Id, $scope.item).then(function (data) {
                    var index = $scope.$parent.gridOptions.data.map(function (e) { return e.Id; }).indexOf(data.data.Id);
                    $scope.$parent.gridOptions.data.splice(index, 1, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error);
                });
            }
            else {
                $scope.item.CompanyId = SelectionApplicationService.GetCompanyId();
                SurveyService.Create($scope.item).then(function (data) {
                    $scope.$parent.gridOptions.data.splice($scope.$parent.gridOptions.data.length, 0, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error);
                });
            }
        }
    }]);

})(moment);