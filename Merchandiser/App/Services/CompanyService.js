﻿(function () {
    "use strict";
    angular.module('Services')
    .service('CompanyService', ['$http', '$q', 'breeze', 'breezeservice',
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
            var query = breeze.EntityQuery.from('CompanyApi/Search');
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

        this.Get = function (id) {
            var deferred = $q.defer();

            $http({
                method: 'Get',
                url: '/breeze/CompanyApi/Get/' + id,
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
            });

            return deferred.promise;
        };

        this.Create = function (item) {
            var deferred = $q.defer();

            $http.post('/breeze/CompanyApi/Create', item)
            .then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                if (response.statusText.length > 0) {
                    deferred.reject(response.statusText);
                } else {
                    deferred.reject("Failed to create the record.");
                }
            });

            return deferred.promise;
        };

        this.Update = function (id, item) {
            var deferred = $q.defer();
            $http.put('/breeze/CompanyApi/Update/' + id, item)
            .then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                if (response.statusText.length > 0) {
                    deferred.reject(response);
                } else {
                    deferred.reject("Failed to update the record.");
                }
            });

            return deferred.promise;
        }

        this.Delete = function (id) {
            var deferred = $q.defer();

            $http.delete('/breeze/CompanyApi/Delete/' + id)
            .then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                if (response.statusText.length > 0) {
                    deferred.reject(response);
                } else {
                    deferred.reject("Failed to delete the record.");
                }
            });

            return deferred.promise;
        }
    }]);
})();