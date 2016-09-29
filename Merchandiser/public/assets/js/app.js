
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

    this.SelectedCompany = null;
    this.GetSelectedCompany = function () {
        return SelectedCompany;
    };

    this.SetSelectedCompany = function (company) {
        this.SelectedCompany = company;
        this.NotifyObservers();
    }
});
angular.module('ApplicationServices').service('SelectionApplicationService', function () {
    this.CompanyId = null;
    this.GetCompanyId = function () {
        return this.CompanyId;
    };

    this.SetCompanyId = function (id) {
        this.CompanyId = id;
    }

    this.CustomerId = null;
    this.GetCustomerId = function () {
        return this.CustomerId;
    };

    this.SetCustomerId = function (id) {
        this.CustomerId = id;
    }

    this.LocationId = null;
    this.GetLocationId = function () {
        return this.LocationId;
    };

    this.SetLocationId = function (id) {
        this.LocationId = id;
    }

    this.SurveyId = null;
    this.GetSurveyId = function () {
        return this.SurveyId;
    };

    this.SetSurveyId = function (id) {
        this.SurveyId = id;
    }

    this.SurveyHeaderId = null;
    this.GetSurveyHeaderId = function () {
        return this.SurveyHeaderId;
    };

    this.SetSurveyHeaderId = function (id) {
        this.SurveyHeaderId = id;
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

    this.SelectedSurvey = null;
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
        var meta = manager.metadataStore;
        meta.setEntityTypeForResourceName("UserRoleApi/Search", "UserRoleViewModel");
        meta.setEntityTypeForResourceName("CompanyApi/Search", "CompanyViewModel");
        meta.setEntityTypeForResourceName("CustomerApi/Search", "CustomerViewModel");
        meta.setEntityTypeForResourceName("SurveyCustomerLocationApi/Search", "SurveyCustomerLocationViewModel");
        meta.setEntityTypeForResourceName("SurveyProductQuestionApi/Search", "SurveyProductQuestionViewModel");
        meta.setEntityTypeForResourceName("RoleApi/Search", "RoleViewModel");
        meta.setEntityTypeForResourceName("MapApi/Search", "MapViewModel");
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
{"schema":{"namespace":"Merchandiser","alias":"Self","annotation:UseStrongSpatialTypes":"false","xmlns:annotation":"http://schemas.microsoft.com/ado/2009/02/edm/annotation","xmlns:customannotation":"http://schemas.microsoft.com/ado/2013/11/edm/customannotation","xmlns":"http://schemas.microsoft.com/ado/2009/11/edm","cSpaceOSpaceMapping":"[[\"Merchandiser.CompanyViewModel\",\"Merchandiser.Models.CompanyViewModel\"],[\"Merchandiser.CustomerViewModel\",\"Merchandiser.Models.CustomerViewModel\"],[\"Merchandiser.MapViewModel\",\"Merchandiser.Models.MapViewModel\"],[\"Merchandiser.RoleViewModel\",\"Merchandiser.Models.RoleViewModel\"],[\"Merchandiser.SurveyCustomerLocationViewModel\",\"Merchandiser.Models.SurveyCustomerLocationViewModel\"],[\"Merchandiser.LocationViewModel\",\"Merchandiser.Models.LocationViewModel\"],[\"Merchandiser.SurveyViewModel\",\"Merchandiser.Models.SurveyViewModel\"],[\"Merchandiser.SurveyProductQuestionViewModel\",\"Merchandiser.Models.SurveyProductQuestionViewModel\"],[\"Merchandiser.ProductViewModel\",\"Merchandiser.Models.ProductViewModel\"],[\"Merchandiser.QuestionViewModel\",\"Merchandiser.Models.QuestionViewModel\"],[\"Merchandiser.UserRoleViewModel\",\"Merchandiser.Models.UserRoleViewModel\"],[\"Merchandiser.UserViewModel\",\"Merchandiser.Models.UserViewModel\"]]","entityType":[{"name":"CompanyViewModel","customannotation:ClrType":"Merchandiser.Models.CompanyViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"CustomerViewModel","customannotation:ClrType":"Merchandiser.Models.CustomerViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"MapViewModel","customannotation:ClrType":"Merchandiser.Models.MapViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"Latitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Longitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"FirstName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"LastName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid","nullable":"false"},{"name":"LocationId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyId","type":"Edm.Guid","nullable":"false"}]},{"name":"RoleViewModel","customannotation:ClrType":"Merchandiser.Models.RoleViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"SurveyCustomerLocationViewModel","customannotation:ClrType":"Merchandiser.Models.SurveyCustomerLocationViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyId","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid","nullable":"false"},{"name":"LocationId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modifed","type":"Edm.DateTime","nullable":"false"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Customer","relationship":"Self.SurveyCustomerLocationViewModel_Customer","fromRole":"SurveyCustomerLocationViewModel_Customer_Source","toRole":"SurveyCustomerLocationViewModel_Customer_Target"},{"name":"Location","relationship":"Self.SurveyCustomerLocationViewModel_Location","fromRole":"SurveyCustomerLocationViewModel_Location_Source","toRole":"SurveyCustomerLocationViewModel_Location_Target"},{"name":"Survey","relationship":"Self.SurveyCustomerLocationViewModel_Survey","fromRole":"SurveyCustomerLocationViewModel_Survey_Source","toRole":"SurveyCustomerLocationViewModel_Survey_Target"}]},{"name":"LocationViewModel","customannotation:ClrType":"Merchandiser.Models.LocationViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Store","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Latitude","type":"Edm.Decimal","precision":"18","scale":"2","nullable":"false"},{"name":"Longitude","type":"Edm.Decimal","precision":"18","scale":"2","nullable":"false"},{"name":"Address","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"AreaManager","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"SurveyViewModel","customannotation:ClrType":"Merchandiser.Models.SurveyViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modifed","type":"Edm.DateTime","nullable":"false"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"SurveyProductQuestionViewModel","customannotation:ClrType":"Merchandiser.Models.SurveyProductQuestionViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyId","type":"Edm.Guid","nullable":"false"},{"name":"ProductId","type":"Edm.Guid","nullable":"false"},{"name":"QuestionId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modifed","type":"Edm.DateTime","nullable":"false"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Product","relationship":"Self.SurveyProductQuestionViewModel_Product","fromRole":"SurveyProductQuestionViewModel_Product_Source","toRole":"SurveyProductQuestionViewModel_Product_Target"},{"name":"Question","relationship":"Self.SurveyProductQuestionViewModel_Question","fromRole":"SurveyProductQuestionViewModel_Question_Source","toRole":"SurveyProductQuestionViewModel_Question_Target"}]},{"name":"ProductViewModel","customannotation:ClrType":"Merchandiser.Models.ProductViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"QuestionViewModel","customannotation:ClrType":"Merchandiser.Models.QuestionViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"UserRoleViewModel","customannotation:ClrType":"Merchandiser.Models.UserRoleViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"UserId","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true"},{"name":"RoleId","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid"}],"navigationProperty":[{"name":"Company","relationship":"Self.UserRoleViewModel_Company","fromRole":"UserRoleViewModel_Company_Source","toRole":"UserRoleViewModel_Company_Target"},{"name":"Customer","relationship":"Self.UserRoleViewModel_Customer","fromRole":"UserRoleViewModel_Customer_Source","toRole":"UserRoleViewModel_Customer_Target"},{"name":"Role","relationship":"Self.UserRoleViewModel_Role","fromRole":"UserRoleViewModel_Role_Source","toRole":"UserRoleViewModel_Role_Target"},{"name":"User","relationship":"Self.UserRoleViewModel_User","fromRole":"UserRoleViewModel_User_Source","toRole":"UserRoleViewModel_User_Target"}]},{"name":"UserViewModel","customannotation:ClrType":"Merchandiser.Models.UserViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"UserName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]}],"association":[{"name":"SurveyCustomerLocationViewModel_Customer","end":[{"role":"SurveyCustomerLocationViewModel_Customer_Source","type":"Edm.Self.SurveyCustomerLocationViewModel","multiplicity":"*"},{"role":"SurveyCustomerLocationViewModel_Customer_Target","type":"Edm.Self.CustomerViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocationViewModel_Customer_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocationViewModel_Customer_Source","propertyRef":{"name":"CustomerId"}}}},{"name":"SurveyCustomerLocationViewModel_Location","end":[{"role":"SurveyCustomerLocationViewModel_Location_Source","type":"Edm.Self.SurveyCustomerLocationViewModel","multiplicity":"*"},{"role":"SurveyCustomerLocationViewModel_Location_Target","type":"Edm.Self.LocationViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocationViewModel_Location_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocationViewModel_Location_Source","propertyRef":{"name":"LocationId"}}}},{"name":"SurveyCustomerLocationViewModel_Survey","end":[{"role":"SurveyCustomerLocationViewModel_Survey_Source","type":"Edm.Self.SurveyCustomerLocationViewModel","multiplicity":"*"},{"role":"SurveyCustomerLocationViewModel_Survey_Target","type":"Edm.Self.SurveyViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocationViewModel_Survey_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocationViewModel_Survey_Source","propertyRef":{"name":"SurveyId"}}}},{"name":"SurveyProductQuestionViewModel_Product","end":[{"role":"SurveyProductQuestionViewModel_Product_Source","type":"Edm.Self.SurveyProductQuestionViewModel","multiplicity":"*"},{"role":"SurveyProductQuestionViewModel_Product_Target","type":"Edm.Self.ProductViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyProductQuestionViewModel_Product_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyProductQuestionViewModel_Product_Source","propertyRef":{"name":"ProductId"}}}},{"name":"SurveyProductQuestionViewModel_Question","end":[{"role":"SurveyProductQuestionViewModel_Question_Source","type":"Edm.Self.SurveyProductQuestionViewModel","multiplicity":"*"},{"role":"SurveyProductQuestionViewModel_Question_Target","type":"Edm.Self.QuestionViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyProductQuestionViewModel_Question_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyProductQuestionViewModel_Question_Source","propertyRef":{"name":"QuestionId"}}}},{"name":"UserRoleViewModel_Company","end":[{"role":"UserRoleViewModel_Company_Source","type":"Edm.Self.UserRoleViewModel","multiplicity":"*"},{"role":"UserRoleViewModel_Company_Target","type":"Edm.Self.CompanyViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"UserRoleViewModel_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"UserRoleViewModel_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"UserRoleViewModel_Customer","end":[{"role":"UserRoleViewModel_Customer_Source","type":"Edm.Self.UserRoleViewModel","multiplicity":"*"},{"role":"UserRoleViewModel_Customer_Target","type":"Edm.Self.CustomerViewModel","multiplicity":"0..1"}],"referentialConstraint":{"principal":{"role":"UserRoleViewModel_Customer_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"UserRoleViewModel_Customer_Source","propertyRef":{"name":"CustomerId"}}}},{"name":"UserRoleViewModel_Role","end":[{"role":"UserRoleViewModel_Role_Source","type":"Edm.Self.UserRoleViewModel","multiplicity":"*"},{"role":"UserRoleViewModel_Role_Target","type":"Edm.Self.RoleViewModel","multiplicity":"0..1"}],"referentialConstraint":{"principal":{"role":"UserRoleViewModel_Role_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"UserRoleViewModel_Role_Source","propertyRef":{"name":"RoleId"}}}},{"name":"UserRoleViewModel_User","end":[{"role":"UserRoleViewModel_User_Source","type":"Edm.Self.UserRoleViewModel","multiplicity":"*"},{"role":"UserRoleViewModel_User_Target","type":"Edm.Self.UserViewModel","multiplicity":"0..1"}],"referentialConstraint":{"principal":{"role":"UserRoleViewModel_User_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"UserRoleViewModel_User_Source","propertyRef":{"name":"UserId"}}}}],"entityContainer":{"name":"DatabaseContext","customannotation:UseClrTypes":"true","entitySet":[{"name":"CompanyViewModel","entityType":"Self.CompanyViewModel"},{"name":"CustomerViewModel","entityType":"Self.CustomerViewModel"},{"name":"MapViewModel","entityType":"Self.MapViewModel"},{"name":"RoleViewModel","entityType":"Self.RoleViewModel"},{"name":"SurveyCustomerLocationViewModel","entityType":"Self.SurveyCustomerLocationViewModel"},{"name":"LocationViewModels","entityType":"Self.LocationViewModel"},{"name":"SurveyViewModels","entityType":"Self.SurveyViewModel"},{"name":"SurveyProductQuestionViewModel","entityType":"Self.SurveyProductQuestionViewModel"},{"name":"ProductViewModels","entityType":"Self.ProductViewModel"},{"name":"QuestionViewModels","entityType":"Self.QuestionViewModel"},{"name":"UserRoleViewModel","entityType":"Self.UserRoleViewModel"},{"name":"UserViewModels","entityType":"Self.UserViewModel"}],"associationSet":[{"name":"SurveyCustomerLocationViewModel_Customer","association":"Self.SurveyCustomerLocationViewModel_Customer","end":[{"role":"SurveyCustomerLocationViewModel_Customer_Source","entitySet":"SurveyCustomerLocationViewModel"},{"role":"SurveyCustomerLocationViewModel_Customer_Target","entitySet":"CustomerViewModel"}]},{"name":"SurveyCustomerLocationViewModel_Location","association":"Self.SurveyCustomerLocationViewModel_Location","end":[{"role":"SurveyCustomerLocationViewModel_Location_Source","entitySet":"SurveyCustomerLocationViewModel"},{"role":"SurveyCustomerLocationViewModel_Location_Target","entitySet":"LocationViewModels"}]},{"name":"SurveyCustomerLocationViewModel_Survey","association":"Self.SurveyCustomerLocationViewModel_Survey","end":[{"role":"SurveyCustomerLocationViewModel_Survey_Source","entitySet":"SurveyCustomerLocationViewModel"},{"role":"SurveyCustomerLocationViewModel_Survey_Target","entitySet":"SurveyViewModels"}]},{"name":"SurveyProductQuestionViewModel_Product","association":"Self.SurveyProductQuestionViewModel_Product","end":[{"role":"SurveyProductQuestionViewModel_Product_Source","entitySet":"SurveyProductQuestionViewModel"},{"role":"SurveyProductQuestionViewModel_Product_Target","entitySet":"ProductViewModels"}]},{"name":"SurveyProductQuestionViewModel_Question","association":"Self.SurveyProductQuestionViewModel_Question","end":[{"role":"SurveyProductQuestionViewModel_Question_Source","entitySet":"SurveyProductQuestionViewModel"},{"role":"SurveyProductQuestionViewModel_Question_Target","entitySet":"QuestionViewModels"}]},{"name":"UserRoleViewModel_Company","association":"Self.UserRoleViewModel_Company","end":[{"role":"UserRoleViewModel_Company_Source","entitySet":"UserRoleViewModel"},{"role":"UserRoleViewModel_Company_Target","entitySet":"CompanyViewModel"}]},{"name":"UserRoleViewModel_Customer","association":"Self.UserRoleViewModel_Customer","end":[{"role":"UserRoleViewModel_Customer_Source","entitySet":"UserRoleViewModel"},{"role":"UserRoleViewModel_Customer_Target","entitySet":"CustomerViewModel"}]},{"name":"UserRoleViewModel_Role","association":"Self.UserRoleViewModel_Role","end":[{"role":"UserRoleViewModel_Role_Source","entitySet":"UserRoleViewModel"},{"role":"UserRoleViewModel_Role_Target","entitySet":"RoleViewModel"}]},{"name":"UserRoleViewModel_User","association":"Self.UserRoleViewModel_User","end":[{"role":"UserRoleViewModel_User_Source","entitySet":"UserRoleViewModel"},{"role":"UserRoleViewModel_User_Target","entitySet":"UserViewModels"}]}]}}}
);

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

            var query = new breeze.EntityQuery({
                from: "CompanyApi/Search",
                where: predicate,
                orderBy: ["Created desc"],
                skip: page * pageSize,
                take: pageSize
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

        this.AdminSearch = function (predicate, page, pageSize, cancelExistingSearch) {
            cancelExistingSearch = cancelExistingSearch || false;

            if (this.deferredRequest !== null && cancelExistingSearch) {
                this.deferredRequest.reject("Cancelled Search Request.");
                this.deferredRequest = null;
            }
            var deferred = $q.defer();

            var query = new breeze.EntityQuery({
                from: "CompanyApi/AdminSearch",
                where: predicate,
                orderBy: ["Created desc"],
                skip: page * pageSize,
                take: pageSize
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

        this.SearchJson = function (predicate, page, pageSize, cancelExistingSearch) {
            cancelExistingSearch = cancelExistingSearch || false;

            if (this.deferredRequest !== null && cancelExistingSearch) {
                this.deferredRequest.reject("Cancelled Search Request.");
                this.deferredRequest = null;
            }
            var deferred = $q.defer();

            var query = new breeze.EntityQuery({
                from: "CustomerApi/Search",
                where: predicate,
                orderBy: ["Created desc"],
                skip: page * pageSize,
                take: pageSize
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
    .service('ImageService', ['$http', '$q', 'breeze', 'breezeservice',
        function ($http, $q, breeze, breezeservice) {
            var _self = this;
            this.deferredRequest = null;

            this.GetBeforeImage = function (id) {
                var deferred = $q.defer();

                $http({
                    method: 'Get',
                    url: '/api/v1/ImageApi/GetBeforeImage/' + id,
                }).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (msg, code) {
                    deferred.reject(msg);
                });

                return deferred.promise;
            };

            this.GetAfterImage = function (id) {
                var deferred = $q.defer();

                $http({
                    method: 'Get',
                    url: '/api/v1/ImageApi/GetBeforeImage/' + id,
                }).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (msg, code) {
                    deferred.reject(msg);
                });

                return deferred.promise;
            };

            this.CreateBeforeImage = function (image, id) {
                var deferred = $q.defer();
                if (image != undefined && image != null) {
                    $http.post('/api/v1/ImageApi/CreateBeforeImage/' + id, image)
                    .then(function (response) {
                        deferred.resolve(response);
                    }, function (response) {
                        if (response.statusText.length > 0) {
                            deferred.reject(response.statusText);
                        } else {
                            deferred.reject("Failed to create the record.");
                        }
                    });
                }
                else {
                    deferred.resolve();
                }
                return deferred.promise;
            };

            this.CreateAfterImage = function (image, id) {
                var deferred = $q.defer();
                if (image != undefined && image != null) {
                    $http.post('/api/v1/ImageApi/CreateAfterImage/' + id, image)
                    .then(function (response) {
                        deferred.resolve(response);
                    }, function (response) {
                        if (response.statusText.length > 0) {
                            deferred.reject(response.statusText);
                        } else {
                            deferred.reject("Failed to create the record.");
                        }
                    });
                }
                else {
                    deferred.resolve();
                }
                return deferred.promise;
            };

            this.DeleteBeforeImage = function (id) {
                var deferred = $q.defer();

                $http.delete('/api/v1/ImageApi/DeleteBeforeImage/' + id)
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

            this.DeleteAfterImage = function (id) {
                var deferred = $q.defer();

                $http.delete('/api/v1/ImageApi/DeleteAfterImage/' + id)
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
    .service('MapService', ['$http', '$q', 'breeze', 'breezeservice', 'SelectionApplicationService',
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
                    from: "MapApi/Search/",
                    where: predicate,
                    orderBy: order,
                    skip: page * pageSize,
                    take: pageSize,
                    parameters: { "companyId" : SelectionApplicationService.GetCompanyId() }
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
    .service('ReportService', ['$http', '$q', 'breeze', 'breezeservice',
        function ($http, $q, breeze, breezeservice) {
            var _self = this;
            this.deferredRequest = null;

            this.Search = function (companyId,surveyHeaderId,customerId,locationId,productId,surveyId, userId, page,pageSize) {
                var deferred = $q.defer();

                $http({
                    method: 'Get',
                    url: '/api/v1/ReportApi/Search/' + companyId + '/' + surveyHeaderId + '/' + customerId + '/' + locationId + '/' +
                        productId + '/' + surveyId + '/' + userId + '/' + page + '/' + pageSize + '/',
                }).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (msg, code) {
                    deferred.reject(msg);
                });

                return deferred.promise;
            };

        }]);
})();
(function () {
    "use strict";
    angular.module('DatabaseServices')
    .service('RoleService', ['$http', '$q', 'breeze', 'breezeservice',
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
                var query = breeze.EntityQuery.from('RoleApi/Search');
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

            this.SearchJson = function (predicate, page, pageSize, cancelExistingSearch) {
                cancelExistingSearch = cancelExistingSearch || false;

                if (this.deferredRequest !== null && cancelExistingSearch) {
                    this.deferredRequest.reject("Cancelled Search Request.");
                    this.deferredRequest = null;
                }
                var deferred = $q.defer();

                var query = new breeze.EntityQuery({
                    from: "RoleApi/Search",
                    where: predicate,
                    //orderBy: ["Created desc"],
                    skip: page * pageSize,
                    take: pageSize
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

        this.SearchJson = function (predicate, order, page, pageSize, cancelExistingSearch) {
            cancelExistingSearch = cancelExistingSearch || false;

            if (this.deferredRequest !== null && cancelExistingSearch) {
                this.deferredRequest.reject("Cancelled Search Request.");
                this.deferredRequest = null;
            }
            var deferred = $q.defer();

            var query = new breeze.EntityQuery({
                from: "SurveyCustomerLocationApi/Search",
                where: predicate,
                orderBy: order,
                skip: page * pageSize,
                take: pageSize
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
    .service('SurveyDetailService', ['$http', '$q', 'breeze', 'breezeservice',
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
            var query = breeze.EntityQuery.from('SurveyDetailApi/Search');
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
                url: '/breeze/SurveyDetailApi/Get/' + id,
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
            });

            return deferred.promise;
        };

        this.Create = function (item) {
            var deferred = $q.defer();

            $http.post('/breeze/SurveyDetailApi/Create', item)
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
            $http.put('/breeze/SurveyDetailApi/Update/' + id, item)
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

            $http.delete('/breeze/SurveyDetailApi/Delete/' + id)
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
    .service('SurveyHeaderService', ['$http', '$q', 'breeze', 'breezeservice',
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
                var query = breeze.EntityQuery.from('SurveyHeaderApi/Search');
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

                $http.post('/breeze/SurveyHeaderApi/Create', item)
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
    .service('UserService', ['$http', '$q', 'breeze', 'breezeservice', 'RoleService', 'UserRoleService',
        function ($http, $q, breeze, breezeservice, RoleService, UserRoleService) {
            var _self = this;
            this.deferredRequest = null;

            this.GetCurrentUser = function () {
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

            this.GetCurrentUsername = function () {
                var deferred = $q.defer();

                $http({
                    method: 'Get',
                    url: '/api/v1/UserApi/GetCurrentUsername/',
                }).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (msg, code) {
                    deferred.reject(msg);
                });

                return deferred.promise;
            };

            this.IsAdministrator = function (companyId) {
                var deferred = $q.defer();

                this.GetCurrentUser().then(function (data) {
                    var userId = data;
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
                                deferred.resolve(true);
                            }
                            else {
                                deferred.resolve(false);
                            }
                        });
                    });
                });

                return deferred.promise;
            }

            this.IsCustomer = function (companyId) {
                var deferred = $q.defer();

                this.GetCurrentUser().then(function (data) {
                    var userId = data;
                    var predicate = { "Name": { '==': "Customer" } }
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
                                deferred.resolve(true);
                            }
                            else {
                                deferred.resolve(false);
                            }
                        });
                    });
                });
                return deferred.promise;
            }

            //this.IsCustomer = function (companyId, customerId) {
            //    var deferred = $q.defer();
            //    this.GetCurrentUser().then(function (data) {
            //        var userId = data;
            //        var predicate = { "Name": { '==': "Customer" } }
            //        RoleService.SearchJson(predicate, 0, 1, false).then(function (data) {
            //            var roles = data.map(function (e) { return e.Id; });
            //            var predicate = {
            //                and: [
            //                   { "UserId": { '==': userId } },
            //                   { "RoleId": { '==': data[0].Id } },
            //                   { "CustomerId": { '==': customerId } },
            //                   { "CompanyId": { '==': companyId } }
            //                ]
            //            }
            //            UserRoleService.SearchJson(predicate, 0, 1, false).then(function (data) {
            //                debugger;
            //                if (data.length > 0) {
            //                    deferred.resolve(true);
            //                }
            //                else {
            //                    deferred.resolve(false);
            //                }
            //            });
            //        });
            //    });
            //    return deferred.promise;
            //}

            this.IsDataEntry = function (companyId) {
                var deferred = $q.defer();
                this.GetCurrentUser().then(function (data) {
                    var userId = data;
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
                                deferred.resolve(true);
                            }
                            else {
                                deferred.resolve(false);
                            }
                        });
                    });
                });
                return deferred.promise;
            }
        }]);
})();
(function () {
    "use strict";
    angular.module('DatabaseServices')
    .service('UserRoleService', ['$http', '$q', 'breeze', 'breezeservice',
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
                var query = breeze.EntityQuery.from('UserRoleApi/Search');
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

            this.SearchJson = function (predicate, page, pageSize, cancelExistingSearch) {
                cancelExistingSearch = cancelExistingSearch || false;

                if (this.deferredRequest !== null && cancelExistingSearch) {
                    this.deferredRequest.reject("Cancelled Search Request.");
                    this.deferredRequest = null;
                }
                var deferred = $q.defer();

                var query = new breeze.EntityQuery({
                    from: "UserRoleApi/Search",
                    where: predicate,
                    //orderBy: ["Created desc"],
                    skip: page * pageSize,
                    take: pageSize
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
                    url: '/breeze/UserRoleApi/Get/' + id,
                }).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (msg, code) {
                    deferred.reject(msg);
                });

                return deferred.promise;
            };

            this.Create = function (item) {
                var deferred = $q.defer();

                $http.post('/breeze/UserRoleApi/Create', item)
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

            this.Delete = function (id) {
                var deferred = $q.defer();

                $http.delete('/breeze/UserRoleApi/Delete/' + id)
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
var app = angular.module('Main', ['ngRoute', 'ui.grid', 'ui.bootstrap', 'ngAnimate', 'ngTouch', 'ui.router', 'ngMap', 'ui.grid.exporter', 'blockUI', 'breeze.angular', 'DatabaseServices', 'ApplicationServices']);
angular.module('Main').config(function (blockUIConfig) {
    // Change the default delay to 100ms before the blocking is visible
    blockUIConfig.delay = 0;
});
app.config(function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/main/admin/company/addedit/")

    $stateProvider
        .state('main', {
            url: "/main",
            templateUrl: "/App/ApplicationComponents/Main/Views/Main.html"
        })
        .state('main.admin', {
            url: "/admin",
            templateUrl: "/App/ApplicationComponents/Administrator/Admin/Views/Admin.html"
        })
        .state('main.admin.company', {
            url: "/company",
            templateUrl: "/App/ApplicationComponents/Administrator/Company/Views/Company.html"
        })
        .state('main.admin.company.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Administrator/Company/Views/CompanyAddEdit.html",
        })
        .state('main.admin.customer', {
            url: "/customer",
            templateUrl: "/App/ApplicationComponents/Administrator/Customer/Views/Customer.html"
        })
        .state('main.admin.customer.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Administrator/Customer/Views/CustomerAddEdit.html",
        })
        .state('main.admin.product', {
            url: "/product",
            templateUrl: "/App/ApplicationComponents/Administrator/Product/Views/Product.html"
        })
        .state('main.admin.product.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Administrator/Product/Views/ProductAddEdit.html",
        })
        .state('main.admin.location', {
            url: "/location",
            templateUrl: "/App/ApplicationComponents/Administrator/Location/Views/Location.html"
        })
        .state('main.admin.location.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Administrator/Location/Views/LocationAddEdit.html",
        })
        .state('main.admin.survey', {
            url: "/survey",
            templateUrl: "/App/ApplicationComponents/Administrator/Survey/Views/Survey.html"
        })
        .state('main.admin.survey.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Administrator/Survey/Views/SurveyAddEdit.html",
        })
        .state('main.admin.userrole', {
            url: "/userrole",
            templateUrl: "/App/ApplicationComponents/Administrator/UserRole/Views/UserRole.html"
        })
        .state('main.admin.userrole.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Administrator/UserRole/Views/UserRoleAddEdit.html",
        })
        .state('main.admin.question', {
            url: "/question",
            templateUrl: "/App/ApplicationComponents/Administrator/Question/Views/Question.html"
        })
        .state('main.admin.question.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Administrator/Question/Views/QuestionAddEdit.html",
        })
        .state('main.admin.surveycustomerlocation', {
            url: "/survey/customerlocation",
            templateUrl: "/App/ApplicationComponents/Administrator/SurveyCustomerLocation/Views/SurveyCustomerLocation.html"
        })
        .state('main.admin.surveycustomerlocation.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Administrator/SurveyCustomerLocation/Views/SurveyCustomerLocationAddEdit.html",
        })
        .state('main.admin.surveyproductquestion', {
            url: "/survey/productquestion",
            templateUrl: "/App/ApplicationComponents/Administrator/SurveyProductQuestion/Views/SurveyProductQuestion.html"
        })
        .state('main.admin.surveyproductquestion.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Administrator/SurveyProductQuestion/Views/SurveyProductQuestionAddEdit.html",
        })
});
app.run(function ($rootScope, $state, UserService, RoleService, UserRoleService) {
    UserService
        .GetCurrentUser()
        .then(function (data) {
            $rootScope.UserId = data;
            var predicate = { "Name": { "==": "Administrator" } };
            return RoleService.SearchJson(predicate, 0, 1, false);
        })
        .then(function (data) {
            $rootScope.Role = data;
            var predicate = {
                and: [
                   { "UserId": { "==": $rootScope.UserId } },
                   { "RoleId": { '==': data[0].Id } }
                ]
            }
            return UserRoleService.SearchJson(predicate, 0, 1, false);
        })
        .then(function (data) {
            if (data.length > 0) {
                $state.go('main.admin.company.addedit');
            }
            else {
                var predicate = { "Name": { "==": "Data Entry" } };
                return RoleService.SearchJson(predicate, 0, 1, false);
            }
        })
        .then(function (data) {
            var predicate = {
                and: [
                   { "UserId": { "==": $rootScope.UserId } },
                   { "RoleId": { '==': data[0].Id } }
                ]
            }
            return UserRoleService.SearchJson(predicate, 0, 1, false);
        })
        .then(function (data) {
            if (data.length > 0) {
                $state.go('merchandise', {
                    redirectState: 'main.survey'
                });
            }
            else {
                var predicate = { "Name": { "==": "Customer" } };
                return RoleService.SearchJson(predicate, 0, 1, false);
            }
        })
        .then(function (data) {
            if (data.length > 0) {
                $state.go('merchandise', {
                    redirectState: 'main.reportmain'
                });
            }
            else {
                $state.go('main.admin.company.addedit');
            }
        })
});
(function (moment) {
    "use strict";
    angular.module('Main').controller('MainController', ['$scope', '$http', '$window', '$state', 'UserService', 'CompanyApplicationService', 'SurveyApplicationService', 'SelectionApplicationService',
    function controller($scope, $http, $window, $state, UserService, CompanyApplicationService, SurveyApplicationService, SelectionApplicationService) {

        UserService.GetCurrentUsername().then(function(data){
            $scope.Username = data;
        });
        $scope.GoTo = function (state) {
            if (state == 'main.admin.company.addedit') {
                $state.go(state);
            }
            else {
                if (SelectionApplicationService.GetCompanyId() == null) {
                    $state.go('merchandise', { redirectState: state });
                }
                else {
                    if (state == 'main.survey') {
                        if (SelectionApplicationService.GetSurveyId() == null) {
                            $state.go('merchandise', { redirectState: state });
                        }
                        else {
                            $state.go(state);
                        }
                    }
                    else if (state == 'main.reportmain') {
                        $state.go(state);
                    }
                    else if (state == 'main.map') {
                        $state.go(state);
                    }
                }
            }
        }

        $scope.Logout = function () {
            $http.post('/Account/LogOff').then(function(data){
                $window.location.reload();
            });
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('AdminController', ['$scope', '$state', 'CompanyApplicationService', 'SurveyApplicationService',
    function controller($scope, $state, CompanyApplicationService, SurveyApplicationService) {
        //TODO: If a regular user go to company, if a company customer assigned to a survey, go to the survey data page.
        $scope.SelectedCompany = null;
        CompanyApplicationService.RegisterObserver(function () { 
            $scope.SelectedCompany = CompanyApplicationService.SelectedCompany;
        })

        $scope.SelectedSurvey = null;
        SurveyApplicationService.RegisterObserver(function(){
            $scope.SelectedSurvey = SurveyApplicationService.SelectedSurvey;
        })

        $scope.Route = function (state) {
            if (state == "main.admin.company.addedit") {
                $state.go(state);
            }
            else {
                if (state == "main.admin.surveycustomerlocation.addedit" || state == "main.admin.surveyproductquestion.addedit") {
                    if (SurveyApplicationService.SelectedSurvey == undefined || SurveyApplicationService.SelectedSurvey == null || SurveyApplicationService.SelectedSurvey == "") {
                        toastr.error("A survey must be selected first.");
                    }
                    else {
                        $state.go(state);
                    }
                }
                else {
                    if (CompanyApplicationService.SelectedCompany == undefined || CompanyApplicationService.SelectedCompany == null || CompanyApplicationService.SelectedCompany == "") {
                        toastr.error("A company must be selected first.");
                    }
                    else {
                        $state.go(state);
                    }
                }
            }
        }
    }]);

})(moment);
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
    angular.module('Main').controller('CompanyController', ['$scope', '$state', '$routeParams', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'CompanyService', 'CompanyApplicationService',
        'UserService','RoleService', 'UserRoleService',
    function controller($scope, $state, $routeParams, $http, $location,
        $timeout, breezeservice, breeze, CompanyService, CompanyApplicationService,
        UserService, RoleService, UserRoleService) {
        $scope.Search = function () {
            CompanyService.AdminSearch(null, 0, 20, false).then(function (data) {
                $scope.items = data;
                if (data.length == 1) {
                    $scope.Select(data[0].Id);
                }
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
            CustomerService.Search(predicate, 0, 100, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.admin.customer.addedit', { id: Id }, { reload: false });
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
    angular.module('Main').controller('LocationAddEditController', ['$scope', '$q', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'LocationService', 'CompanyApplicationService', 'SurveyApplicationService',
    function controller($scope, $q, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, LocationService, CompanyApplicationService, SurveyApplicationService) {
        CompanyApplicationService.NotifyObservers();
        SurveyApplicationService.NotifyObservers();
        
        $scope.Init = function () {
            $scope.item = { Id: null, Name: "", Latitude: null, Longitude: null }
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

        $scope.ChangeAddress = function (value) {
            var address = JSON.stringify(value);
            return $http.get('http://maps.google.com/maps/api/geocode/json?address=' + address + '&sensor=false').then(function (data) {
                return data.data.results;
            });
        }

        $scope.SelectAddress = function (item, model, label) {
            $scope.item.Latitude = item.geometry.location.lat;
            $scope.item.Longitude = item.geometry.location.lng;
            $scope.item.Address = item.formatted_address;
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('LocationController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'LocationService', 'CompanyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, LocationService, CompanyApplicationService) {
        $scope.Search = function () {
            var predicate = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
            LocationService.Search(predicate, 0, 100, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.admin.location.addedit', { id: Id }, { reload: false });
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
                debugger;
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
            ProductService.Search(predicate, 0, 100, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.admin.product.addedit', { id: Id }, { reload: false });
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
            QuestionService.Search(predicate, 0, 100, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.admin.question.addedit', { id: Id }, { reload: false });
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
                if (data.length == 1) {
                    $scope.Select(data[0].Id);
                }
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.admin.survey.addedit', { id: Id }, { reload: false });
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
            SurveyCustomerLocationService.Search(p1, 0, 100, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.admin.surveycustomerlocation.addedit', { id: Id }, { reload: false });
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
            SurveyProductQuestionService.Search(p1, 0, 100, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.admin.surveyproductquestion.addedit', { id: Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            SurveyProductQuestionService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);
(function (moment) {
    "use strict";
    angular.module('Main').controller('UserRoleAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'UserRoleService', 'CustomerService', 'RoleService', 'CompanyApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location,
        $timeout, breezeservice, breeze, UserRoleService, CustomerService, RoleService, CompanyApplicationService) {
        CompanyApplicationService.NotifyObservers();

        $scope.Init = function () {
            $scope.item = { Id: null, Name: "" }
        }
        $scope.Init();
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                UserRoleService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
            RoleService.Search(null, 0, 5, false).then(function (data) {
                $scope.Roles = data;
            });
            var predicate = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
            CustomerService.Search(predicate, 0, 100, false).then(function (data) {
                $scope.Customers = data;
            });
        }
        $scope.Search();

        $scope.Save = function () {
            if (!$scope.Validate()) {
                return false;
            }
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                UserRoleService.Update($scope.item.Id, $scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    alert(error);
                });
            }
            else {
                $scope.item.CompanyId = CompanyApplicationService.SelectedCompany.Id;
                $scope.item.RoleId = $scope.item.Role.Id;
                if ($scope.item.Customer != undefined) {
                    $scope.item.CustomerId = $scope.item.Customer.Id;
                }
                UserRoleService.Create($scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    toastr.error("The username does not exist.");
                });
            }
        }

        $scope.Validate = function () {
            if ($scope.item.Role.Name == "Customer" && $scope.item.Customer == null) {
                toastr.error("A customer must be selected.");
                return false;
            }
            return true;
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('UserRoleController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'UserRoleService', 'CompanyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, UserRoleService, CompanyApplicationService) {
        $scope.Search = function () {
            var predicate = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
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
            })
        }
    }]);

})(moment);
(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('merchandise', {
            url: "/merchandise/:redirectState",
            templateUrl: "/App/ApplicationComponents/DataEntry/CustomerLocation/MerchandiseCustomerLocation.html"
        })
    });
    angular.module('Main').controller('MerchandiseCustomerLocationController', ['$scope', '$state', '$stateParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService', 'UserService', 'UserRoleService',
        'RoleService', 'SurveyCustomerLocationService', 'CompanyApplicationService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, UserRoleService,
        RoleService, SurveyCustomerLocationService, CompanyApplicationService, SelectionApplicationService) {
        $scope.RedirectState = $stateParams.redirectState;
        $scope.SelectedCompany = { Id: null };
        $scope.IsAdministrator = false;
        $scope.SelectedLocation = { Location: { Id: null }, Id: null };
        $scope.SelectedCustomer = { Customer: { Id: null }, Id: null };
        $scope.SelectedSurvey = { Survey: { Id: null }, Id: null, SurveyId: null };
        $scope.UserId = null;
        $scope.Search = function () {
            UserService.GetCurrentUser().then(function (data) {
                $scope.UserId = data;
                var predicate = { "UserId": { "==": data } };
                UserRoleService.SearchJson(predicate, 0, 100, false).then(function (data) {
                    var companies = data.map(function (e) { return e.CompanyId; });
                    CompanyService.Search({ "Id": { in: companies } }, 0, 20, false).then(function (data) {
                        if (data.length == 1) {
                            $scope.Company = data;
                            $scope.SelectedCompany = data[0];
                            $scope.SelectCompany();
                        }
                        else {
                            $scope.Company = data;
                        }
                    });
                });
            });
        }
        $scope.Search();

        $scope.SelectCompany = function () {
            SelectionApplicationService.SetCompanyId($scope.SelectedCompany.Id);
            $scope.CustomerSearch($scope.SelectedCompany.Id);
        }

        $scope.CustomerSearch = function (companyId) {
            //Admin for the selected company show all customers
            var promise = UserService.IsAdministrator(companyId);
            promise.then(function (data) {
                if (data == true) {
                    $scope.IsAdministrator = true;
                    var predicate = new breeze.Predicate('CompanyId', '==', companyId);
                    SurveyCustomerLocationService.SearchJson({ "CompanyId": { '==': companyId } }, ["Customer.Name asc"], 0, 20, false).then(function (data) {
                        $scope.Customer = data;
                    });
                }
                else {
                    return UserService.IsDataEntry(companyId);
                }
            }).then(function (data) {
                if (data == true) {
                    $scope.IsAdministrator = true;
                    var predicate = new breeze.Predicate('CompanyId', '==', companyId);
                    SurveyCustomerLocationService.SearchJson({ "CompanyId": { '==': companyId } }, ["Customer.Name asc"], 0, 20, false).then(function (data) {
                        $scope.Customer = data;
                    });
                }
                else {
                    return UserService.IsCustomer(companyId);
                }
            }).then(function (data) {
                if (data == true) {
                    var predicate = {
                        and: [
                           { "UserId": { "==": $scope.UserId } },
                           { "CompanyId": { '==': companyId } }
                        ]
                    }
                    UserRoleService.SearchJson(predicate, 0, 100, false).then(function (data) {
                        var customers = data.map(function (e) { return e.CustomerId; });
                        SurveyCustomerLocationService.SearchJson({ "CustomerId": { in: customers } }, ["Customer.Name asc"], 0, 20, false).then(function (data) {
                            if (data.length == 1) {
                                $scope.Customer = data;
                                $scope.SelectedCustomer = data[0];
                                $scope.SelectCustomer();
                            }
                            else {
                                $scope.Customer = data;
                            }
                        });
                    });
                }
            });
        }

        $scope.SelectCustomer = function () {
            SelectionApplicationService.SetCustomerId($scope.SelectedCustomer.Customer.Id);
            $scope.LocationSearch($scope.SelectedCompany.Id, $scope.SelectedCustomer.Customer.Id);
        }

        $scope.LocationSearch = function (companyId, customerId) {
            var predicate = {
                and: [
                   { "CompanyId": { "==": companyId } },
                   { "CustomerId": { '==': customerId } }
                ]
            }
            SurveyCustomerLocationService.SearchJson(predicate, ["Location.Name asc"], 0, 100, false).then(function (data) {
                if (data.length == 1) {
                    $scope.Location = data;
                    $scope.SelectedLocation = data[0];
                    $scope.SelectLocation();
                }
                else {
                    $scope.Location = data;
                }
            });
        }

        $scope.SelectLocation = function () {
            SelectionApplicationService.SetLocationId($scope.SelectedLocation.Location.Id);
            $scope.SurveySearch($scope.SelectedCompany.Id, $scope.SelectedLocation.Location.Id, $scope.SelectedCustomer.Customer.Id);
        }

        $scope.SurveySearch = function (companyId, locationId, customerId) {
            var predicate = {
                and: [
                   { "CompanyId": { "==": companyId } },
                   { "CustomerId": { '==': customerId } },
                   { "LocationId": { "==": locationId } }
                ]
            }
            SurveyCustomerLocationService.SearchJson(predicate, ["Survey.Name asc"], 0, 100, false).then(function (data) {
                $scope.Survey = data;
            });
        }

        $scope.SelectSurvey = function () {
            SelectionApplicationService.SetSurveyId($scope.SelectedSurvey.SurveyId);
            $state.go($stateParams.redirectState);
        }

        $scope.IsGoShown = function () {
            if ($stateParams.redirectState == 'main.reportmain' || $stateParams.redirectState == 'main.map') {
                return true;
            }
            else {
                return false;
            }
        }

        $scope.IsGoDisabled = function () {
            if ($scope.SelectedCompany.Id != null) {
                if ($scope.IsAdministrator == true) {
                    return false;
                }
                else {
                    if ($scope.SelectedCustomer.Id != null) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            }
            else {
                return true;
            }
        }
    }]);
})(moment);
(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.survey', {
            url: "/survey/:companyId/:surveyId/:customerId/:locationId/:surveyHeaderId",
            templateUrl: "/App/ApplicationComponents/DataEntry/Survey/MerchandiseSurvey.html"
        })
    });
    angular.module('Main').controller('MerchandiseSurveyController', ['$scope', '$q', '$state', '$stateParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService',
        'UserService', 'SurveyCustomerLocationService', 'SurveyProductQuestionService', 'CompanyApplicationService', 'SurveyHeaderService', 'SurveyDetailService', 'ImageService',
        'SelectionApplicationService',
    function controller($scope, $q, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService,
        UserService, SurveyCustomerLocationService, SurveyProductQuestionService, CompanyApplicationService, SurveyHeaderService, SurveyDetailService, ImageService,
        SelectionApplicationService) {
        $scope.BeforeImage = null;
        $scope.AfterImage = null;
        $scope.Header = {
            BeforeImage: null, AfterImage: null, Latitude: null, Longitude: null,
            CompanyId: SelectionApplicationService.GetCompanyId(), SurveyId: SelectionApplicationService.GetSurveyId(),
            CustomerId: SelectionApplicationService.GetCustomerId(), LocationId: SelectionApplicationService.GetLocationId()
        }
        navigator.geolocation.getCurrentPosition(function (position) {
            $scope.Header.Latitude = position.coords.latitude;
            $scope.Header.Longitude = position.coords.longitude;
        });
        $scope.Detail = [];

        $scope.Search = function () {
            if (SelectionApplicationService.GetSurveyHeaderId() != undefined && SelectionApplicationService.GetSurveyHeaderId() != null && SelectionApplicationService.GetSurveyHeaderId() != "") {

                var predicate = new breeze.Predicate('Id', '==', SelectionApplicationService.GetSurveyHeaderId());
                SurveyHeaderService.Search(predicate, 0, 1, false).then(function (data) {
                    $scope.Header = data[0];
                })
                predicate = new breeze.Predicate('SurveyHeaderId', '==', SelectionApplicationService.GetSurveyHeaderId());
                SurveyDetailService.Search(predicate, 0, 100, false).then(function (data) {
                    $scope.Detail = data;
                });
                $scope.BeforeImage = "/api/v1/ImageApi/GetBeforeImage/" + SelectionApplicationService.GetSurveyHeaderId();
                $scope.AfterImage = "/api/v1/ImageApi/GetAfterImage/" + SelectionApplicationService.GetSurveyHeaderId();
            }
            else {
                var predicate = new breeze.Predicate('SurveyId', '==', SelectionApplicationService.GetSurveyId());
                SurveyProductQuestionService.Search(predicate, 0, 100, false).then(function (data) {
                    
                    $scope.Detail = data;
                });
            }
        }
        $scope.Search();

        $scope.setBeforeImage = function (element) {
            var reader = new FileReader();
            $scope.Header.BeforeImage = element.files[0];
            reader.onload = function (event) {
                $scope.BeforeImage = event.target.result;
                $scope.$apply();
            }
            reader.readAsDataURL(element.files[0]);
        }

        $scope.setAfterImage = function (element) {
            var reader = new FileReader();
            $scope.Header.AfterImage = element.files[0];
            reader.onload = function (event) {
                $scope.AfterImage = event.target.result;
                $scope.$apply();
            }
            reader.readAsDataURL(element.files[0]);
        }

        $scope.Save = function () {
            var promises = [];
            var promise = null;
            if (!$scope.Validate()) {
                return false;
            }
            if (SelectionApplicationService.GetSurveyHeaderId() != undefined && SelectionApplicationService.GetSurveyHeaderId() != null && SelectionApplicationService.GetSurveyHeaderId() != "") {
                var details = [];
                angular.forEach($scope.Detail, function (value, key) {
                    details.push({
                        Id: value.Id,
                        Answer: value.Answer
                    })
                });
                var item = { Header: $scope.Header, Details: details };
                promise = SurveyHeaderService.UpdateBulk($scope.Header.Id, item).then(function(data){
                    promises.push(promise);
                    promise = ImageService.CreateBeforeImage($scope.Header.BeforeImage, data.data.Id);
                    promises.push(promise);
                    promise = ImageService.CreateAfterImage($scope.Header.AfterImage, data.data.Id);
                    promises.push(promise);
                    $q.all([promises]).then(function () {
                        toastr.success("Save successful.");
                    });
                });
            }
            else {
                var details = [];
                angular.forEach($scope.Detail, function (value, key) {
                    details.push({
                        CompanyId: SelectionApplicationService.GetCompanyId(),
                        ProductId: value.Product.Id,
                        QuestionId: value.Question.Id,
                        Answer: value.Answer
                    })
                });
                var item = { Header: $scope.Header, Details: details };
                promise = SurveyHeaderService.CreateBulk(item).then(function (data) {
                    promise = ImageService.CreateBeforeImage($scope.Header.BeforeImage, data.data.Id);
                    promises.push(promise);
                    promise = ImageService.CreateAfterImage($scope.Header.AfterImage, data.data.Id);
                    promises.push(promise);
                    $q.all([promises]).then(function () {
                        toastr.success("Save successful.");
                        SelectionApplicationService.SetSurveyHeaderId(data.data.Id);
                        $scope.Search();
                    });
                });
                promises.push(promise);  
            }
        }

        $scope.Validate = function () {
            var fileSizeBeforeImage = 0; var fileSizeAfterImage = 0;
            if ($scope.Header.BeforeImage != null) {
                var fileSizeBeforeImage = $scope.Header.BeforeImage.size; // in bytes
            }
            if ($scope.Header.AfterImage != null) {
                var fileSizeAfterImage = $scope.Header.AfterImage.size; // in bytes
            }
            if (fileSizeBeforeImage > 3096000 || fileSizeAfterImage > 3096000) {
                alert('File size is more then ' + 3 + ' Megabytes.');
                return false;
            }
            return true;
        }

        $scope.DeleteBeforeImage = function () {
            $scope.BeforeImage = null;
            $scope.Header.BeforeImage = null; 
            if (SelectionApplicationService.GetSurveyHeaderId() != undefined && SelectionApplicationService.GetSurveyHeaderId() != null && SelectionApplicationService.GetSurveyHeaderId() != "") {
                ImageService.DeleteBeforeImage(SelectionApplicationService.GetSurveyHeaderId()).then(function () {

                });
            }
        }

        $scope.DeleteAfterImage = function () {
            $scope.AfterImage = null;
            $scope.Header.AfterImage = null;
            angular.element(document.querySelector('#AfterImage')).empty();
            if (SelectionApplicationService.GetSurveyHeaderId() != undefined && SelectionApplicationService.GetSurveyHeaderId() != null && SelectionApplicationService.GetSurveyHeaderId() != "") {
                ImageService.DeleteAfterImage(SelectionApplicationService.GetSurveyHeaderId()).then(function () {

                });
            }
        }
    }]);
})(moment);
(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('surveydata', {
            url: "/surveydata/",
            templateUrl: "/App/ApplicationComponents/DataEntry/SurveyData/MerchandiseSurveyData.html"
        })
    });
    angular.module('Main').controller('MerchandiseSurveyDataController', ['$scope', '$state', '$stateParams', '$http', '$location', '$timeout', 'uiGridConstants', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService',
        'UserService', 'SurveyCustomerLocationService', 'SurveyProductQuestionService', 'CompanyApplicationService', 'SurveyHeaderService', 'SurveyDetailService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, uiGridConstants, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService,
        UserService, SurveyCustomerLocationService, SurveyProductQuestionService, CompanyApplicationService, SurveyHeaderService, SurveyDetailService) {


        $scope.grid = {
            options: {
                showGridFooter: true,
                enableFiltering: true,
                enableSorting: true,
                headerTooltip: true,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                },
                enableGridMenu: true,
                exporterCsvFilename: 'data.csv',
                exporterPdfOrientation: 'portrait',
                exporterPdfPageSize: 'LETTER',
                exporterPdfMaxGridWidth: 450,
                data: null,
                columnDefs: [
                    { field: 'Id', displayName: '', width: '60', enableFiltering: false, enableSorting: false, cellTemplate: '<div><button class="btn btn-danger btn-sm" ng-click="grid.appScope.vm.functions.data.delete(row.entity.Id)">Delete</button></div>' },
                    { field: 'Id', headerTooltip: true, displayName: 'Id' },
                    //{ field: 'EmployeeId', cellTooltip: true, headerTooltip: true, displayName: 'Employee Id (unique)' },
                    //{ field: 'FirstName', cellTooltip: true, headerTooltip: true, displayName: 'First Name' },
                    //{ field: 'LastName', cellTooltip: true, headerTooltip: true, displayName: 'Last Name' },
                    //{ field: 'ElectionPeriod', cellTooltip: true, headerTooltip: true, displayName: 'Election Period (unique)', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.ElectionPeriod | date: "MM/dd/yyyy"}}</div>' },
                    //{ field: 'AmountDueDate', cellTooltip: true, headerTooltip: true, displayName: 'Amount Due Date', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.AmountDueDate | date: "MM/dd/yyyy"}}</div>' },
                    //{ field: 'SharesVesting', cellTooltip: true, headerTooltip: true, displayName: 'Shares Vesting' },
                    //{ field: 'IsViewed', cellTooltip: true, headerTooltip: true, displayName: 'Is Viewed' },
                    //{ field: 'ElectionType', cellTooltip: true, headerTooltip: true, displayName: 'Election Type' },
                    //{ field: 'Created', cellTooltip: true, headerTooltip: true, displayName: 'Created', cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.Created | date: "MM/dd/yyyy"}}</div>' }
                ]
            }
        }

        $scope.Search = function () {
            
        }
    }]);
})(moment);
(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.map', {
            url: "/map",
            templateUrl: "/App/ApplicationComponents/Report/Map/Map.html"
        })
    });
    angular.module('Main').controller('MapController', ['$scope', '$state', '$stateParams', 'NgMap', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'MapService', 'SurveyHeaderService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, NgMap, $http, $location,
        $timeout, breezeservice, breeze, MapService, SurveyHeaderService, SelectionApplicationService) {
        $scope.SelectedPosition = null;
        $scope.Search = function () {
            var predicate = {
                and: [
                   { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } }
                ]
            }
            if (SelectionApplicationService.GetCustomerId() != null) { predicate.and.push({ "CustomerId": { "==": SelectionApplicationService.GetCustomerId() } }) }
            if (SelectionApplicationService.GetLocationId() != null) { predicate.and.push({ "LocationId": { "==": SelectionApplicationService.GetLocationId() } }) }
            if (SelectionApplicationService.GetSurveyId() != null) { predicate.and.push({ "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } }) }
            MapService.Search(predicate, ["Created desc"], 0, 100, false).then(function (data) {
                $scope.positions = data;
            });
        }
        NgMap.getMap().then(function (map) {
            $scope.map = map;
        });
        $scope.Search();

        $scope.SelectPosition = function (position) {
            $scope.SelectedPosition = position;
            $scope.map.panTo({ lat: $scope.SelectedPosition.Latitude, lng: $scope.SelectedPosition.Longitude });
        }

        $scope.SelectMarker = function (event, marker) {
            $scope.SelectedPosition = marker;
        }
    }]);
})(moment);
(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.reportmain', {
            url: "/reportmain/:companyId/:surveyId/:customerId/:locationId/:surveyHeaderId",
            templateUrl: "/App/ApplicationComponents/Report/Main/ReportMain.html"
        })
    });
    angular.module('Main').controller('ReportMainController', ['$scope', '$state', '$stateParams', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'ReportService', 'SurveyHeaderService', 'SelectionApplicationService', 'UserService',
    function controller($scope, $state, $stateParams, $http, $location,
        $timeout, breezeservice, breeze, ReportService, SurveyHeaderService, SelectionApplicationService, UserService) {
        $scope.Search = function () {
            ReportService.Search(SelectionApplicationService.GetCompanyId(), null, SelectionApplicationService.GetCustomerId(), SelectionApplicationService.GetLocationId(), null, null, null, 0, 10000).then(function (data) {
                $scope.gridOptions.data = data;
                UserService.IsAdministrator(SelectionApplicationService.GetCompanyId()).then(function (data) {
                    if (data == true) {
                        $scope.gridOptions.columnDefs.splice(0,0,{
                            name: 'Manage', cellTemplate: '/App/ApplicationComponents/Report/Main/CellTemplates/EditDelete.html'
                        });
                    }
                    else {
                        return UserService.IsDataEntry(SelectionApplicationService.GetCompanyId())
                    }
                }).then(function (data) {
                    if (data == true) {
                        $scope.gridOptions.columnDefs.splice(0, 0, {
                            name: 'Manage', cellTemplate: '/App/ApplicationComponents/Report/Main/CellTemplates/EditDelete.html'
                        });
                    }                    
                });
                $scope.gridOptions.columnDefs.push({
                    field: 'ProductName', name: 'Product Name', cellTooltip: true
                });
                $scope.gridOptions.columnDefs.push({
                    field: 'SurveyName', name: 'Survey Name', cellTooltip: true
                });
                var keys = []
                var obj = $scope.gridOptions.data[0];
                for (var key in obj) {
                    keys.push(key)
                    if ((key != 'Created' && !key.includes("Id") && !key.includes("Name"))) {
                        $scope.gridOptions.columnDefs.push({
                            name: key, cellTooltip: true
                        });
                    }
                }
                $scope.gridOptions.columnDefs.push({
                    name: 'Created', cellTooltip: true, cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">{{row.entity.Created | date: "MM/dd/yyyy h:mm:ss a": "UTC"}}</div>'
                });
            });
        }
        $scope.Search();

        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            enableGridMenu: true,
            exporterCsvFilename: 'myFile.csv',
            exporterPdfOrientation: 'portrait',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 500,
            data: [],
            columnDefs: [
              //{ name: 'Id' },
              //{ name: 'ProductName' },
              //{ name: 'LocationName' },
              //{ name: 'CustomerName' },
              //{ name: 'Question' },
              //{ name: 'Answer' },
              //{ name: $scope.gridOptions.data[0] },
              //{ name: 'Created', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">{{row.entity.Created | date: "MM/dd/yyyy h:mm:ss a": "UTC"}}</div>' }
              //{ name: 'cumulativeWidgets', field: 'widgets', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">{{grid.appScope.cumulative(grid, row)}}</div>' }
            ]
        };

        $scope.Edit = function (row) {
            SelectionApplicationService.SetSurveyHeaderId(row.Id);
            $state.go('main.survey');
        }

        $scope.Delete = function(id){
            SurveyHeaderService.DeleteBulk(id).then(function (data) {
                var index = $scope.gridOptions.data.map(function (e) { return e.Id; }).indexOf(id);
                $scope.gridOptions.data.splice(index, 1);
            }, function (error) {
                toastr.error("There was an error deleting the survey data.");
            });
        }
    }]);
})(moment);