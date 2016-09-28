(function (moment) {
    "use strict";    
    angular.module('Main').controller('CompanyController', ['$scope', '$state', '$routeParams', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'CompanyService', 'CompanyApplicationService',
        'UserService','RoleService', 'UserRoleService',
    function controller($scope, $state, $routeParams, $http, $location,
        $timeout, breezeservice, breeze, CompanyService, CompanyApplicationService,
        UserService, RoleService, UserRoleService) {
        $scope.Search = function () {
            UserService.GetCurrentUser().then(function (data) {
                $scope.UserId = data;
                var predicate = { "Name": { "==": "Administrator" } };
                RoleService.SearchJson(predicate, 0, 1, false).then(function (data) {
                    var predicate = {
                        and: [
                           { "UserId": { "==": $scope.UserId } },
                           { "RoleId": { '==': data[0].Id } }
                        ]
                    }
                    UserRoleService.SearchJson(predicate, 0, 10, false).then(function (data) {
                        var companies = data.map(function (e) { return e.CompanyId; });
                        var predicate = { "Id": { in : companies } };
                        CompanyService.Search(predicate, 0, 20, false).then(function (data) {
                            $scope.items = data;
                            if (data.length == 1) {
                                $scope.Select(data[0].Id);
                            }
                        });
                    });
                });
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