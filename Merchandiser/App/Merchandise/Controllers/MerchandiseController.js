(function (moment) {
    "use strict";    
    angular.module('Merchandise').controller('MerchandiseController', ['$scope', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'MerchandiseService',
    function controller($scope, $routeParams, $http, $location, $timeout, breezeservice, breeze, MerchandiseService) {
        $scope.Item = { Name : "", UPCCode: "", Quantity: "", Latitude: "", Longitude: "" };

        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);


        $scope.Search = function () {
            var p1 = new breeze.Predicate('Quantity', '>', 1);
            var p2 = new breeze.Predicate('Longitude2', '<', 1 + "M");
            var predicate = new breeze.Predicate.and([p1, p2]);
            MerchandiseService.Search(p1, 0, 100, false).then(function (data) {
           
                $scope.Items = data;
            });
        }

        function onPositionUpdate(position) {
            $scope.Item.Latitude = position.coords.latitude;
            $scope.Item.Longitude = position.coords.longitude;
            $scope.Search();
        }

        $scope.Submit = function(){
            MerchandiseService.Create($scope.Item).then(function (data) {
                $scope.Item = { Name: "", UPCCode: "", Quantity: "", Latitude: "", Longitude: "" };
                $scope.Search();
            });
        }
    }]);

})(moment);