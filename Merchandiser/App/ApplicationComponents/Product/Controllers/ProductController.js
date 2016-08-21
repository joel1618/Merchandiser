(function (moment) {
    "use strict";    
    angular.module('Main').controller('ProductController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'ProductService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, ProductService) {
        $scope.Search = function () {
            var p1 = new breeze.Predicate('Quantity', '>', 1);
            var p2 = new breeze.Predicate('Longitude', '<', 1);
            var predicate = new breeze.Predicate.and([p1, p2]);
            ProductService.Search(null, 0, 20, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Create = function () {
            $state.go('main.product.addedit', { id: null }, { reload: true });
        }

        $scope.Edit = function (Id) {
            $state.go('main.product.addedit', { id: Id }, { reload: true });
        }

        $scope.Delete = function (Id) {
            ProductService.Delete(Id).then(function (data) {
                $state.go('main.product.addedit', { id: Id }, { reload: true });
            })
        }
    }]);

})(moment);