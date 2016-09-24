(function () {
    "use strict";
    angular.module('DatabaseServices')
    .service('MapService', ['$http', '$q', 'breeze', 'breezeservice',
        function ($http, $q, breeze, breezeservice) {
            var _self = this;
            this.deferredRequest = null;

            this.Search = function (predicate, page, pageSize, cancelExistingSearch) {
                cancelExistingSearch = cancelExistingSearch || false;

                if (this.deferredRequest !== null && cancelExistingSearch) {
                    this.deferredRequest.reject("Cancelled Search Request.");
                    this.deferredRequest = null;
                }
                var deferred = $q.defer();
                var query = breeze.EntityQuery.from('MapApi/Search');
                if (predicate != null) {
                    query = query.where(predicate);
                }
                query = query.orderByDesc('Created').skip(page * pageSize).take(pageSize);
                        
                breezeservice.executeQuery(query).then(function (data) {
                    deferred.resolve(data.httpResponse.data);
                    _self.deferredRequest = null;
                }, function (msg, code) {
                    deferred.reject(msg);
                    _self.deferredRequest = null;
                });
            
                this.deferredRequest = deferred;

                return deferred.promise;
            };

        }]);
})();