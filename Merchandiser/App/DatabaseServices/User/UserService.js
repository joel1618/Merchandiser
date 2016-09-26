(function () {
    "use strict";
    angular.module('DatabaseServices')
    .service('UserService', ['$http', '$q', 'breeze', 'breezeservice', 'RoleService', 'UserRoleService',
        function ($http, $q, breeze, breezeservice, RoleService, UserRoleService) {
            var _self = this;
            this.deferredRequest = null;

            this.GetCurrentUser = function (id) {
                var deferred = $q.defer();

                $http({
                    method: 'Get',
                    url: '/api/v1/UserApi/GetCurrentUser/',
                }).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (msg, code) {
                    deferred.reject(msg);
                });

                return deferred.promise;
            };

            this.IsAdministrator = function (companyId) {
                var userId = GetCurrentUser();
                var predicate = { "Name": { '==': "Administrator" } }
                RoleService.SearchJson(predicate, 0, 1, false).then(function (data) {
                    var roles = data.map(function (e) { return e.Id; });
                    var predicate = {
                        and: [
                           { "UserId": { '==': userId } },
                           { "RoleId": { '==': data[0].Id } },
                           { "CompanyId": { '==': companyId } }
                        ]
                    }
                    UserRoleService.SearchJson(predicate, 0, 1, false).then(function (data) {
                        if (data.length > 0) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                });
            }

            this.IsCustomer = function (companyId, customerId) {
                var userId = GetCurrentUser();
                var predicate = { "Name": { '==': "Customer" } }
                RoleService.SearchJson(predicate, 0, 1, false).then(function (data) {
                    var roles = data.map(function (e) { return e.Id; });
                    var predicate = {
                        and: [
                           { "UserId": { '==': userId } },
                           { "RoleId": { '==': data[0].Id } },
                           { "CustomerId": { '==': customerId } },
                           { "CompanyId": { '==': companyId } }
                        ]
                    }
                    UserRoleService.SearchJson(predicate, 0, 1, false).then(function (data) {
                        if (data.length > 0) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                });
            }

            this.IsDataEntry = function (companyId) {
                var userId = GetCurrentUser();
                var predicate = { "Name": { '==': "Data Entry" } }
                RoleService.SearchJson(predicate, 0, 1, false).then(function (data) {
                    var roles = data.map(function (e) { return e.Id; });
                    var predicate = {
                        and: [
                           { "UserId": { '==': userId } },
                           { "RoleId": { '==': data[0].Id } },
                           { "CompanyId": { '==': companyId } }
                        ]
                    }
                    UserRoleService.SearchJson(predicate, 0, 1, false).then(function (data) {
                        if (data.length > 0) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                });
            }
        }]);
})();