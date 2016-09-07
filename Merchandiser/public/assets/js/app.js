
(function() {
    'use strict';
    var services = angular.module('ApplicationServices', []);
})();
angular.module('ApplicationServices').service('CompanyApplicationService', function () {
    
    var observers = [];
    this.RegisterObserver = function (callback) {
        observers.push(callback);
    }

    this.NotifyObservers = function () {
        angular.forEach(observers, function (callback) {
            callback();
        });
    };

    this.SelectedCompany = {};
    this.GetSelectedCompany = function () {
        return SelectedCompany;
    };

    this.SetSelectedCompany = function (company) {
        this.SelectedCompany = company;
        this.NotifyObservers();
    }
});
angular.module('ApplicationServices').service('SurveyApplicationService', function () {
    
    var observers = [];
    this.RegisterObserver = function (callback) {
        observers.push(callback);
    }

    this.NotifyObservers = function () {
        angular.forEach(observers, function (callback) {
            callback();
        });
    };

    this.SelectedSurvey = {};
    this.GetSelectedCompany = function () {
        return SelectedSurvey;
    };

    this.SetSelectedSurvey = function (survey) {
        this.SelectedSurvey = survey;
        this.NotifyObservers();
    }
});

(function() {
    'use strict';
    var services = angular.module('DatabaseServices', []);
})();
(function () {
    "use strict";
    angular.module('DatabaseServices')
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
(function () {

    angular.module('DatabaseServices').factory('breezeservice',
    ['$http', '$q', '$timeout', 'breeze', service]);

    function service($http, $q, $timeout, breeze) {
        var serviceName = '/breeze'; // route to the same origin Web Api controller
        var dataService = new breeze.DataService({
            serviceName: serviceName,
            hasServerMetadata: false  // don't ask the server for metadata
        });
        var metadataStore = new breeze.MetadataStore();
        //manager.enableSaveQueuing(true);
        metadataStore.importMetadata(window.breeze.metadata);
        //var masterManager = new breeze.EntityManager(serviceName);
        var manager = new breeze.EntityManager({
            dataService: dataService,
            metadataStore: metadataStore
        });

        var service = {
            executeQuery: executeQuery,
            all: all
        };
        return service;

        function executeQuery(query) {
            return manager.executeQuery(query).then(function (data) {
                return data;
            });
        }

        function all() {
            var query = breeze.EntityQuery
                .from(resourceName);

            return executeQuery(query);
        }
    }
})();
window.breeze = window.breeze || {}; window.breeze.metadata = JSON.stringify(
{"schema":{"namespace":"Merchandiser","alias":"Self","annotation:UseStrongSpatialTypes":"false","xmlns:annotation":"http://schemas.microsoft.com/ado/2009/02/edm/annotation","xmlns:customannotation":"http://schemas.microsoft.com/ado/2013/11/edm/customannotation","xmlns":"http://schemas.microsoft.com/ado/2009/11/edm","cSpaceOSpaceMapping":"[[\"Merchandiser.Company\",\"Merchandiser.Company\"],[\"Merchandiser.CompanyUser\",\"Merchandiser.CompanyUser\"],[\"Merchandiser.AspNetUser\",\"Merchandiser.AspNetUser\"],[\"Merchandiser.AspNetRole\",\"Merchandiser.AspNetRole\"],[\"Merchandiser.AspNetUserClaim\",\"Merchandiser.AspNetUserClaim\"],[\"Merchandiser.AspNetUserLogin\",\"Merchandiser.AspNetUserLogin\"],[\"Merchandiser.AspNetUsersInfo\",\"Merchandiser.AspNetUsersInfo\"],[\"Merchandiser.Customer\",\"Merchandiser.Customer\"],[\"Merchandiser.Product\",\"Merchandiser.Product\"],[\"Merchandiser.CompanyViewModel\",\"Merchandiser.Models.CompanyViewModel\"]]","entityType":[{"name":"Company","customannotation:ClrType":"Merchandiser.Company, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"CompanyUsers","relationship":"Self.CompanyUser_Company","fromRole":"CompanyUser_Company_Target","toRole":"CompanyUser_Company_Source"},{"name":"Customers","relationship":"Self.Customer_Company","fromRole":"Customer_Company_Target","toRole":"Customer_Company_Source"},{"name":"Products","relationship":"Self.Product_Company","fromRole":"Product_Company_Target","toRole":"Product_Company_Source"}]},{"name":"CompanyUser","customannotation:ClrType":"Merchandiser.CompanyUser, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"UserId","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modified","type":"Edm.DateTime"}],"navigationProperty":[{"name":"AspNetUser","relationship":"Self.AspNetUser_CompanyUsers","fromRole":"AspNetUser_CompanyUsers_Target","toRole":"AspNetUser_CompanyUsers_Source"},{"name":"Company","relationship":"Self.CompanyUser_Company","fromRole":"CompanyUser_Company_Source","toRole":"CompanyUser_Company_Target"}]},{"name":"AspNetUser","customannotation:ClrType":"Merchandiser.AspNetUser, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"Email","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"EmailConfirmed","type":"Edm.Boolean","nullable":"false"},{"name":"PasswordHash","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"SecurityStamp","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"PhoneNumber","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"PhoneNumberConfirmed","type":"Edm.Boolean","nullable":"false"},{"name":"TwoFactorEnabled","type":"Edm.Boolean","nullable":"false"},{"name":"LockoutEndDateUtc","type":"Edm.DateTime"},{"name":"LockoutEnabled","type":"Edm.Boolean","nullable":"false"},{"name":"AccessFailedCount","type":"Edm.Int32","nullable":"false"},{"name":"UserName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"AspNetRoles","relationship":"Self.AspNetRole_AspNetUsers","fromRole":"AspNetRole_AspNetUsers_Target","toRole":"AspNetRole_AspNetUsers_Source"},{"name":"AspNetUserClaims","relationship":"Self.AspNetUserClaim_AspNetUser","fromRole":"AspNetUserClaim_AspNetUser_Target","toRole":"AspNetUserClaim_AspNetUser_Source"},{"name":"AspNetUserLogins","relationship":"Self.AspNetUserLogin_AspNetUser","fromRole":"AspNetUserLogin_AspNetUser_Target","toRole":"AspNetUserLogin_AspNetUser_Source"},{"name":"AspNetUsersInfoes","relationship":"Self.AspNetUsersInfo_AspNetUser","fromRole":"AspNetUsersInfo_AspNetUser_Target","toRole":"AspNetUsersInfo_AspNetUser_Source"},{"name":"CompanyUsers","relationship":"Self.AspNetUser_CompanyUsers","fromRole":"AspNetUser_CompanyUsers_Source","toRole":"AspNetUser_CompanyUsers_Target"}]},{"name":"AspNetRole","customannotation:ClrType":"Merchandiser.AspNetRole, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":{"name":"AspNetUsers","relationship":"Self.AspNetRole_AspNetUsers","fromRole":"AspNetRole_AspNetUsers_Source","toRole":"AspNetRole_AspNetUsers_Target"}},{"name":"AspNetUserClaim","customannotation:ClrType":"Merchandiser.AspNetUserClaim, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Int32","nullable":"false","annotation:StoreGeneratedPattern":"Identity"},{"name":"UserId","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ClaimType","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ClaimValue","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":{"name":"AspNetUser","relationship":"Self.AspNetUserClaim_AspNetUser","fromRole":"AspNetUserClaim_AspNetUser_Source","toRole":"AspNetUserClaim_AspNetUser_Target"}},{"name":"AspNetUserLogin","customannotation:ClrType":"Merchandiser.AspNetUserLogin, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"UserId"}},"property":[{"name":"UserId","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"LoginProvider","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ProviderKey","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":{"name":"AspNetUser","relationship":"Self.AspNetUserLogin_AspNetUser","fromRole":"AspNetUserLogin_AspNetUser_Source","toRole":"AspNetUserLogin_AspNetUser_Target"}},{"name":"AspNetUsersInfo","customannotation:ClrType":"Merchandiser.AspNetUsersInfo, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"UserId","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"FirstName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"LastName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":{"name":"AspNetUser","relationship":"Self.AspNetUsersInfo_AspNetUser","fromRole":"AspNetUsersInfo_AspNetUser_Source","toRole":"AspNetUsersInfo_AspNetUser_Target"}},{"name":"Customer","customannotation:ClrType":"Merchandiser.Customer, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"}],"navigationProperty":{"name":"Company","relationship":"Self.Customer_Company","fromRole":"Customer_Company_Source","toRole":"Customer_Company_Target"}},{"name":"Product","customannotation:ClrType":"Merchandiser.Product, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"}],"navigationProperty":{"name":"Company","relationship":"Self.Product_Company","fromRole":"Product_Company_Source","toRole":"Product_Company_Target"}},{"name":"CompanyViewModel","customannotation:ClrType":"Merchandiser.Models.CompanyViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]}],"association":[{"name":"AspNetRole_AspNetUsers","end":[{"role":"AspNetRole_AspNetUsers_Source","type":"Edm.Self.AspNetRole","multiplicity":"*"},{"role":"AspNetRole_AspNetUsers_Target","type":"Edm.Self.AspNetUser","multiplicity":"*"}]},{"name":"AspNetUserClaim_AspNetUser","end":[{"role":"AspNetUserClaim_AspNetUser_Source","type":"Edm.Self.AspNetUserClaim","multiplicity":"*"},{"role":"AspNetUserClaim_AspNetUser_Target","type":"Edm.Self.AspNetUser","multiplicity":"0..1"}]},{"name":"AspNetUserLogin_AspNetUser","end":[{"role":"AspNetUserLogin_AspNetUser_Source","type":"Edm.Self.AspNetUserLogin","multiplicity":"*"},{"role":"AspNetUserLogin_AspNetUser_Target","type":"Edm.Self.AspNetUser","multiplicity":"0..1"}]},{"name":"AspNetUsersInfo_AspNetUser","end":[{"role":"AspNetUsersInfo_AspNetUser_Source","type":"Edm.Self.AspNetUsersInfo","multiplicity":"*"},{"role":"AspNetUsersInfo_AspNetUser_Target","type":"Edm.Self.AspNetUser","multiplicity":"0..1"}]},{"name":"AspNetUser_CompanyUsers","end":[{"role":"AspNetUser_CompanyUsers_Source","type":"Edm.Self.AspNetUser","multiplicity":"0..1"},{"role":"AspNetUser_CompanyUsers_Target","type":"Edm.Self.CompanyUser","multiplicity":"*"}]},{"name":"CompanyUser_Company","end":[{"role":"CompanyUser_Company_Source","type":"Edm.Self.CompanyUser","multiplicity":"*"},{"role":"CompanyUser_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"CompanyUser_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"CompanyUser_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"Customer_Company","end":[{"role":"Customer_Company_Source","type":"Edm.Self.Customer","multiplicity":"*"},{"role":"Customer_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"Customer_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"Customer_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"Product_Company","end":[{"role":"Product_Company_Source","type":"Edm.Self.Product","multiplicity":"*"},{"role":"Product_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"Product_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"Product_Company_Source","propertyRef":{"name":"CompanyId"}}}}],"entityContainer":{"name":"DatabaseContext","customannotation:UseClrTypes":"true","entitySet":[{"name":"Company","entityType":"Self.Company"},{"name":"CompanyUser","entityType":"Self.CompanyUser"},{"name":"AspNetUsers","entityType":"Self.AspNetUser"},{"name":"AspNetRoles","entityType":"Self.AspNetRole"},{"name":"AspNetUserClaims","entityType":"Self.AspNetUserClaim"},{"name":"AspNetUserLogins","entityType":"Self.AspNetUserLogin"},{"name":"AspNetUsersInfoes","entityType":"Self.AspNetUsersInfo"},{"name":"Customers","entityType":"Self.Customer"},{"name":"Products","entityType":"Self.Product"},{"name":"CompanyViewModel","entityType":"Self.CompanyViewModel"}],"associationSet":[{"name":"AspNetRole_AspNetUsers","association":"Self.AspNetRole_AspNetUsers","end":[{"role":"AspNetRole_AspNetUsers_Source","entitySet":"AspNetRoles"},{"role":"AspNetRole_AspNetUsers_Target","entitySet":"AspNetUsers"}]},{"name":"AspNetUserClaim_AspNetUser","association":"Self.AspNetUserClaim_AspNetUser","end":[{"role":"AspNetUserClaim_AspNetUser_Source","entitySet":"AspNetUserClaims"},{"role":"AspNetUserClaim_AspNetUser_Target","entitySet":"AspNetUsers"}]},{"name":"AspNetUserLogin_AspNetUser","association":"Self.AspNetUserLogin_AspNetUser","end":[{"role":"AspNetUserLogin_AspNetUser_Source","entitySet":"AspNetUserLogins"},{"role":"AspNetUserLogin_AspNetUser_Target","entitySet":"AspNetUsers"}]},{"name":"AspNetUsersInfo_AspNetUser","association":"Self.AspNetUsersInfo_AspNetUser","end":[{"role":"AspNetUsersInfo_AspNetUser_Source","entitySet":"AspNetUsersInfoes"},{"role":"AspNetUsersInfo_AspNetUser_Target","entitySet":"AspNetUsers"}]},{"name":"AspNetUser_CompanyUsers","association":"Self.AspNetUser_CompanyUsers","end":[{"role":"AspNetUser_CompanyUsers_Source","entitySet":"AspNetUsers"},{"role":"AspNetUser_CompanyUsers_Target","entitySet":"CompanyUser"}]},{"name":"CompanyUser_Company","association":"Self.CompanyUser_Company","end":[{"role":"CompanyUser_Company_Source","entitySet":"CompanyUser"},{"role":"CompanyUser_Company_Target","entitySet":"Company"}]},{"name":"Customer_Company","association":"Self.Customer_Company","end":[{"role":"Customer_Company_Source","entitySet":"Customers"},{"role":"Customer_Company_Target","entitySet":"Company"}]},{"name":"Product_Company","association":"Self.Product_Company","end":[{"role":"Product_Company_Source","entitySet":"Products"},{"role":"Product_Company_Target","entitySet":"Company"}]}]}}}
);

