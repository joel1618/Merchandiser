(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.map', {
            url: "/map/:companyId/:surveyId/:customerId/:locationId/:surveyHeaderId",
            templateUrl: "/App/ApplicationComponents/Report/Map/Map.html"
        })
    });
    angular.module('Main').controller('MapController', ['$scope', '$state', '$stateParams', 'NgMap', '$http', '$location',
        '$timeout', 'breezeservice', 'breeze', 'MapService', 'SurveyHeaderService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, NgMap, $http, $location,
        $timeout, breezeservice, breeze, MapService, SurveyHeaderService, SelectionApplicationService) {
        $scope.SelectedPosition = null;
        $scope.Search = function () {
            var p1 = new breeze.Predicate('CompanyId', '==', SelectionApplicationService.GetCompanyId());
            var p2 = new breeze.Predicate('CustomerId', '==', SelectionApplicationService.GetCustomerId());
            var p3 = new breeze.Predicate('LocationId', '==', SelectionApplicationService.GetLocationId());
            var p4 = new breeze.Predicate('SurveyId', '==', SelectionApplicationService.GetSurveyId());
            var predicate = new breeze.Predicate.and([p1, p2, p3, p4]);
            MapService.Search(predicate, 0, 1000, false).then(function (data) {
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