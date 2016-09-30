(function (moment) {
    "use strict";    
    angular.module('Main').controller('UserRoleController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'UserRoleService', 'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, UserRoleService, SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = new breeze.Predicate('CompanyId', '==', SelectionApplicationService.GetCompanyId());
            UserRoleService.Search(predicate, 0, 100, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.admin.userrole.addedit', { id: Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            UserRoleService.Delete(Id).then(function (data) {
                $scope.Search();
            }, function (error) {
                toastr.error(error.data.Message);
            });
        }
    }]);

})(moment);