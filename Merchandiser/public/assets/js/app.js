
(function() {
    'use strict';
    var services = angular.module('ApplicationServices', []);
})();
angular.module('ApplicationServices').service('SelectionApplicationService', function () {
    var observers = [];
    this.RegisterObserver = function (callback) {
        observers.push(callback);
    }

    this.NotifyObservers = function () {
        angular.forEach(observers, function (callback) {
            callback();
        });
    };

    this.RedirectState = null;
    this.GetRedirectState = function () {
        return this.RedirectState;
    }

    this.SetRedirectState = function (state) {
        this.RedirectState = state;
    }

    this.CompanyId = null;
    this.GetCompanyId = function () {
        return this.CompanyId;
    };

    this.SetCompanyId = function (id) {
        this.CompanyId = id;
        this.NotifyObservers();
    }

    this.Company = null;
    this.GetCompany = function () {
        return this.Company;
    };

    this.SetCompany = function (item) {
        this.Company = item;
        this.NotifyObservers();
    }

    this.CustomerId = null;
    this.GetCustomerId = function () {
        return this.CustomerId;
    };

    this.SetCustomerId = function (id) {
        this.CustomerId = id;
        this.NotifyObservers();
    }

    this.Customer = null;
    this.GetCustomer = function () {
        return this.Customer;
    };

    this.SetCustomer = function (item) {
        this.Customer = item;
        this.NotifyObservers();
    }

    this.LocationId = null;
    this.GetLocationId = function () {
        return this.LocationId;
    };

    this.SetLocationId = function (id) {
        this.LocationId = id;
        this.NotifyObservers();
    }

    this.Location = null;
    this.GetLocation = function () {
        return this.Location;
    };

    this.SetLocation = function (item) {
        this.Location = item;
        this.NotifyObservers();
    }

    this.SurveyId = null;
    this.GetSurveyId = function () {
        return this.SurveyId;
    };

    this.SetSurveyId = function (id) {
        this.SurveyId = id;
        this.NotifyObservers();
    }

    this.Survey = null;
    this.GetSurvey = function () {
        return this.Survey;
    };

    this.SetSurvey = function (item) {
        this.Survey = item;
        this.NotifyObservers();
    }

    this.SurveyHeaderId = null;
    this.GetSurveyHeaderId = function () {
        return this.SurveyHeaderId;
    };

    this.SetSurveyHeaderId = function (id) {
        this.SurveyHeaderId = id;
        this.NotifyObservers();
    }

    this.Role = null;
    this.GetRole = function () {
        return this.Role;
    }

    this.SetRole = function (role) {
        this.Role = role;
        this.NotifyObservers();
    }

    this.Clear = function () {
        this.RedirectState = null;

        this.CompanyId = null;
        this.Company = null;

        this.CustomerId = null;
        this.Customer = null;

        this.LocationId = null;
        this.Location = null;

        this.SurveyId = null;
        this.Survey = null;

        this.SurveyHeaderId = null;
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

        this.Search = function (predicate, order, page, pageSize, cancelExistingSearch) {
            cancelExistingSearch = cancelExistingSearch || false;

            if (this.deferredRequest !== null && cancelExistingSearch) {
                this.deferredRequest.reject("Cancelled Search Request.");
                this.deferredRequest = null;
            }
            var deferred = $q.defer();

            var query = new breeze.EntityQuery({
                from: "CompanyApi/Search",
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

        this.AdminSearch = function (predicate, order, page, pageSize, cancelExistingSearch) {
            cancelExistingSearch = cancelExistingSearch || false;

            if (this.deferredRequest !== null && cancelExistingSearch) {
                this.deferredRequest.reject("Cancelled Search Request.");
                this.deferredRequest = null;
            }
            var deferred = $q.defer();

            var query = new breeze.EntityQuery({
                from: "CompanyApi/AdminSearch",
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
                if (response.data.length > 0) {
                    deferred.reject(response);
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
                if (response.data.length > 0) {
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
                if (response.data.length > 0) {
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
        var meta = manager.metadataStore;
        meta.setEntityTypeForResourceName("UserRoleApi/Search", "UserRoleViewModel");
        meta.setEntityTypeForResourceName("CompanyApi/Search", "CompanyViewModel");
        meta.setEntityTypeForResourceName("CustomerApi/Search", "CustomerViewModel");
        meta.setEntityTypeForResourceName("LocationApi/Search", "LocationViewModel");
        meta.setEntityTypeForResourceName("SurveyCustomerLocationApi/Search", "SurveyCustomerLocationViewModel");
        meta.setEntityTypeForResourceName("SurveyProductQuestionApi/Search", "SurveyProductQuestionViewModel");
        meta.setEntityTypeForResourceName("SurveyCustomerLocationProductQuestionApi/Search", "SurveyCustomerLocationProductQuestionViewModel");
        meta.setEntityTypeForResourceName("RoleApi/Search", "RoleViewModel");
        meta.setEntityTypeForResourceName("MapApi/Search", "MapViewModel");
        meta.setEntityTypeForResourceName("ProductCategoryApi/Search", "ProductCategoryViewModel");
        meta.setEntityTypeForResourceName("SurveyHeaderApi/Search", "SurveyHeaderViewModel");
        meta.setEntityTypeForResourceName("SelectLocationApi/Search", "SelectLocationViewModel");        
        meta.setEntityTypeForResourceName("SelectSurveyApi/Search", "SelectSurveyViewModel");
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
{"schema":{"namespace":"Merchandiser","alias":"Self","annotation:UseStrongSpatialTypes":"false","xmlns:annotation":"http://schemas.microsoft.com/ado/2009/02/edm/annotation","xmlns:customannotation":"http://schemas.microsoft.com/ado/2013/11/edm/customannotation","xmlns":"http://schemas.microsoft.com/ado/2009/11/edm","cSpaceOSpaceMapping":"[[\"Merchandiser.CompanyViewModel\",\"Merchandiser.Models.CompanyViewModel\"],[\"Merchandiser.CustomerViewModel\",\"Merchandiser.Models.CustomerViewModel\"],[\"Merchandiser.MapViewModel\",\"Merchandiser.Models.MapViewModel\"],[\"Merchandiser.ProductCategoryViewModel\",\"Merchandiser.Models.ProductCategoryViewModel\"],[\"Merchandiser.RoleViewModel\",\"Merchandiser.Models.RoleViewModel\"],[\"Merchandiser.SelectLocationViewModel\",\"Merchandiser.Models.SelectLocationViewModel\"],[\"Merchandiser.SelectSurveyViewModel\",\"Merchandiser.Models.SelectSurveyViewModel\"],[\"Merchandiser.SurveyCustomerLocationProductQuestionViewModel\",\"Merchandiser.Models.SurveyCustomerLocationProductQuestionViewModel\"],[\"Merchandiser.LocationViewModel\",\"Merchandiser.Models.LocationViewModel\"],[\"Merchandiser.ProductViewModel\",\"Merchandiser.Models.ProductViewModel\"],[\"Merchandiser.QuestionViewModel\",\"Merchandiser.Models.QuestionViewModel\"],[\"Merchandiser.SurveyViewModel\",\"Merchandiser.Models.SurveyViewModel\"],[\"Merchandiser.SurveyCustomerLocationViewModel\",\"Merchandiser.Models.SurveyCustomerLocationViewModel\"],[\"Merchandiser.SurveyHeaderViewModel\",\"Merchandiser.Models.SurveyHeaderViewModel\"],[\"Merchandiser.UserViewModel\",\"Merchandiser.Models.UserViewModel\"],[\"Merchandiser.UserInfoViewModel\",\"Merchandiser.Models.UserInfoViewModel\"],[\"Merchandiser.SurveyProductQuestionViewModel\",\"Merchandiser.Models.SurveyProductQuestionViewModel\"],[\"Merchandiser.UserRoleViewModel\",\"Merchandiser.Models.UserRoleViewModel\"]]","entityType":[{"name":"CompanyViewModel","customannotation:ClrType":"Merchandiser.Models.CompanyViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"CustomerViewModel","customannotation:ClrType":"Merchandiser.Models.CustomerViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"IsSendReport","type":"Edm.Boolean","nullable":"false"},{"name":"SendReport","type":"Edm.DateTime"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"MapViewModel","customannotation:ClrType":"Merchandiser.Models.MapViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"Latitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Longitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"FirstName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"LastName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Notes","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid","nullable":"false"},{"name":"LocationId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyId","type":"Edm.Guid","nullable":"false"},{"name":"CompanyName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"CustomerName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"LocationName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"SurveyName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"ProductCategoryViewModel","customannotation:ClrType":"Merchandiser.Models.ProductCategoryViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"RoleViewModel","customannotation:ClrType":"Merchandiser.Models.RoleViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"SelectLocationViewModel","customannotation:ClrType":"Merchandiser.Models.SelectLocationViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid"},{"name":"CompanyId","type":"Edm.Guid"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Latitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Longitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Address","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"SurveyCreated","type":"Edm.DateTime"}]},{"name":"SelectSurveyViewModel","customannotation:ClrType":"Merchandiser.Models.SelectSurveyViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid"},{"name":"CompanyId","type":"Edm.Guid"},{"name":"LocationId","type":"Edm.Guid"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"SurveyCreated","type":"Edm.DateTime"}]},{"name":"SurveyCustomerLocationProductQuestionViewModel","customannotation:ClrType":"Merchandiser.Models.SurveyCustomerLocationProductQuestionViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyId","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid","nullable":"false"},{"name":"LocationId","type":"Edm.Guid","nullable":"false"},{"name":"ProductId","type":"Edm.Guid","nullable":"false"},{"name":"QuestionId","type":"Edm.Guid","nullable":"false"},{"name":"RowOrder","type":"Edm.Int32","nullable":"false"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Company","relationship":"Self.SurveyCustomerLocationProductQuestionViewModel_Company","fromRole":"SurveyCustomerLocationProductQuestionViewModel_Company_Source","toRole":"SurveyCustomerLocationProductQuestionViewModel_Company_Target"},{"name":"Customer","relationship":"Self.SurveyCustomerLocationProductQuestionViewModel_Customer","fromRole":"SurveyCustomerLocationProductQuestionViewModel_Customer_Source","toRole":"SurveyCustomerLocationProductQuestionViewModel_Customer_Target"},{"name":"Location","relationship":"Self.SurveyCustomerLocationProductQuestionViewModel_Location","fromRole":"SurveyCustomerLocationProductQuestionViewModel_Location_Source","toRole":"SurveyCustomerLocationProductQuestionViewModel_Location_Target"},{"name":"Product","relationship":"Self.SurveyCustomerLocationProductQuestionViewModel_Product","fromRole":"SurveyCustomerLocationProductQuestionViewModel_Product_Source","toRole":"SurveyCustomerLocationProductQuestionViewModel_Product_Target"},{"name":"Question","relationship":"Self.SurveyCustomerLocationProductQuestionViewModel_Question","fromRole":"SurveyCustomerLocationProductQuestionViewModel_Question_Source","toRole":"SurveyCustomerLocationProductQuestionViewModel_Question_Target"},{"name":"Survey","relationship":"Self.SurveyCustomerLocationProductQuestionViewModel_Survey","fromRole":"SurveyCustomerLocationProductQuestionViewModel_Survey_Source","toRole":"SurveyCustomerLocationProductQuestionViewModel_Survey_Target"}]},{"name":"LocationViewModel","customannotation:ClrType":"Merchandiser.Models.LocationViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Store","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Latitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Longitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Address","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"AreaManager","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"ProductViewModel","customannotation:ClrType":"Merchandiser.Models.ProductViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"ProductCategoryId","type":"Edm.Guid"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":{"name":"ProductCategory","relationship":"Self.ProductViewModel_ProductCategory","fromRole":"ProductViewModel_ProductCategory_Source","toRole":"ProductViewModel_ProductCategory_Target"}},{"name":"QuestionViewModel","customannotation:ClrType":"Merchandiser.Models.QuestionViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"IsRequired","type":"Edm.Boolean","nullable":"false"},{"name":"IsTrueFalse","type":"Edm.Boolean","nullable":"false"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"SurveyViewModel","customannotation:ClrType":"Merchandiser.Models.SurveyViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"IsNoteRequired","type":"Edm.Boolean","nullable":"false"},{"name":"IsEdit","type":"Edm.Boolean","nullable":"false"},{"name":"IsEditDays","type":"Edm.Int32"},{"name":"IsDelete","type":"Edm.Boolean","nullable":"false"},{"name":"IsDeleteDays","type":"Edm.Int32"},{"name":"Modifed","type":"Edm.DateTime","nullable":"false"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"SurveyCustomerLocationViewModel","customannotation:ClrType":"Merchandiser.Models.SurveyCustomerLocationViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyId","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid","nullable":"false"},{"name":"LocationId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modifed","type":"Edm.DateTime","nullable":"false"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Customer","relationship":"Self.SurveyCustomerLocationViewModel_Customer","fromRole":"SurveyCustomerLocationViewModel_Customer_Source","toRole":"SurveyCustomerLocationViewModel_Customer_Target"},{"name":"Location","relationship":"Self.SurveyCustomerLocationViewModel_Location","fromRole":"SurveyCustomerLocationViewModel_Location_Source","toRole":"SurveyCustomerLocationViewModel_Location_Target"},{"name":"Survey","relationship":"Self.SurveyCustomerLocationViewModel_Survey","fromRole":"SurveyCustomerLocationViewModel_Survey_Source","toRole":"SurveyCustomerLocationViewModel_Survey_Target"}]},{"name":"SurveyHeaderViewModel","customannotation:ClrType":"Merchandiser.Models.SurveyHeaderViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyId","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid","nullable":"false"},{"name":"LocationId","type":"Edm.Guid","nullable":"false"},{"name":"IsBeforeImage","type":"Edm.Boolean","nullable":"false"},{"name":"IsAfterImage","type":"Edm.Boolean","nullable":"false"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modified","type":"Edm.DateTime","nullable":"false"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Latitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Longitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Notes","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Company","relationship":"Self.SurveyHeaderViewModel_Company","fromRole":"SurveyHeaderViewModel_Company_Source","toRole":"SurveyHeaderViewModel_Company_Target"},{"name":"CreatedUser","relationship":"Self.SurveyHeaderViewModel_CreatedUser","fromRole":"SurveyHeaderViewModel_CreatedUser_Source","toRole":"SurveyHeaderViewModel_CreatedUser_Target"},{"name":"Customer","relationship":"Self.SurveyHeaderViewModel_Customer","fromRole":"SurveyHeaderViewModel_Customer_Source","toRole":"SurveyHeaderViewModel_Customer_Target"},{"name":"Location","relationship":"Self.SurveyHeaderViewModel_Location","fromRole":"SurveyHeaderViewModel_Location_Source","toRole":"SurveyHeaderViewModel_Location_Target"},{"name":"ModifiedUser","relationship":"Self.SurveyHeaderViewModel_ModifiedUser","fromRole":"SurveyHeaderViewModel_ModifiedUser_Source","toRole":"SurveyHeaderViewModel_ModifiedUser_Target"},{"name":"Survey","relationship":"Self.SurveyHeaderViewModel_Survey","fromRole":"SurveyHeaderViewModel_Survey_Source","toRole":"SurveyHeaderViewModel_Survey_Target"},{"name":"UserInfo","relationship":"Self.SurveyHeaderViewModel_UserInfo","fromRole":"SurveyHeaderViewModel_UserInfo_Source","toRole":"SurveyHeaderViewModel_UserInfo_Target"}]},{"name":"UserViewModel","customannotation:ClrType":"Merchandiser.Models.UserViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"UserName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"UserInfoViewModel","customannotation:ClrType":"Merchandiser.Models.UserInfoViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"FirstName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"LastName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"SurveyProductQuestionViewModel","customannotation:ClrType":"Merchandiser.Models.SurveyProductQuestionViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyId","type":"Edm.Guid","nullable":"false"},{"name":"ProductId","type":"Edm.Guid","nullable":"false"},{"name":"QuestionId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"RowOrder","type":"Edm.Int32","nullable":"false"},{"name":"Modifed","type":"Edm.DateTime","nullable":"false"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Product","relationship":"Self.SurveyProductQuestionViewModel_Product","fromRole":"SurveyProductQuestionViewModel_Product_Source","toRole":"SurveyProductQuestionViewModel_Product_Target"},{"name":"Question","relationship":"Self.SurveyProductQuestionViewModel_Question","fromRole":"SurveyProductQuestionViewModel_Question_Source","toRole":"SurveyProductQuestionViewModel_Question_Target"},{"name":"Survey","relationship":"Self.SurveyProductQuestionViewModel_Survey","fromRole":"SurveyProductQuestionViewModel_Survey_Source","toRole":"SurveyProductQuestionViewModel_Survey_Target"}]},{"name":"UserRoleViewModel","customannotation:ClrType":"Merchandiser.Models.UserRoleViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"UserId","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true"},{"name":"RoleId","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid"}],"navigationProperty":[{"name":"Company","relationship":"Self.UserRoleViewModel_Company","fromRole":"UserRoleViewModel_Company_Source","toRole":"UserRoleViewModel_Company_Target"},{"name":"Customer","relationship":"Self.UserRoleViewModel_Customer","fromRole":"UserRoleViewModel_Customer_Source","toRole":"UserRoleViewModel_Customer_Target"},{"name":"Role","relationship":"Self.UserRoleViewModel_Role","fromRole":"UserRoleViewModel_Role_Source","toRole":"UserRoleViewModel_Role_Target"},{"name":"User","relationship":"Self.UserRoleViewModel_User","fromRole":"UserRoleViewModel_User_Source","toRole":"UserRoleViewModel_User_Target"},{"name":"UserInfo","relationship":"Self.UserRoleViewModel_UserInfo","fromRole":"UserRoleViewModel_UserInfo_Source","toRole":"UserRoleViewModel_UserInfo_Target"}]}],"association":[{"name":"SurveyCustomerLocationProductQuestionViewModel_Company","end":[{"role":"SurveyCustomerLocationProductQuestionViewModel_Company_Source","type":"Edm.Self.SurveyCustomerLocationProductQuestionViewModel","multiplicity":"*"},{"role":"SurveyCustomerLocationProductQuestionViewModel_Company_Target","type":"Edm.Self.CompanyViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocationProductQuestionViewModel_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocationProductQuestionViewModel_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"SurveyCustomerLocationProductQuestionViewModel_Customer","end":[{"role":"SurveyCustomerLocationProductQuestionViewModel_Customer_Source","type":"Edm.Self.SurveyCustomerLocationProductQuestionViewModel","multiplicity":"*"},{"role":"SurveyCustomerLocationProductQuestionViewModel_Customer_Target","type":"Edm.Self.CustomerViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocationProductQuestionViewModel_Customer_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocationProductQuestionViewModel_Customer_Source","propertyRef":{"name":"CustomerId"}}}},{"name":"SurveyCustomerLocationProductQuestionViewModel_Location","end":[{"role":"SurveyCustomerLocationProductQuestionViewModel_Location_Source","type":"Edm.Self.SurveyCustomerLocationProductQuestionViewModel","multiplicity":"*"},{"role":"SurveyCustomerLocationProductQuestionViewModel_Location_Target","type":"Edm.Self.LocationViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocationProductQuestionViewModel_Location_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocationProductQuestionViewModel_Location_Source","propertyRef":{"name":"LocationId"}}}},{"name":"ProductViewModel_ProductCategory","end":[{"role":"ProductViewModel_ProductCategory_Source","type":"Edm.Self.ProductViewModel","multiplicity":"*"},{"role":"ProductViewModel_ProductCategory_Target","type":"Edm.Self.ProductCategoryViewModel","multiplicity":"0..1"}],"referentialConstraint":{"principal":{"role":"ProductViewModel_ProductCategory_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"ProductViewModel_ProductCategory_Source","propertyRef":{"name":"ProductCategoryId"}}}},{"name":"SurveyCustomerLocationProductQuestionViewModel_Product","end":[{"role":"SurveyCustomerLocationProductQuestionViewModel_Product_Source","type":"Edm.Self.SurveyCustomerLocationProductQuestionViewModel","multiplicity":"*"},{"role":"SurveyCustomerLocationProductQuestionViewModel_Product_Target","type":"Edm.Self.ProductViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocationProductQuestionViewModel_Product_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocationProductQuestionViewModel_Product_Source","propertyRef":{"name":"ProductId"}}}},{"name":"SurveyCustomerLocationProductQuestionViewModel_Question","end":[{"role":"SurveyCustomerLocationProductQuestionViewModel_Question_Source","type":"Edm.Self.SurveyCustomerLocationProductQuestionViewModel","multiplicity":"*"},{"role":"SurveyCustomerLocationProductQuestionViewModel_Question_Target","type":"Edm.Self.QuestionViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocationProductQuestionViewModel_Question_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocationProductQuestionViewModel_Question_Source","propertyRef":{"name":"QuestionId"}}}},{"name":"SurveyCustomerLocationProductQuestionViewModel_Survey","end":[{"role":"SurveyCustomerLocationProductQuestionViewModel_Survey_Source","type":"Edm.Self.SurveyCustomerLocationProductQuestionViewModel","multiplicity":"*"},{"role":"SurveyCustomerLocationProductQuestionViewModel_Survey_Target","type":"Edm.Self.SurveyViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocationProductQuestionViewModel_Survey_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocationProductQuestionViewModel_Survey_Source","propertyRef":{"name":"SurveyId"}}}},{"name":"SurveyCustomerLocationViewModel_Customer","end":[{"role":"SurveyCustomerLocationViewModel_Customer_Source","type":"Edm.Self.SurveyCustomerLocationViewModel","multiplicity":"*"},{"role":"SurveyCustomerLocationViewModel_Customer_Target","type":"Edm.Self.CustomerViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocationViewModel_Customer_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocationViewModel_Customer_Source","propertyRef":{"name":"CustomerId"}}}},{"name":"SurveyCustomerLocationViewModel_Location","end":[{"role":"SurveyCustomerLocationViewModel_Location_Source","type":"Edm.Self.SurveyCustomerLocationViewModel","multiplicity":"*"},{"role":"SurveyCustomerLocationViewModel_Location_Target","type":"Edm.Self.LocationViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocationViewModel_Location_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocationViewModel_Location_Source","propertyRef":{"name":"LocationId"}}}},{"name":"SurveyCustomerLocationViewModel_Survey","end":[{"role":"SurveyCustomerLocationViewModel_Survey_Source","type":"Edm.Self.SurveyCustomerLocationViewModel","multiplicity":"*"},{"role":"SurveyCustomerLocationViewModel_Survey_Target","type":"Edm.Self.SurveyViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocationViewModel_Survey_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocationViewModel_Survey_Source","propertyRef":{"name":"SurveyId"}}}},{"name":"SurveyHeaderViewModel_Company","end":[{"role":"SurveyHeaderViewModel_Company_Source","type":"Edm.Self.SurveyHeaderViewModel","multiplicity":"*"},{"role":"SurveyHeaderViewModel_Company_Target","type":"Edm.Self.CompanyViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyHeaderViewModel_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyHeaderViewModel_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"SurveyHeaderViewModel_CreatedUser","end":[{"role":"SurveyHeaderViewModel_CreatedUser_Source","type":"Edm.Self.SurveyHeaderViewModel","multiplicity":"*"},{"role":"SurveyHeaderViewModel_CreatedUser_Target","type":"Edm.Self.UserViewModel","multiplicity":"0..1"}]},{"name":"SurveyHeaderViewModel_Customer","end":[{"role":"SurveyHeaderViewModel_Customer_Source","type":"Edm.Self.SurveyHeaderViewModel","multiplicity":"*"},{"role":"SurveyHeaderViewModel_Customer_Target","type":"Edm.Self.CustomerViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyHeaderViewModel_Customer_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyHeaderViewModel_Customer_Source","propertyRef":{"name":"CustomerId"}}}},{"name":"SurveyHeaderViewModel_Location","end":[{"role":"SurveyHeaderViewModel_Location_Source","type":"Edm.Self.SurveyHeaderViewModel","multiplicity":"*"},{"role":"SurveyHeaderViewModel_Location_Target","type":"Edm.Self.LocationViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyHeaderViewModel_Location_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyHeaderViewModel_Location_Source","propertyRef":{"name":"LocationId"}}}},{"name":"SurveyHeaderViewModel_ModifiedUser","end":[{"role":"SurveyHeaderViewModel_ModifiedUser_Source","type":"Edm.Self.SurveyHeaderViewModel","multiplicity":"*"},{"role":"SurveyHeaderViewModel_ModifiedUser_Target","type":"Edm.Self.UserViewModel","multiplicity":"0..1"}]},{"name":"SurveyHeaderViewModel_Survey","end":[{"role":"SurveyHeaderViewModel_Survey_Source","type":"Edm.Self.SurveyHeaderViewModel","multiplicity":"*"},{"role":"SurveyHeaderViewModel_Survey_Target","type":"Edm.Self.SurveyViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyHeaderViewModel_Survey_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyHeaderViewModel_Survey_Source","propertyRef":{"name":"SurveyId"}}}},{"name":"SurveyHeaderViewModel_UserInfo","end":[{"role":"SurveyHeaderViewModel_UserInfo_Source","type":"Edm.Self.SurveyHeaderViewModel","multiplicity":"*"},{"role":"SurveyHeaderViewModel_UserInfo_Target","type":"Edm.Self.UserInfoViewModel","multiplicity":"0..1"}]},{"name":"SurveyProductQuestionViewModel_Product","end":[{"role":"SurveyProductQuestionViewModel_Product_Source","type":"Edm.Self.SurveyProductQuestionViewModel","multiplicity":"*"},{"role":"SurveyProductQuestionViewModel_Product_Target","type":"Edm.Self.ProductViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyProductQuestionViewModel_Product_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyProductQuestionViewModel_Product_Source","propertyRef":{"name":"ProductId"}}}},{"name":"SurveyProductQuestionViewModel_Question","end":[{"role":"SurveyProductQuestionViewModel_Question_Source","type":"Edm.Self.SurveyProductQuestionViewModel","multiplicity":"*"},{"role":"SurveyProductQuestionViewModel_Question_Target","type":"Edm.Self.QuestionViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyProductQuestionViewModel_Question_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyProductQuestionViewModel_Question_Source","propertyRef":{"name":"QuestionId"}}}},{"name":"SurveyProductQuestionViewModel_Survey","end":[{"role":"SurveyProductQuestionViewModel_Survey_Source","type":"Edm.Self.SurveyProductQuestionViewModel","multiplicity":"*"},{"role":"SurveyProductQuestionViewModel_Survey_Target","type":"Edm.Self.SurveyViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyProductQuestionViewModel_Survey_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyProductQuestionViewModel_Survey_Source","propertyRef":{"name":"SurveyId"}}}},{"name":"UserRoleViewModel_Company","end":[{"role":"UserRoleViewModel_Company_Source","type":"Edm.Self.UserRoleViewModel","multiplicity":"*"},{"role":"UserRoleViewModel_Company_Target","type":"Edm.Self.CompanyViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"UserRoleViewModel_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"UserRoleViewModel_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"UserRoleViewModel_Customer","end":[{"role":"UserRoleViewModel_Customer_Source","type":"Edm.Self.UserRoleViewModel","multiplicity":"*"},{"role":"UserRoleViewModel_Customer_Target","type":"Edm.Self.CustomerViewModel","multiplicity":"0..1"}],"referentialConstraint":{"principal":{"role":"UserRoleViewModel_Customer_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"UserRoleViewModel_Customer_Source","propertyRef":{"name":"CustomerId"}}}},{"name":"UserRoleViewModel_Role","end":[{"role":"UserRoleViewModel_Role_Source","type":"Edm.Self.UserRoleViewModel","multiplicity":"*"},{"role":"UserRoleViewModel_Role_Target","type":"Edm.Self.RoleViewModel","multiplicity":"0..1"}],"referentialConstraint":{"principal":{"role":"UserRoleViewModel_Role_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"UserRoleViewModel_Role_Source","propertyRef":{"name":"RoleId"}}}},{"name":"UserRoleViewModel_User","end":[{"role":"UserRoleViewModel_User_Source","type":"Edm.Self.UserRoleViewModel","multiplicity":"*"},{"role":"UserRoleViewModel_User_Target","type":"Edm.Self.UserViewModel","multiplicity":"0..1"}],"referentialConstraint":{"principal":{"role":"UserRoleViewModel_User_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"UserRoleViewModel_User_Source","propertyRef":{"name":"UserId"}}}},{"name":"UserRoleViewModel_UserInfo","end":[{"role":"UserRoleViewModel_UserInfo_Source","type":"Edm.Self.UserRoleViewModel","multiplicity":"*"},{"role":"UserRoleViewModel_UserInfo_Target","type":"Edm.Self.UserInfoViewModel","multiplicity":"0..1"}]}],"entityContainer":{"name":"DatabaseContext","customannotation:UseClrTypes":"true","entitySet":[{"name":"CompanyViewModel","entityType":"Self.CompanyViewModel"},{"name":"CustomerViewModel","entityType":"Self.CustomerViewModel"},{"name":"MapViewModel","entityType":"Self.MapViewModel"},{"name":"ProductCategoryViewModel","entityType":"Self.ProductCategoryViewModel"},{"name":"RoleViewModel","entityType":"Self.RoleViewModel"},{"name":"SelectLocationViewModel","entityType":"Self.SelectLocationViewModel"},{"name":"SelectSurveyViewModel","entityType":"Self.SelectSurveyViewModel"},{"name":"SurveyCustomerLocationProductQuestionViewModel","entityType":"Self.SurveyCustomerLocationProductQuestionViewModel"},{"name":"LocationViewModels","entityType":"Self.LocationViewModel"},{"name":"ProductViewModels","entityType":"Self.ProductViewModel"},{"name":"QuestionViewModels","entityType":"Self.QuestionViewModel"},{"name":"SurveyViewModels","entityType":"Self.SurveyViewModel"},{"name":"SurveyCustomerLocationViewModel","entityType":"Self.SurveyCustomerLocationViewModel"},{"name":"SurveyHeaderViewModel","entityType":"Self.SurveyHeaderViewModel"},{"name":"UserViewModels","entityType":"Self.UserViewModel"},{"name":"UserInfoViewModels","entityType":"Self.UserInfoViewModel"},{"name":"SurveyProductQuestionViewModel","entityType":"Self.SurveyProductQuestionViewModel"},{"name":"UserRoleViewModel","entityType":"Self.UserRoleViewModel"}],"associationSet":[{"name":"SurveyCustomerLocationProductQuestionViewModel_Company","association":"Self.SurveyCustomerLocationProductQuestionViewModel_Company","end":[{"role":"SurveyCustomerLocationProductQuestionViewModel_Company_Source","entitySet":"SurveyCustomerLocationProductQuestionViewModel"},{"role":"SurveyCustomerLocationProductQuestionViewModel_Company_Target","entitySet":"CompanyViewModel"}]},{"name":"SurveyCustomerLocationProductQuestionViewModel_Customer","association":"Self.SurveyCustomerLocationProductQuestionViewModel_Customer","end":[{"role":"SurveyCustomerLocationProductQuestionViewModel_Customer_Source","entitySet":"SurveyCustomerLocationProductQuestionViewModel"},{"role":"SurveyCustomerLocationProductQuestionViewModel_Customer_Target","entitySet":"CustomerViewModel"}]},{"name":"SurveyCustomerLocationProductQuestionViewModel_Location","association":"Self.SurveyCustomerLocationProductQuestionViewModel_Location","end":[{"role":"SurveyCustomerLocationProductQuestionViewModel_Location_Source","entitySet":"SurveyCustomerLocationProductQuestionViewModel"},{"role":"SurveyCustomerLocationProductQuestionViewModel_Location_Target","entitySet":"LocationViewModels"}]},{"name":"ProductViewModel_ProductCategory","association":"Self.ProductViewModel_ProductCategory","end":[{"role":"ProductViewModel_ProductCategory_Source","entitySet":"ProductViewModels"},{"role":"ProductViewModel_ProductCategory_Target","entitySet":"ProductCategoryViewModel"}]},{"name":"SurveyCustomerLocationProductQuestionViewModel_Product","association":"Self.SurveyCustomerLocationProductQuestionViewModel_Product","end":[{"role":"SurveyCustomerLocationProductQuestionViewModel_Product_Source","entitySet":"SurveyCustomerLocationProductQuestionViewModel"},{"role":"SurveyCustomerLocationProductQuestionViewModel_Product_Target","entitySet":"ProductViewModels"}]},{"name":"SurveyCustomerLocationProductQuestionViewModel_Question","association":"Self.SurveyCustomerLocationProductQuestionViewModel_Question","end":[{"role":"SurveyCustomerLocationProductQuestionViewModel_Question_Source","entitySet":"SurveyCustomerLocationProductQuestionViewModel"},{"role":"SurveyCustomerLocationProductQuestionViewModel_Question_Target","entitySet":"QuestionViewModels"}]},{"name":"SurveyCustomerLocationProductQuestionViewModel_Survey","association":"Self.SurveyCustomerLocationProductQuestionViewModel_Survey","end":[{"role":"SurveyCustomerLocationProductQuestionViewModel_Survey_Source","entitySet":"SurveyCustomerLocationProductQuestionViewModel"},{"role":"SurveyCustomerLocationProductQuestionViewModel_Survey_Target","entitySet":"SurveyViewModels"}]},{"name":"SurveyCustomerLocationViewModel_Customer","association":"Self.SurveyCustomerLocationViewModel_Customer","end":[{"role":"SurveyCustomerLocationViewModel_Customer_Source","entitySet":"SurveyCustomerLocationViewModel"},{"role":"SurveyCustomerLocationViewModel_Customer_Target","entitySet":"CustomerViewModel"}]},{"name":"SurveyCustomerLocationViewModel_Location","association":"Self.SurveyCustomerLocationViewModel_Location","end":[{"role":"SurveyCustomerLocationViewModel_Location_Source","entitySet":"SurveyCustomerLocationViewModel"},{"role":"SurveyCustomerLocationViewModel_Location_Target","entitySet":"LocationViewModels"}]},{"name":"SurveyCustomerLocationViewModel_Survey","association":"Self.SurveyCustomerLocationViewModel_Survey","end":[{"role":"SurveyCustomerLocationViewModel_Survey_Source","entitySet":"SurveyCustomerLocationViewModel"},{"role":"SurveyCustomerLocationViewModel_Survey_Target","entitySet":"SurveyViewModels"}]},{"name":"SurveyHeaderViewModel_Company","association":"Self.SurveyHeaderViewModel_Company","end":[{"role":"SurveyHeaderViewModel_Company_Source","entitySet":"SurveyHeaderViewModel"},{"role":"SurveyHeaderViewModel_Company_Target","entitySet":"CompanyViewModel"}]},{"name":"SurveyHeaderViewModel_CreatedUser","association":"Self.SurveyHeaderViewModel_CreatedUser","end":[{"role":"SurveyHeaderViewModel_CreatedUser_Source","entitySet":"SurveyHeaderViewModel"},{"role":"SurveyHeaderViewModel_CreatedUser_Target","entitySet":"UserViewModels"}]},{"name":"SurveyHeaderViewModel_Customer","association":"Self.SurveyHeaderViewModel_Customer","end":[{"role":"SurveyHeaderViewModel_Customer_Source","entitySet":"SurveyHeaderViewModel"},{"role":"SurveyHeaderViewModel_Customer_Target","entitySet":"CustomerViewModel"}]},{"name":"SurveyHeaderViewModel_Location","association":"Self.SurveyHeaderViewModel_Location","end":[{"role":"SurveyHeaderViewModel_Location_Source","entitySet":"SurveyHeaderViewModel"},{"role":"SurveyHeaderViewModel_Location_Target","entitySet":"LocationViewModels"}]},{"name":"SurveyHeaderViewModel_ModifiedUser","association":"Self.SurveyHeaderViewModel_ModifiedUser","end":[{"role":"SurveyHeaderViewModel_ModifiedUser_Source","entitySet":"SurveyHeaderViewModel"},{"role":"SurveyHeaderViewModel_ModifiedUser_Target","entitySet":"UserViewModels"}]},{"name":"SurveyHeaderViewModel_Survey","association":"Self.SurveyHeaderViewModel_Survey","end":[{"role":"SurveyHeaderViewModel_Survey_Source","entitySet":"SurveyHeaderViewModel"},{"role":"SurveyHeaderViewModel_Survey_Target","entitySet":"SurveyViewModels"}]},{"name":"SurveyHeaderViewModel_UserInfo","association":"Self.SurveyHeaderViewModel_UserInfo","end":[{"role":"SurveyHeaderViewModel_UserInfo_Source","entitySet":"SurveyHeaderViewModel"},{"role":"SurveyHeaderViewModel_UserInfo_Target","entitySet":"UserInfoViewModels"}]},{"name":"SurveyProductQuestionViewModel_Product","association":"Self.SurveyProductQuestionViewModel_Product","end":[{"role":"SurveyProductQuestionViewModel_Product_Source","entitySet":"SurveyProductQuestionViewModel"},{"role":"SurveyProductQuestionViewModel_Product_Target","entitySet":"ProductViewModels"}]},{"name":"SurveyProductQuestionViewModel_Question","association":"Self.SurveyProductQuestionViewModel_Question","end":[{"role":"SurveyProductQuestionViewModel_Question_Source","entitySet":"SurveyProductQuestionViewModel"},{"role":"SurveyProductQuestionViewModel_Question_Target","entitySet":"QuestionViewModels"}]},{"name":"SurveyProductQuestionViewModel_Survey","association":"Self.SurveyProductQuestionViewModel_Survey","end":[{"role":"SurveyProductQuestionViewModel_Survey_Source","entitySet":"SurveyProductQuestionViewModel"},{"role":"SurveyProductQuestionViewModel_Survey_Target","entitySet":"SurveyViewModels"}]},{"name":"UserRoleViewModel_Company","association":"Self.UserRoleViewModel_Company","end":[{"role":"UserRoleViewModel_Company_Source","entitySet":"UserRoleViewModel"},{"role":"UserRoleViewModel_Company_Target","entitySet":"CompanyViewModel"}]},{"name":"UserRoleViewModel_Customer","association":"Self.UserRoleViewModel_Customer","end":[{"role":"UserRoleViewModel_Customer_Source","entitySet":"UserRoleViewModel"},{"role":"UserRoleViewModel_Customer_Target","entitySet":"CustomerViewModel"}]},{"name":"UserRoleViewModel_Role","association":"Self.UserRoleViewModel_Role","end":[{"role":"UserRoleViewModel_Role_Source","entitySet":"UserRoleViewModel"},{"role":"UserRoleViewModel_Role_Target","entitySet":"RoleViewModel"}]},{"name":"UserRoleViewModel_User","association":"Self.UserRoleViewModel_User","end":[{"role":"UserRoleViewModel_User_Source","entitySet":"UserRoleViewModel"},{"role":"UserRoleViewModel_User_Target","entitySet":"UserViewModels"}]},{"name":"UserRoleViewModel_UserInfo","association":"Self.UserRoleViewModel_UserInfo","end":[{"role":"UserRoleViewModel_UserInfo_Source","entitySet":"UserRoleViewModel"},{"role":"UserRoleViewModel_UserInfo_Target","entitySet":"UserInfoViewModels"}]}]}}}
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
                if (response.data.length > 0) {
                    deferred.reject(response);
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
                if (response.data.length > 0) {
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
                if (response.data.length > 0) {
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
    .service('CustomerService', ['$http', '$q', 'breeze', 'breezeservice', 'SelectionApplicationService',
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
                from: "CustomerApi/Search",
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
                if (response.data.length > 0) {
                    deferred.reject(response);
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
                if (response.data.length > 0) {
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
                if (response.data.length > 0) {
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
    .service('DownloadService', ['$http', '$q', 'breeze', 'breezeservice', 'SelectionApplicationService',
        function ($http, $q, breeze, breezeservice, SelectionApplicationService) {
            var _self = this;
            this.deferredRequest = null;

            this.DownloadSurveyData = function (id) {
                var deferred = $q.defer();

                $http({
                    method: 'Get',
                    url: '/api/v1/DownloadApi/DownloadSurveyData/'
                }).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (msg, code) {
                    deferred.reject(msg);
                });

                return deferred.promise;
            };

            this.DownloadNoteData = function (id) {
                var deferred = $q.defer();

                $http({
                    method: 'Get',
                    url: '/api/v1/DownloadApi/DownloadNoteData/'
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
                        if (response.data.length > 0) {
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
                        if (response.data.length > 0) {
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
                    if (response.data.length > 0) {
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
                    if (response.data.length > 0) {
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
    .service('ProductService', ['$http', '$q', 'breeze', 'breezeservice', 'SelectionApplicationService',
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
                from: "ProductApi/Search",
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
                if (response.data.length > 0) {
                    deferred.reject(response);
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
                if (response.data.length > 0) {
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
                if (response.data.length > 0) {
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
    .service('LocationService', ['$http', '$q', 'breeze', 'breezeservice', 'SelectionApplicationService',
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
                from: "LocationApi/Search",
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
                if (response.data.length > 0) {
                    deferred.reject(response);
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
                if (response.data.length > 0) {
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
                if (response.data.length > 0) {
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
    .service('ProductCategoryService', ['$http', '$q', 'breeze', 'breezeservice', 'SelectionApplicationService',
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
                from: "ProductCategoryApi/Search",
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
                url: '/breeze/ProductCategoryApi/Get/' + id,
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
            });

            return deferred.promise;
        };

        this.Create = function (item) {
            var deferred = $q.defer();

            $http.post('/breeze/ProductCategoryApi/Create', item)
            .then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                if (response.data.length > 0) {
                    deferred.reject(response);
                } else {
                    deferred.reject("Failed to create the record.");
                }
            });

            return deferred.promise;
        };

        this.Update = function (id, item) {
            var deferred = $q.defer();
            $http.put('/breeze/ProductCategoryApi/Update/' + id, item)
            .then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                if (response.data.length > 0) {
                    deferred.reject(response);
                } else {
                    deferred.reject("Failed to update the record.");
                }
            });

            return deferred.promise;
        }

        this.Delete = function (id) {
            var deferred = $q.defer();

            $http.delete('/breeze/ProductCategoryApi/Delete/' + id)
            .then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                if (response.data.length > 0) {
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
    .service('QuestionService', ['$http', '$q', 'breeze', 'breezeservice', 'SelectionApplicationService',
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
                from: "QuestionApi/Search",
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
                if (response.data.length > 0) {
                    deferred.reject(response);
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
                if (response.data.length > 0) {
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
                if (response.data.length > 0) {
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
    .service('SelectLocationService', ['$http', '$q', 'breeze', 'breezeservice', 'SelectionApplicationService',
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
                    from: "SelectLocationApi/Search",
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

        }]);
})();
(function () {
    "use strict";
    angular.module('DatabaseServices')
    .service('SelectSurveyService', ['$http', '$q', 'breeze', 'breezeservice', 'SelectionApplicationService',
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
                    from: "SelectSurveyApi/Search",
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

        }]);
})();
(function () {
    "use strict";
    angular.module('DatabaseServices')
    .service('SurveyService', ['$http', '$q', 'breeze', 'breezeservice', 'SelectionApplicationService',
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
                from: "SurveyApi/Search",
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
            $http.put('/breeze/SurveyApi/Update/' + id, item)
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

            $http.delete('/breeze/SurveyApi/Delete/' + id)
            .then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                if (response.data.Message.length > 0) {
                    deferred.reject(response.data.Message);
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

        this.Search = function (predicate, order, page, pageSize, cancelExistingSearch) {
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
                if (response.data.length > 0) {
                    deferred.reject(response);
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
                if (response.data.length > 0) {
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
                if (response.data.length > 0) {
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
    .service('SurveyCustomerLocationProductQuestionService', ['$http', '$q', 'breeze', 'breezeservice',
        function ($http, $q, breeze, breezeservice) {
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
                from: "SurveyCustomerLocationProductQuestionApi/Search",
                where: predicate,
                orderBy: order,
                skip: page * pageSize,
                take: pageSize,
                inlineCount: true
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
                url: '/breeze/SurveyCustomerLocationProductQuestionApi/Get/' + id,
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
            });

            return deferred.promise;
        };

        this.Create = function (item) {
            var deferred = $q.defer();

            $http.post('/breeze/SurveyCustomerLocationProductQuestionApi/Create', item)
            .then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                if (response.data.length > 0) {
                    deferred.reject(response);
                } else {
                    deferred.reject("Failed to create the record.");
                }
            });

            return deferred.promise;
        };

        this.Update = function (id, item) {
            var deferred = $q.defer();
            $http.put('/breeze/SurveyCustomerLocationProductQuestionApi/Update/' + id, item)
            .then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                if (response.data.length > 0) {
                    deferred.reject(response);
                } else {
                    deferred.reject("Failed to update the record.");
                }
            });

            return deferred.promise;
        }

        this.Delete = function (id) {
            var deferred = $q.defer();

            $http.delete('/breeze/SurveyCustomerLocationProductQuestionApi/Delete/' + id)
            .then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                if (response.data.length > 0) {
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
    .service('SurveyDetailService', ['$http', '$q', 'breeze', 'breezeservice', 'SelectionApplicationService',
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
                from: "SurveyDetailApi/Search",
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
                if (response.data.length > 0) {
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
                if (response.data.length > 0) {
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
                if (response.data.length > 0) {
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
                    inlineCount: true,
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
                    if (response.data.length > 0) {
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
                    if (response.data.length > 0) {
                        deferred.reject(response);
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
                    if (response.data.length > 0) {
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
                    if (response.data.length > 0) {
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
                    if (response.data.length > 0) {
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
                    if (response.data.length > 0) {
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

        this.Search = function (predicate, order, page, pageSize, cancelExistingSearch) {
            cancelExistingSearch = cancelExistingSearch || false;

            if (this.deferredRequest !== null && cancelExistingSearch) {
                this.deferredRequest.reject("Cancelled Search Request.");
                this.deferredRequest = null;
            }
            var deferred = $q.defer();

            var query = new breeze.EntityQuery({
                from: "SurveyProductQuestionApi/Search",
                where: predicate,
                orderBy: order,
                skip: page * pageSize,
                take: pageSize,
                inlineCount: true
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
                if (response.data.length > 0) {
                    deferred.reject(response);
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
                if (response.data.length > 0) {
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
                if (response.data.length > 0) {
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
                    if (response.data.length > 0) {
                        deferred.reject(response);
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
                    if (response.data.length > 0) {
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
var app = angular.module('Directives',[]);

var app = angular.module('Directives');

app.directive('affixResizer', ['$window', '$timeout', function ($window, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {

            angular.element($window).on('resize', function () {
                if ($window.innerWidth > 992) {
                    elem.addClass('affix');
                }
                else {
                    elem.removeClass('affix');
                }
            });

            $timeout(function () {
                if ($window.innerWidth > 992) {
                    elem.addClass('affix');
                }
                else {
                    elem.removeClass('affix');
                }
            });
        }
    }
}]);
//http://stackoverflow.com/questions/19986178/displaying-an-image-after-uploading-in-angular-js
var app = angular.module('Directives');

app.directive('afterImage', [function () {
    return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $scope.AfterImage = e.target.result;
                $scope.$apply();
            }

            elem.on('change', function () {
                $scope.Header.IsAfterImage = true;
                $scope.Header.AfterImage = elem[0].files[0];
                reader.readAsDataURL(elem[0].files[0]);
            });
        }
    }
}]);
//http://stackoverflow.com/questions/19986178/displaying-an-image-after-uploading-in-angular-js
var app = angular.module('Directives');

app.directive('beforeImage', [function () {
    return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $scope.BeforeImage = e.target.result;
                $scope.$apply();
            }

            elem.on('change', function () {
                $scope.Header.IsBeforeImage = true;
                $scope.Header.BeforeImage = elem[0].files[0];
                reader.readAsDataURL(elem[0].files[0]);
            });
        }
    }
}]);
var app = angular.module('Main', ['ngRoute', 'ngResource', 'ngSanitize', 'ngAnimate',
    'ui.grid', 'ui.grid.draggable-rows', 'ui.grid.infiniteScroll', 'ui.grid.cellNav', 'ui.bootstrap', /*'ngTouch',*/ 'ui.router', 'ngMap', 'ui.grid.exporter', 'blockUI', 
    'breeze.angular', 'ngAria', 'ngMessages', 'ngMaterial', 'focus-if', 'mgcrea.bootstrap.affix', 'Directives', 'DatabaseServices', 'ApplicationServices']);
angular.module('Main').config(function (blockUIConfig) {
    // Change the default delay to 100ms before the blocking is visible
    blockUIConfig.delay = 0;
});
app.filter('dateLocalize', function () {
    return function (utcDate) {
        if (utcDate == null)
            return "";
        else {
            var dt = new Date(utcDate + 'Z').getTime();
            return dt;
        }        
    }
});
app.config(function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/main/admin/company/addedit/")

    $stateProvider
        .state('main', {
            url: "/main",
            templateUrl: "ApplicationComponents/Main/Views/Main.html"
        })
        .state('main.admin', {
            url: "/admin",
            templateUrl: "ApplicationComponents/Administrator/Admin/Views/Admin.html"
        })
        .state('main.admin.company', {
            url: "/company",
            templateUrl: "ApplicationComponents/Administrator/Company/Views/Company.html"
        })
        .state('main.admin.company.addedit', {
            url: "/addedit/:id",
            templateUrl: "ApplicationComponents/Administrator/Company/Views/CompanyAddEdit.html",
        })
        .state('main.admin.customer', {
            url: "/customer",
            templateUrl: "ApplicationComponents/Administrator/Customer/Views/Customer.html"
        })
        .state('main.admin.customer.addedit', {
            url: "/addedit/:id",
            templateUrl: "ApplicationComponents/Administrator/Customer/Views/CustomerAddEdit.html",
        })
        .state('main.admin.product', {
            url: "/product",
            templateUrl: "ApplicationComponents/Administrator/Product/Views/Product.html"
        })
        .state('main.admin.product.addedit', {
            url: "/addedit/:id",
            templateUrl: "ApplicationComponents/Administrator/Product/Views/ProductAddEdit.html",
        })
        .state('main.admin.location', {
            url: "/location",
            templateUrl: "ApplicationComponents/Administrator/Location/Views/Location.html"
        })
        .state('main.admin.location.addedit', {
            url: "/addedit/:id",
            templateUrl: "ApplicationComponents/Administrator/Location/Views/LocationAddEdit.html",
        })
        .state('main.admin.survey', {
            url: "/survey",
            templateUrl: "ApplicationComponents/Administrator/Survey/Views/Survey.html"
        })
        .state('main.admin.survey.addedit', {
            url: "/addedit/:id",
            templateUrl: "ApplicationComponents/Administrator/Survey/Views/SurveyAddEdit.html",
        })
        .state('main.admin.userrole', {
            url: "/userrole",
            templateUrl: "ApplicationComponents/Administrator/UserRole/Views/UserRole.html"
        })
        .state('main.admin.userrole.addedit', {
            url: "/addedit/:id",
            templateUrl: "ApplicationComponents/Administrator/UserRole/Views/UserRoleAddEdit.html",
        })
        .state('main.admin.question', {
            url: "/question",
            templateUrl: "ApplicationComponents/Administrator/Question/Views/Question.html"
        })
        .state('main.admin.question.addedit', {
            url: "/addedit/:id",
            templateUrl: "ApplicationComponents/Administrator/Question/Views/QuestionAddEdit.html",
        })
        .state('main.admin.surveycustomerlocation', {
            url: "/survey/customerlocation",
            templateUrl: "ApplicationComponents/Administrator/SurveyCustomerLocation/Views/SurveyCustomerLocation.html"
        })
        .state('main.admin.surveycustomerlocation.addedit', {
            url: "/addedit/:id",
            templateUrl: "ApplicationComponents/Administrator/SurveyCustomerLocation/Views/SurveyCustomerLocationAddEdit.html",
        })
        .state('main.admin.surveyproductquestion', {
            url: "/survey/productquestion",
            templateUrl: "ApplicationComponents/Administrator/SurveyProductQuestion/Views/SurveyProductQuestion.html"
        })
        .state('main.admin.surveyproductquestion.addedit', {
            url: "/addedit/:id",
            templateUrl: "ApplicationComponents/Administrator/SurveyProductQuestion/Views/SurveyProductQuestionAddEdit.html",
        })
});
app.run(function ($rootScope, $state, UserService, RoleService, UserRoleService, SelectionApplicationService) {
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
                SelectionApplicationService.SetRole("Administrator");
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
                SelectionApplicationService.SetRole("Data Entry");
                SelectionApplicationService.SetRedirectState('main.survey');
                $state.go('main.selectcompany');
            }
            else {
                var predicate = { "Name": { "==": "Customer" } };
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
                SelectionApplicationService.SetRole("Customer");
                SelectionApplicationService.SetRedirectState('main.report.surveyheaderreport');
                $state.go('main.selectcompany');
            }
            else {
                $state.go('main.admin.company.addedit');
            }
        })
});
(function (moment) {
    "use strict";
    angular.module('Main').controller('MainController', ['$scope', '$http', '$window', '$state', 'UserService', 'SelectionApplicationService',
    function controller($scope, $http, $window, $state, UserService, SelectionApplicationService) {

        UserService.GetCurrentUsername().then(function(data){
            $scope.Username = data;
        });
        $scope.GoTo = function (state) {
            if (state == 'main.admin.company.addedit') {
                SelectionApplicationService.Clear();
                $state.go(state);
            }
            else {
                SelectionApplicationService.Clear();
                
            SelectionApplicationService.SetRedirectState(state);
                $state.go('main.selectcompany');
            }
        }

        $scope.Logout = function () {
            SelectionApplicationService.Clear();
            $http.post('/Account/LogOff').then(function(data){
                $window.location.reload();
            });
        }

        SelectionApplicationService.RegisterObserver(function () {
            $scope.Role = SelectionApplicationService.GetRole();
        })
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('AdminController', ['$scope', '$state', 'SelectionApplicationService',
    function controller($scope, $state, SelectionApplicationService) {
        //TODO: If a regular user go to company, if a company customer assigned to a survey, go to the survey data page.
        $scope.SelectedCompany = null;
        SelectionApplicationService.RegisterObserver(function () {
            $scope.SelectedCompany = SelectionApplicationService.GetCompany();
        })

        $scope.SelectedSurvey = null;
        SelectionApplicationService.RegisterObserver(function(){
            $scope.SelectedSurvey = SelectionApplicationService.GetSurvey();
        })

        $scope.Route = function (state) {
            if (state == "main.admin.company.addedit") {
                $state.go(state);
            }
            else {
                if (state == "main.admin.surveycustomerlocationproductquestion.addedit") {
                    if (SelectionApplicationService.GetSurvey() == null || SelectionApplicationService.GetSurveyId() == null) {
                        toastr.error("A survey must be selected first.");
                    }
                    else {
                        $state.go(state);
                    }
                }
                else {
                    if (SelectionApplicationService.GetCompany() == null || SelectionApplicationService.GetCompanyId() == null) {
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
            $scope.focus = true;
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
                    toastr.error(error.data, error.statusText);
                });
            }
            else {
                CompanyService.Create($scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('CompanyController', ['$scope', '$state', '$routeParams', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'CompanyService',
        'UserService', 'RoleService', 'UserRoleService', 'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location,
        $timeout, breezeservice, breeze, CompanyService,
        UserService, RoleService, UserRoleService, SelectionApplicationService) {
        $scope.Search = function () {
            CompanyService.AdminSearch(null, ["Name desc"], 0, 20, false).then(function (data) {
                $scope.items = data;
                if (data != null && data.length == 1) {
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
                SelectionApplicationService.SetCompanyId(data.Id);
                SelectionApplicationService.SetCompany(data);
            });
        }
        
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('CustomerAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http',
        '$location', '$timeout', 'breezeservice', 'breeze', 'CustomerService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http,
        $location, $timeout, breezeservice, breeze, CustomerService, SelectionApplicationService) {

        $scope.Init = function () {
            $scope.item = { Id: null, Name: "" }
            $scope.focus = true;
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
                    var index = $scope.$parent.gridOptions.data.map(function (e) { return e.Id; }).indexOf(data.data.Id);
                    $scope.$parent.gridOptions.data.splice(index, 1, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
            else {
                $scope.item.CompanyId = SelectionApplicationService.GetCompanyId();
                CustomerService.Create($scope.item).then(function (data) {
                    $scope.$parent.gridOptions.data.splice(0, 0, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
        }
    }]);

})(moment);
(function (moment) {
    "use strict";
    angular.module('Main').controller('CustomerController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'CustomerService', 'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, CustomerService, SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } };
            CustomerService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                $scope.items = data;
                $scope.gridOptions.data = data;
            });
        }
        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            data: [],
            columnDefs: [
                { name: 'Manage', width: '120', cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html' },
                { field: 'Name', name: 'Name', cellTooltip: true }
            ]
        };
        $scope.Search();

        $scope.Edit = function (row) {
            $state.go('main.admin.customer.addedit', { id: row.Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            CustomerService.Delete(Id).then(function (data) {
                $scope.Search();
            }, function (error) {
                toastr.error(error.data, error.statusText);
            });
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('LocationAddEditController', ['$scope', '$q', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout',
        'breezeservice', 'breeze', 'LocationService', 'SelectionApplicationService',
    function controller($scope, $q, $state, $stateParams, $routeParams, $http, $location, $timeout,
        breezeservice, breeze, LocationService, SelectionApplicationService) {
        
        $scope.Init = function () {
            $scope.item = { Id: null, Name: "", Latitude: null, Longitude: null }
            $scope.focus = true;
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
                    var index = $scope.$parent.gridOptions.data.map(function (e) { return e.Id; }).indexOf(data.data.Id);
                    $scope.$parent.gridOptions.data.splice(index, 1, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
            else {
                $scope.item.CompanyId = SelectionApplicationService.GetCompanyId();
                LocationService.Create($scope.item).then(function (data) {
                    $scope.$parent.gridOptions.data.splice(0, 0, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
        }

        $scope.ChangeAddress = function (value) {
            var address = JSON.stringify(value);
            return $http.get('https://maps.google.com/maps/api/geocode/json?address=' + address + '&sensor=false').then(function (data) {
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
    angular.module('Main').controller('LocationController', ['$scope', '$state', '$routeParams', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'LocationService', 'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location,
        $timeout, breezeservice, breeze, LocationService, SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } }
            LocationService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                $scope.gridOptions.data = data;
            });
        }
        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            data: [],
            columnDefs: [
                { name: 'Manage', width: '120', cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html' },
                { field: 'Name', name: 'Name', cellTooltip: true }
            ]
        };
        $scope.Search();

        $scope.Edit = function (row) {
            $state.go('main.admin.location.addedit', { id: row.Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            LocationService.Delete(Id).then(function (data) {
                $scope.Search();
            }, function (error) {
                toastr.error(error.data, error.statusText);
            });
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('ProductAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'ProductService', 'ProductCategoryService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location,
        $timeout, breezeservice, breeze, ProductService, ProductCategoryService, SelectionApplicationService) {
       
        $scope.Init = function () {
            $scope.item = { Id: null, Name: "" }
            $scope.focus = true;
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

        $scope.SearchProductCategories = function (value) {
            var predicate = {
                and: [
                   { "Name": { "substringof": value } },
                   { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } }
                ]
            }
            return ProductCategoryService.Search(predicate, ["Name asc"], 0, 20, false).then(function (data) {
                return data;
            });
        }

        $scope.SelectProductCategory = function (item, model, label) {
            $scope.item.ProductCategoryId = item.Id;
        }

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                ProductService.Update($scope.item.Id, $scope.item).then(function (data) {
                    var index = $scope.$parent.gridOptions.data.map(function (e) { return e.Id; }).indexOf(data.data.Id);
                    $scope.$parent.gridOptions.data.splice(index, 1, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
            else {
                $scope.item.CompanyId = SelectionApplicationService.GetCompanyId();
                ProductService.Create($scope.item).then(function (data) {
                    $scope.$parent.gridOptions.data.splice(0, 0, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
        }
    }]);

})(moment);
(function (moment) {
    "use strict";
    angular.module('Main').controller('ProductController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'ProductService',
        'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, ProductService,
        SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } }
            ProductService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                $scope.gridOptions.data = data;

            });
        }
        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            data: [],
            columnDefs: [
                { name: 'Manage', width: '120', cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html' },
                { field: 'Name', name: 'Name', cellTooltip: true },
                { field: 'ProductCategory.Name', name: 'Category Name', cellTooltip: true }
            ]
        };
        $scope.Search();

        $scope.Edit = function (row) {
            $state.go('main.admin.product.addedit', { id: row.Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            ProductService.Delete(Id).then(function (data) {
                $scope.Search();
            }, function (error) {
                toastr.error(error.data, error.statusText);
            });
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('QuestionAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'QuestionService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, QuestionService, SelectionApplicationService) {
        
        $scope.Init = function () {
            $scope.item = { Id: null, Name: "" };
            $scope.focus = true;
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
                    var index = $scope.$parent.gridOptions.data.map(function (e) { return e.Id; }).indexOf(data.data.Id);
                    $scope.$parent.gridOptions.data.splice(index, 1, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
            else {
                $scope.item.CompanyId = SelectionApplicationService.GetCompanyId();
                QuestionService.Create($scope.item).then(function (data) {
                    $scope.$parent.gridOptions.data.splice(0, 0, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('QuestionController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'QuestionService', 'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, QuestionService, SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } }
            QuestionService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                $scope.gridOptions.data = data;
            });
        }
        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            data: [],
            columnDefs: [
                { name: 'Manage', width: '120', cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html' },
                { field: 'Name', name: 'Name', cellTooltip: true },
                { field: 'IsRequired', name: 'Required', cellTooltip: true},
                { field: 'IsTrueFalse', name: 'True False', cellTooltip: true}
            ]
        };
        $scope.Search();

        $scope.Edit = function (row) {
            $state.go('main.admin.question.addedit', { id: row.Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            QuestionService.Delete(Id).then(function (data) {
                $scope.Search();
            }, function (error) {
                toastr.error(error.data, error.statusText);
            });
        }
    }]);

})(moment);
(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.admin.productcategory.addedit', {
            url: "/addedit/:id",
            templateUrl: "ApplicationComponents/Administrator/ProductCategory/Views/ProductCategoryAddEdit.html"
        })
    });
    angular.module('Main').controller('ProductCategoryAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'ProductCategoryService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, ProductCategoryService, SelectionApplicationService) {
       
        $scope.Init = function () {
            $scope.item = { Id: null, Name: "" }
            $scope.focus = true;
        }
        $scope.Init();
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                ProductCategoryService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                ProductCategoryService.Update($scope.item.Id, $scope.item).then(function (data) {
                    var index = $scope.$parent.gridOptions.data.map(function (e) { return e.Id; }).indexOf(data.data.Id);
                    $scope.$parent.gridOptions.data.splice(index, 1, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
            else {
                $scope.item.CompanyId = SelectionApplicationService.GetCompanyId();
                ProductCategoryService.Create($scope.item).then(function (data) {
                    $scope.$parent.gridOptions.data.splice(0, 0, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
        }
    }]);

})(moment);
(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.admin.productcategory', {
            url: "/productcategory",
            templateUrl: "ApplicationComponents/Administrator/ProductCategory/Views/ProductCategory.html"
        })
    });
    angular.module('Main').controller('ProductCategoryController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'ProductCategoryService',
        'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, ProductCategoryService,
        SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } }
            ProductCategoryService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                $scope.gridOptions.data = data;

            });
        }
        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            data: [],
            columnDefs: [
                { name: 'Manage', width: '120', cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html' },
                { field: 'Name', name: 'Name', cellTooltip: true }
            ]
        };
        $scope.Search();

        $scope.Edit = function (row) {
            $state.go('main.admin.productcategory.addedit', { id: row.Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            ProductCategoryService.Delete(Id).then(function (data) {
                $scope.Search();
            }, function (error) {
                toastr.error(error.data, error.statusText);
            });
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyService, SelectionApplicationService) {
        
        $scope.Init = function(){
            $scope.item = { Id: null, Name: "" }
            $scope.focus = true;
        }
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                SurveyService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
            else {
                $scope.Init();
            }
        }
        $scope.Search();

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                SurveyService.Update($scope.item.Id, $scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
            else {
                $scope.item.CompanyId = SelectionApplicationService.GetCompanyId();
                SurveyService.Create($scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyService', 'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyService, SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } }
            SurveyService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                $scope.items = data;
                if (data != null && data.length == 1) {
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
                SelectionApplicationService.SetSurveyId(data.Id);
                SelectionApplicationService.SetSurvey(data);
            });
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyCustomerLocationAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyCustomerLocationService',
        'CustomerService', 'LocationService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyCustomerLocationService,
        CustomerService, LocationService, SelectionApplicationService) {

        $scope.Init = function () {
            $scope.item = { Id: null }
            $scope.focus = true;
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
            var predicate = {
                and: [
                   { "Name": { "substringof": value } },
                   { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } }
                ]
            }
            return CustomerService.Search(predicate, ["Name asc"], 0, 20, false).then(function (data) {
                return data;
            });
        }

        $scope.SelectCustomer = function (item, model, label) {
            $scope.item.CustomerId = item.Id;
        }

        $scope.SearchLocations = function (value) {
            var predicate = {
                and: [
                   { "Name": { "substringof": value } },
                   { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } }
                ]
            }
            return LocationService.Search(predicate, ["Name asc"], 0, 20, false).then(function (data) {
                return data;
            });
        }

        $scope.SelectLocation = function (item, model, label) {
            $scope.item.LocationId = item.Id;
        }

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                SurveyCustomerLocationService.Update($scope.item.Id, $scope.item).then(function (data) {
                    var index = $scope.$parent.gridOptions.data.map(function (e) { return e.Id; }).indexOf(data.data.Id);
                    $scope.$parent.gridOptions.data.splice(index, 1, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
            else {
                $scope.item.CompanyId = SelectionApplicationService.GetCompanyId();
                $scope.item.SurveyId = SelectionApplicationService.GetSurveyId();
                SurveyCustomerLocationService.Create($scope.item).then(function (data) {
                    $scope.$parent.gridOptions.data.splice(0, 0, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyCustomerLocationController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyCustomerLocationService',
        'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyCustomerLocationService,
        SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } }
            SurveyCustomerLocationService.Search(predicate, ["Created asc"], 0, 100, false).then(function (data) {
                $scope.gridOptions.data = data;
            });
        }
        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            data: [],
            columnDefs: [
                { name: 'Manage', width: '120',  cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html' },
                { field: 'Customer.Name', name: 'Customer Name', cellTooltip: true },
                { field: 'Location.Name', name: 'Location Name', cellTooltip: true }
            ]
        };
        $scope.Search();

        $scope.Edit = function (row) {
            $state.go('main.admin.surveycustomerlocation.addedit', { id: row.Id }, { reload: false });
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
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.admin.surveycustomerlocationproductquestion.addedit', {
            url: "/addedit/:id",
            templateUrl: "ApplicationComponents/Administrator/SurveyCustomerLocationProductQuestion/Views/SurveyCustomerLocationProductQuestionAddEdit.html",
        })
    });
    angular.module('Main').controller('SurveyCustomerLocationProductQuestionAddEditController', ['$scope', '$state', '$stateParams', '$routeParams',
    '$http', '$q', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyCustomerLocationProductQuestionService',
        'CustomerService', 'LocationService', 'ProductService', 'QuestionService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $routeParams,
        $http, $q, $location, $timeout, breezeservice, breeze, SurveyCustomerLocationProductQuestionService,
        CustomerService, LocationService, ProductService, QuestionService, SelectionApplicationService) {

        $scope.Init = function () {
            $scope.item = {
                Question: { Name: null },
                Location: { Name: null },
                Customer: { Name: null },
                Product: { Name: null },
                Id: null, CustomerId: null, LocationId: null, ProductId: null
            }
            $scope.itemCopy = {
                Question: { Name: null },
                Location: { Name: null },
                Customer: { Name: null },
                Product: { Name: null },
                Id: null, CustomerId: null, LocationId: null, ProductId: null
            }
            $scope.focus = true;
        }
        $scope.Init();
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                SurveyCustomerLocationProductQuestionService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.SearchCustomers = function (value) {
            var predicate = {
                and: [
                   { "Name": { "substringof": value } },
                   { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } }
                ]
            }
            return CustomerService.Search(predicate, ["Name asc"], 0, 20, false).then(function (data) {
                return data;
            });
        }

        $scope.SelectCustomer = function (item, model, label) {
            $scope.item.CustomerId = item.Id;
        }

        $scope.SelectCustomerCopy = function (item, model, label) {
            $scope.itemCopy.CustomerId = item.Id;
        }

        $scope.SearchLocations = function (value) {
            var predicate = {
                and: [
                   { "Name": { "substringof": value } },
                   { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } }
                ]
            }
            return LocationService.Search(predicate, ["Name asc"], 0, 20, false).then(function (data) {
                return data;
            });
        }

        $scope.SelectLocation = function (item, model, label) {
            $scope.item.LocationId = item.Id;
        }

        $scope.SelectLocationCopy = function (item, model, label) {
            $scope.itemCopy.LocationId = item.Id;
        }

        $scope.SearchProducts = function (value) {
            var predicate = {
                and: [
                   { "Name": { "substringof": value } },
                   { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } }
                ]
            }
            return ProductService.Search(predicate, ["Name asc"], 0, 20, false).then(function (data) {
                return data;
            });
        }

        $scope.SelectProduct = function (item, model, label) {
            $scope.item.ProductId = item.Id;
            $scope.item.ProductName = item.Name;
        }

        $scope.SelectProductCopy = function (item, model, label) {
            $scope.itemCopy.ProductId = item.Id;
            $scope.itemCopy.ProductName = item.Name;
        }

        $scope.SearchQuestions = function (value) {
            var predicate = {
                and: [
                   { "Name": { "substringof": value } },
                   { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } }
                ]
            }
            return QuestionService.Search(predicate, ["Name asc"], 0, 20, false).then(function (data) {

                return data;
            });
        }

        $scope.SelectQuestion = function (item, model, label) {
            $scope.item.QuestionId = item.Id;
        }

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                SurveyCustomerLocationProductQuestionService.Update($scope.item.Id, $scope.item).then(function (data) {
                    var index = $scope.$parent.gridOptions.data.map(function (e) { return e.Id; }).indexOf(data.data.Id);
                    $scope.$parent.gridOptions.data.splice(index, 1, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
            else {
                $scope.item.CompanyId = SelectionApplicationService.GetCompanyId();
                $scope.item.SurveyId = SelectionApplicationService.GetSurveyId();
                SurveyCustomerLocationProductQuestionService.Create($scope.item).then(function (data) {
                    $scope.$parent.gridOptions.data.splice(0, 0, data.data);
                    $scope.item.QuestionId = null; $scope.item.Question.Name = null;
                    //$scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
        }

        $scope.Copy = function () {
            var predicate = {
                and: [
                   { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } },
                   { "SurveyId": { '==': SelectionApplicationService.GetSurveyId() } },
                   { "CustomerId": { '==': $scope.item.CustomerId } }
                ]
            }
            if ($scope.item.LocationId != null) { predicate.and.push({ "LocationId": { '==': $scope.item.LocationId } }) }
            if ($scope.item.ProductId != null) { predicate.and.push({ "ProductId": { '==': $scope.item.ProductId } }) }
            if ($scope.item.QuestionId != null) { predicate.and.push({ "QuestionId": { '==': $scope.item.QuestionId } }) }
            var promise = {}, promises = [];
            SurveyCustomerLocationProductQuestionService.Search(predicate, ["RowOrder asc"], 0, 100, false).then(function (data) {
                for (var i = 0; i < data.Results.length; i++) {
                    var item = {
                        CompanyId: SelectionApplicationService.GetCompanyId(),
                        SurveyId: SelectionApplicationService.GetSurveyId(),
                        RowOrder: data.Results[i].rowOrder,
                        CustomerId: $scope.itemCopy.CustomerId,
                        LocationId: $scope.itemCopy.LocationId,
                        ProductId: $scope.itemCopy.ProductId,
                        QuestionId: $scope.itemCopy.QuestionId,
                    }
                    if ($scope.itemCopy.LocationId == null) {
                        item.LocationId = data.Results[i].Location.Id;
                    }
                    if ($scope.itemCopy.ProductId == null) {
                        item.ProductId = data.Results[i].Product.Id;
                    }
                    if ($scope.itemCopy.QuestionId == null) {
                        item.QuestionId = data.Results[i].Question.Id;
                    }
                    promise = SurveyCustomerLocationProductQuestionService.Create(item).then(function (data) {

                    });
                    //$scope.$parent.gridOptions.data.push(data);
                    promises.push(promise);                   
                }
                $q.all(promises).then(function () {
                    toastr.success("The specified survey data has been copied over.");
                    $scope.itemCopy = { Id: null }
                    $scope.$parent.Search();
                });
            });
        }
    }]);

})(moment);
(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.admin.surveycustomerlocationproductquestion', {
            url: "/survey/customerlocationproductquestion",
            templateUrl: "ApplicationComponents/Administrator/SurveyCustomerLocationProductQuestion/Views/SurveyCustomerLocationProductQuestion.html"
        })
    });
    angular.module('Main').controller('SurveyCustomerLocationProductQuestionController', ['$scope', '$state', '$routeParams',
        '$http', '$q', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyCustomerLocationProductQuestionService',
        'SelectionApplicationService',
    function controller($scope, $state, $routeParams, 
    $http, $q, $location, $timeout, breezeservice, breeze, SurveyCustomerLocationProductQuestionService,
        SelectionApplicationService) {
        var predicate = {
            and: [
                { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } }
            ]
        }
        $scope.Search = function () {
            SurveyCustomerLocationProductQuestionService.Search(predicate, ["RowOrder asc"], 0, 100, false).then(function (data) {
                $scope.gridOptions.data = data.Results;
            });
        }
        $scope.gridOptions = {
            showGridFooter: true,
            enableFiltering: true,
            enableSorting: true,
            data: [],
            columnDefs: [
                { name: 'Manage', width: '120', cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html' },
                { field: 'Customer.Name', name: 'Customer Name', cellTooltip: true },
                { field: 'Location.Name', name: 'Location Name', cellTooltip: true },
                { field: 'Product.Name', name: 'Product Name', cellTooltip: true },
                { field: 'Question.Name', name: 'Question Name', cellTooltip: true },
                { field: 'RowOrder', width: '120', name: 'Order', cellTooltip: true }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                gridApi.draggableRows.on.rowDropped($scope, function (info, dropTarget) {
                    //$scope.Reorder();
                });
                gridApi.core.on.filterChanged($scope, function (column) {
                    var grid = this.grid;
                    if (angular.isDefined($scope.filterTimeout)) {
                        $timeout.cancel($scope.filterTimeout);
                    }
                    $scope.filterTimeout = $timeout(function () {
                        $scope.filterChanged(grid.columns);
                    }, 500);
                });

                gridApi.infiniteScroll.on.needLoadMoreData($scope, $scope.GetDataDown);
            },
            rowTemplate: '<div grid="grid" class="ui-grid-draggable-row" draggable="true"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader, \'custom\': true }" ui-grid-cell></div></div>',           
        };
        $scope.Search();

        $scope.filterChanged = function (gridColumns) {
            predicate.and.length = 1;
            angular.forEach(gridColumns, function (column) {
                if (typeof column.filters !== 'undefined' && column.filters !== null &&
                        column.filters.length > 0 && column.filters[0].term != null && column.filters[0].term.trim().length > 0) {
                    var operandName = "contains"; var fieldName = column.field; var termName = column.filters[0].term;
                    var filter = {};
                    var field = {}
                    field[operandName] = termName;
                    filter[fieldName] = field;
                    predicate.and.push(filter);
                }
            });
            $scope.Search();
        }

        $scope.GetDataDown = function () {
            $scope.Page++;
            SurveyCustomerLocationProductQuestionService.Search(predicate, ["Created desc"], $scope.Page, 100, false).then(function (data) {
                $scope.gridApi.infiniteScroll.saveScrollPercentage();
                $scope.data = $scope.data.concat(data.Results);
                $scope.gridApi.infiniteScroll.dataLoaded(false, $scope.isMoreData(data.InlineCount));
            });
        }

        $scope.isMoreData = function (count) {
            if (count > $scope.data.length) {
                return true;
            }
            return false;
        }

        $scope.Edit = function (row) {
            $state.go('main.admin.surveycustomerlocationproductquestion.addedit', { id: row.Id }, { reload: false });
        }

        //TODO: Reorder button.  Don't do on drop.  
        $scope.Reorder = function () {
            //validate
            if (!$scope.ValidateForOrdering()) {
                return;
            }
            //reorder
            var promises = [], promise = {};
            for (var i = 0; i < $scope.gridOptions.data.length; i++) {
                var row = $scope.gridOptions.data[i];
                row.RowOrder = i
                var promise = SurveyCustomerLocationProductQuestionService.Update(row.Id, row).then(function (data) {
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
                promises.push(promise);
            }
            $q.all(promises).then(function () {
                $scope.Search();
            });
        }

        //TODO: Button and group by customer location and filter based on current selection.  Need validation as well in there.
        $scope.ReorderAll = function () {
            //validate
            if (!$scope.ValidateForOrdering()) {
                return;
            }
            var promise = {}, promises = [];
            angular.forEach($scope.gridOptions.data, function (item, index) {
                var predicate = {
                    and: [
                        { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } },
                        { "ProductId": { "==": item.ProductId } },
                        { "QuestionId": { "==": item.QuestionId } }
                    ]
                }
                promise = SurveyCustomerLocationProductQuestionService.Search(predicate, ["Created asc"], 0, 100, false).then(function (data) {
                    for (var j = 0; j < data.Results.length; j++) {
                        var row = data.Results[j];
                        row.RowOrder = index;
                        SurveyCustomerLocationProductQuestionService.Update(row.Id, row).then(function (data) {

                        });
                    }
                });
                promises.push(promise);
                $q.all(promises).then(function () {
                    $scope.Search();
                })
            });
        }

        $scope.ValidateForOrdering = function () {
            var customer = $scope.gridOptions.data[0].CustomerId;
            var location = $scope.gridOptions.data[0].LocationId;
            for (var i = 0; i < $scope.gridOptions.data.length; i++) {
                if (customer != $scope.gridOptions.data[i].CustomerId) {
                    toastr.error("The grouping does not contain just one customer.  Please filter down to just one customer first before ordering.");
                    return false;
                }
                if (location != $scope.gridOptions.data[i].LocationId) {
                    toastr.error("The grouping does not contain just one location.  Please filter down to just one location first before ordering.");
                    return false;
                }
            }
            return true;
        }

        $scope.Delete = function (Id) {
            SurveyCustomerLocationProductQuestionService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);
(function (moment) {
    "use strict";
    angular.module('Main').controller('SurveyProductQuestionAddEditController', ['$scope', '$q', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyProductQuestionService',
        'ProductService', 'QuestionService', 'SelectionApplicationService',
    function controller($scope, $q, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyProductQuestionService,
        ProductService, QuestionService, SelectionApplicationService) {

        $scope.Init = function () {
            $scope.item = { Id: null }
            $scope.focus = true;
            $scope.copyItem = { Id: null }
        }
        $scope.Init();
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                SurveyProductQuestionService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.SearchProducts = function (value) {
            var predicate = {
                and: [
                   { "Name": { "substringof": value } },
                   { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } }
                ]
            }
            return ProductService.Search(predicate, ["Name asc"], 0, 20, false).then(function (data) {
                return data;
            });
        }

        $scope.SelectProduct = function (item, model, label) {
            $scope.item.ProductId = item.Id;
            $scope.item.ProductName = item.Name;
        }

        $scope.SelectCopyProduct = function (item, model, label) {
            $scope.copyItem.ProductId = item.Id;
            $scope.copyItem.ProductName = item.Name;
        }

        $scope.SearchQuestions = function (value) {
            var predicate = {
                and: [
                   { "Name": { "substringof": value } },
                   { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } }
                ]
            }
            return QuestionService.Search(predicate, ["Name asc"], 0, 20, false).then(function (data) {

                return data;
            });
        }

        $scope.SelectQuestion = function (item, model, label) {
            $scope.item.QuestionId = item.Id;
        }

        $scope.CopyQuestion = function () {
            var promise = {}, promises = [];
            var predicate = {
                and: [
                   { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } },
                   { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } }
                ]
            }
            SurveyProductQuestionService.Search(predicate, ["RowOrder asc"], 0, 1, false).then(function (data) {
                var rowOrder = data.InlineCount;
                predicate = {
                    and: [
                       { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } },
                       { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } },
                       { "Product.Id": { "==": $scope.item.ProductId } }
                    ]
                }
                SurveyProductQuestionService.Search(predicate, ["RowOrder asc"], 0, 100, false).then(function (data) {
                    for (var i = 0; i < data.Results.length; i++) {
                        var item = {
                            ProductId: $scope.copyItem.ProductId,
                            QuestionId: data.Results[i].Question.Id,
                            RowOrder: rowOrder,
                            CompanyId: SelectionApplicationService.GetCompanyId(),
                            SurveyId: SelectionApplicationService.GetSurveyId()
                        }
                        var promise = SurveyProductQuestionService.Create(item).then(function (data) {

                        });
                        rowOrder++;
                        promises.push(promise);
                    }
                    $q.all(promises).then(function () {
                        toastr.success($scope.item.ProductName + " questions have been copied to product " + $scope.copyItem.ProductName);
                        $scope.copyItem = { Id: null }
                        $scope.$parent.Search();
                    });
                });
            });
        }

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                SurveyProductQuestionService.Update($scope.item.Id, $scope.item).then(function (data) {
                    var index = $scope.$parent.gridOptions.data.map(function (e) { return e.Id; }).indexOf(data.data.Id);
                    $scope.$parent.gridOptions.data.splice(index, 1, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
            else {
                $scope.item.CompanyId = SelectionApplicationService.GetCompanyId();
                $scope.item.SurveyId = SelectionApplicationService.GetSurveyId();
                $scope.item.RowOrder = $scope.$parent.gridOptions.data.length;
                SurveyProductQuestionService.Create($scope.item).then(function (data) {
                    $scope.$parent.gridOptions.data.splice($scope.$parent.gridOptions.data.length, 0, data.data);
                    $scope.$parent.gridOptions.gridApi.core.scrollTo($scope.gridOptions.data[$scope.gridOptions.data.length - 1], $scope.gridOptions.columnDefs[0]);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyProductQuestionController', ['$scope', '$state', '$q', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyProductQuestionService',
        'SelectionApplicationService',
    function controller($scope, $state, $q, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyProductQuestionService,
        SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } }
            SurveyProductQuestionService.Search(predicate, ["RowOrder asc"], 0, 100, false).then(function (data) {
                $scope.gridOptions.data = data.Results;
            });
        }
        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: false,
            onRegisterApi: function (gridApi) {
                $scope.gridOptions.gridApi = gridApi;
                gridApi.draggableRows.on.rowDropped($scope, function (info, dropTarget) {
                    $scope.Reorder();
                });
            },
            rowTemplate: '<div grid="grid" class="ui-grid-draggable-row" draggable="true"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader, \'custom\': true }" ui-grid-cell></div></div>',
            data: [],
            columnDefs: [
                { name: 'Manage', width: '120', cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html' },
                { field: 'Product.Name', name: 'Product Name', cellTooltip: true },
                { field: 'Question.Name', name: 'Question Name', cellTooltip: true },
                { field: 'RowOrder', width: '120', name: 'Order', cellTooltip: true }
            ]
        };
        $scope.Search();

        $scope.Edit = function (row) {
            $state.go('main.admin.surveyproductquestion.addedit', { id: row.Id }, { reload: false });
        }

        $scope.Reorder = function () {
            var promises = [], promise = {};
            for (var i = 0; i < $scope.gridOptions.data.length; i++) {
                var row = $scope.gridOptions.data[i];
                row.RowOrder = i
                var promise = SurveyProductQuestionService.Update(row.Id, row).then(function (data) {
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
                promises.push(promise);
            }
            $q.all(promises).then(function () {
                $scope.Search();
            });
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
        '$timeout', 'breezeservice', 'breeze', 'UserRoleService', 'CustomerService', 'RoleService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location,
        $timeout, breezeservice, breeze, UserRoleService, CustomerService, RoleService, SelectionApplicationService) {
        $scope.Init = function () {
            $scope.item = { Id: null, Name: "" }
            $scope.focus = true;
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
            var predicate = { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } };
            CustomerService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
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
                    var index = $scope.$parent.gridOptions.data.map(function (e) { return e.Id; }).indexOf(data.data.Id);
                    $scope.$parent.gridOptions.data.splice(index, 1, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
            else {
                $scope.item.CompanyId = SelectionApplicationService.GetCompanyId();
                $scope.item.RoleId = $scope.item.Role.Id;
                if ($scope.item.Customer != undefined) {
                    $scope.item.CustomerId = $scope.item.Customer.Id;
                }
                UserRoleService.Create($scope.item).then(function (data) {
                    $scope.$parent.gridOptions.data.splice(0, 0, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
                });
            }
        }

        $scope.Validate = function () {
            if ($scope.item.Role.Name != "Customer") {
                $scope.item.Customer = null;
            }

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
    angular.module('Main').controller('UserRoleController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'UserRoleService', 'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, UserRoleService, SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = new breeze.Predicate('CompanyId', '==', SelectionApplicationService.GetCompanyId());
            UserRoleService.Search(predicate, 0, 100, false).then(function (data) {
                $scope.gridOptions.data = data;
            });
        }
        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            data: [],
            columnDefs: [
                { name: 'Manage', width: '120',  cellTemplate: '<span class="btn btn-danger btn-sm" ng-click="grid.appScope.Delete(row.entity.Id)">Delete</span>' },
                { field: 'User.UserName', name: 'User', cellTooltip: true },
                { field: 'Role.Name', name: 'Role', cellTooltip: true },
                { field: 'Customer.Name', name: 'Customer', cellTooltip: true }
            ]
        };
        $scope.Search();

        $scope.Delete = function (Id) {
            UserRoleService.Delete(Id).then(function (data) {
                $scope.Search();
            }, function (error) {
                toastr.error(error.data, error.statusText);
            });
        }
    }]);

})(moment);
(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.selectcompany', {
            url: "/selectcompany/:redirectState",
            templateUrl: "ApplicationComponents/DataEntry/SelectCompany/SelectCompany.html"
        })
    });
    angular.module('Main').controller('SelectCompanyController', ['$scope', '$state', '$stateParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService', 'UserService', 'UserRoleService',
        'RoleService', 'SurveyCustomerLocationService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, UserRoleService,
        RoleService, SurveyCustomerLocationService, SelectionApplicationService) {

        $scope.Search = function () {
            CompanyService.Search(null, ["Name desc"], 0, 20, false).then(function (data) {
                if (data.length == 1) {
                    $scope.Select(data[0]);
                }
                else {
                    $scope.Company = data;
                }
            });
        }
        $scope.Search();

        $scope.Select = function (item) {
            SelectionApplicationService.SetCompany(item);
            SelectionApplicationService.SetCompanyId(item.Id);
            $state.go('main.selectcustomer');
        }

        $scope.Continue = function () {
            $state.go('main.selectcustomer');
        }

        $scope.IsContinueShown = function () {
            if (SelectionApplicationService.GetRedirectState() == 'main.survey') {
                return false;
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
        .state('main.selectcustomer', {
            url: "/selectcustomer/:redirectState",
            templateUrl: "ApplicationComponents/DataEntry/SelectCustomer/SelectCustomer.html"
        })
    });
    angular.module('Main').controller('SelectCustomerController', ['$scope', '$state', '$stateParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService', 'UserService', 'UserRoleService',
        'RoleService', 'SurveyCustomerLocationService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, UserRoleService,
        RoleService, SurveyCustomerLocationService, SelectionApplicationService) {

        $scope.Search = function () {
            var predicate = { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } };
            CustomerService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                if (data.length == 1) {
                    $scope.Select(data[0]);
                }
                else {
                    $scope.Customer = data;
                }
            });
        }
        $scope.Search();

        $scope.Select = function (item) {
            SelectionApplicationService.SetCustomer(item);
            SelectionApplicationService.SetCustomerId(item.Id);
            $state.go('main.selectlocation');
        }

        $scope.Continue = function () {
            $state.go('main.selectlocation');
        }

        $scope.IsContinueShown = function () {
            if (SelectionApplicationService.GetRedirectState() == 'main.survey') {
                return false;
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
        .state('main.selectlocation', {
            url: "/selectlocation/:redirectState",
            templateUrl: "ApplicationComponents/DataEntry/SelectLocation/SelectLocation.html"
        })
    });
    angular.module('Main').controller('SelectLocationController', ['$scope', '$state', '$stateParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService', 'UserService', 'UserRoleService',
        'RoleService', 'SurveyCustomerLocationProductQuestionService', 'SelectionApplicationService', 'SelectLocationService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, UserRoleService,
        RoleService, SurveyCustomerLocationProductQuestionService, SelectionApplicationService, SelectLocationService) {
        
        $scope.LocationServicesDisabled = false;
        $scope.Location = [];
        $scope.Search = function () {
            if (SelectionApplicationService.GetRedirectState() == 'main.survey') {
                var predicate = {
                    and: [
                       { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } },                       
                       { "CustomerId": { '==': SelectionApplicationService.GetCustomerId() } },
                       { "Latitude": { '>=': $scope.Latitude - .0725 } },
                       { "Latitude": { '<=': $scope.Latitude + .0725 } },
                       { "Longitude": { '>=': $scope.Longitude - .0725 } },
                       { "Longitude": { '<=': $scope.Longitude + .0725 } }
                    ]
                }
                SelectLocationService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                    $scope.Location = data;
                });
            }
            else {
                var predicate = {
                    and: [
                       { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } },
                       { "CustomerId": { '==': SelectionApplicationService.GetCustomerId() } }
                    ]
                }
                LocationService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                    if (SelectionApplicationService.GetRole() == "Customer") {
                        $state.go('main.selectsurvey');
                    }
                    if (data.length < 1) {
                        $scope.LocationServicesDisabled = true;
                    }
                    else if (data.length == 1) {
                        $scope.Select(data[0]);
                    }
                    $scope.Location = data;
                });
            }
            
        }
        navigator.geolocation.getCurrentPosition(function (position) {
            $scope.Latitude = position.coords.latitude;
            $scope.Longitude = position.coords.longitude;
            $scope.Search();
        }, function (error) {
            toastr.error("User has denied geolocation for this site.  Please allow location services to get your location to find locations near you.");
            $scope.LocationServicesDisabled = true;
        });

        $scope.ChangeAddress = function (value) {
            var address = JSON.stringify(value);
            return $http.get('https://maps.google.com/maps/api/geocode/json?address=' + address + '&sensor=false').then(function (data) {
                return data.data.results;
            });
        }

        $scope.SelectAddress = function (item, model, label) {
            $scope.Latitude = item.geometry.location.lat;
            $scope.Longitude = item.geometry.location.lng;
            $scope.LocationServicesDisabled = false;
            $scope.Search();
        }

        $scope.Select = function (item) {
            SelectionApplicationService.SetLocation(item);
            SelectionApplicationService.SetLocationId(item.Id);
            $state.go('main.selectsurvey');
        }

        $scope.Continue = function () {
            $state.go('main.selectsurvey');
        }

        $scope.IsContinueShown = function () {
            if (SelectionApplicationService.GetRedirectState() == 'main.survey') {
                return false;
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
            url: "/survey",
            templateUrl: "ApplicationComponents/DataEntry/Survey/MerchandiseSurvey.html"
        })
    });
    angular.module('Main').controller('MerchandiseSurveyController', ['$scope', '$q', '$state', '$stateParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService',
        'UserService', 'SurveyCustomerLocationService', 'SurveyProductQuestionService', 'SurveyCustomerLocationProductQuestionService', 'SurveyHeaderService', 'SurveyDetailService', 'ImageService',
        'SelectionApplicationService',
    function controller($scope, $q, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService,
        UserService, SurveyCustomerLocationService, SurveyProductQuestionService, SurveyCustomerLocationProductQuestionService, SurveyHeaderService, SurveyDetailService, ImageService, SelectionApplicationService) {
        
        if ((SelectionApplicationService.GetCompanyId() == null || SelectionApplicationService.GetCustomerId() == null ||
            SelectionApplicationService.GetLocationId() == null || SelectionApplicationService.GetSurveyId() == null) && SelectionApplicationService.GetSurveyHeaderId() == null) {
            $state.go('main.selectcompany');
        }
        $scope.BeforeImage = null;
        $scope.AfterImage = null;
        $scope.Company = SelectionApplicationService.GetCompany(); $scope.Survey = SelectionApplicationService.GetSurvey();
        $scope.Customer = SelectionApplicationService.GetCustomer(); $scope.Location = SelectionApplicationService.GetLocation();
        $scope.Header = {
            BeforeImage: null, AfterImage: null, Latitude: null, Longitude: null, Notes: null,
            CompanyId: SelectionApplicationService.GetCompanyId(), SurveyId: SelectionApplicationService.GetSurveyId(),
            CustomerId: SelectionApplicationService.GetCustomerId(), LocationId: SelectionApplicationService.GetLocationId()
        }
        navigator.geolocation.getCurrentPosition(function (position) {
            $scope.Header.Latitude = position.coords.latitude;
            $scope.Header.Longitude = position.coords.longitude;
        });
        $scope.Detail = [];

        $scope.Search = function () {
            if (SelectionApplicationService.GetSurveyHeaderId() != null) {
                var predicate = { "Id": { "==": SelectionApplicationService.GetSurveyHeaderId() } };
                SurveyHeaderService.Search(predicate, ["Created desc"], 0, 1, false).then(function (data) {
                    $scope.Survey = data.Results[0].Survey;
                    $scope.Header = data.Results[0];
                })
                var predicate = { "SurveyHeaderId": { "==": SelectionApplicationService.GetSurveyHeaderId() } };
                SurveyDetailService.Search(predicate, ["Created desc"], 0, 100, false).then(function (data) {
                    $scope.Detail = data;
                });
                $scope.BeforeImage = "/api/v1/ImageApi/GetBeforeImage/" + SelectionApplicationService.GetSurveyHeaderId();
                $scope.AfterImage = "/api/v1/ImageApi/GetAfterImage/" + SelectionApplicationService.GetSurveyHeaderId();
            }
            else {
                var predicate = {
                    and: [
                       { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } },
                       { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } },
                       { "CustomerId": { '==': SelectionApplicationService.GetCustomerId() } },
                       { "LocationId": { "==": SelectionApplicationService.GetLocationId() } }
                    ]
                }
                SurveyCustomerLocationProductQuestionService.Search(predicate, ["RowOrder desc"], 0, 100, false).then(function (data) {
                    $scope.Survey = data.Results[0].Survey;
                    $scope.Detail = data.Results;
                });
            }
        }
        $scope.Search();

        $scope.sort = {
            column: ['RowOrder', 'Product.Name'],
            descending: false
        };
        $scope.changeSorting = function (column) {
            var sort = $scope.sort;

            if (sort.column[0] == column) {
                sort.descending = !sort.descending;
            } else {
                sort.column[0] = column;
                sort.descending = false;
            }
        };

        $scope.Save = function () {
            var promises = [];
            var promise = null;
            if (!$scope.Validate()) {
                return false;
            }
            if (SelectionApplicationService.GetSurveyHeaderId() != null) {
                var details = [];
                angular.forEach($scope.Detail, function (value, key) {
                    details.push({
                        Id: value.Id,
                        Answer: value.Answer
                    });
                });
                var item = { Header: $scope.Header, Details: details };
                promise = SurveyHeaderService.UpdateBulk($scope.Header.Id, item).then(function(data){
                    promises.push(promise);
                    promise = ImageService.CreateBeforeImage($scope.Header.BeforeImage, data.data.Id);
                    promises.push(promise);
                    promise = ImageService.CreateAfterImage($scope.Header.AfterImage, data.data.Id);
                    promises.push(promise);
                    $q.all(promises).then(function () {
                        toastr.success("Save successful.");
                    });
                }, function (error) {
                    toastr.error("There was an error updating the survey.");
                });
            }
            else {
                var details = [];
                var companyId = SelectionApplicationService.GetCompanyId();
                angular.forEach($scope.Detail, function (value, key) {
                    details.push({
                        CompanyId: companyId,
                        ProductId: value.Product.Id,
                        QuestionId: value.Question.Id,
                        Answer: value.Answer
                    });
                });
                var item = { Header: $scope.Header, Details: details };
                promise = SurveyHeaderService.CreateBulk(item).then(function (data) {
                    promise = ImageService.CreateBeforeImage($scope.Header.BeforeImage, data.data.Id);
                    promises.push(promise);
                    promise = ImageService.CreateAfterImage($scope.Header.AfterImage, data.data.Id);
                    promises.push(promise);
                    $q.all(promises).then(function () {
                        toastr.success("Save successful.");
                        SelectionApplicationService.Clear();
                        SelectionApplicationService.SetRedirectState('main.survey');
                        $state.go('main.selectcompany');
                    });
                }, function(error){
                    toastr.error("There was an error creating the survey.");
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
            if (SelectionApplicationService.GetSurveyHeaderId() != null ) {
                ImageService.DeleteBeforeImage(SelectionApplicationService.GetSurveyHeaderId()).then(function () {
                    $scope.Header.IsBeforeImage = false;
                    if (SelectionApplicationService.GetSurveyHeaderId() != null) {
                        SurveyHeaderService.Update($scope.Header.Id, $scope.Header).then(function () {

                        });
                    }
                });
            }
            else {
                $scope.Header.IsBeforeImage = false;
            }
        }

        $scope.DeleteAfterImage = function () {
            $scope.AfterImage = null;
            $scope.Header.AfterImage = null;
            if (SelectionApplicationService.GetSurveyHeaderId() != null) {
                ImageService.DeleteAfterImage(SelectionApplicationService.GetSurveyHeaderId()).then(function () {
                    $scope.Header.IsAfterImage = false;
                    if (SelectionApplicationService.GetSurveyHeaderId() != null) {
                        SurveyHeaderService.Update($scope.Header.Id, $scope.Header).then(function () {

                        });
                    }
                });
            }
            else {
                $scope.Header.IsAfterImage = false;
            }
        }
    }]);
})(moment);
(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.selectsurvey', {
            url: "/selectsurvey/:redirectState",
            templateUrl: "ApplicationComponents/DataEntry/SelectSurvey/SelectSurvey.html"
        })
    });
    angular.module('Main').controller('SelectSurveyController', ['$scope', '$state', '$stateParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService', 'UserService', 'UserRoleService',
        'RoleService', 'SurveyCustomerLocationProductQuestionService', 'SelectionApplicationService', 'SelectSurveyService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, UserRoleService,
        RoleService, SurveyCustomerLocationProductQuestionService, SelectionApplicationService, SelectSurveyService) {
        
        $scope.Survey = [];
        $scope.Search = function () {
            if(SelectionApplicationService.GetRedirectState() == 'main.survey') {
                var predicate = {
                    and: [
                       { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } },
                       { "CustomerId": { "==": SelectionApplicationService.GetCustomerId() } },
                       { "LocationId": { "==": SelectionApplicationService.GetLocationId() } }
                    ]
                }
                SelectSurveyService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                    $scope.Survey = data;
                });
            }
            else {
                var predicate = {
                    and: [
                       { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } }
                    ]
                }
                SurveyService.Search(predicate, ["Created asc"], 0, 100, false).then(function (data) {
                    if (SelectionApplicationService.GetRole() == "Customer") {
                        $state.go(SelectionApplicationService.GetRedirectState());
                    }
                    $scope.Survey = data;
                });
            }
        }
        $scope.Search();

        $scope.Select = function (item) {
            SurveyService.Get(item.Id).then(function (data) {
                SelectionApplicationService.SetSurvey(data);
                SelectionApplicationService.SetSurveyId(data.Id);
                $state.go(SelectionApplicationService.GetRedirectState());
            });
        }

        $scope.Continue = function () {
            $state.go(SelectionApplicationService.GetRedirectState());
        }

        $scope.IsContinueShown = function () {
            if (SelectionApplicationService.GetRedirectState() == 'main.survey') {
                return false;
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
        .state('main.report', {
            url: "/report",
            templateUrl: "ApplicationComponents/Reporting/Report/Report.html"
        })
    });
    angular.module('Main').controller('ReportController', ['$scope', '$state', 'SelectionApplicationService',
    function controller($scope, $state, SelectionApplicationService) {
        $scope.SelectedCompany = SelectionApplicationService.GetCompany();
        $scope.SelectedCustomer = SelectionApplicationService.GetCustomer();
        $scope.SelectedLocation = SelectionApplicationService.GetLocation();
        $scope.SelectedSurvey = SelectionApplicationService.GetSurvey();
    }]);

})(moment);

(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.report.surveyreport', {
            url: "/surveyreport",
            templateUrl: "ApplicationComponents/Reporting/Survey/SurveyReport.html"
        })
    });
    angular.module('Main').controller('SurveyReportController', ['$scope', '$q', '$state', '$stateParams', '$http', '$location', '$uibModal',
        '$timeout', 'breezeservice', 'breeze', 'ReportService', 'SurveyHeaderService', 'SelectionApplicationService', 'UserService',
        'LocationService', 'CustomerService', 'SurveyService', 'ImageService', 'DownloadService',
    function controller($scope, $q, $state, $stateParams, $http, $location, $uibModal,
        $timeout, breezeservice, breeze, ReportService, SurveyHeaderService, SelectionApplicationService, UserService,
        LocationService, CustomerService, SurveyService, ImageService, DownloadService) {
        if (SelectionApplicationService.GetCompanyId() == null) {
            $state.go('main.selectcompany');
        }

        $scope.StartDate = new Date(moment().startOf('isoWeek').format("YYYY-MM-DD 00:00:00"));
        $scope.EndDate = new Date(moment().add(2, "days").format("YYYY-MM-DD : 23:59:59"));
        $scope.myDate = new Date();
        $scope.MinDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() - 12,
            $scope.myDate.getDate());
        $scope.MaxDate = $scope.EndDate;
        $scope.DateChange = function () {
            $scope.Page = 0;
            $scope.data = [];
            $scope.gridOptions.columnDefs = [];
            $scope.Search();
        }

        $scope.Page = 0;
        $scope.PageSize = 100;
        $scope.Search = function () {
            ReportService.Search(SelectionApplicationService.GetCompanyId(), SelectionApplicationService.GetSurveyHeaderId(), SelectionApplicationService.GetCustomerId(),
                SelectionApplicationService.GetLocationId(), null, SelectionApplicationService.GetSurveyId(), null,
                moment($scope.StartDate).format('YYYY-MM-DD'), moment($scope.EndDate).format('YYYY-MM-DD'),
                $scope.Page, $scope.PageSize).then(function (data) {                    
                    $scope.data = data;
                    UserService.IsAdministrator(SelectionApplicationService.GetCompanyId()).then(function (data) {
                        if (data == true) {
                            $scope.gridOptions.columnDefs.splice(0, 0, {
                                name: 'Manage', width: 110, cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html'
                            });
                        }
                        else {
                            return UserService.IsDataEntry(SelectionApplicationService.GetCompanyId())
                        }
                    }).then(function (data) {
                        if (data == true) {
                            $scope.gridOptions.columnDefs.splice(0, 0, {
                                name: 'Manage', width: 110, 
                                cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html'
                            });
                        }
                    });
                    $scope.gridOptions.columnDefs.splice(1, 0, {
                        name: 'Images/Notes', width: 65,  cellTooltip: true, headerTooltip: true, 
                        cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/BeforeAfterNotes.html'
                    });
                    $scope.gridOptions.columnDefs.push({
                        field: 'CustomerName', name: 'Customer Name', cellTooltip: true, headerTooltip: true
                    });
                    $scope.gridOptions.columnDefs.push({
                        field: 'LocationName', name: 'Location Name', cellTooltip: true, headerTooltip: true
                    });
                    $scope.gridOptions.columnDefs.push({
                        field: 'SurveyName', name: 'Survey Name', cellTooltip: true, headerTooltip: true
                    });
                    $scope.gridOptions.columnDefs.push({
                        field: 'ProductName', name: 'Product Name', cellTooltip: true, headerTooltip: true
                    });
                    var exclude = ['IsBeforeImage', 'IsAfterImage', 'Created'],
                        length = exclude.length;
                    var keys = []
                    var obj = $scope.data[0];
                    for (var key in obj) {
                        keys.push(key)
                        if ((!key.includes("Id") && !key.includes("Name") && !exclude.includes(key))) {
                            $scope.gridOptions.columnDefs.push({
                                name: key, cellTooltip: true, headerTooltip: true
                            });
                        }
                    }
                    $scope.gridOptions.columnDefs.push({
                        name: 'Created', cellTooltip: true, headerTooltip: true,
                        cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">{{row.entity.Created | dateLocalize | date: "MM/dd/yyyy h:mm:ss a"}}</div>'
                    });
                }, function (error) {
                    toastr.error("There was an error getting all the data.");
                });
        }

        $scope.GetDataDown = function () {
            $scope.Page++;
            ReportService.Search(SelectionApplicationService.GetCompanyId(), null, SelectionApplicationService.GetCustomerId(),
                SelectionApplicationService.GetLocationId(), null, SelectionApplicationService.GetSurveyId(), null,
                moment($scope.StartDate).format('YYYY-MM-DD'), moment($scope.EndDate).format('YYYY-MM-DD'),
                $scope.Page, $scope.PageSize).then(function (data) {
                    $scope.gridApi.infiniteScroll.saveScrollPercentage();
                    $scope.data = $scope.data.concat(data);
                    $scope.gridApi.infiniteScroll.dataLoaded(false, true);
                });
        }

        $scope.data = [];
        $scope.gridOptions = {
            showGridFooter: true,
            enableFiltering: true,
            enableSorting: true,
            enableGridMenu: true,
            infiniteScrollRowsFromEnd: 100,
            //exporterCsvFilename: 'myFile.csv',
            //exporterPdfOrientation: 'portrait',
            //exporterPdfPageSize: 'LETTER',
            //exporterPdfMaxGridWidth: 500,
            data: 'data',
            columnDefs: [],
            onRegisterApi: function (gridApi) {
                gridApi.infiniteScroll.on.needLoadMoreData($scope, $scope.GetDataDown);
                $scope.gridApi = gridApi;
            }
        };
        $scope.Search();

        $scope.Edit = function (row) {
            SelectionApplicationService.SetSurveyHeaderId(row.Id);
            var promises = [];
            promises.push(LocationService.Get(row.LocationId).then(function (data) {
                SelectionApplicationService.SetLocation(data);
            }));
            promises.push(CustomerService.Get(row.CustomerId).then(function (data) {
                SelectionApplicationService.SetCustomer(data);
            }));
            promises.push(SurveyService.Get(row.SurveyId).then(function (data) {
                SelectionApplicationService.SetSurvey(data);
            }));
            $q.all(promises).then(function () {
                $state.go('main.survey');
            });
        }

        $scope.Delete = function (id) {
            SurveyHeaderService.DeleteBulk(id).then(function (data) {
                var length = $scope.data.length;
                for (var index = 0; index < length; index++) {
                    if ($scope.data[index].Id == id) {
                        $scope.data.splice(index, 1);
                        length--;
                        index--;
                    }
                }
            }, function (error) {
                toastr.error("There was an error deleting the survey data.");
            });
        }

        $scope.ViewNote = function (id) {
            SurveyHeaderService.Get(id).then(function (data) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ApplicationComponents/Reporting/Modal/Note/NoteModal.html',
                    controller: 'NoteModalController',
                    //size: 'lg',
                    resolve: {
                        note: function () {
                            return data.Notes;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    //modal closed
                }, function () {
                    //modal dismissed
                });
            });
        }

        $scope.ViewImage = function (id, title) {
            if (title == 'Before Image') {
                var image = "/api/v1/ImageApi/GetBeforeImage/" + id;
            }
            else {
                var image = "/api/v1/ImageApi/GetAfterImage/" + id;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'ApplicationComponents/Reporting/Modal/Image/ImageModal.html',
                controller: 'ImageModalController',
                //size: 'lg',
                resolve: {
                    title: function () {
                        return title;
                    },
                    image: function () {
                        return image
                    }
                }
            });

            modalInstance.result.then(function () {
                //modal closed
            }, function () {
                //modal dismissed
            });
        }

        $scope.DownloadSurveyData = function () {
            window.open('/DownloadApi/DownloadSurveyData?startDate=' + moment($scope.StartDate).format('YYYY-MM-DD') + '&endDate=' + moment($scope.EndDate).format('YYYY-MM-DD'), '_blank', '');
        }

        $scope.DownloadNoteData = function () {
            window.open('/DownloadApi/DownloadNoteData?companyId=' + SelectionApplicationService.GetCompanyId() + '&startDate=' + moment($scope.StartDate).format('YYYY-MM-DD') + '&endDate=' + moment($scope.EndDate).format('YYYY-MM-DD'), '_blank', '');
        }
    }]);
})(moment);

(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.report.surveyheaderreport', {
            url: "/surveyheaderreport",
            templateUrl: "ApplicationComponents/Reporting/SurveyHeader/SurveyHeaderReport.html"
        })
    });
    angular.module('Main').controller('SurveyHeaderReportController', ['$scope', '$q', '$state', '$stateParams', '$http', '$location', '$uibModal',
        '$timeout', 'breezeservice', 'breeze', 'ReportService', 'SurveyHeaderService', 'SelectionApplicationService', 'UserService',
        'LocationService', 'CustomerService', 'SurveyService', 'ImageService', 'DownloadService',
    function controller($scope, $q, $state, $stateParams, $http, $location, $uibModal,
        $timeout, breezeservice, breeze, ReportService, SurveyHeaderService, SelectionApplicationService, UserService,
        LocationService, CustomerService, SurveyService, ImageService, DownloadService) {
        if (SelectionApplicationService.GetCompanyId() == null) {
            $state.go('main.selectcompany');
        }

        $scope.StartDate = new Date(moment().startOf('isoWeek').format("YYYY-MM-DD 00:00:00"));
        $scope.EndDate = new Date(moment().add(2, "days").format("YYYY-MM-DD : 23:59:59"));
        $scope.myDate = new Date();
        $scope.MinDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() - 12,
            $scope.myDate.getDate());
        $scope.MaxDate = $scope.EndDate;
        $scope.DateChange = function () {
            $scope.Page = 0;
            $scope.data = [];
            $scope.gridOptions.columnDefs = [];
            $scope.Search();
        }

        $scope.Search = function () {
            var predicate = {
                and: [
                   { "Company.Id": { "==": SelectionApplicationService.GetCompanyId() } },
                   { "Created": { ">=" : moment($scope.StartDate).format('YYYY-MM-DD')}},
                   { "Created": { "<=" : moment($scope.EndDate).format('YYYY-MM-DD')}}
                ]
            }
            SurveyHeaderService.Search(predicate, ["Created desc"], $scope.Page, 100, false).then(function (data) {
                $scope.data = data.Results;
            });
        }
        $scope.GetDataDown = function () {
            $scope.Page++;
            var predicate = {
                and: [
                   { "Company.Id": { "==": SelectionApplicationService.GetCompanyId() } },
                   { "Created": { ">=": moment($scope.StartDate).format('YYYY-MM-DD') } },
                   { "Created": { "<=": moment($scope.EndDate).format('YYYY-MM-DD') } }
                ]
            }
            SurveyHeaderService.Search(predicate, ["Created desc"], $scope.Page, 100, false).then(function (data) {
                $scope.gridApi.infiniteScroll.saveScrollPercentage();
                $scope.data = $scope.data.concat(data.Results);
                $scope.gridApi.infiniteScroll.dataLoaded(false, $scope.isMoreData(data.InlineCount));
            });
        }

        $scope.isMoreData = function(count){
            if (count > $scope.data.length) {
                return true;
            }
            return false;
        }

        $scope.data = [];
        $scope.gridOptions = {
            showGridFooter: true,
            enableFiltering: true,
            enableSorting: true,
            enableGridMenu: true,
            infiniteScrollRowsFromEnd: 50,
            data: 'data',
            columnDefs: [
                {
                    name: 'Detail', width: 65, cellTooltip: true, headerTooltip: true,
                    cellTemplate: '<button class="btn btn-primary btn-sm" ng-click="grid.appScope.ViewDetail(row.entity)">Detail</button>'
                },
                { name: 'Images/Notes', width: 65, cellTooltip: true, headerTooltip: true, cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/BeforeAfterNotes.html' },
                { field: 'Survey.Name', name: 'Survey Name', cellTooltip: true, headerTooltip: true },
                { field: 'Customer.Name', name: 'Customer Name', cellTooltip: true, headerTooltip: true },
                { field: 'Location.Name', name: 'Location Name', cellTooltip: true, headerTooltip: true },
                {
                    name: 'Created', cellTooltip: true, headerTooltip: true,
                    cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">{{row.entity.Created | dateLocalize | date: "MM/dd/yyyy h:mm:ss a"}}</div>'
                }
            ],
            onRegisterApi: function (gridApi) {
                gridApi.infiniteScroll.on.needLoadMoreData($scope, $scope.GetDataDown);
                //gridApi.options.loadTimeout = true;
                $scope.gridApi = gridApi;
            }
        };
        $scope.Search();

        $scope.ViewDetail = function (item) {
            SelectionApplicationService.SetSurveyHeaderId(item.Id);
            $state.go('main.report.surveyreport')
        }

        $scope.ViewNote = function (id) {
            SurveyHeaderService.Get(id).then(function (data) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ApplicationComponents/Reporting/Modal/Note/NoteModal.html',
                    controller: 'NoteModalController',
                    //size: 'lg',
                    resolve: {
                        note: function () {
                            return data.Notes;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    //modal closed
                }, function () {
                    //modal dismissed
                });
            });
        }

        $scope.ViewImage = function (id, title) {
            if (title == 'Before Image') {
                var image = "/api/v1/ImageApi/GetBeforeImage/" + id;
            }
            else {
                var image = "/api/v1/ImageApi/GetAfterImage/" + id;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'ApplicationComponents/Reporting/Modal/Image/ImageModal.html',
                controller: 'ImageModalController',
                //size: 'lg',
                resolve: {
                    title: function () {
                        return title;
                    },
                    image: function () {
                        return image
                    }
                }
            });

            modalInstance.result.then(function () {
                //modal closed
            }, function () {
                //modal dismissed
            });
        }
    }]);
})(moment);
(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.report.locationreport', {
            url: "/locationreport",
            templateUrl: "ApplicationComponents/Reporting/Location/LocationReport.html"
        })
    });
    angular.module('Main').controller('LocationReportController', ['$scope', '$state', '$stateParams', 'NgMap', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'SurveyHeaderService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, NgMap, $http, $location,
        $timeout, breezeservice, breeze, SurveyHeaderService, SelectionApplicationService) {
        $scope.SelectedPosition = null;

        $scope.StartDate = new Date(moment().startOf('isoWeek').format("YYYY-MM-DD 00:00:00"));
        $scope.EndDate = new Date(moment().add(2, "days").format("YYYY-MM-DD : 23:59:59"));
        $scope.myDate = new Date();
        $scope.MinDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() - 12,
            $scope.myDate.getDate());
        $scope.MaxDate = $scope.EndDate;
        $scope.DateChange = function () {
            $scope.Page = 0;
            $scope.data = [];
            //$scope.gridOptions.columnDefs = [];
            $scope.Search();
        }

        $scope.Search = function () {
            var predicate = {
                and: [
                    { "Company.Id": { "==": SelectionApplicationService.GetCompanyId() } },
                    { "Created": { ">=": moment($scope.StartDate).format('YYYY-MM-DD') } },
                    { "Created": { "<=": moment($scope.EndDate).format('YYYY-MM-DD') } }
                ]
            }
            if (SelectionApplicationService.GetCustomerId() != null) { predicate.and.push({ "Customer.Id": { "==": SelectionApplicationService.GetCustomerId() } }) }
            if (SelectionApplicationService.GetLocationId() != null) { predicate.and.push({ "Location.Id": { "==": SelectionApplicationService.GetLocationId() } }) }
            if (SelectionApplicationService.GetSurveyId() != null) { predicate.and.push({ "Survey.Id": { "==": SelectionApplicationService.GetSurveyId() } }) }
            SurveyHeaderService.Search(predicate, ["Created desc"], 0, 100, false).then(function (data) {
                $scope.data = data.Results;
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
angular.module('Main').controller('ImageModalController', function ($uibModalInstance, $scope, title, image) {
    $scope.image = image;
    $scope.title = title;

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
angular.module('Main').controller('NoteModalController', function ($scope, $uibModalInstance, note) {
    $scope.note = note;

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});