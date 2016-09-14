
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
{"schema":{"namespace":"Merchandiser","alias":"Self","annotation:UseStrongSpatialTypes":"false","xmlns:annotation":"http://schemas.microsoft.com/ado/2009/02/edm/annotation","xmlns:customannotation":"http://schemas.microsoft.com/ado/2013/11/edm/customannotation","xmlns":"http://schemas.microsoft.com/ado/2009/11/edm","cSpaceOSpaceMapping":"[[\"Merchandiser.Company\",\"Merchandiser.Company\"],[\"Merchandiser.AspNetUserRole\",\"Merchandiser.AspNetUserRole\"],[\"Merchandiser.AspNetRole\",\"Merchandiser.AspNetRole\"],[\"Merchandiser.AspNetUser\",\"Merchandiser.AspNetUser\"],[\"Merchandiser.AspNetUserClaim\",\"Merchandiser.AspNetUserClaim\"],[\"Merchandiser.AspNetUserLogin\",\"Merchandiser.AspNetUserLogin\"],[\"Merchandiser.AspNetUsersInfo\",\"Merchandiser.AspNetUsersInfo\"],[\"Merchandiser.Customer\",\"Merchandiser.Customer\"],[\"Merchandiser.SurveyCustomerLocation\",\"Merchandiser.SurveyCustomerLocation\"],[\"Merchandiser.Location\",\"Merchandiser.Location\"],[\"Merchandiser.SurveyHeader\",\"Merchandiser.SurveyHeader\"],[\"Merchandiser.Survey\",\"Merchandiser.Survey\"],[\"Merchandiser.SurveyProductQuestion\",\"Merchandiser.SurveyProductQuestion\"],[\"Merchandiser.Product\",\"Merchandiser.Product\"],[\"Merchandiser.SurveyDetail\",\"Merchandiser.SurveyDetail\"],[\"Merchandiser.Question\",\"Merchandiser.Question\"],[\"Merchandiser.CompanyViewModel\",\"Merchandiser.Models.CompanyViewModel\"]]","entityType":[{"name":"Company","customannotation:ClrType":"Merchandiser.Company, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"AspNetUserRoles","relationship":"Self.AspNetUserRole_Company","fromRole":"AspNetUserRole_Company_Target","toRole":"AspNetUserRole_Company_Source"},{"name":"Customers","relationship":"Self.Customer_Company","fromRole":"Customer_Company_Target","toRole":"Customer_Company_Source"},{"name":"Locations","relationship":"Self.Location_Company","fromRole":"Location_Company_Target","toRole":"Location_Company_Source"},{"name":"Products","relationship":"Self.Product_Company","fromRole":"Product_Company_Target","toRole":"Product_Company_Source"},{"name":"Questions","relationship":"Self.Question_Company","fromRole":"Question_Company_Target","toRole":"Question_Company_Source"},{"name":"SurveyCustomerLocations","relationship":"Self.SurveyCustomerLocation_Company","fromRole":"SurveyCustomerLocation_Company_Target","toRole":"SurveyCustomerLocation_Company_Source"},{"name":"SurveyDetails","relationship":"Self.SurveyDetail_Company","fromRole":"SurveyDetail_Company_Target","toRole":"SurveyDetail_Company_Source"},{"name":"SurveyHeaders","relationship":"Self.SurveyHeader_Company","fromRole":"SurveyHeader_Company_Target","toRole":"SurveyHeader_Company_Source"},{"name":"SurveyProductQuestions","relationship":"Self.SurveyProductQuestion_Company","fromRole":"SurveyProductQuestion_Company_Target","toRole":"SurveyProductQuestion_Company_Source"},{"name":"Surveys","relationship":"Self.Survey_Company","fromRole":"Survey_Company_Target","toRole":"Survey_Company_Source"}]},{"name":"AspNetUserRole","customannotation:ClrType":"Merchandiser.AspNetUserRole, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"UserId","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"RoleId","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid"}],"navigationProperty":[{"name":"AspNetRole","relationship":"Self.AspNetRole_AspNetUserRoles","fromRole":"AspNetRole_AspNetUserRoles_Target","toRole":"AspNetRole_AspNetUserRoles_Source"},{"name":"AspNetUser","relationship":"Self.AspNetUser_AspNetUserRoles","fromRole":"AspNetUser_AspNetUserRoles_Target","toRole":"AspNetUser_AspNetUserRoles_Source"},{"name":"Company","relationship":"Self.AspNetUserRole_Company","fromRole":"AspNetUserRole_Company_Source","toRole":"AspNetUserRole_Company_Target"},{"name":"Customer","relationship":"Self.Customer_AspNetUserRoles","fromRole":"Customer_AspNetUserRoles_Target","toRole":"Customer_AspNetUserRoles_Source"}]},{"name":"AspNetRole","customannotation:ClrType":"Merchandiser.AspNetRole, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":{"name":"AspNetUserRoles","relationship":"Self.AspNetRole_AspNetUserRoles","fromRole":"AspNetRole_AspNetUserRoles_Source","toRole":"AspNetRole_AspNetUserRoles_Target"}},{"name":"AspNetUser","customannotation:ClrType":"Merchandiser.AspNetUser, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"Email","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"EmailConfirmed","type":"Edm.Boolean","nullable":"false"},{"name":"PasswordHash","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"SecurityStamp","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"PhoneNumber","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"PhoneNumberConfirmed","type":"Edm.Boolean","nullable":"false"},{"name":"TwoFactorEnabled","type":"Edm.Boolean","nullable":"false"},{"name":"LockoutEndDateUtc","type":"Edm.DateTime"},{"name":"LockoutEnabled","type":"Edm.Boolean","nullable":"false"},{"name":"AccessFailedCount","type":"Edm.Int32","nullable":"false"},{"name":"UserName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"AspNetUserClaims","relationship":"Self.AspNetUserClaim_AspNetUser","fromRole":"AspNetUserClaim_AspNetUser_Target","toRole":"AspNetUserClaim_AspNetUser_Source"},{"name":"AspNetUserLogins","relationship":"Self.AspNetUserLogin_AspNetUser","fromRole":"AspNetUserLogin_AspNetUser_Target","toRole":"AspNetUserLogin_AspNetUser_Source"},{"name":"AspNetUserRoles","relationship":"Self.AspNetUser_AspNetUserRoles","fromRole":"AspNetUser_AspNetUserRoles_Source","toRole":"AspNetUser_AspNetUserRoles_Target"},{"name":"AspNetUsersInfoes","relationship":"Self.AspNetUsersInfo_AspNetUser","fromRole":"AspNetUsersInfo_AspNetUser_Target","toRole":"AspNetUsersInfo_AspNetUser_Source"}]},{"name":"AspNetUserClaim","customannotation:ClrType":"Merchandiser.AspNetUserClaim, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Int32","nullable":"false","annotation:StoreGeneratedPattern":"Identity"},{"name":"UserId","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ClaimType","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ClaimValue","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":{"name":"AspNetUser","relationship":"Self.AspNetUserClaim_AspNetUser","fromRole":"AspNetUserClaim_AspNetUser_Source","toRole":"AspNetUserClaim_AspNetUser_Target"}},{"name":"AspNetUserLogin","customannotation:ClrType":"Merchandiser.AspNetUserLogin, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"UserId"}},"property":[{"name":"UserId","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"LoginProvider","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ProviderKey","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":{"name":"AspNetUser","relationship":"Self.AspNetUserLogin_AspNetUser","fromRole":"AspNetUserLogin_AspNetUser_Source","toRole":"AspNetUserLogin_AspNetUser_Target"}},{"name":"AspNetUsersInfo","customannotation:ClrType":"Merchandiser.AspNetUsersInfo, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"UserId","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"FirstName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"LastName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":{"name":"AspNetUser","relationship":"Self.AspNetUsersInfo_AspNetUser","fromRole":"AspNetUsersInfo_AspNetUser_Source","toRole":"AspNetUsersInfo_AspNetUser_Target"}},{"name":"Customer","customannotation:ClrType":"Merchandiser.Customer, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"AspNetUserRoles","relationship":"Self.Customer_AspNetUserRoles","fromRole":"Customer_AspNetUserRoles_Source","toRole":"Customer_AspNetUserRoles_Target"},{"name":"Company","relationship":"Self.Customer_Company","fromRole":"Customer_Company_Source","toRole":"Customer_Company_Target"},{"name":"SurveyCustomerLocations","relationship":"Self.SurveyCustomerLocation_Customer","fromRole":"SurveyCustomerLocation_Customer_Target","toRole":"SurveyCustomerLocation_Customer_Source"},{"name":"SurveyHeaders","relationship":"Self.SurveyHeader_Customer","fromRole":"SurveyHeader_Customer_Target","toRole":"SurveyHeader_Customer_Source"}]},{"name":"SurveyCustomerLocation","customannotation:ClrType":"Merchandiser.SurveyCustomerLocation, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyId","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid","nullable":"false"},{"name":"LocationId","type":"Edm.Guid","nullable":"false"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Company","relationship":"Self.SurveyCustomerLocation_Company","fromRole":"SurveyCustomerLocation_Company_Source","toRole":"SurveyCustomerLocation_Company_Target"},{"name":"Customer","relationship":"Self.SurveyCustomerLocation_Customer","fromRole":"SurveyCustomerLocation_Customer_Source","toRole":"SurveyCustomerLocation_Customer_Target"},{"name":"Location","relationship":"Self.Location_SurveyCustomerLocations","fromRole":"Location_SurveyCustomerLocations_Target","toRole":"Location_SurveyCustomerLocations_Source"},{"name":"Survey","relationship":"Self.Survey_SurveyCustomerLocations","fromRole":"Survey_SurveyCustomerLocations_Target","toRole":"Survey_SurveyCustomerLocations_Source"}]},{"name":"Location","customannotation:ClrType":"Merchandiser.Location, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Store","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Latitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Longitude","type":"Edm.Decimal","precision":"18","scale":"2"},{"name":"Address","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"AreaManager","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Company","relationship":"Self.Location_Company","fromRole":"Location_Company_Source","toRole":"Location_Company_Target"},{"name":"SurveyCustomerLocations","relationship":"Self.Location_SurveyCustomerLocations","fromRole":"Location_SurveyCustomerLocations_Source","toRole":"Location_SurveyCustomerLocations_Target"},{"name":"SurveyHeaders","relationship":"Self.SurveyHeader_Location","fromRole":"SurveyHeader_Location_Target","toRole":"SurveyHeader_Location_Source"}]},{"name":"SurveyHeader","customannotation:ClrType":"Merchandiser.SurveyHeader, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyId","type":"Edm.Guid","nullable":"false"},{"name":"CustomerId","type":"Edm.Guid","nullable":"false"},{"name":"LocationId","type":"Edm.Guid","nullable":"false"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Company","relationship":"Self.SurveyHeader_Company","fromRole":"SurveyHeader_Company_Source","toRole":"SurveyHeader_Company_Target"},{"name":"Customer","relationship":"Self.SurveyHeader_Customer","fromRole":"SurveyHeader_Customer_Source","toRole":"SurveyHeader_Customer_Target"},{"name":"Location","relationship":"Self.SurveyHeader_Location","fromRole":"SurveyHeader_Location_Source","toRole":"SurveyHeader_Location_Target"},{"name":"Survey","relationship":"Self.Survey_SurveyHeaders","fromRole":"Survey_SurveyHeaders_Target","toRole":"Survey_SurveyHeaders_Source"},{"name":"SurveyDetails","relationship":"Self.SurveyDetail_SurveyHeader","fromRole":"SurveyDetail_SurveyHeader_Target","toRole":"SurveyDetail_SurveyHeader_Source"}]},{"name":"Survey","customannotation:ClrType":"Merchandiser.Survey, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Company","relationship":"Self.Survey_Company","fromRole":"Survey_Company_Source","toRole":"Survey_Company_Target"},{"name":"SurveyCustomerLocations","relationship":"Self.Survey_SurveyCustomerLocations","fromRole":"Survey_SurveyCustomerLocations_Source","toRole":"Survey_SurveyCustomerLocations_Target"},{"name":"SurveyHeaders","relationship":"Self.Survey_SurveyHeaders","fromRole":"Survey_SurveyHeaders_Source","toRole":"Survey_SurveyHeaders_Target"},{"name":"SurveyProductQuestions","relationship":"Self.SurveyProductQuestion_Survey","fromRole":"SurveyProductQuestion_Survey_Target","toRole":"SurveyProductQuestion_Survey_Source"}]},{"name":"SurveyProductQuestion","customannotation:ClrType":"Merchandiser.SurveyProductQuestion, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyId","type":"Edm.Guid","nullable":"false"},{"name":"ProductId","type":"Edm.Guid","nullable":"false"},{"name":"QuestionId","type":"Edm.Guid","nullable":"false"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Company","relationship":"Self.SurveyProductQuestion_Company","fromRole":"SurveyProductQuestion_Company_Source","toRole":"SurveyProductQuestion_Company_Target"},{"name":"Product","relationship":"Self.Product_SurveyProductQuestions","fromRole":"Product_SurveyProductQuestions_Target","toRole":"Product_SurveyProductQuestions_Source"},{"name":"Question","relationship":"Self.Question_SurveyProductQuestions","fromRole":"Question_SurveyProductQuestions_Target","toRole":"Question_SurveyProductQuestions_Source"},{"name":"Survey","relationship":"Self.SurveyProductQuestion_Survey","fromRole":"SurveyProductQuestion_Survey_Source","toRole":"SurveyProductQuestion_Survey_Target"}]},{"name":"Product","customannotation:ClrType":"Merchandiser.Product, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Company","relationship":"Self.Product_Company","fromRole":"Product_Company_Source","toRole":"Product_Company_Target"},{"name":"SurveyDetails","relationship":"Self.SurveyDetail_Product","fromRole":"SurveyDetail_Product_Target","toRole":"SurveyDetail_Product_Source"},{"name":"SurveyProductQuestions","relationship":"Self.Product_SurveyProductQuestions","fromRole":"Product_SurveyProductQuestions_Source","toRole":"Product_SurveyProductQuestions_Target"}]},{"name":"SurveyDetail","customannotation:ClrType":"Merchandiser.SurveyDetail, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"SurveyHeaderId","type":"Edm.Guid","nullable":"false"},{"name":"ProductId","type":"Edm.Guid","nullable":"false"},{"name":"QuestionId","type":"Edm.Guid","nullable":"false"},{"name":"Answer","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Company","relationship":"Self.SurveyDetail_Company","fromRole":"SurveyDetail_Company_Source","toRole":"SurveyDetail_Company_Target"},{"name":"Product","relationship":"Self.SurveyDetail_Product","fromRole":"SurveyDetail_Product_Source","toRole":"SurveyDetail_Product_Target"},{"name":"Question","relationship":"Self.Question_SurveyDetails","fromRole":"Question_SurveyDetails_Target","toRole":"Question_SurveyDetails_Source"},{"name":"SurveyHeader","relationship":"Self.SurveyDetail_SurveyHeader","fromRole":"SurveyDetail_SurveyHeader_Source","toRole":"SurveyDetail_SurveyHeader_Target"}]},{"name":"Question","customannotation:ClrType":"Merchandiser.Question, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"CompanyId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Modified","type":"Edm.DateTime"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"Company","relationship":"Self.Question_Company","fromRole":"Question_Company_Source","toRole":"Question_Company_Target"},{"name":"SurveyDetails","relationship":"Self.Question_SurveyDetails","fromRole":"Question_SurveyDetails_Source","toRole":"Question_SurveyDetails_Target"},{"name":"SurveyProductQuestions","relationship":"Self.Question_SurveyProductQuestions","fromRole":"Question_SurveyProductQuestions_Source","toRole":"Question_SurveyProductQuestions_Target"}]},{"name":"CompanyViewModel","customannotation:ClrType":"Merchandiser.Models.CompanyViewModel, Merchandiser, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Created","type":"Edm.DateTime","nullable":"false"},{"name":"CreatedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ModifiedBy","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}]}],"association":[{"name":"AspNetRole_AspNetUserRoles","end":[{"role":"AspNetRole_AspNetUserRoles_Source","type":"Edm.Self.AspNetRole","multiplicity":"0..1"},{"role":"AspNetRole_AspNetUserRoles_Target","type":"Edm.Self.AspNetUserRole","multiplicity":"*"}]},{"name":"AspNetUserClaim_AspNetUser","end":[{"role":"AspNetUserClaim_AspNetUser_Source","type":"Edm.Self.AspNetUserClaim","multiplicity":"*"},{"role":"AspNetUserClaim_AspNetUser_Target","type":"Edm.Self.AspNetUser","multiplicity":"0..1"}]},{"name":"AspNetUserLogin_AspNetUser","end":[{"role":"AspNetUserLogin_AspNetUser_Source","type":"Edm.Self.AspNetUserLogin","multiplicity":"*"},{"role":"AspNetUserLogin_AspNetUser_Target","type":"Edm.Self.AspNetUser","multiplicity":"0..1"}]},{"name":"AspNetUser_AspNetUserRoles","end":[{"role":"AspNetUser_AspNetUserRoles_Source","type":"Edm.Self.AspNetUser","multiplicity":"0..1"},{"role":"AspNetUser_AspNetUserRoles_Target","type":"Edm.Self.AspNetUserRole","multiplicity":"*"}]},{"name":"AspNetUsersInfo_AspNetUser","end":[{"role":"AspNetUsersInfo_AspNetUser_Source","type":"Edm.Self.AspNetUsersInfo","multiplicity":"*"},{"role":"AspNetUsersInfo_AspNetUser_Target","type":"Edm.Self.AspNetUser","multiplicity":"0..1"}]},{"name":"AspNetUserRole_Company","end":[{"role":"AspNetUserRole_Company_Source","type":"Edm.Self.AspNetUserRole","multiplicity":"*"},{"role":"AspNetUserRole_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"AspNetUserRole_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"AspNetUserRole_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"Customer_AspNetUserRoles","end":[{"role":"Customer_AspNetUserRoles_Source","type":"Edm.Self.Customer","multiplicity":"0..1"},{"role":"Customer_AspNetUserRoles_Target","type":"Edm.Self.AspNetUserRole","multiplicity":"*"}],"referentialConstraint":{"principal":{"role":"Customer_AspNetUserRoles_Source","propertyRef":{"name":"Id"}},"dependent":{"role":"Customer_AspNetUserRoles_Target","propertyRef":{"name":"CustomerId"}}}},{"name":"Customer_Company","end":[{"role":"Customer_Company_Source","type":"Edm.Self.Customer","multiplicity":"*"},{"role":"Customer_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"Customer_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"Customer_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"SurveyCustomerLocation_Company","end":[{"role":"SurveyCustomerLocation_Company_Source","type":"Edm.Self.SurveyCustomerLocation","multiplicity":"*"},{"role":"SurveyCustomerLocation_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocation_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocation_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"SurveyCustomerLocation_Customer","end":[{"role":"SurveyCustomerLocation_Customer_Source","type":"Edm.Self.SurveyCustomerLocation","multiplicity":"*"},{"role":"SurveyCustomerLocation_Customer_Target","type":"Edm.Self.Customer","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyCustomerLocation_Customer_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyCustomerLocation_Customer_Source","propertyRef":{"name":"CustomerId"}}}},{"name":"Location_Company","end":[{"role":"Location_Company_Source","type":"Edm.Self.Location","multiplicity":"*"},{"role":"Location_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"Location_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"Location_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"Location_SurveyCustomerLocations","end":[{"role":"Location_SurveyCustomerLocations_Source","type":"Edm.Self.Location","multiplicity":"1","onDelete":{"action":"Cascade"}},{"role":"Location_SurveyCustomerLocations_Target","type":"Edm.Self.SurveyCustomerLocation","multiplicity":"*"}],"referentialConstraint":{"principal":{"role":"Location_SurveyCustomerLocations_Source","propertyRef":{"name":"Id"}},"dependent":{"role":"Location_SurveyCustomerLocations_Target","propertyRef":{"name":"LocationId"}}}},{"name":"SurveyHeader_Company","end":[{"role":"SurveyHeader_Company_Source","type":"Edm.Self.SurveyHeader","multiplicity":"*"},{"role":"SurveyHeader_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyHeader_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyHeader_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"SurveyHeader_Customer","end":[{"role":"SurveyHeader_Customer_Source","type":"Edm.Self.SurveyHeader","multiplicity":"*"},{"role":"SurveyHeader_Customer_Target","type":"Edm.Self.Customer","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyHeader_Customer_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyHeader_Customer_Source","propertyRef":{"name":"CustomerId"}}}},{"name":"SurveyHeader_Location","end":[{"role":"SurveyHeader_Location_Source","type":"Edm.Self.SurveyHeader","multiplicity":"*"},{"role":"SurveyHeader_Location_Target","type":"Edm.Self.Location","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyHeader_Location_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyHeader_Location_Source","propertyRef":{"name":"LocationId"}}}},{"name":"Survey_Company","end":[{"role":"Survey_Company_Source","type":"Edm.Self.Survey","multiplicity":"*"},{"role":"Survey_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"Survey_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"Survey_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"Survey_SurveyCustomerLocations","end":[{"role":"Survey_SurveyCustomerLocations_Source","type":"Edm.Self.Survey","multiplicity":"1","onDelete":{"action":"Cascade"}},{"role":"Survey_SurveyCustomerLocations_Target","type":"Edm.Self.SurveyCustomerLocation","multiplicity":"*"}],"referentialConstraint":{"principal":{"role":"Survey_SurveyCustomerLocations_Source","propertyRef":{"name":"Id"}},"dependent":{"role":"Survey_SurveyCustomerLocations_Target","propertyRef":{"name":"SurveyId"}}}},{"name":"Survey_SurveyHeaders","end":[{"role":"Survey_SurveyHeaders_Source","type":"Edm.Self.Survey","multiplicity":"1","onDelete":{"action":"Cascade"}},{"role":"Survey_SurveyHeaders_Target","type":"Edm.Self.SurveyHeader","multiplicity":"*"}],"referentialConstraint":{"principal":{"role":"Survey_SurveyHeaders_Source","propertyRef":{"name":"Id"}},"dependent":{"role":"Survey_SurveyHeaders_Target","propertyRef":{"name":"SurveyId"}}}},{"name":"SurveyProductQuestion_Company","end":[{"role":"SurveyProductQuestion_Company_Source","type":"Edm.Self.SurveyProductQuestion","multiplicity":"*"},{"role":"SurveyProductQuestion_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyProductQuestion_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyProductQuestion_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"Product_Company","end":[{"role":"Product_Company_Source","type":"Edm.Self.Product","multiplicity":"*"},{"role":"Product_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"Product_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"Product_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"SurveyDetail_Company","end":[{"role":"SurveyDetail_Company_Source","type":"Edm.Self.SurveyDetail","multiplicity":"*"},{"role":"SurveyDetail_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyDetail_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyDetail_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"SurveyDetail_Product","end":[{"role":"SurveyDetail_Product_Source","type":"Edm.Self.SurveyDetail","multiplicity":"*"},{"role":"SurveyDetail_Product_Target","type":"Edm.Self.Product","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyDetail_Product_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyDetail_Product_Source","propertyRef":{"name":"ProductId"}}}},{"name":"Question_Company","end":[{"role":"Question_Company_Source","type":"Edm.Self.Question","multiplicity":"*"},{"role":"Question_Company_Target","type":"Edm.Self.Company","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"Question_Company_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"Question_Company_Source","propertyRef":{"name":"CompanyId"}}}},{"name":"Question_SurveyDetails","end":[{"role":"Question_SurveyDetails_Source","type":"Edm.Self.Question","multiplicity":"1","onDelete":{"action":"Cascade"}},{"role":"Question_SurveyDetails_Target","type":"Edm.Self.SurveyDetail","multiplicity":"*"}],"referentialConstraint":{"principal":{"role":"Question_SurveyDetails_Source","propertyRef":{"name":"Id"}},"dependent":{"role":"Question_SurveyDetails_Target","propertyRef":{"name":"QuestionId"}}}},{"name":"Question_SurveyProductQuestions","end":[{"role":"Question_SurveyProductQuestions_Source","type":"Edm.Self.Question","multiplicity":"1","onDelete":{"action":"Cascade"}},{"role":"Question_SurveyProductQuestions_Target","type":"Edm.Self.SurveyProductQuestion","multiplicity":"*"}],"referentialConstraint":{"principal":{"role":"Question_SurveyProductQuestions_Source","propertyRef":{"name":"Id"}},"dependent":{"role":"Question_SurveyProductQuestions_Target","propertyRef":{"name":"QuestionId"}}}},{"name":"SurveyDetail_SurveyHeader","end":[{"role":"SurveyDetail_SurveyHeader_Source","type":"Edm.Self.SurveyDetail","multiplicity":"*"},{"role":"SurveyDetail_SurveyHeader_Target","type":"Edm.Self.SurveyHeader","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyDetail_SurveyHeader_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyDetail_SurveyHeader_Source","propertyRef":{"name":"SurveyHeaderId"}}}},{"name":"Product_SurveyProductQuestions","end":[{"role":"Product_SurveyProductQuestions_Source","type":"Edm.Self.Product","multiplicity":"1","onDelete":{"action":"Cascade"}},{"role":"Product_SurveyProductQuestions_Target","type":"Edm.Self.SurveyProductQuestion","multiplicity":"*"}],"referentialConstraint":{"principal":{"role":"Product_SurveyProductQuestions_Source","propertyRef":{"name":"Id"}},"dependent":{"role":"Product_SurveyProductQuestions_Target","propertyRef":{"name":"ProductId"}}}},{"name":"SurveyProductQuestion_Survey","end":[{"role":"SurveyProductQuestion_Survey_Source","type":"Edm.Self.SurveyProductQuestion","multiplicity":"*"},{"role":"SurveyProductQuestion_Survey_Target","type":"Edm.Self.Survey","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"SurveyProductQuestion_Survey_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"SurveyProductQuestion_Survey_Source","propertyRef":{"name":"SurveyId"}}}}],"entityContainer":{"name":"DatabaseContext","customannotation:UseClrTypes":"true","entitySet":[{"name":"Company","entityType":"Self.Company"},{"name":"AspNetUserRoles","entityType":"Self.AspNetUserRole"},{"name":"AspNetRoles","entityType":"Self.AspNetRole"},{"name":"AspNetUsers","entityType":"Self.AspNetUser"},{"name":"AspNetUserClaims","entityType":"Self.AspNetUserClaim"},{"name":"AspNetUserLogins","entityType":"Self.AspNetUserLogin"},{"name":"AspNetUsersInfoes","entityType":"Self.AspNetUsersInfo"},{"name":"Customers","entityType":"Self.Customer"},{"name":"SurveyCustomerLocations","entityType":"Self.SurveyCustomerLocation"},{"name":"Locations","entityType":"Self.Location"},{"name":"SurveyHeaders","entityType":"Self.SurveyHeader"},{"name":"Surveys","entityType":"Self.Survey"},{"name":"SurveyProductQuestions","entityType":"Self.SurveyProductQuestion"},{"name":"Products","entityType":"Self.Product"},{"name":"SurveyDetails","entityType":"Self.SurveyDetail"},{"name":"Questions","entityType":"Self.Question"},{"name":"CompanyViewModel","entityType":"Self.CompanyViewModel"}],"associationSet":[{"name":"AspNetRole_AspNetUserRoles","association":"Self.AspNetRole_AspNetUserRoles","end":[{"role":"AspNetRole_AspNetUserRoles_Source","entitySet":"AspNetRoles"},{"role":"AspNetRole_AspNetUserRoles_Target","entitySet":"AspNetUserRoles"}]},{"name":"AspNetUserClaim_AspNetUser","association":"Self.AspNetUserClaim_AspNetUser","end":[{"role":"AspNetUserClaim_AspNetUser_Source","entitySet":"AspNetUserClaims"},{"role":"AspNetUserClaim_AspNetUser_Target","entitySet":"AspNetUsers"}]},{"name":"AspNetUserLogin_AspNetUser","association":"Self.AspNetUserLogin_AspNetUser","end":[{"role":"AspNetUserLogin_AspNetUser_Source","entitySet":"AspNetUserLogins"},{"role":"AspNetUserLogin_AspNetUser_Target","entitySet":"AspNetUsers"}]},{"name":"AspNetUser_AspNetUserRoles","association":"Self.AspNetUser_AspNetUserRoles","end":[{"role":"AspNetUser_AspNetUserRoles_Source","entitySet":"AspNetUsers"},{"role":"AspNetUser_AspNetUserRoles_Target","entitySet":"AspNetUserRoles"}]},{"name":"AspNetUsersInfo_AspNetUser","association":"Self.AspNetUsersInfo_AspNetUser","end":[{"role":"AspNetUsersInfo_AspNetUser_Source","entitySet":"AspNetUsersInfoes"},{"role":"AspNetUsersInfo_AspNetUser_Target","entitySet":"AspNetUsers"}]},{"name":"AspNetUserRole_Company","association":"Self.AspNetUserRole_Company","end":[{"role":"AspNetUserRole_Company_Source","entitySet":"AspNetUserRoles"},{"role":"AspNetUserRole_Company_Target","entitySet":"Company"}]},{"name":"Customer_AspNetUserRoles","association":"Self.Customer_AspNetUserRoles","end":[{"role":"Customer_AspNetUserRoles_Source","entitySet":"Customers"},{"role":"Customer_AspNetUserRoles_Target","entitySet":"AspNetUserRoles"}]},{"name":"Customer_Company","association":"Self.Customer_Company","end":[{"role":"Customer_Company_Source","entitySet":"Customers"},{"role":"Customer_Company_Target","entitySet":"Company"}]},{"name":"SurveyCustomerLocation_Company","association":"Self.SurveyCustomerLocation_Company","end":[{"role":"SurveyCustomerLocation_Company_Source","entitySet":"SurveyCustomerLocations"},{"role":"SurveyCustomerLocation_Company_Target","entitySet":"Company"}]},{"name":"SurveyCustomerLocation_Customer","association":"Self.SurveyCustomerLocation_Customer","end":[{"role":"SurveyCustomerLocation_Customer_Source","entitySet":"SurveyCustomerLocations"},{"role":"SurveyCustomerLocation_Customer_Target","entitySet":"Customers"}]},{"name":"Location_Company","association":"Self.Location_Company","end":[{"role":"Location_Company_Source","entitySet":"Locations"},{"role":"Location_Company_Target","entitySet":"Company"}]},{"name":"Location_SurveyCustomerLocations","association":"Self.Location_SurveyCustomerLocations","end":[{"role":"Location_SurveyCustomerLocations_Source","entitySet":"Locations"},{"role":"Location_SurveyCustomerLocations_Target","entitySet":"SurveyCustomerLocations"}]},{"name":"SurveyHeader_Company","association":"Self.SurveyHeader_Company","end":[{"role":"SurveyHeader_Company_Source","entitySet":"SurveyHeaders"},{"role":"SurveyHeader_Company_Target","entitySet":"Company"}]},{"name":"SurveyHeader_Customer","association":"Self.SurveyHeader_Customer","end":[{"role":"SurveyHeader_Customer_Source","entitySet":"SurveyHeaders"},{"role":"SurveyHeader_Customer_Target","entitySet":"Customers"}]},{"name":"SurveyHeader_Location","association":"Self.SurveyHeader_Location","end":[{"role":"SurveyHeader_Location_Source","entitySet":"SurveyHeaders"},{"role":"SurveyHeader_Location_Target","entitySet":"Locations"}]},{"name":"Survey_Company","association":"Self.Survey_Company","end":[{"role":"Survey_Company_Source","entitySet":"Surveys"},{"role":"Survey_Company_Target","entitySet":"Company"}]},{"name":"Survey_SurveyCustomerLocations","association":"Self.Survey_SurveyCustomerLocations","end":[{"role":"Survey_SurveyCustomerLocations_Source","entitySet":"Surveys"},{"role":"Survey_SurveyCustomerLocations_Target","entitySet":"SurveyCustomerLocations"}]},{"name":"Survey_SurveyHeaders","association":"Self.Survey_SurveyHeaders","end":[{"role":"Survey_SurveyHeaders_Source","entitySet":"Surveys"},{"role":"Survey_SurveyHeaders_Target","entitySet":"SurveyHeaders"}]},{"name":"SurveyProductQuestion_Company","association":"Self.SurveyProductQuestion_Company","end":[{"role":"SurveyProductQuestion_Company_Source","entitySet":"SurveyProductQuestions"},{"role":"SurveyProductQuestion_Company_Target","entitySet":"Company"}]},{"name":"Product_Company","association":"Self.Product_Company","end":[{"role":"Product_Company_Source","entitySet":"Products"},{"role":"Product_Company_Target","entitySet":"Company"}]},{"name":"SurveyDetail_Company","association":"Self.SurveyDetail_Company","end":[{"role":"SurveyDetail_Company_Source","entitySet":"SurveyDetails"},{"role":"SurveyDetail_Company_Target","entitySet":"Company"}]},{"name":"SurveyDetail_Product","association":"Self.SurveyDetail_Product","end":[{"role":"SurveyDetail_Product_Source","entitySet":"SurveyDetails"},{"role":"SurveyDetail_Product_Target","entitySet":"Products"}]},{"name":"Question_Company","association":"Self.Question_Company","end":[{"role":"Question_Company_Source","entitySet":"Questions"},{"role":"Question_Company_Target","entitySet":"Company"}]},{"name":"Question_SurveyDetails","association":"Self.Question_SurveyDetails","end":[{"role":"Question_SurveyDetails_Source","entitySet":"Questions"},{"role":"Question_SurveyDetails_Target","entitySet":"SurveyDetails"}]},{"name":"Question_SurveyProductQuestions","association":"Self.Question_SurveyProductQuestions","end":[{"role":"Question_SurveyProductQuestions_Source","entitySet":"Questions"},{"role":"Question_SurveyProductQuestions_Target","entitySet":"SurveyProductQuestions"}]},{"name":"SurveyDetail_SurveyHeader","association":"Self.SurveyDetail_SurveyHeader","end":[{"role":"SurveyDetail_SurveyHeader_Source","entitySet":"SurveyDetails"},{"role":"SurveyDetail_SurveyHeader_Target","entitySet":"SurveyHeaders"}]},{"name":"Product_SurveyProductQuestions","association":"Self.Product_SurveyProductQuestions","end":[{"role":"Product_SurveyProductQuestions_Source","entitySet":"Products"},{"role":"Product_SurveyProductQuestions_Target","entitySet":"SurveyProductQuestions"}]},{"name":"SurveyProductQuestion_Survey","association":"Self.SurveyProductQuestion_Survey","end":[{"role":"SurveyProductQuestion_Survey_Source","entitySet":"SurveyProductQuestions"},{"role":"SurveyProductQuestion_Survey_Target","entitySet":"Surveys"}]}]}}}
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
            templateUrl: "/App/ApplicationComponents/Administrator/Main/Views/Main.html"
        })
        .state('main.company', {
            url: "/company",
            templateUrl: "/App/ApplicationComponents/Administrator/Company/Views/Company.html"
        })
        .state('main.company.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Administrator/Company/Views/CompanyAddEdit.html",
        })
        .state('main.customer', {
            url: "/customer",
            templateUrl: "/App/ApplicationComponents/Administrator/Customer/Views/Customer.html"
        })
        .state('main.customer.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Administrator/Customer/Views/CustomerAddEdit.html",
        })
        .state('main.product', {
            url: "/product",
            templateUrl: "/App/ApplicationComponents/Administrator/Product/Views/Product.html"
        })
        .state('main.product.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Administrator/Product/Views/ProductAddEdit.html",
        })
        .state('main.location', {
            url: "/location",
            templateUrl: "/App/ApplicationComponents/Administrator/Location/Views/Location.html"
        })
        .state('main.location.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Administrator/Location/Views/LocationAddEdit.html",
        })
        .state('main.survey', {
            url: "/survey",
            templateUrl: "/App/ApplicationComponents/Administrator/Survey/Views/Survey.html"
        })
        .state('main.survey.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Administrator/Survey/Views/SurveyAddEdit.html",
        })
        .state('main.userrole', {
            url: "/userrole",
            templateUrl: "/App/ApplicationComponents/Administrator/UserRole/Views/UserRole.html"
        })
        .state('main.userrole.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Administrator/UserRole/Views/UserRoleAddEdit.html",
        })
        .state('main.question', {
            url: "/question",
            templateUrl: "/App/ApplicationComponents/Administrator/Question/Views/Question.html"
        })
        .state('main.question.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Administrator/Question/Views/QuestionAddEdit.html",
        })
        .state('main.surveycustomerlocation', {
            url: "/survey/customerlocation",
            templateUrl: "/App/ApplicationComponents/Administrator/SurveyCustomerLocation/Views/SurveyCustomerLocation.html"
        })
        .state('main.surveycustomerlocation.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Administrator/SurveyCustomerLocation/Views/SurveyCustomerLocationAddEdit.html",
        })
        .state('main.surveyproductquestion', {
            url: "/survey/productquestion",
            templateUrl: "/App/ApplicationComponents/Administrator/SurveyProductQuestion/Views/SurveyProductQuestion.html"
        })
        .state('main.surveyproductquestion.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Administrator/SurveyProductQuestion/Views/SurveyProductQuestionAddEdit.html",
        })
});
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
(function (moment) {
    "use strict";
    angular.module('Main').controller('UserRoleAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'UserRoleService', 'RoleService', 'CompanyApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location,
        $timeout, breezeservice, breeze, UserRoleService, RoleService, CompanyApplicationService) {
        CompanyApplicationService.NotifyObservers();

        $scope.Init = function () {
            $scope.item = { Id: null, Name: "" }
        }
        $scope.Init();
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                debugger;
                UserRoleService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
            RoleService.Search(null, 0, 5, false).then(function (data) {
                $scope.Roles = data;
            });
        }
        $scope.Search();

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                UserRoleService.Update($scope.item.Id, $scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    //alert(error);
                });
            }
            else {
                $scope.item.CompanyId = CompanyApplicationService.SelectedCompany.Id;
                $scope.item.RoleId = $scope.item.Role.Id;
                UserRoleService.Create($scope.item).then(function (data) {
                    $scope.$parent.Search();
                    $scope.Init();
                }, function (error) {
                    toastr.error("The username does not exist.");
                });
            }
        }
    }]);

})(moment);
(function (moment) {
    "use strict";    
    angular.module('Main').controller('UserRoleController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'UserRoleService', 'CompanyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, UserRoleService, CompanyApplicationService) {
        $scope.Search = function () {
            var predicate = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
            UserRoleService.Search(predicate, 0, 20, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.userrole.addedit', { id: Id }, { reload: false });
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
        .state('survey', {
            url: "/survey/:companyId/:surveyId/:customerId/:locationId/:surveyHeaderId",
            templateUrl: "/App/ApplicationComponents/DataEntry/Survey/MerchandiseSurvey.html"
        })
    });
    angular.module('Main').controller('MerchandiseSurveyController', ['$scope', '$state', '$stateParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService',
        'UserService', 'SurveyCustomerLocationService', 'SurveyProductQuestionService', 'CompanyApplicationService', 'SurveyHeaderService', 'SurveyDetailService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService,
        UserService, SurveyCustomerLocationService, SurveyProductQuestionService, CompanyApplicationService, SurveyHeaderService, SurveyDetailService) {
        
        $scope.Search = function () {
            if ($stateParams.surveyHeaderId != undefined && $stateParams.surveyHeaderId != null && $stateParams.surveyHeaderId != "") {
                var predicate = new breeze.Predicate('SurveyHeaderId', '==', $stateParams.surveyHeaderId);
                SurveyDetailService.Search(predicate, 0, 100, false).then(function (data) {
                    $scope.ProductQuestion = data;
                });
            }
            else
            {
                var predicate = new breeze.Predicate('SurveyId', '==', $stateParams.surveyId);
                SurveyProductQuestionService.Search(predicate, 0, 100, false).then(function (data) {
                    $scope.ProductQuestion = data;
                });
            }
        }
        $scope.Search();

        $scope.Save = function () {
            //TODO: Update
            if ($stateParams.surveyHeaderId != undefined && $stateParams.surveyHeaderId != null && $stateParams.surveyHeaderId != "") {
                angular.forEach($scope.ProductQuestion, function (value, key) {
                    SurveyDetailService.Update(value.Id, {
                        Id: value.Id,
                        Answer: value.Answer
                    })
                })
            }
            //TODO: Create
            else {
                SurveyHeaderService.Create({
                    CompanyId: $stateParams.companyId, SurveyId: $stateParams.surveyId,
                    CustomerId: $stateParams.customerId, LocationId: $stateParams.locationId
                }).then(function (data) {
                    angular.forEach($scope.ProductQuestion, function (value, key) {
                        SurveyDetailService.Create({
                            CompanyId: $stateParams.companyId, SurveyHeaderId: data.Id,
                            ProductId: value.Product.Id, QuestionId: value.Question.Id,
                            Answer: value.Answer
                        })
                    })
                })
            }
        }
    }]);
})(moment);
(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('merchandise', {
            url: "/merchandise",
            templateUrl: "/App/ApplicationComponents/DataEntry/CustomerLocation/MerchandiseCustomerLocation.html"
        })
    });
    angular.module('Main').controller('MerchandiseCustomerLocationController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService', 'UserService', 'SurveyCustomerLocationService', 'CompanyApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, SurveyCustomerLocationService, CompanyApplicationService) {
        $scope.SelectedCompany = null;
        $scope.SelectedLocation = null;
        $scope.SelectedCustomer = null;
        $scope.SelectedSurvey = null;
        $scope.Search = function () {
            UserService.GetCurrentUser().then(function (data) {
                var predicate = new breeze.Predicate('CreatedBy', '==', data);
                CompanyService.Search(null, 0, 20, false).then(function (data) {
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
        }
        $scope.Search();

        $scope.SelectCompany = function () {
            $scope.LocationSearch($scope.SelectedCompany.Id);
        }

        $scope.LocationSearch = function (companyId) {
            var predicate = new breeze.Predicate('CompanyId', '==', companyId);
            SurveyCustomerLocationService.Search(predicate, 0, 100, false).then(function (data) {
                $scope.Location = data;
            });
        }

        $scope.SelectLocation = function () {
            $scope.CustomerSearch($scope.SelectedCompany.Id, $scope.SelectedLocation.Location.Id);
        }

        $scope.CustomerSearch = function (companyId, locationId) {
            var p1 = new breeze.Predicate('CompanyId', '==', companyId);
            var p2 = new breeze.Predicate('LocationId', '==', locationId);
            var predicate = new breeze.Predicate.and([p1, p2]);
            SurveyCustomerLocationService.Search(predicate, 0, 100, false).then(function (data) {
                $scope.Customer = data;
            });
        }

        $scope.SelectCustomer = function () {
            $scope.SurveySearch($scope.SelectedCompany.Id, $scope.SelectedLocation.Location.Id, $scope.SelectedCustomer.Customer.Id);
        }

        $scope.SurveySearch = function (companyId, locationId, customerId) {
            var p1 = new breeze.Predicate('CompanyId', '==', companyId);
            var p2 = new breeze.Predicate('LocationId', '==', locationId);
            var p3 = new breeze.Predicate('CustomerId', '==', customerId);
            var predicate = new breeze.Predicate.and([p1, p2, p3]);
            SurveyCustomerLocationService.Search(predicate, 0, 100, false).then(function (data) {
                $scope.Survey = data;
            });
        }

        $scope.SelectSurvey = function () {
            $state.go('survey', {
                companyId: $scope.SelectedCompany.Id, surveyId: $scope.SelectedSurvey.Survey.Id,
                customerId: $scope.SelectedCustomer.Id, locationId: $scope.SelectedLocation.Id });
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