(function () {
    "use strict";
    angular.module('DatabaseServices')
    .service('SurveyHeaderService', ['$http', '$q', 'breeze', 'breezeservice', 'SelectionApplicationService',
        function ($http, $q, breeze, breezeservice, SelectionApplicationService) {
            var _self = this;
            this.deferredRequest = null;

            this.Search = function (predicate, order, page, pageSize, cancelExistingSearch) {
                cancelExistingSearch = cancelExistingSearch || false;

                if (this.deferredRequest !== null && cancelExistingSearch) {
                    this.deferredRequest.reject("Cancelled Search Request.");
                    this.deferredRequest = null;
                }
                var deferred = $q.defer();

                var query = new breeze.EntityQuery({
                    from: "SurveyHeaderApi/Search",
                    where: predicate,
                    orderBy: order,
                    skip: page * pageSize,
                    take: pageSize,
                    parameters: { "companyId": SelectionApplicationService.GetCompanyId() }
                });

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
                    url: '/breeze/SurveyHeaderApi/Get/' + id,
                }).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (msg, code) {
                    deferred.reject(msg);
                });

                return deferred.promise;
            };

            this.Create = function (item) {
                var deferred = $q.defer();
                $http.post('/breeze/SurveyHeaderApi/Create/', item)
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

            this.CreateBulk = function (item) {
                var deferred = $q.defer();
                $http.post('/breeze/SurveyHeaderApi/CreateBulk', item)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (response) {
                    if (response.data.Message.length > 0) {
                        deferred.reject(response.data.Message);
                    } else {
                        deferred.reject("Failed to create the record.");
                    }
                });

                return deferred.promise;
            };

            this.Update = function (id, item) {
                var deferred = $q.defer();
                $http.put('/breeze/SurveyHeaderApi/Update/' + id, item)
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

            this.UpdateBulk = function (id, item) {
                var deferred = $q.defer();
                $http.put('/breeze/SurveyHeaderApi/UpdateBulk/' + id, item)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (response) {
                    if (response.data.Message.length > 0) {
                        deferred.reject(response.data.Message);
                    } else {
                        deferred.reject("Failed to update the record.");
                    }
                });

                return deferred.promise;
            }

            this.Delete = function (id) {
                var deferred = $q.defer();

                $http.delete('/breeze/SurveyHeaderApi/Delete/' + id)
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

            this.DeleteBulk = function (id) {
                var deferred = $q.defer();

                $http.delete('/breeze/SurveyHeaderApi/DeleteBulk/' + id)
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