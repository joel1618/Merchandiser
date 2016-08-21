var app = angular.module('Main', ['ngRoute', 'ui.grid', 'ui.bootstrap', 'ngAnimate', 'ui.router', 'breeze.angular', 'DatabaseServices', 'ApplicationServices']);

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
});