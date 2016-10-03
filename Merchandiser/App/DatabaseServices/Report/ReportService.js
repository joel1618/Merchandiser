(function () {
    "use strict";
    angular.module('DatabaseServices')
    .service('ReportService', ['$http', '$q', 'breeze', 'breezeservice',
        function ($http, $q, breeze, breezeservice) {
            var _self = this;
            this.deferredRequest = null;

            this.Search = function (companyId,surveyHeaderId,customerId,locationId,productId,surveyId, userId, startDate, endDate, page, pageSize) {
                var deferred = $q.defer();

                $http({
                    method: 'Get',
                    url: '/api/v1/ReportApi/Search/' + companyId + '/' + surveyHeaderId + '/' + customerId + '/' + locationId + '/' +
                        productId + '/' + surveyId + '/' + userId + '/' + startDate + '/' + endDate + '/' + page + '/' + pageSize + '/',
                }).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (msg, code) {
                    deferred.reject(msg);
                });

                return deferred.promise;
            };

        }]);
})();