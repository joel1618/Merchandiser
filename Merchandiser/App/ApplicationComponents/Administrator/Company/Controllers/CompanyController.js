(function (moment) {
    "use strict";    
    angular.module('Main').controller('CompanyController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'CompanyService', 'CompanyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, CompanyService, CompanyApplicationService) {
        $scope.Search = function () {
            var p1 = new breeze.Predicate('Quantity', '>', 1);
            var p2 = new breeze.Predicate('Longitude', '<', 1);
            var predicate = new breeze.Predicate.and([p1, p2]);
            CompanyService.Search(null, 0, 20, false).then(function (data) {
                $scope.items = data;
                if (data.length == 1) {
                    $scope.Select(data[0].Id);
                }
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.admin.company.addedit', { id: Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            CompanyService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
        
        $scope.Select = function (Id) {
            CompanyService.Get(Id).then(function (data) {
                CompanyApplicationService.SetSelectedCompany(data);
            });
        }
        
    }]);

})(moment);