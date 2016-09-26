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
        //meta.setEntityTypeForResourceName("UserRoleApi/Search", "Company");
        //meta.setEntityTypeForResourceName("UserRoleApi/Search", "AspNetUser");
        //meta.setEntityTypeForResourceName("UserRoleApi/Search", "AspNetRole");
        meta.setEntityTypeForResourceName("CompanyApi/Search", "CompanyViewModel");
        meta.setEntityTypeForResourceName("CustomerApi/Search", "CustomerViewModel");
        meta.setEntityTypeForResourceName("SurveyCustomerLocationApi/Search", "SurveyCustomerLocationViewModel");
        meta.setEntityTypeForResourceName("RoleApi/Search", "RoleViewModel");
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