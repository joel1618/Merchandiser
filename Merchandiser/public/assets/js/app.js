
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
        meta.setEntityTypeForResourceName("RoleApi/Search", "RoleViewModel");
        meta.setEntityTypeForResourceName("MapApi/Search", "MapViewModel");
        meta.setEntityTypeForResourceName("ProductCategoryApi/Search", "ProductCategoryViewModel");
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
{"schema":{"namespace":"Merchandiser","alias":"Self","annotation:UseStrongSpatialTypes":"false","xmlns:annotation":"http://schemas.microsoft.com/ado/2009/02/edm/annotation","xmlns:customannotation":"http://schemas.microsoft.com/ado/2013/11/edm/customannotation","xmlns":"http://schemas.microsoft.com/ado/2009/11/edm","cSpaceOSpaceMapping":"[[\"Merchandiser.CompanyViewModel\",\"Merchandiser.Models.CompanyViewModel\"],[\"Merchandiser.CustomerViewModel\",\"Merchandiser.Models.CustomerViewModel\"],[\"Merchandiser.MapViewModel\",\"Merchandiser.Models.MapViewModel\"],[\"Merchandiser.ProductCategoryViewModel\",\"Merchandiser.Models.ProductCategoryViewModel\"],[\"Merchandiser.RoleViewModel\",\"Merchandiser.Models.RoleViewModel\"],[\"Merchandiser.SurveyCustomerLocationViewModel\",\"Merchandiser.Models.SurveyCustomerLocationViewModel\"],[\"Merchandiser.LocationViewModel\",\"Merchandiser.Models.LocationViewModel\"],[\"Merchandiser.SurveyViewModel\",\"Merchandiser.Models.SurveyViewModel\"],[\"Merchandiser.SurveyProductQuestionViewModel\",\"Merchandiser.Models.SurveyProductQuestionViewModel\"],[\"Merchandiser.ProductViewModel\",\"Merchandiser.Models.ProductViewModel\"],[\"Merchandiser.ProductCategory\",\"Merchandiser.ProductCategory\"],[\"Merchandiser.Company\",\"Merchandiser.Company\"],[\"Merchandiser.AspNetUserRole\",\"Merchandiser.AspNetUserRole\"],[\"Merchandiser.AspNetRole\",\"Merchandiser.AspNetRole\"],[\"Merchandiser.AspNetUser\",\"Merchandiser.AspNetUser\"],[\"Merchandiser.AspNetUserClaim\",\"Merchandiser.AspNetUserClaim\"],[\"Merchandiser.AspNetUserLogin\",\"Merchandiser.AspNetUserLogin\"],[\"Merchandiser.AspNetUsersInfo\",\"Merchandiser.AspNetUsersInfo\"],[\"Merchandiser.Customer\",\"Merchandiser.Customer\"],[\"Merchandiser.SurveyCustomerLocation\",\"Merchandiser.SurveyCustomerLocation\"],[\"Merchandiser.Location\",\"Merchandiser.Location\"],[\"Merchandiser.SurveyHeader\",\"Merchandiser.SurveyHeader\"],[\"Merchandiser.Survey\",\"Merchandiser.Survey\"],[\"Merchandiser.SurveyProductQuestion\",\"Merchandiser.SurveyProductQuestion\"],[\"Merchandiser.Product\",\"Merchandiser.Product\"],[\"Merchandiser.SurveyDetail\",\"Merchandiser.SurveyDetail\"],[\"Merchandiser.Question\",\"Merchandiser.Question\"],[\"Merchandiser.QuestionViewModel\",\"Merchandiser.Models.QuestionViewModel\"],[\"Merchandiser.UserRoleViewModel\",\"Merchandiser.Models.UserRoleViewModel\"],[\"Merchandiser.UserViewModel\",\"Merchandiser.Models.UserViewModel\"]]","entityType":[{"name":"CompanyViewModel","customannotation:ClrType":"Merchandiser.Models.CompanyViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"CustomerViewModel","customannotation:ClrType":"Merchandiser.Models.CustomerViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"IsSendReport","type":"Edm.Boolean","nullable":"false"},{"name":"SendReport","type":"Edm.DateTime"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"MapViewModel","customannotation:ClrType":"Merchandiser.Models.MapViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"Latitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Longitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"FirstName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"LastName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Notes","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid","nullable":"false"},{"name":"LocationId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyId","type":"Edm.Guid","nullable":"false"}]},{"name":"ProductCategoryViewModel","customannotation:ClrType":"Merchandiser.Models.ProductCategoryViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"RoleViewModel","customannotation:ClrType":"Merchandiser.Models.RoleViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"SurveyCustomerLocationViewModel","customannotation:ClrType":"Merchandiser.Models.SurveyCustomerLocationViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyId","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid","nullable":"false"},{"name":"LocationId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modifed","type":"Edm.DateTime","nullable":"false"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Customer","relationship":"Self.SurveyCustomerLocationViewModel_Customer","fromRole":"SurveyCustomerLocationViewModel_Customer_Source","toRole":"SurveyCustomerLocationViewModel_Customer_Target"},{"name":"Location","relationship":"Self.SurveyCustomerLocationViewModel_Location","fromRole":"SurveyCustomerLocationViewModel_Location_Source","toRole":"SurveyCustomerLocationViewModel_Location_Target"},{"name":"Survey","relationship":"Self.SurveyCustomerLocationViewModel_Survey","fromRole":"SurveyCustomerLocationViewModel_Survey_Source","toRole":"SurveyCustomerLocationViewModel_Survey_Target"}]},{"name":"LocationViewModel","customannotation:ClrType":"Merchandiser.Models.LocationViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Store","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Latitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Longitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Address","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"AreaManager","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"SurveyViewModel","customannotation:ClrType":"Merchandiser.Models.SurveyViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modifed","type":"Edm.DateTime","nullable":"false"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"SurveyProductQuestionViewModel","customannotation:ClrType":"Merchandiser.Models.SurveyProductQuestionViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyId","type":"Edm.Guid","nullable":"false"},{"name":"ProductId","type":"Edm.Guid","nullable":"false"},{"name":"QuestionId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modifed","type":"Edm.DateTime","nullable":"false"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Product","relationship":"Self.SurveyProductQuestionViewModel_Product","fromRole":"SurveyProductQuestionViewModel_Product_Source","toRole":"SurveyProductQuestionViewModel_Product_Target"},{"name":"Question","relationship":"Self.SurveyProductQuestionViewModel_Question","fromRole":"SurveyProductQuestionViewModel_Question_Source","toRole":"SurveyProductQuestionViewModel_Question_Target"}]},{"name":"ProductViewModel","customannotation:ClrType":"Merchandiser.Models.ProductViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"ProductCategoryId","type":"Edm.Guid"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":{"name":"ProductCategory","relationship":"Self.ProductViewModel_ProductCategory","fromRole":"ProductViewModel_ProductCategory_Source","toRole":"ProductViewModel_ProductCategory_Target"}},{"name":"ProductCategory","customannotation:ClrType":"Merchandiser.ProductCategory, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Company","relationship":"Self.Company_ProductCategories","fromRole":"Company_ProductCategories_Target","toRole":"Company_ProductCategories_Source"},{"name":"Products","relationship":"Self.Product_ProductCategory","fromRole":"Product_ProductCategory_Target","toRole":"Product_ProductCategory_Source"}]},{"name":"Company","customannotation:ClrType":"Merchandiser.Company, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"AspNetUserRoles","relationship":"Self.AspNetUserRole_Company","fromRole":"AspNetUserRole_Company_Target","toRole":"AspNetUserRole_Company_Source"},{"name":"Customers","relationship":"Self.Customer_Company","fromRole":"Customer_Company_Target","toRole":"Customer_Company_Source"},{"name":"Locations","relationship":"Self.Location_Company","fromRole":"Location_Company_Target","toRole":"Location_Company_Source"},{"name":"ProductCategories","relationship":"Self.Company_ProductCategories","fromRole":"Company_ProductCategories_Source","toRole":"Company_ProductCategories_Target"},{"name":"Products","relationship":"Self.Product_Company","fromRole":"Product_Company_Target","toRole":"Product_Company_Source"},{"name":"Questions","relationship":"Self.Question_Company","fromRole":"Question_Company_Target","toRole":"Question_Company_Source"},{"name":"SurveyCustomerLocations","relationship":"Self.SurveyCustomerLocation_Company","fromRole":"SurveyCustomerLocation_Company_Target","toRole":"SurveyCustomerLocation_Company_Source"},{"name":"SurveyDetails","relationship":"Self.SurveyDetail_Company","fromRole":"SurveyDetail_Company_Target","toRole":"SurveyDetail_Company_Source"},{"name":"SurveyHeaders","relationship":"Self.SurveyHeader_Company","fromRole":"SurveyHeader_Company_Target","toRole":"SurveyHeader_Company_Source"},{"name":"SurveyProductQuestions","relationship":"Self.SurveyProductQuestion_Company","fromRole":"SurveyProductQuestion_Company_Target","toRole":"SurveyProductQuestion_Company_Source"},{"name":"Surveys","relationship":"Self.Survey_Company","fromRole":"Survey_Company_Target","toRole":"Survey_Company_Source"}]},{"name":"AspNetUserRole","customannotation:ClrType":"Merchandiser.AspNetUserRole, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"UserId","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"RoleId","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid"}],"navigationProperty":[{"name":"AspNetRole","relationship":"Self.AspNetRole_AspNetUserRoles","fromRole":"AspNetRole_AspNetUserRoles_Target","toRole":"AspNetRole_AspNetUserRoles_Source"},{"name":"AspNetUser","relationship":"Self.AspNetUser_AspNetUserRoles","fromRole":"AspNetUser_AspNetUserRoles_Target","toRole":"AspNetUser_AspNetUserRoles_Source"},{"name":"Company","relationship":"Self.AspNetUserRole_Company","fromRole":"AspNetUserRole_Company_Source","toRole":"AspNetUserRole_Company_Target"},{"name":"Customer","relationship":"Self.Customer_AspNetUserRoles","fromRole":"Customer_AspNetUserRoles_Target","toRole":"Customer_AspNetUserRoles_Source"}]},{"name":"AspNetRole","customannotation:ClrType":"Merchandiser.AspNetRole, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":{"name":"AspNetUserRoles","relationship":"Self.AspNetRole_AspNetUserRoles","fromRole":"AspNetRole_AspNetUserRoles_Source","toRole":"AspNetRole_AspNetUserRoles_Target"}},{"name":"AspNetUser","customannotation:ClrType":"Merchandiser.AspNetUser, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"Email","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"EmailConfirmed","type":"Edm.Boolean","nullable":"false"},{"name":"PasswordHash","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"SecurityStamp","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"PhoneNumber","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"PhoneNumberConfirmed","type":"Edm.Boolean","nullable":"false"},{"name":"TwoFactorEnabled","type":"Edm.Boolean","nullable":"false"},{"name":"LockoutEndDateUtc","type":"Edm.DateTime"},{"name":"LockoutEnabled","type":"Edm.Boolean","nullable":"false"},{"name":"AccessFailedCount","type":"Edm.Int32","nullable":"false"},{"name":"UserName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"AspNetUserClaims","relationship":"Self.AspNetUserClaim_AspNetUser","fromRole":"AspNetUserClaim_AspNetUser_Target","toRole":"AspNetUserClaim_AspNetUser_Source"},{"name":"AspNetUserLogins","relationship":"Self.AspNetUserLogin_AspNetUser","fromRole":"AspNetUserLogin_AspNetUser_Target","toRole":"AspNetUserLogin_AspNetUser_Source"},{"name":"AspNetUserRoles","relationship":"Self.AspNetUser_AspNetUserRoles","fromRole":"AspNetUser_AspNetUserRoles_Source","toRole":"AspNetUser_AspNetUserRoles_Target"},{"name":"AspNetUsersInfoes","relationship":"Self.AspNetUsersInfo_AspNetUser","fromRole":"AspNetUsersInfo_AspNetUser_Target","toRole":"AspNetUsersInfo_AspNetUser_Source"}]},{"name":"AspNetUserClaim","customannotation:ClrType":"Merchandiser.AspNetUserClaim, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Int32","nullable":"false","annotation:StoreGeneratedPattern":"Identity"},{"name":"UserId","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ClaimType","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ClaimValue","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":{"name":"AspNetUser","relationship":"Self.AspNetUserClaim_AspNetUser","fromRole":"AspNetUserClaim_AspNetUser_Source","toRole":"AspNetUserClaim_AspNetUser_Target"}},{"name":"AspNetUserLogin","customannotation:ClrType":"Merchandiser.AspNetUserLogin, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"UserId"}},"property":[{"name":"UserId","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"LoginProvider","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ProviderKey","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":{"name":"AspNetUser","relationship":"Self.AspNetUserLogin_AspNetUser","fromRole":"AspNetUserLogin_AspNetUser_Source","toRole":"AspNetUserLogin_AspNetUser_Target"}},{"name":"AspNetUsersInfo","customannotation:ClrType":"Merchandiser.AspNetUsersInfo, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"UserId","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"FirstName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"LastName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":{"name":"AspNetUser","relationship":"Self.AspNetUsersInfo_AspNetUser","fromRole":"AspNetUsersInfo_AspNetUser_Source","toRole":"AspNetUsersInfo_AspNetUser_Target"}},{"name":"Customer","customannotation:ClrType":"Merchandiser.Customer, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"IsSendReport","type":"Edm.Boolean","nullable":"false"},{"name":"SendReport","type":"Edm.DateTime"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"AspNetUserRoles","relationship":"Self.Customer_AspNetUserRoles","fromRole":"Customer_AspNetUserRoles_Source","toRole":"Customer_AspNetUserRoles_Target"},{"name":"Company","relationship":"Self.Customer_Company","fromRole":"Customer_Company_Source","toRole":"Customer_Company_Target"},{"name":"SurveyCustomerLocations","relationship":"Self.SurveyCustomerLocation_Customer","fromRole":"SurveyCustomerLocation_Customer_Target","toRole":"SurveyCustomerLocation_Customer_Source"},{"name":"SurveyHeaders","relationship":"Self.SurveyHeader_Customer","fromRole":"SurveyHeader_Customer_Target","toRole":"SurveyHeader_Customer_Source"}]},{"name":"SurveyCustomerLocation","customannotation:ClrType":"Merchandiser.SurveyCustomerLocation, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyId","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid","nullable":"false"},{"name":"LocationId","type":"Edm.Guid","nullable":"false"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Company","relationship":"Self.SurveyCustomerLocation_Company","fromRole":"SurveyCustomerLocation_Company_Source","toRole":"SurveyCustomerLocation_Company_Target"},{"name":"Customer","relationship":"Self.SurveyCustomerLocation_Customer","fromRole":"SurveyCustomerLocation_Customer_Source","toRole":"SurveyCustomerLocation_Customer_Target"},{"name":"Location","relationship":"Self.Location_SurveyCustomerLocations","fromRole":"Location_SurveyCustomerLocations_Target","toRole":"Location_SurveyCustomerLocations_Source"},{"name":"Survey","relationship":"Self.Survey_SurveyCustomerLocations","fromRole":"Survey_SurveyCustomerLocations_Target","toRole":"Survey_SurveyCustomerLocations_Source"}]},{"name":"Location","customannotation:ClrType":"Merchandiser.Location, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Store","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Latitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Longitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Address","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"AreaManager","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Company","relationship":"Self.Location_Company","fromRole":"Location_Company_Source","toRole":"Location_Company_Target"},{"name":"SurveyCustomerLocations","relationship":"Self.Location_SurveyCustomerLocations","fromRole":"Location_SurveyCustomerLocations_Source","toRole":"Location_SurveyCustomerLocations_Target"},{"name":"SurveyHeaders","relationship":"Self.SurveyHeader_Location","fromRole":"SurveyHeader_Location_Target","toRole":"SurveyHeader_Location_Source"}]},{"name":"SurveyHeader","customannotation:ClrType":"Merchandiser.SurveyHeader, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyId","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid","nullable":"false"},{"name":"LocationId","type":"Edm.Guid","nullable":"false"},{"name":"Latitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Longitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Notes","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"IsBeforeImage","type":"Edm.Boolean","nullable":"false"},{"name":"IsAfterImage","type":"Edm.Boolean","nullable":"false"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Company","relationship":"Self.SurveyHeader_Company","fromRole":"SurveyHeader_Company_Source","toRole":"SurveyHeader_Company_Target"},{"name":"Customer","relationship":"Self.SurveyHeader_Customer","fromRole":"SurveyHeader_Customer_Source","toRole":"SurveyHeader_Customer_Target"},{"name":"Location","relationship":"Self.SurveyHeader_Location","fromRole":"SurveyHeader_Location_Source","toRole":"SurveyHeader_Location_Target"},{"name":"Survey","relationship":"Self.Survey_SurveyHeaders","fromRole":"Survey_SurveyHeaders_Target","toRole":"Survey_SurveyHeaders_Source"},{"name":"SurveyDetails","relationship":"Self.SurveyDetail_SurveyHeader","fromRole":"SurveyDetail_SurveyHeader_Target","toRole":"SurveyDetail_SurveyHeader_Source"}]},{"name":"Survey","customannotation:ClrType":"Merchandiser.Survey, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Company","relationship":"Self.Survey_Company","fromRole":"Survey_Company_Source","toRole":"Survey_Company_Target"},{"name":"SurveyCustomerLocations","relationship":"Self.Survey_SurveyCustomerLocations","fromRole":"Survey_SurveyCustomerLocations_Source","toRole":"Survey_SurveyCustomerLocations_Target"},{"name":"SurveyHeaders","relationship":"Self.Survey_SurveyHeaders","fromRole":"Survey_SurveyHeaders_Source","toRole":"Survey_SurveyHeaders_Target"},{"name":"SurveyProductQuestions","relationship":"Self.SurveyProductQuestion_Survey","fromRole":"SurveyProductQuestion_Survey_Target","toRole":"SurveyProductQuestion_Survey_Source"}]},{"name":"SurveyProductQuestion","customannotation:ClrType":"Merchandiser.SurveyProductQuestion, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyId","type":"Edm.Guid","nullable":"false"},{"name":"ProductId","type":"Edm.Guid","nullable":"false"},{"name":"QuestionId","type":"Edm.Guid","nullable":"false"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Company","relationship":"Self.SurveyProductQuestion_Company","fromRole":"SurveyProductQuestion_Company_Source","toRole":"SurveyProductQuestion_Company_Target"},{"name":"Product","relationship":"Self.Product_SurveyProductQuestions","fromRole":"Product_SurveyProductQuestions_Target","toRole":"Product_SurveyProductQuestions_Source"},{"name":"Question","relationship":"Self.Question_SurveyProductQuestions","fromRole":"Question_SurveyProductQuestions_Target","toRole":"Question_SurveyProductQuestions_Source"},{"name":"Survey","relationship":"Self.SurveyProductQuestion_Survey","fromRole":"SurveyProductQuestion_Survey_Source","toRole":"SurveyProductQuestion_Survey_Target"}]},{"name":"Product","customannotation:ClrType":"Merchandiser.Product, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"ProductCategoryId","type":"Edm.Guid"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Company","relationship":"Self.Product_Company","fromRole":"Product_Company_Source","toRole":"Product_Company_Target"},{"name":"ProductCategory","relationship":"Self.Product_ProductCategory","fromRole":"Product_ProductCategory_Source","toRole":"Product_ProductCategory_Target"},{"name":"SurveyDetails","relationship":"Self.SurveyDetail_Product","fromRole":"SurveyDetail_Product_Target","toRole":"SurveyDetail_Product_Source"},{"name":"SurveyProductQuestions","relationship":"Self.Product_SurveyProductQuestions","fromRole":"Product_SurveyProductQuestions_Source","toRole":"Product_SurveyProductQuestions_Target"}]},{"name":"SurveyDetail","customannotation:ClrType":"Merchandiser.SurveyDetail, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyHeaderId","type":"Edm.Guid","nullable":"false"},{"name":"ProductId","type":"Edm.Guid","nullable":"false"},{"name":"QuestionId","type":"Edm.Guid","nullable":"false"},{"name":"Answer","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Company","relationship":"Self.SurveyDetail_Company","fromRole":"SurveyDetail_Company_Source","toRole":"SurveyDetail_Company_Target"},{"name":"Product","relationship":"Self.SurveyDetail_Product","fromRole":"SurveyDetail_Product_Source","toRole":"SurveyDetail_Product_Target"},{"name":"Question","relationship":"Self.Question_SurveyDetails","fromRole":"Question_SurveyDetails_Target","toRole":"Question_SurveyDetails_Source"},{"name":"SurveyHeader","relationship":"Self.SurveyDetail_SurveyHeader","fromRole":"SurveyDetail_SurveyHeader_Source","toRole":"SurveyDetail_SurveyHeader_Target"}]},{"name":"Question","customannotation:ClrType":"Merchandiser.Question, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Company","relationship":"Self.Question_Company","fromRole":"Question_Company_Source","toRole":"Question_Company_Target"},{"name":"SurveyDetails","relationship":"Self.Question_SurveyDetails","fromRole":"Question_SurveyDetails_Source","toRole":"Question_SurveyDetails_Target"},{"name":"SurveyProductQuestions","relationship":"Self.Question_SurveyProductQuestions","fromRole":"Question_SurveyProductQuestions_Source","toRole":"Question_SurveyProductQuestions_Target"}]},{"name":"QuestionViewModel","customannotation:ClrType":"Merchandiser.Models.QuestionViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]},{"name":"UserRoleViewModel","customannotation:ClrType":"Merchandiser.Models.UserRoleViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"UserId","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true"},{"name":"RoleId","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid"}],"navigationProperty":[{"name":"Company","relationship":"Self.UserRoleViewModel_Company","fromRole":"UserRoleViewModel_Company_Source","toRole":"UserRoleViewModel_Company_Target"},{"name":"Customer","relationship":"Self.UserRoleViewModel_Customer","fromRole":"UserRoleViewModel_Customer_Source","toRole":"UserRoleViewModel_Customer_Target"},{"name":"Role","relationship":"Self.UserRoleViewModel_Role","fromRole":"UserRoleViewModel_Role_Source","toRole":"UserRoleViewModel_Role_Target"},{"name":"User","relationship":"Self.UserRoleViewModel_User","fromRole":"UserRoleViewModel_User_Source","toRole":"UserRoleViewModel_User_Target"}]},{"name":"UserViewModel","customannotation:ClrType":"Merchandiser.Models.UserViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"UserName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]}],"association":[{"name":"SurveyCustomerLocationViewModel_Customer","end":[{"role":"SurveyCustomerLocationViewModel_Customer_Source","type":"Edm.Self.SurveyCustomerLocationViewModel","multiplicity":"*"},{"role":"SurveyCustomerLocationViewModel_Customer_Target","type":"Edm.Self.CustomerViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocationViewModel_Customer_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocationViewModel_Customer_Source","propertyRef":{"name":"CustomerId"}}}},{"name":"SurveyCustomerLocationViewModel_Location","end":[{"role":"SurveyCustomerLocationViewModel_Location_Source","type":"Edm.Self.SurveyCustomerLocationViewModel","multiplicity":"*"},{"role":"SurveyCustomerLocationViewModel_Location_Target","type":"Edm.Self.LocationViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocationViewModel_Location_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocationViewModel_Location_Source","propertyRef":{"name":"LocationId"}}}},{"name":"SurveyCustomerLocationViewModel_Survey","end":[{"role":"SurveyCustomerLocationViewModel_Survey_Source","type":"Edm.Self.SurveyCustomerLocationViewModel","multiplicity":"*"},{"role":"SurveyCustomerLocationViewModel_Survey_Target","type":"Edm.Self.SurveyViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocationViewModel_Survey_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocationViewModel_Survey_Source","propertyRef":{"name":"SurveyId"}}}},{"name":"AspNetRole_AspNetUserRoles","end":[{"role":"AspNetRole_AspNetUserRoles_Source","type":"Edm.Self.AspNetRole","multiplicity":"0..1"},{"role":"AspNetRole_AspNetUserRoles_Target","type":"Edm.Self.AspNetUserRole","multiplicity":"*"}]},{"name":"AspNetUserClaim_AspNetUser","end":[{"role":"AspNetUserClaim_AspNetUser_Source","type":"Edm.Self.AspNetUserClaim","multiplicity":"*"},{"role":"AspNetUserClaim_AspNetUser_Target","type":"Edm.Self.AspNetUser","multiplicity":"0..1"}]},{"name":"AspNetUserLogin_AspNetUser","end":[{"role":"AspNetUserLogin_AspNetUser_Source","type":"Edm.Self.AspNetUserLogin","multiplicity":"*"},{"role":"AspNetUserLogin_AspNetUser_Target","type":"Edm.Self.AspNetUser","multiplicity":"0..1"}]},{"name":"AspNetUser_AspNetUserRoles","end":[{"role":"AspNetUser_AspNetUserRoles_Source","type":"Edm.Self.AspNetUser","multiplicity":"0..1"},{"role":"AspNetUser_AspNetUserRoles_Target","type":"Edm.Self.AspNetUserRole","multiplicity":"*"}]},{"name":"AspNetUsersInfo_AspNetUser","end":[{"role":"AspNetUsersInfo_AspNetUser_Source","type":"Edm.Self.AspNetUsersInfo","multiplicity":"*"},{"role":"AspNetUsersInfo_AspNetUser_Target","type":"Edm.Self.AspNetUser","multiplicity":"0..1"}]},{"name":"AspNetUserRole_Company","end":[{"role":"AspNetUserRole_Company_Source","type":"Edm.Self.AspNetUserRole","multiplicity":"*"},{"role":"AspNetUserRole_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"AspNetUserRole_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"AspNetUserRole_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"Customer_AspNetUserRoles","end":[{"role":"Customer_AspNetUserRoles_Source","type":"Edm.Self.Customer","multiplicity":"0..1"},{"role":"Customer_AspNetUserRoles_Target","type":"Edm.Self.AspNetUserRole","multiplicity":"*"}],"referentialConstraint":{"principal":{"role":"Customer_AspNetUserRoles_Source","propertyRef":{"name":"Id"}},"dependent":{"role":"Customer_AspNetUserRoles_Target","propertyRef":{"name":"CustomerId"}}}},{"name":"Customer_Company","end":[{"role":"Customer_Company_Source","type":"Edm.Self.Customer","multiplicity":"*"},{"role":"Customer_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"Customer_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"Customer_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"SurveyCustomerLocation_Company","end":[{"role":"SurveyCustomerLocation_Company_Source","type":"Edm.Self.SurveyCustomerLocation","multiplicity":"*"},{"role":"SurveyCustomerLocation_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocation_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocation_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"SurveyCustomerLocation_Customer","end":[{"role":"SurveyCustomerLocation_Customer_Source","type":"Edm.Self.SurveyCustomerLocation","multiplicity":"*"},{"role":"SurveyCustomerLocation_Customer_Target","type":"Edm.Self.Customer","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocation_Customer_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocation_Customer_Source","propertyRef":{"name":"CustomerId"}}}},{"name":"Location_Company","end":[{"role":"Location_Company_Source","type":"Edm.Self.Location","multiplicity":"*"},{"role":"Location_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"Location_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"Location_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"Location_SurveyCustomerLocations","end":[{"role":"Location_SurveyCustomerLocations_Source","type":"Edm.Self.Location","multiplicity":"1","onDelete":{"action":"Cascade"}},{"role":"Location_SurveyCustomerLocations_Target","type":"Edm.Self.SurveyCustomerLocation","multiplicity":"*"}],"referentialConstraint":{"principal":{"role":"Location_SurveyCustomerLocations_Source","propertyRef":{"name":"Id"}},"dependent":{"role":"Location_SurveyCustomerLocations_Target","propertyRef":{"name":"LocationId"}}}},{"name":"SurveyHeader_Company","end":[{"role":"SurveyHeader_Company_Source","type":"Edm.Self.SurveyHeader","multiplicity":"*"},{"role":"SurveyHeader_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyHeader_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyHeader_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"SurveyHeader_Customer","end":[{"role":"SurveyHeader_Customer_Source","type":"Edm.Self.SurveyHeader","multiplicity":"*"},{"role":"SurveyHeader_Customer_Target","type":"Edm.Self.Customer","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyHeader_Customer_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyHeader_Customer_Source","propertyRef":{"name":"CustomerId"}}}},{"name":"SurveyHeader_Location","end":[{"role":"SurveyHeader_Location_Source","type":"Edm.Self.SurveyHeader","multiplicity":"*"},{"role":"SurveyHeader_Location_Target","type":"Edm.Self.Location","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyHeader_Location_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyHeader_Location_Source","propertyRef":{"name":"LocationId"}}}},{"name":"Survey_Company","end":[{"role":"Survey_Company_Source","type":"Edm.Self.Survey","multiplicity":"*"},{"role":"Survey_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"Survey_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"Survey_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"Survey_SurveyCustomerLocations","end":[{"role":"Survey_SurveyCustomerLocations_Source","type":"Edm.Self.Survey","multiplicity":"1","onDelete":{"action":"Cascade"}},{"role":"Survey_SurveyCustomerLocations_Target","type":"Edm.Self.SurveyCustomerLocation","multiplicity":"*"}],"referentialConstraint":{"principal":{"role":"Survey_SurveyCustomerLocations_Source","propertyRef":{"name":"Id"}},"dependent":{"role":"Survey_SurveyCustomerLocations_Target","propertyRef":{"name":"SurveyId"}}}},{"name":"Survey_SurveyHeaders","end":[{"role":"Survey_SurveyHeaders_Source","type":"Edm.Self.Survey","multiplicity":"1","onDelete":{"action":"Cascade"}},{"role":"Survey_SurveyHeaders_Target","type":"Edm.Self.SurveyHeader","multiplicity":"*"}],"referentialConstraint":{"principal":{"role":"Survey_SurveyHeaders_Source","propertyRef":{"name":"Id"}},"dependent":{"role":"Survey_SurveyHeaders_Target","propertyRef":{"name":"SurveyId"}}}},{"name":"SurveyProductQuestion_Company","end":[{"role":"SurveyProductQuestion_Company_Source","type":"Edm.Self.SurveyProductQuestion","multiplicity":"*"},{"role":"SurveyProductQuestion_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyProductQuestion_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyProductQuestion_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"Product_Company","end":[{"role":"Product_Company_Source","type":"Edm.Self.Product","multiplicity":"*"},{"role":"Product_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"Product_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"Product_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"Product_ProductCategory","end":[{"role":"Product_ProductCategory_Source","type":"Edm.Self.Product","multiplicity":"*"},{"role":"Product_ProductCategory_Target","type":"Edm.Self.ProductCategory","multiplicity":"0..1"}],"referentialConstraint":{"principal":{"role":"Product_ProductCategory_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"Product_ProductCategory_Source","propertyRef":{"name":"ProductCategoryId"}}}},{"name":"SurveyDetail_Company","end":[{"role":"SurveyDetail_Company_Source","type":"Edm.Self.SurveyDetail","multiplicity":"*"},{"role":"SurveyDetail_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyDetail_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyDetail_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"SurveyDetail_Product","end":[{"role":"SurveyDetail_Product_Source","type":"Edm.Self.SurveyDetail","multiplicity":"*"},{"role":"SurveyDetail_Product_Target","type":"Edm.Self.Product","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyDetail_Product_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyDetail_Product_Source","propertyRef":{"name":"ProductId"}}}},{"name":"Question_Company","end":[{"role":"Question_Company_Source","type":"Edm.Self.Question","multiplicity":"*"},{"role":"Question_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"Question_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"Question_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"Question_SurveyDetails","end":[{"role":"Question_SurveyDetails_Source","type":"Edm.Self.Question","multiplicity":"1","onDelete":{"action":"Cascade"}},{"role":"Question_SurveyDetails_Target","type":"Edm.Self.SurveyDetail","multiplicity":"*"}],"referentialConstraint":{"principal":{"role":"Question_SurveyDetails_Source","propertyRef":{"name":"Id"}},"dependent":{"role":"Question_SurveyDetails_Target","propertyRef":{"name":"QuestionId"}}}},{"name":"Question_SurveyProductQuestions","end":[{"role":"Question_SurveyProductQuestions_Source","type":"Edm.Self.Question","multiplicity":"1","onDelete":{"action":"Cascade"}},{"role":"Question_SurveyProductQuestions_Target","type":"Edm.Self.SurveyProductQuestion","multiplicity":"*"}],"referentialConstraint":{"principal":{"role":"Question_SurveyProductQuestions_Source","propertyRef":{"name":"Id"}},"dependent":{"role":"Question_SurveyProductQuestions_Target","propertyRef":{"name":"QuestionId"}}}},{"name":"SurveyDetail_SurveyHeader","end":[{"role":"SurveyDetail_SurveyHeader_Source","type":"Edm.Self.SurveyDetail","multiplicity":"*"},{"role":"SurveyDetail_SurveyHeader_Target","type":"Edm.Self.SurveyHeader","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyDetail_SurveyHeader_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyDetail_SurveyHeader_Source","propertyRef":{"name":"SurveyHeaderId"}}}},{"name":"Product_SurveyProductQuestions","end":[{"role":"Product_SurveyProductQuestions_Source","type":"Edm.Self.Product","multiplicity":"1","onDelete":{"action":"Cascade"}},{"role":"Product_SurveyProductQuestions_Target","type":"Edm.Self.SurveyProductQuestion","multiplicity":"*"}],"referentialConstraint":{"principal":{"role":"Product_SurveyProductQuestions_Source","propertyRef":{"name":"Id"}},"dependent":{"role":"Product_SurveyProductQuestions_Target","propertyRef":{"name":"ProductId"}}}},{"name":"SurveyProductQuestion_Survey","end":[{"role":"SurveyProductQuestion_Survey_Source","type":"Edm.Self.SurveyProductQuestion","multiplicity":"*"},{"role":"SurveyProductQuestion_Survey_Target","type":"Edm.Self.Survey","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyProductQuestion_Survey_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyProductQuestion_Survey_Source","propertyRef":{"name":"SurveyId"}}}},{"name":"Company_ProductCategories","end":[{"role":"Company_ProductCategories_Source","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}},{"role":"Company_ProductCategories_Target","type":"Edm.Self.ProductCategory","multiplicity":"*"}],"referentialConstraint":{"principal":{"role":"Company_ProductCategories_Source","propertyRef":{"name":"Id"}},"dependent":{"role":"Company_ProductCategories_Target","propertyRef":{"name":"CompanyId"}}}},{"name":"ProductViewModel_ProductCategory","end":[{"role":"ProductViewModel_ProductCategory_Source","type":"Edm.Self.ProductViewModel","multiplicity":"*"},{"role":"ProductViewModel_ProductCategory_Target","type":"Edm.Self.ProductCategory","multiplicity":"0..1"}],"referentialConstraint":{"principal":{"role":"ProductViewModel_ProductCategory_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"ProductViewModel_ProductCategory_Source","propertyRef":{"name":"ProductCategoryId"}}}},{"name":"SurveyProductQuestionViewModel_Product","end":[{"role":"SurveyProductQuestionViewModel_Product_Source","type":"Edm.Self.SurveyProductQuestionViewModel","multiplicity":"*"},{"role":"SurveyProductQuestionViewModel_Product_Target","type":"Edm.Self.ProductViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyProductQuestionViewModel_Product_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyProductQuestionViewModel_Product_Source","propertyRef":{"name":"ProductId"}}}},{"name":"SurveyProductQuestionViewModel_Question","end":[{"role":"SurveyProductQuestionViewModel_Question_Source","type":"Edm.Self.SurveyProductQuestionViewModel","multiplicity":"*"},{"role":"SurveyProductQuestionViewModel_Question_Target","type":"Edm.Self.QuestionViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyProductQuestionViewModel_Question_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyProductQuestionViewModel_Question_Source","propertyRef":{"name":"QuestionId"}}}},{"name":"UserRoleViewModel_Company","end":[{"role":"UserRoleViewModel_Company_Source","type":"Edm.Self.UserRoleViewModel","multiplicity":"*"},{"role":"UserRoleViewModel_Company_Target","type":"Edm.Self.CompanyViewModel","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"UserRoleViewModel_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"UserRoleViewModel_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"UserRoleViewModel_Customer","end":[{"role":"UserRoleViewModel_Customer_Source","type":"Edm.Self.UserRoleViewModel","multiplicity":"*"},{"role":"UserRoleViewModel_Customer_Target","type":"Edm.Self.CustomerViewModel","multiplicity":"0..1"}],"referentialConstraint":{"principal":{"role":"UserRoleViewModel_Customer_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"UserRoleViewModel_Customer_Source","propertyRef":{"name":"CustomerId"}}}},{"name":"UserRoleViewModel_Role","end":[{"role":"UserRoleViewModel_Role_Source","type":"Edm.Self.UserRoleViewModel","multiplicity":"*"},{"role":"UserRoleViewModel_Role_Target","type":"Edm.Self.RoleViewModel","multiplicity":"0..1"}],"referentialConstraint":{"principal":{"role":"UserRoleViewModel_Role_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"UserRoleViewModel_Role_Source","propertyRef":{"name":"RoleId"}}}},{"name":"UserRoleViewModel_User","end":[{"role":"UserRoleViewModel_User_Source","type":"Edm.Self.UserRoleViewModel","multiplicity":"*"},{"role":"UserRoleViewModel_User_Target","type":"Edm.Self.UserViewModel","multiplicity":"0..1"}],"referentialConstraint":{"principal":{"role":"UserRoleViewModel_User_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"UserRoleViewModel_User_Source","propertyRef":{"name":"UserId"}}}}],"entityContainer":{"name":"DatabaseContext","customannotation:UseClrTypes":"true","entitySet":[{"name":"CompanyViewModel","entityType":"Self.CompanyViewModel"},{"name":"CustomerViewModel","entityType":"Self.CustomerViewModel"},{"name":"MapViewModel","entityType":"Self.MapViewModel"},{"name":"ProductCategoryViewModel","entityType":"Self.ProductCategoryViewModel"},{"name":"RoleViewModel","entityType":"Self.RoleViewModel"},{"name":"SurveyCustomerLocationViewModel","entityType":"Self.SurveyCustomerLocationViewModel"},{"name":"LocationViewModels","entityType":"Self.LocationViewModel"},{"name":"SurveyViewModels","entityType":"Self.SurveyViewModel"},{"name":"SurveyProductQuestionViewModel","entityType":"Self.SurveyProductQuestionViewModel"},{"name":"ProductViewModels","entityType":"Self.ProductViewModel"},{"name":"ProductCategories","entityType":"Self.ProductCategory"},{"name":"Companies","entityType":"Self.Company"},{"name":"AspNetUserRoles","entityType":"Self.AspNetUserRole"},{"name":"AspNetRoles","entityType":"Self.AspNetRole"},{"name":"AspNetUsers","entityType":"Self.AspNetUser"},{"name":"AspNetUserClaims","entityType":"Self.AspNetUserClaim"},{"name":"AspNetUserLogins","entityType":"Self.AspNetUserLogin"},{"name":"AspNetUsersInfoes","entityType":"Self.AspNetUsersInfo"},{"name":"Customers","entityType":"Self.Customer"},{"name":"SurveyCustomerLocations","entityType":"Self.SurveyCustomerLocation"},{"name":"Locations","entityType":"Self.Location"},{"name":"SurveyHeaders","entityType":"Self.SurveyHeader"},{"name":"Surveys","entityType":"Self.Survey"},{"name":"SurveyProductQuestions","entityType":"Self.SurveyProductQuestion"},{"name":"Products","entityType":"Self.Product"},{"name":"SurveyDetails","entityType":"Self.SurveyDetail"},{"name":"Questions","entityType":"Self.Question"},{"name":"QuestionViewModels","entityType":"Self.QuestionViewModel"},{"name":"UserRoleViewModel","entityType":"Self.UserRoleViewModel"},{"name":"UserViewModels","entityType":"Self.UserViewModel"}],"associationSet":[{"name":"SurveyCustomerLocationViewModel_Customer","association":"Self.SurveyCustomerLocationViewModel_Customer","end":[{"role":"SurveyCustomerLocationViewModel_Customer_Source","entitySet":"SurveyCustomerLocationViewModel"},{"role":"SurveyCustomerLocationViewModel_Customer_Target","entitySet":"CustomerViewModel"}]},{"name":"SurveyCustomerLocationViewModel_Location","association":"Self.SurveyCustomerLocationViewModel_Location","end":[{"role":"SurveyCustomerLocationViewModel_Location_Source","entitySet":"SurveyCustomerLocationViewModel"},{"role":"SurveyCustomerLocationViewModel_Location_Target","entitySet":"LocationViewModels"}]},{"name":"SurveyCustomerLocationViewModel_Survey","association":"Self.SurveyCustomerLocationViewModel_Survey","end":[{"role":"SurveyCustomerLocationViewModel_Survey_Source","entitySet":"SurveyCustomerLocationViewModel"},{"role":"SurveyCustomerLocationViewModel_Survey_Target","entitySet":"SurveyViewModels"}]},{"name":"AspNetRole_AspNetUserRoles","association":"Self.AspNetRole_AspNetUserRoles","end":[{"role":"AspNetRole_AspNetUserRoles_Source","entitySet":"AspNetRoles"},{"role":"AspNetRole_AspNetUserRoles_Target","entitySet":"AspNetUserRoles"}]},{"name":"AspNetUserClaim_AspNetUser","association":"Self.AspNetUserClaim_AspNetUser","end":[{"role":"AspNetUserClaim_AspNetUser_Source","entitySet":"AspNetUserClaims"},{"role":"AspNetUserClaim_AspNetUser_Target","entitySet":"AspNetUsers"}]},{"name":"AspNetUserLogin_AspNetUser","association":"Self.AspNetUserLogin_AspNetUser","end":[{"role":"AspNetUserLogin_AspNetUser_Source","entitySet":"AspNetUserLogins"},{"role":"AspNetUserLogin_AspNetUser_Target","entitySet":"AspNetUsers"}]},{"name":"AspNetUser_AspNetUserRoles","association":"Self.AspNetUser_AspNetUserRoles","end":[{"role":"AspNetUser_AspNetUserRoles_Source","entitySet":"AspNetUsers"},{"role":"AspNetUser_AspNetUserRoles_Target","entitySet":"AspNetUserRoles"}]},{"name":"AspNetUsersInfo_AspNetUser","association":"Self.AspNetUsersInfo_AspNetUser","end":[{"role":"AspNetUsersInfo_AspNetUser_Source","entitySet":"AspNetUsersInfoes"},{"role":"AspNetUsersInfo_AspNetUser_Target","entitySet":"AspNetUsers"}]},{"name":"AspNetUserRole_Company","association":"Self.AspNetUserRole_Company","end":[{"role":"AspNetUserRole_Company_Source","entitySet":"AspNetUserRoles"},{"role":"AspNetUserRole_Company_Target","entitySet":"Companies"}]},{"name":"Customer_AspNetUserRoles","association":"Self.Customer_AspNetUserRoles","end":[{"role":"Customer_AspNetUserRoles_Source","entitySet":"Customers"},{"role":"Customer_AspNetUserRoles_Target","entitySet":"AspNetUserRoles"}]},{"name":"Customer_Company","association":"Self.Customer_Company","end":[{"role":"Customer_Company_Source","entitySet":"Customers"},{"role":"Customer_Company_Target","entitySet":"Companies"}]},{"name":"SurveyCustomerLocation_Company","association":"Self.SurveyCustomerLocation_Company","end":[{"role":"SurveyCustomerLocation_Company_Source","entitySet":"SurveyCustomerLocations"},{"role":"SurveyCustomerLocation_Company_Target","entitySet":"Companies"}]},{"name":"SurveyCustomerLocation_Customer","association":"Self.SurveyCustomerLocation_Customer","end":[{"role":"SurveyCustomerLocation_Customer_Source","entitySet":"SurveyCustomerLocations"},{"role":"SurveyCustomerLocation_Customer_Target","entitySet":"Customers"}]},{"name":"Location_Company","association":"Self.Location_Company","end":[{"role":"Location_Company_Source","entitySet":"Locations"},{"role":"Location_Company_Target","entitySet":"Companies"}]},{"name":"Location_SurveyCustomerLocations","association":"Self.Location_SurveyCustomerLocations","end":[{"role":"Location_SurveyCustomerLocations_Source","entitySet":"Locations"},{"role":"Location_SurveyCustomerLocations_Target","entitySet":"SurveyCustomerLocations"}]},{"name":"SurveyHeader_Company","association":"Self.SurveyHeader_Company","end":[{"role":"SurveyHeader_Company_Source","entitySet":"SurveyHeaders"},{"role":"SurveyHeader_Company_Target","entitySet":"Companies"}]},{"name":"SurveyHeader_Customer","association":"Self.SurveyHeader_Customer","end":[{"role":"SurveyHeader_Customer_Source","entitySet":"SurveyHeaders"},{"role":"SurveyHeader_Customer_Target","entitySet":"Customers"}]},{"name":"SurveyHeader_Location","association":"Self.SurveyHeader_Location","end":[{"role":"SurveyHeader_Location_Source","entitySet":"SurveyHeaders"},{"role":"SurveyHeader_Location_Target","entitySet":"Locations"}]},{"name":"Survey_Company","association":"Self.Survey_Company","end":[{"role":"Survey_Company_Source","entitySet":"Surveys"},{"role":"Survey_Company_Target","entitySet":"Companies"}]},{"name":"Survey_SurveyCustomerLocations","association":"Self.Survey_SurveyCustomerLocations","end":[{"role":"Survey_SurveyCustomerLocations_Source","entitySet":"Surveys"},{"role":"Survey_SurveyCustomerLocations_Target","entitySet":"SurveyCustomerLocations"}]},{"name":"Survey_SurveyHeaders","association":"Self.Survey_SurveyHeaders","end":[{"role":"Survey_SurveyHeaders_Source","entitySet":"Surveys"},{"role":"Survey_SurveyHeaders_Target","entitySet":"SurveyHeaders"}]},{"name":"SurveyProductQuestion_Company","association":"Self.SurveyProductQuestion_Company","end":[{"role":"SurveyProductQuestion_Company_Source","entitySet":"SurveyProductQuestions"},{"role":"SurveyProductQuestion_Company_Target","entitySet":"Companies"}]},{"name":"Product_Company","association":"Self.Product_Company","end":[{"role":"Product_Company_Source","entitySet":"Products"},{"role":"Product_Company_Target","entitySet":"Companies"}]},{"name":"Product_ProductCategory","association":"Self.Product_ProductCategory","end":[{"role":"Product_ProductCategory_Source","entitySet":"Products"},{"role":"Product_ProductCategory_Target","entitySet":"ProductCategories"}]},{"name":"SurveyDetail_Company","association":"Self.SurveyDetail_Company","end":[{"role":"SurveyDetail_Company_Source","entitySet":"SurveyDetails"},{"role":"SurveyDetail_Company_Target","entitySet":"Companies"}]},{"name":"SurveyDetail_Product","association":"Self.SurveyDetail_Product","end":[{"role":"SurveyDetail_Product_Source","entitySet":"SurveyDetails"},{"role":"SurveyDetail_Product_Target","entitySet":"Products"}]},{"name":"Question_Company","association":"Self.Question_Company","end":[{"role":"Question_Company_Source","entitySet":"Questions"},{"role":"Question_Company_Target","entitySet":"Companies"}]},{"name":"Question_SurveyDetails","association":"Self.Question_SurveyDetails","end":[{"role":"Question_SurveyDetails_Source","entitySet":"Questions"},{"role":"Question_SurveyDetails_Target","entitySet":"SurveyDetails"}]},{"name":"Question_SurveyProductQuestions","association":"Self.Question_SurveyProductQuestions","end":[{"role":"Question_SurveyProductQuestions_Source","entitySet":"Questions"},{"role":"Question_SurveyProductQuestions_Target","entitySet":"SurveyProductQuestions"}]},{"name":"SurveyDetail_SurveyHeader","association":"Self.SurveyDetail_SurveyHeader","end":[{"role":"SurveyDetail_SurveyHeader_Source","entitySet":"SurveyDetails"},{"role":"SurveyDetail_SurveyHeader_Target","entitySet":"SurveyHeaders"}]},{"name":"Product_SurveyProductQuestions","association":"Self.Product_SurveyProductQuestions","end":[{"role":"Product_SurveyProductQuestions_Source","entitySet":"Products"},{"role":"Product_SurveyProductQuestions_Target","entitySet":"SurveyProductQuestions"}]},{"name":"SurveyProductQuestion_Survey","association":"Self.SurveyProductQuestion_Survey","end":[{"role":"SurveyProductQuestion_Survey_Source","entitySet":"SurveyProductQuestions"},{"role":"SurveyProductQuestion_Survey_Target","entitySet":"Surveys"}]},{"name":"Company_ProductCategories","association":"Self.Company_ProductCategories","end":[{"role":"Company_ProductCategories_Source","entitySet":"Companies"},{"role":"Company_ProductCategories_Target","entitySet":"ProductCategories"}]},{"name":"ProductViewModel_ProductCategory","association":"Self.ProductViewModel_ProductCategory","end":[{"role":"ProductViewModel_ProductCategory_Source","entitySet":"ProductViewModels"},{"role":"ProductViewModel_ProductCategory_Target","entitySet":"ProductCategories"}]},{"name":"SurveyProductQuestionViewModel_Product","association":"Self.SurveyProductQuestionViewModel_Product","end":[{"role":"SurveyProductQuestionViewModel_Product_Source","entitySet":"SurveyProductQuestionViewModel"},{"role":"SurveyProductQuestionViewModel_Product_Target","entitySet":"ProductViewModels"}]},{"name":"SurveyProductQuestionViewModel_Question","association":"Self.SurveyProductQuestionViewModel_Question","end":[{"role":"SurveyProductQuestionViewModel_Question_Source","entitySet":"SurveyProductQuestionViewModel"},{"role":"SurveyProductQuestionViewModel_Question_Target","entitySet":"QuestionViewModels"}]},{"name":"UserRoleViewModel_Company","association":"Self.UserRoleViewModel_Company","end":[{"role":"UserRoleViewModel_Company_Source","entitySet":"UserRoleViewModel"},{"role":"UserRoleViewModel_Company_Target","entitySet":"CompanyViewModel"}]},{"name":"UserRoleViewModel_Customer","association":"Self.UserRoleViewModel_Customer","end":[{"role":"UserRoleViewModel_Customer_Source","entitySet":"UserRoleViewModel"},{"role":"UserRoleViewModel_Customer_Target","entitySet":"CustomerViewModel"}]},{"name":"UserRoleViewModel_Role","association":"Self.UserRoleViewModel_Role","end":[{"role":"UserRoleViewModel_Role_Source","entitySet":"UserRoleViewModel"},{"role":"UserRoleViewModel_Role_Target","entitySet":"RoleViewModel"}]},{"name":"UserRoleViewModel_User","association":"Self.UserRoleViewModel_User","end":[{"role":"UserRoleViewModel_User_Source","entitySet":"UserRoleViewModel"},{"role":"UserRoleViewModel_User_Target","entitySet":"UserViewModels"}]}]}}}
);

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
                if (response.statusText.length > 0) {
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
                if (response.statusText.length > 0) {
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

            this.Get = function (id) {
                var deferred = $q.defer();

                $http({
                    method: 'Get',
                    url: '/breeze/MapApi/Get/' + id,
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
                if (response.statusText.length > 0) {
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
                if (response.statusText.length > 0) {
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

            $http.delete('/breeze/ProductCategoryApi/Delete/' + id)
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
                if (response.statusText.length > 0) {
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
                if (response.statusText.length > 0) {
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
                if (response.statusText.length > 0) {
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
                    if (response.statusText.length > 0) {
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
var app = angular.module('Main', ['ngRoute', 'ngResource', 'ngSanitize', 'ngAnimate',
    'ui.grid', 'ui.grid.infiniteScroll', 'ui.bootstrap', /*'ngTouch',*/ 'ui.router', 'ngMap', 'ui.grid.exporter', 'blockUI', 
    'breeze.angular', 'ngAria', 'ngMessages', 'ngMaterial', 'focus-if', 'mgcrea.bootstrap.affix', 'Directives', 'DatabaseServices', 'ApplicationServices']);
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
                $state.go('main.merchandise', {
                    redirectState: 'main.survey'
                });
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
                $state.go('main.merchandise', {
                    redirectState: 'main.report.surveyreport'
                });
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
                if (state == "main.admin.surveycustomerlocation.addedit" || state == "main.admin.surveyproductquestion.addedit") {
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
                { field: 'Name', name: 'Customer Name', cellTooltip: true }
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
            debugger;
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
                { field: 'Name', name: 'Customer Name', cellTooltip: true }
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
                { field: 'Name', name: 'Customer Name', cellTooltip: true },
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
                { field: 'Name', name: 'Customer Name', cellTooltip: true },
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
            url: "/addedit",
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
                { field: 'Name', name: 'Product Category Name', cellTooltip: true }
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
    angular.module('Main').controller('SurveyProductQuestionAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyProductQuestionService',
        'ProductService','QuestionService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyProductQuestionService,
        ProductService, QuestionService, SelectionApplicationService) {

        $scope.Init = function(){
            $scope.item = { Id: null }
            $scope.focus = true;
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
                SurveyProductQuestionService.Create($scope.item).then(function (data) {
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
    angular.module('Main').controller('SurveyProductQuestionController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyProductQuestionService',
        'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyProductQuestionService,
        SelectionApplicationService) {
        $scope.Search = function () {
            var predicate = { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } }
            SurveyProductQuestionService.Search(predicate, ["Created asc"], 0, 100, false).then(function (data) {
                $scope.gridOptions.data = data;
            });
        }
        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            data: [],
            columnDefs: [
                { name: 'Manage', width: '120', cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html' },
                { field: 'Product.Name', name: 'Product Name', cellTooltip: true },
                { field: 'Question.Name', name: 'Question Name', cellTooltip: true }
            ]
        };
        $scope.Search();

        $scope.Edit = function (row) {
            $state.go('main.admin.surveyproductquestion.addedit', { id: row.Id }, { reload: false });
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
                    debugger;
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
                    debugger;
                    $scope.$parent.gridOptions.data.splice(0, 0, data.data);
                    $scope.Init();
                }, function (error) {
                    toastr.error(error.data, error.statusText);
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
                $scope.Company = data;
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
                $scope.Customer = data;
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
        'RoleService', 'SurveyCustomerLocationService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, UserRoleService,
        RoleService, SurveyCustomerLocationService, SelectionApplicationService) {
        
        $scope.Search = function () {
            var predicate = { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } };

            var predicate = {
                and: [
                   { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } },
                   { "Latitude": { '>=': $scope.Latitude - .145 } },
                   { "Latitude": { '<=': $scope.Latitude + .145 } },
                   { "Longitude": { '>=': $scope.Longitude - .145 } },
                   { "Longitude": { '<=': $scope.Longitude + .145 } }
                ]
            }
            LocationService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                $scope.Location = data;
            });
        }
        navigator.geolocation.getCurrentPosition(function (position) {
            $scope.Latitude = position.coords.latitude;
            $scope.Longitude = position.coords.longitude;
            $scope.Search();
        });

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
        'UserService', 'SurveyCustomerLocationService', 'SurveyProductQuestionService', 'SurveyHeaderService', 'SurveyDetailService', 'ImageService',
        'SelectionApplicationService',
    function controller($scope, $q, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService,
        UserService, SurveyCustomerLocationService, SurveyProductQuestionService, SurveyHeaderService, SurveyDetailService, ImageService, SelectionApplicationService) {
        
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
                    $scope.Header = data[0];
                })
                var predicate = { "SurveyHeaderId": { "==": SelectionApplicationService.GetSurveyHeaderId() } };
                SurveyDetailService.Search(predicate, ["Created desc"], 0, 100, false).then(function (data) {
                    $scope.Detail = data;
                });
                $scope.BeforeImage = "/api/v1/ImageApi/GetBeforeImage/" + SelectionApplicationService.GetSurveyHeaderId();
                $scope.AfterImage = "/api/v1/ImageApi/GetAfterImage/" + SelectionApplicationService.GetSurveyHeaderId();
            }
            else {
                var predicate = { "SurveyId": { "==": SelectionApplicationService.GetSurveyId() } };
                SurveyProductQuestionService.Search(predicate, ["Created desc"], 0, 100, false).then(function (data) {
                    $scope.Detail = data;
                });
            }
        }
        $scope.Search();

        $scope.setBeforeImage = function (element) {
            var reader = new FileReader();
            $scope.Header.IsBeforeImage = true;
            $scope.Header.BeforeImage = element.files[0];
            reader.onload = function (event) {
                $scope.BeforeImage = event.target.result;
                $scope.$apply();
            }
            reader.readAsDataURL(element.files[0]);
        }

        $scope.sort = {
            column: ['Product.Name', 'Product.Name'],
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

        $scope.setAfterImage = function (element) {
            var reader = new FileReader();
            $scope.Header.IsAfterImage = true;
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
        'RoleService', 'SurveyCustomerLocationService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, UserRoleService,
        RoleService, SurveyCustomerLocationService, SelectionApplicationService) {
        
        $scope.Search = function () {
            var predicate = {
                and: [
                   { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } },
                   { "CustomerId": { '==': SelectionApplicationService.GetCustomerId() } },
                   { "LocationId": { "==": SelectionApplicationService.GetLocationId() } }
                ]
            }
            SurveyCustomerLocationService.Search(predicate, ["Created asc"], 0, 100, false).then(function (data) {
                $scope.Survey = data;
            });
        }
        $scope.Search();

        $scope.Select = function (item) {
            SelectionApplicationService.SetSurvey(item.Survey);
            SelectionApplicationService.SetSurveyId(item.Survey.Id);
            $state.go(SelectionApplicationService.GetRedirectState());
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
        'LocationService', 'CustomerService', 'SurveyService', 'MapService', 'ImageService', 'DownloadService',
    function controller($scope, $q, $state, $stateParams, $http, $location, $uibModal,
        $timeout, breezeservice, breeze, ReportService, SurveyHeaderService, SelectionApplicationService, UserService,
        LocationService, CustomerService, SurveyService, MapService, ImageService, DownloadService) {
        if (SelectionApplicationService.GetCompanyId() == null) {
            $state.go('main.merchandise', {
                redirectState: 'main.report.surveyreport'
            });
        }

        $scope.StartDate = new Date(moment().format("YYYY"), moment().format("MM") - 1, moment().startOf('isoWeek').format("DD"));
        $scope.EndDate = new Date(moment().format("YYYY"), moment().format("MM") - 1, moment().add(2, "days").format("DD"));
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
            ReportService.Search(SelectionApplicationService.GetCompanyId(), null, SelectionApplicationService.GetCustomerId(),
                SelectionApplicationService.GetLocationId(), null, SelectionApplicationService.GetSurveyId(), null,
                moment($scope.StartDate).format('YYYY-MM-DD'), moment($scope.EndDate).format('YYYY-MM-DD'),
                $scope.Page, $scope.PageSize).then(function (data) {                    
                    $scope.data = data;
                    UserService.IsAdministrator(SelectionApplicationService.GetCompanyId()).then(function (data) {
                        if (data == true) {
                            $scope.gridOptions.columnDefs.splice(0, 0, {
                                name: 'Manage', width: 125, cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html'
                            });
                        }
                        else {
                            return UserService.IsDataEntry(SelectionApplicationService.GetCompanyId())
                        }
                    }).then(function (data) {
                        if (data == true) {
                            $scope.gridOptions.columnDefs.splice(0, 0, {
                                name: 'Manage', width: 125, cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html'
                            });
                        }
                    });
                    $scope.gridOptions.columnDefs.splice(1, 0, {
                        name: 'Before', width: 75, cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/BeforeImage.html'
                    });
                    $scope.gridOptions.columnDefs.splice(2, 0, {
                        name: 'After', width: 75, cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/AfterImage.html'
                    });
                    $scope.gridOptions.columnDefs.splice(3, 0, {
                        name: 'Notes', width: 75, cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/Notes.html'
                    });
                    $scope.gridOptions.columnDefs.push({
                        field: 'CustomerName', name: 'Customer Name', cellTooltip: true
                    });
                    $scope.gridOptions.columnDefs.push({
                        field: 'LocationName', name: 'Location Name', cellTooltip: true
                    });
                    $scope.gridOptions.columnDefs.push({
                        field: 'SurveyName', name: 'Survey Name', cellTooltip: true
                    });
                    $scope.gridOptions.columnDefs.push({
                        field: 'ProductName', name: 'Product Name', cellTooltip: true
                    });
                    var exclude = ['IsBeforeImage', 'IsAfterImage', 'Created'],
                        length = exclude.length;
                    var keys = []
                    var obj = $scope.data[0];
                    for (var key in obj) {
                        keys.push(key)
                        if ((!key.includes("Id") && !key.includes("Name") && !exclude.includes(key))) {
                            $scope.gridOptions.columnDefs.push({
                                name: key, cellTooltip: true
                            });
                        }
                    }
                    $scope.gridOptions.columnDefs.push({
                        name: 'Created', cellTooltip: true, cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">{{row.entity.Created | date: "MM/dd/yyyy h:mm:ss a": "UTC"}}</div>'
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
                    //$scope.gridApi.infiniteScroll.dataLoaded(false, $scope.isMoreData());
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
            MapService.Get(id).then(function (data) {
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
        .state('main.report.weeklyreport', {
            url: "/weeklyreport",
            templateUrl: "ApplicationComponents/Reporting/Weekly/WeeklyReport.html"
        })
    });
    angular.module('Main').controller('WeeklyReportController', ['$scope', '$state', '$stateParams', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'ReportService', 'SurveyHeaderService', 'SelectionApplicationService', 'UserService', 'LocationService',
    function controller($scope, $state, $stateParams, $http, $location,
        $timeout, breezeservice, breeze, ReportService, SurveyHeaderService, SelectionApplicationService, UserService, LocationService) {
        if (SelectionApplicationService.GetCompanyId() == null) {
            $state.go('main.merchandise', {
                redirectState: 'main.report.surveyreport'
            });
        }
        $scope.StartDate = moment().startOf('isoWeek').format("YYYY-MM-DD");
        $scope.EndDate = moment().add(1, "days").format("YYYY-MM-DD");

        $scope.Search = function () {
            ReportService.Search(SelectionApplicationService.GetCompanyId(), null, SelectionApplicationService.GetCustomerId(), SelectionApplicationService.GetLocationId(), null, SelectionApplicationService.GetSurveyId(), null, $scope.StartDate, $scope.EndDate, 0, 10000).then(function (data) {
                $scope.gridOptions.data = data;
                UserService.IsAdministrator(SelectionApplicationService.GetCompanyId()).then(function (data) {
                    if (data == true) {
                        $scope.gridOptions.columnDefs.splice(0, 0, {
                            name: 'Manage', width: 125, cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html'
                        });
                    }
                    else {
                        return UserService.IsDataEntry(SelectionApplicationService.GetCompanyId())
                    }
                }).then(function (data) {
                    if (data == true) {
                        $scope.gridOptions.columnDefs.splice(0, 0, {
                            name: 'Manage', width: 125, cellTemplate: 'ApplicationComponents/Reporting/Survey/CellTemplates/EditDelete.html'
                        });
                    }
                });
                $scope.gridOptions.columnDefs.push({
                    field: 'CustomerName', name: 'Customer Name', cellTooltip: true
                });
                $scope.gridOptions.columnDefs.push({
                    field: 'LocationName', name: 'Location Name', cellTooltip: true
                });
                $scope.gridOptions.columnDefs.push({
                    field: 'SurveyName', name: 'Survey Name', cellTooltip: true
                });
                $scope.gridOptions.columnDefs.push({
                    field: 'ProductName', name: 'Product Name', cellTooltip: true
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
                    name: 'Created', cellTooltip: true, cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">{{row.entity.Created | date: "MM/dd/yyyy h:mm:ss"}}</div>'
                });
            });
        }

        $scope.gridOptions = {
            enableFiltering: true,
            enableSorting: true,
            enableGridMenu: true,
            exporterCsvFilename: 'myFile.csv',
            exporterPdfOrientation: 'portrait',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 500,
            data: [],
            columnDefs: []
        };
        $scope.Search();

        $scope.Edit = function (row) {
            LocationService.Get(row.LocationId).then(function (data) {
                SelectionApplicationService.SetLocation(data);
                SelectionApplicationService.SetSurveyHeaderId(row.Id);
                $state.go('main.survey');
            });
        }

        $scope.Delete = function (id) {
            SurveyHeaderService.DeleteBulk(id).then(function (data) {
                var length = $scope.gridOptions.data.length;
                for (var index = 0; index < length; index++) {
                    if ($scope.gridOptions.data[index].Id == id) {
                        $scope.gridOptions.data.splice(index, 1);
                        length--;
                        index--;
                    }
                }
            }, function (error) {
                toastr.error("There was an error deleting the survey data.");
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