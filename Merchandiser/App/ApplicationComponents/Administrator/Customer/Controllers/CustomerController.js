(function (moment) {
    "use strict";    
    angular.module('Main').controller('CustomerController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'CustomerService', 'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, CustomerService, SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } };
            CustomerService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.admin.customer.addedit', { id: Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            CustomerService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);