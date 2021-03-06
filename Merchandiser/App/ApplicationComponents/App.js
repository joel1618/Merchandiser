﻿var app = angular.module('Main', ['ngRoute', 'ngResource', 'ngSanitize', 'ngAnimate',
    'ui.grid', 'ui.grid.draggable-rows', 'ui.grid.infiniteScroll', 'ui.grid.cellNav', 'ui.bootstrap', /*'ngTouch',*/ 'ui.router', 'ngMap', 'ui.grid.exporter', 'blockUI', 
    'breeze.angular', 'ngAria', 'ngMessages', 'ngMaterial', 'focus-if', 'mgcrea.bootstrap.affix', 'LocalStorageModule', 'Directives', 'DatabaseServices', 'ApplicationServices']);
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
app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('Merchandiser');
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