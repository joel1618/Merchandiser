(function (moment) {
    "use strict";    
    angular.module('Main').controller('CustomerAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'CustomerService', 'CompanyApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, CustomerService, CompanyApplicationService) {
        CompanyApplicationService.NotifyObservers();
        $scope.item = { Id : null, Name : ""}
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                CustomerService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                CustomerService.Update($scope.item.Id, $scope.item).then(function (data) {
                    $state.go('main.customer.addedit', { }, { reload: true, inherit: false });
                }, function (error) {
                    alert(error);
                });
            }
            else {
                $scope.item.CompanyId = CompanyApplicationService.SelectedCompany.Id;
                CustomerService.Create($scope.item).then(function (data) {
                    $state.go('main.customer.addedit', {}, { reload: true, inherit: false });
                }, function (error) {
                    alert(error);
                });
            }
        }
    }]);

})(moment);