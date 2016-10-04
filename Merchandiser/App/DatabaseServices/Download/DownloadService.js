(function () {
    "use strict";
    angular.module('DatabaseServices')
    .service('DownloadService', ['$http', '$q', 'breeze', 'breezeservice', 'SelectionApplicationService',
        function ($http, $q, breeze, breezeservice, SelectionApplicationService) {
            var _self = this;
            this.deferredRequest = null;

            this.Get = function (id) {
                var deferred = $q.defer();

                $http({
                    method: 'Get',
                    url: '/api/v1/DownloadApi/Get/'
                }).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (msg, code) {
                    deferred.reject(msg);
                });

                return deferred.promise;
            };

        }]);
})();