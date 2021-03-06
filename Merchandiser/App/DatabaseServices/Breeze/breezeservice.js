﻿(function () {

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
        meta.setEntityTypeForResourceName("SurveyCustomerLocationProductQuestionApi/Search", "SurveyCustomerLocationProductQuestionViewModel");
        meta.setEntityTypeForResourceName("RoleApi/Search", "RoleViewModel");
        meta.setEntityTypeForResourceName("MapApi/Search", "MapViewModel");
        meta.setEntityTypeForResourceName("ProductCategoryApi/Search", "ProductCategoryViewModel");
        meta.setEntityTypeForResourceName("SurveyHeaderApi/Search", "SurveyHeaderViewModel");
        meta.setEntityTypeForResourceName("SelectLocationApi/Search", "SelectLocationViewModel");        
        meta.setEntityTypeForResourceName("SelectSurveyApi/Search", "SelectSurveyViewModel");
        meta.setEntityTypeForResourceName("SelectUserApi/Search", "SelectUserViewModel");
        meta.setEntityTypeForResourceName("SelectCustomerLocationProductQuestionApi/Search", "SelectCustomerLocationProductQuestionViewModel");
        meta.setEntityTypeForResourceName("ProductTypeHeaderApi/Search", "ProductTypeHeaderViewModel");
        meta.setEntityTypeForResourceName("ProductTypeDetailApi/Search", "ProductTypeDetailViewModel");
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