(function () {
    "use strict";
    angular.module('DatabaseServices')
    .service('CompanyUserService', ['$http', '$q', 'breeze', 'breezeservice',
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
            var query = breeze.EntityQuery.from('CompanyUserApi/Search');
            if (predicate != null) {
                query = query.where(predicate);
            }
            query = query.skip(page * pageSize).take(pageSize);
                        
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
                url: '/breeze/CompanyUserApi/Get/' + id,
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
            });

            return deferred.promise;
        };

        this.Create = function (item) {
            var deferred = $q.defer();

            $http.post('/breeze/CompanyUserApi/Create', item)
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

            $http.put('/breeze/CompanyUserApi/Update/' + id, item)
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

            $http.delete('/breeze/CompanyUserApi/Delete/' + id)
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
(function () {
    "use strict";
    angular.module('DatabaseServices')
    .service('CustomerService', ['$http', '$q', 'breeze', 'breezeservice',
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
            var query = breeze.EntityQuery.from('CustomerApi/Search');
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
                url: '/breeze/CustomerApi/Get/' + id,
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
            });

            return deferred.promise;
        };

        this.Create = function (item) {
            var deferred = $q.defer();

            $http.post('/breeze/CustomerApi/Create', item)
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
            $http.put('/breeze/CustomerApi/Update/' + id, item)
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

            $http.delete('/breeze/CustomerApi/Delete/' + id)
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
(function () {
    "use strict";
    angular.module('DatabaseServices')
    .service('LocationService', ['$http', '$q', 'breeze', 'breezeservice',
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
            var query = breeze.EntityQuery.from('LocationApi/Search');
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
                url: '/breeze/LocationApi/Get/' + id,
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
            });

            return deferred.promise;
        };

        this.Create = function (item) {
            var deferred = $q.defer();

            $http.post('/breeze/LocationApi/Create', item)
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
            $http.put('/breeze/LocationApi/Update/' + id, item)
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

            $http.delete('/breeze/LocationApi/Delete/' + id)
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
(function () {
    "use strict";
    angular.module('DatabaseServices')
    .service('ProductService', ['$http', '$q', 'breeze', 'breezeservice',
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
            var query = breeze.EntityQuery.from('ProductApi/Search');
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
                url: '/breeze/ProductApi/Get/' + id,
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
            });

            return deferred.promise;
        };

        this.Create = function (item) {
            var deferred = $q.defer();

            $http.post('/breeze/ProductApi/Create', item)
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
            $http.put('/breeze/ProductApi/Update/' + id, item)
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

            $http.delete('/breeze/ProductApi/Delete/' + id)
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
(function () {
    "use strict";
    angular.module('DatabaseServices')
    .service('QuestionService', ['$http', '$q', 'breeze', 'breezeservice',
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
            var query = breeze.EntityQuery.from('QuestionApi/Search');
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
                url: '/breeze/QuestionApi/Get/' + id,
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
            });

            return deferred.promise;
        };

        this.Create = function (item) {
            var deferred = $q.defer();

            $http.post('/breeze/QuestionApi/Create', item)
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
            $http.put('/breeze/QuestionApi/Update/' + id, item)
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

            $http.delete('/breeze/QuestionApi/Delete/' + id)
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
(function () {
    "use strict";
    angular.module('DatabaseServices')
    .service('SurveyService', ['$http', '$q', 'breeze', 'breezeservice',
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
            var query = breeze.EntityQuery.from('SurveyApi/Search');
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
                url: '/breeze/SurveyApi/Get/' + id,
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
            });

            return deferred.promise;
        };

        this.Create = function (item) {
            var deferred = $q.defer();

            $http.post('/breeze/SurveyApi/Create', item)
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
            $http.put('/breeze/SurveyApi/Update/' + id, item)
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

            $http.delete('/breeze/SurveyApi/Delete/' + id)
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
(function () {
    "use strict";
    angular.module('DatabaseServices')
    .service('SurveyCustomerLocationService', ['$http', '$q', 'breeze', 'breezeservice',
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
            var query = breeze.EntityQuery.from('SurveyCustomerLocationApi/Search');
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
                url: '/breeze/SurveyCustomerLocationApi/Get/' + id,
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
            });

            return deferred.promise;
        };

        this.Create = function (item) {
            var deferred = $q.defer();

            $http.post('/breeze/SurveyCustomerLocationApi/Create', item)
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
            $http.put('/breeze/SurveyCustomerLocationApi/Update/' + id, item)
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

            $http.delete('/breeze/SurveyCustomerLocationApi/Delete/' + id)
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
(function () {
    "use strict";
    angular.module('DatabaseServices')
    .service('SurveyProductQuestionService', ['$http', '$q', 'breeze', 'breezeservice',
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
            var query = breeze.EntityQuery.from('SurveyProductQuestionApi/Search');
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
                url: '/breeze/SurveyProductQuestionApi/Get/' + id,
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
            });

            return deferred.promise;
        };

        this.Create = function (item) {
            var deferred = $q.defer();

            $http.post('/breeze/SurveyProductQuestionApi/Create', item)
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
            $http.put('/breeze/SurveyProductQuestionApi/Update/' + id, item)
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

            $http.delete('/breeze/SurveyProductQuestionApi/Delete/' + id)
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
                    url: 'api/UserApi/GetCurrentUser/',
                }).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (msg, code) {
                    deferred.reject(msg);
                });

                return deferred.promise;
            };
        }]);
})();
var app = angular.module('Main', ['ngRoute', 'ui.grid', 'ui.bootstrap', 'ngAnimate', 'ui.router', 'blockUI', 'breeze.angular', 'DatabaseServices', 'ApplicationServices']);
angular.module('Main').config(function (blockUIConfig) {
    // Change the default delay to 100ms before the blocking is visible
    blockUIConfig.delay = 0;
});
app.config(function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/main/company/addedit/")

    $stateProvider
        .state('main', {
            url: "/main",
            templateUrl: "/App/ApplicationComponents/Main/Views/Main.html"
        })
        .state('main.company', {
            url: "/company",
            templateUrl: "/App/ApplicationComponents/Company/Views/Company.html"
        })
        .state('main.company.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Company/Views/CompanyAddEdit.html",
        })
        .state('main.customer', {
            url: "/customer",
            templateUrl: "/App/ApplicationComponents/Customer/Views/Customer.html"
        })
        .state('main.customer.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Customer/Views/CustomerAddEdit.html",
        })
        .state('main.product', {
            url: "/product",
            templateUrl: "/App/ApplicationComponents/Product/Views/Product.html"
        })
        .state('main.product.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Product/Views/ProductAddEdit.html",
        })
        .state('main.location', {
            url: "/location",
            templateUrl: "/App/ApplicationComponents/Location/Views/Location.html"
        })
        .state('main.location.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Location/Views/LocationAddEdit.html",
        })
        .state('main.survey', {
            url: "/survey",
            templateUrl: "/App/ApplicationComponents/Survey/Views/Survey.html"
        })
        .state('main.survey.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Survey/Views/SurveyAddEdit.html",
        })
        .state('main.companyuser', {
            url: "/companyuser",
            templateUrl: "/App/ApplicationComponents/CompanyUser/Views/CompanyUser.html"
        })
        .state('main.companyuser.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/CompanyUser/Views/CompanyUserAddEdit.html",
        })
        .state('main.question', {
            url: "/question",
            templateUrl: "/App/ApplicationComponents/Question/Views/Question.html"
        })
        .state('main.question.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Question/Views/QuestionAddEdit.html",
        })
        .state('main.surveycustomerlocation', {
            url: "/survey/customerlocation",
            templateUrl: "/App/ApplicationComponents/SurveyCustomerLocation/Views/SurveyCustomerLocation.html"
        })
        .state('main.surveycustomerlocation.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/SurveyCustomerLocation/Views/SurveyCustomerLocationAddEdit.html",
        })
        .state('main.surveyproductquestion', {
            url: "/survey/productquestion",
            templateUrl: "/App/ApplicationComponents/SurveyProductQuestion/Views/SurveyProductQuestion.html"
        })
        .state('main.surveyproductquestion.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/SurveyProductQuestion/Views/SurveyProductQuestionAddEdit.html",
        })
        .state('merchandise.customerlocation', {
            url: "/merchandise/customerlocation",
            templateUrl: "/App/ApplicationComponents/Merchandise/CustomerLocation/MerchandiseCustomerLocation.html"
        })
        .state('merchandise.survey', {
            url: "/merchandise/survey/:id",
            templateUrl: "/App/ApplicationComponents/Merchandise/Survey/MerchandiseSurvey.html"
        })
});
(function (moment) {
    "use strict";    
    angular.module('Main').controller('CompanyAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'CompanyService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, CompanyService) {
        $scope.Init = function () {
            $scope.item = { Id: null, Name: "" }
        }
        $scope.Init();
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                CompanyService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                CompanyService.Update($scope.item.Id, $scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    alert(error);
                });
            }
            else {
                CompanyService.Create($scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    alert(error);
                });
            }
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('CompanyController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'CompanyService', 'CompanyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, CompanyService, CompanyApplicationService) {
        $scope.Search = function () {
            var p1 = new breeze.Predicate('Quantity', '>', 1);
            var p2 = new breeze.Predicate('Longitude', '<', 1);
            var predicate = new breeze.Predicate.and([p1, p2]);
            CompanyService.Search(null, 0, 20, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.company.addedit', { id: Id }, { reload: false });
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
(function (moment) {
    "use strict";    
    angular.module('Main').controller('CompanyUserAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'CompanyUserService', 'CompanyApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, CompanyUserService, CompanyApplicationService) {
        CompanyApplicationService.NotifyObservers();
        $scope.Init = function () {
            $scope.item = { Id: null, Name: "" }
        }
        $scope.Init();
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                CompanyUserService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                CompanyUserService.Update($scope.item.Id, $scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    alert(error);
                });
            }
            else {
                $scope.item.CompanyId = CompanyApplicationService.SelectedCompany.Id;
                CompanyUserService.Create($scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    alert(error);
                });
            }
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('CompanyUserController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'CompanyUserService', 'CompanyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, CompanyUserService, CompanyApplicationService) {
        $scope.Search = function () {
            var p1 = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
            //var p2 = new breeze.Predicate('Longitude', '<', 1);
            //var predicate = new breeze.Predicate.and([p1, p2]);
            CompanyUserService.Search(p1, 0, 20, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.companyuser.addedit', { id: Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            CompanyUserService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('CustomerAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'CustomerService', 'CompanyApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, CustomerService, CompanyApplicationService) {
        CompanyApplicationService.NotifyObservers();
        $scope.Init = function () {
            $scope.item = { Id: null, Name: "" }
        }
        $scope.Init();
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                CustomerService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                CustomerService.Update($scope.item.Id, $scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    alert(error);
                });
            }
            else {
                $scope.item.CompanyId = CompanyApplicationService.SelectedCompany.Id;
                CustomerService.Create($scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    alert(error);
                });
            }
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('CustomerController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'CustomerService', 'CompanyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, CustomerService, CompanyApplicationService) {
        $scope.Search = function () {
            var predicate = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
            CustomerService.Search(predicate, 0, 20, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.customer.addedit', { id: Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            CustomerService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('LocationAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'LocationService', 'CompanyApplicationService', 'SurveyApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, LocationService, CompanyApplicationService, SurveyApplicationService) {
        CompanyApplicationService.NotifyObservers();
        SurveyApplicationService.NotifyObservers();
        
        $scope.Init = function () {
            $scope.item = { Id: null, Name: "" }
        }
        $scope.Init();
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                LocationService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                LocationService.Update($scope.item.Id, $scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    alert(error);
                });
            }
            else {
                $scope.item.CompanyId = CompanyApplicationService.SelectedCompany.Id;
                LocationService.Create($scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    alert(error);
                });
            }
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('LocationController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'LocationService', 'CompanyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, LocationService, CompanyApplicationService) {
        $scope.Search = function () {
            var predicate = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
            LocationService.Search(predicate, 0, 20, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.location.addedit', { id: Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            LocationService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('MainController', ['$scope', 'CompanyApplicationService', 'SurveyApplicationService',
    function controller($scope, CompanyApplicationService, SurveyApplicationService) {      
        //TODO: If a regular user go to company, if a company customer assigned to a survey, go to the survey data page.
        $scope.SelectedCompany = null;
        CompanyApplicationService.RegisterObserver(function () { 
            $scope.SelectedCompany = CompanyApplicationService.SelectedCompany;
        })

        $scope.SelectedSurvey = null;
        SurveyApplicationService.RegisterObserver(function(){
            $scope.SelectedSurvey = SurveyApplicationService.SelectedSurvey;
        })
    }]);

})(moment);
(function (moment) {
    "use strict";
    //angular.module('Main').config(function ($stateProvider) {
    //    $stateProvider
    //    .state('merchandise.customerlocation', {
    //        url: "/merchandise/customerlocation",
    //        templateUrl: "/App/ApplicationComponents/Merchandise/CustomerLocation/MerchandiseCustomerLocation.html"
    //    })
    //});
    angular.module('Main').controller('MerchandiseCustomerLocationController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService', 'UserService', 'CompanyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, CompanyApplicationService) {
        alert('hit');
        $scope.Search = function () {
            UserService.GetCurrentUser().then(function (data) {
                var predicate = new breeze.Predicate('CreatedBy', '==', data);
                CompanyService.Search(predicate, 0, 20, false).then(function (data) {
                    
                });
            });
        }
        $scope.Search();
    }]);
})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('ProductAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'ProductService', 'CompanyApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, ProductService, CompanyApplicationService) {
        CompanyApplicationService.NotifyObservers();        
        
        $scope.Init = function () {
            $scope.item = { Id: null, Name: "" }
        }
        $scope.Init();
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                ProductService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                ProductService.Update($scope.item.Id, $scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    alert(error);
                });
            }
            else {
                 $scope.item.CompanyId = CompanyApplicationService.SelectedCompany.Id;
                ProductService.Create($scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    alert(error);
                });
            }
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('ProductController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'ProductService', 'CompanyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, ProductService, CompanyApplicationService) {
        $scope.Search = function () {
            var predicate = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
            ProductService.Search(predicate, 0, 20, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.product.addedit', { id: Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            ProductService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);

(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyService', 'CompanyApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyService, CompanyApplicationService) {
        CompanyApplicationService.NotifyObservers();
        
        $scope.Init = function(){
            $scope.item = { Id : null, Name : ""}
        }
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                SurveyService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                SurveyService.Update($scope.item.Id, $scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    alert(error);
                });
            }
            else {
                $scope.item.CompanyId = CompanyApplicationService.SelectedCompany.Id;
                SurveyService.Create($scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    alert(error);
                });
            }
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyService', 'CompanyApplicationService', 'SurveyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyService, CompanyApplicationService, SurveyApplicationService) {
        $scope.Search = function () {
            var predicate = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
            SurveyService.Search(predicate, 0, 20, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.survey.addedit', { id: Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            SurveyService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }

        $scope.Select = function (Id) {
            SurveyService.Get(Id).then(function (data) {
                SurveyApplicationService.SetSelectedSurvey(data);
            });
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('QuestionAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'QuestionService', 'CompanyApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, QuestionService, CompanyApplicationService) {
        CompanyApplicationService.NotifyObservers();        
        
        $scope.Init = function () {
            $scope.item = { Id: null, Name: "" }
        }
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                QuestionService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                QuestionService.Update($scope.item.Id, $scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    alert(error);
                });
            }
            else {
                 $scope.item.CompanyId = CompanyApplicationService.SelectedCompany.Id;
                QuestionService.Create($scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    alert(error);
                });
            }
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('QuestionController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'QuestionService', 'CompanyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, QuestionService, CompanyApplicationService) {
        $scope.Search = function () {
            var predicate = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
            QuestionService.Search(predicate, 0, 20, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.question.addedit', { id: Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            QuestionService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyCustomerLocationAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyCustomerLocationService',
        'CompanyApplicationService', 'SurveyApplicationService', 'CustomerService', 'LocationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyCustomerLocationService,
        CompanyApplicationService, SurveyApplicationService, CustomerService, LocationService) {

        CompanyApplicationService.NotifyObservers();
        SurveyApplicationService.NotifyObservers();

        $scope.Init = function(){
            $scope.item = { Id : null }
        }
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                SurveyCustomerLocationService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.SearchCustomers = function (value) {
            var p1 = new breeze.Predicate('Name', "substringof", value);
            var p2 = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
            var predicate = new breeze.Predicate.and([p1, p2]);
            return CustomerService.Search(predicate, 0, 20, false).then(function (data) {
                return data;
            });
        }

        $scope.SelectCustomer = function (item, model, label) {
            $scope.item.CustomerId = item.Id;
        }

        $scope.SearchLocations = function (value) {
            var p1 = new breeze.Predicate('Name', "substringof", value);
            var p2 = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
            var predicate = new breeze.Predicate.and([p1, p2]);
            return LocationService.Search(predicate, 0, 20, false).then(function (data) {
                return data;
            });
        }

        $scope.SelectLocation = function (item, model, label) {
            $scope.item.LocationId = item.Id;
        }

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                SurveyCustomerLocationService.Update($scope.item.Id, $scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                    //$state.go('main.surveycustomerlocation.addedit', { }, { reload: true, inherit: false });
                }, function (error) {
                    alert(error);
                });
            }
            else {
                $scope.item.CompanyId = CompanyApplicationService.SelectedCompany.Id;
                $scope.item.SurveyId = SurveyApplicationService.SelectedSurvey.Id;
                SurveyCustomerLocationService.Create($scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                    //$state.go('main.surveycustomerlocation.addedit', {}, { reload: true, inherit: false });
                }, function (error) {
                    alert(error);
                });
            }
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyCustomerLocationController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyCustomerLocationService', 'CompanyApplicationService', 'SurveyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyCustomerLocationService, CompanyApplicationService, SurveyApplicationService) {
        $scope.Search = function () {
            var p1 = new breeze.Predicate('SurveyId', '==', SurveyApplicationService.SelectedSurvey.Id);
            //var p2 = new breeze.Predicate('Longitude', '<', 1);
            //var predicate = new breeze.Predicate.and([p1, p2]);
            SurveyCustomerLocationService.Search(p1, 0, 20, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.surveycustomerlocation.addedit', { id: Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            SurveyCustomerLocationService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyProductQuestionAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyProductQuestionService',
        'CompanyApplicationService', 'SurveyApplicationService', 'ProductService','QuestionService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyProductQuestionService,
        CompanyApplicationService, SurveyApplicationService, ProductService, QuestionService) {

        CompanyApplicationService.NotifyObservers();
        SurveyApplicationService.NotifyObservers();

        $scope.Init = function(){
            $scope.item = { Id : null }
        }
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                SurveyProductQuestionService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.SearchProducts = function (value) {
            var p1 = new breeze.Predicate('Name', "substringof", value);
            var p2 = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
            var predicate = new breeze.Predicate.and([p1, p2]);
            return ProductService.Search(predicate, 0, 20, false).then(function (data) {
                return data;
            });
        }

        $scope.SelectProduct = function (item, model, label) {
            $scope.item.ProductId = item.Id;
        }

        $scope.SearchQuestions = function (value) {
            var p1 = new breeze.Predicate('Name', "substringof", value);
            var p2 = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
            var predicate = new breeze.Predicate.and([p1, p2]);
            return QuestionService.Search(predicate, 0, 20, false).then(function (data) {
                return data;
            });
        }

        $scope.SelectQuestion = function (item, model, label) {
            $scope.item.QuestionId = item.Id;
        }

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                SurveyProductQuestionService.Update($scope.item.Id, $scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    alert(error);
                });
            }
            else {
                $scope.item.CompanyId = CompanyApplicationService.SelectedCompany.Id;
                $scope.item.SurveyId = SurveyApplicationService.SelectedSurvey.Id;
                SurveyProductQuestionService.Create($scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    alert(error);
                });
            }
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyProductQuestionController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyProductQuestionService', 'CompanyApplicationService', 'SurveyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyProductQuestionService, CompanyApplicationService, SurveyApplicationService) {
        $scope.Search = function () {
            var p1 = new breeze.Predicate('SurveyId', '==', SurveyApplicationService.SelectedSurvey.Id);
            //var p2 = new breeze.Predicate('Longitude', '<', 1);
            //var predicate = new breeze.Predicate.and([p1, p2]);
            SurveyProductQuestionService.Search(p1, 0, 20, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.surveyproductquestion.addedit', { id: Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            SurveyProductQuestionService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);