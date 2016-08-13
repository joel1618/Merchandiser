var app = angular.module('Main', ['ngRoute', 'ui.grid', 'ui.bootstrap', 'ngAnimate', 'ui.router', 'breeze.angular', 'Services']);

app.config(function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/main")

    $stateProvider
        .state('main', {
            url: "/main",
            templateUrl: "/App/Main/Views/Main.html"
        })
        .state('main.company', {
            url: "/company",
            templateUrl: "/App/Company/Views/Company.html"
        })
        .state('main.company.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/Company/Views/CompanyAddEdit.html",
        })
        .state('main.customer', {
            url: "/company",
            templateUrl: "/App/Customer/Views/Customer.html"
        })
        .state('main.customer.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/Customer/Views/CustomerAddEdit.html",
        })
        .state('main.product', {
            url: "/company",
            templateUrl: "/App/Product/Views/Product.html"
        })
        .state('main.product.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/Product/Views/ProductAddEdit.html",
        })
});