var app = angular.module('Main', ['ngRoute', 'ui.grid', 'ui.bootstrap', 'ngAnimate', 'ui.router', 'breeze.angular', 'Services']);

app.config(function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/main")

    $stateProvider
        .state('main', {
            url: "/main",
            templateUrl: "/App/Main/Views/Main.html"
        })
        .state('main.merchandise', {
            url: "/merchandise",
            templateUrl: "/App/Merchandise/Views/Merchandise.html",
        })
        .state('main.company', {
            url: "/company",
            templateUrl: "/App/Company/Views/Company.html"
        })

        .state('main.company.addedit', {
            url: "/addedit/:id",
            templateUrl: "/App/Company/Views/CompanyAddEdit.html",
        })


    //.state('route2', {
    //    url: "/route2",
    //    templateUrl: "route2.html"
    //})
    //  .state('route2.list', {
    //      url: "/list",
    //      templateUrl: "route2.list.html",
    //      controller: function ($scope) {
    //          $scope.things = ["A", "Set", "Of", "Things"];
    //      }
    //  })
});