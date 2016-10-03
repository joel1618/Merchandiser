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
            templateUrl: "/App/ApplicationComponents/Administrator/Survey/Views/Survey.html"
        })
        .state('main.admin.survey.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/ApplicationComponents/Administrator/Survey/Views/SurveyAddEdit.html",
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