(function () {
    "use strict";
    angular.module('DatabaseServices')
    .service('UserService', ['$http', '$q', 'breeze', 'breezeservice',
        function ($http, $q, breeze, breezeservice) {
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
        }]);
})();