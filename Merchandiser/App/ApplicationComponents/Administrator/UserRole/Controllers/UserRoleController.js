(function (moment) {
    "use strict";    
    angular.module('Main').controller('UserRoleController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'UserRoleService', 'CompanyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, UserRoleService, CompanyApplicationService) {
        $scope.Search = function () {
            var predicate = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
            UserRoleService.Search(predicate, 0, 20, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.product.addedit', { id: Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            UserRoleService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);