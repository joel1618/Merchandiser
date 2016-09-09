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