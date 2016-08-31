(function (moment) {
    "use strict";    
    angular.module('Main').controller('CustomerController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'CustomerService', 'CompanyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, CustomerService, CompanyApplicationService) {
        $scope.Search = function () {
        debugger;
            var p1 = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
            //var p2 = new breeze.Predicate('Longitude', '<', 1);
            //var predicate = new breeze.Predicate.and([p1, p2]);
            CustomerService.Search(p1, 0, 20, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.customer.addedit', { id: Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            CustomerService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);