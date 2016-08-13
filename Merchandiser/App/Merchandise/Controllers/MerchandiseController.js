(function (moment) {
    "use strict";    
    angular.module('Main').controller('MerchandiseController', ['$scope', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 
    function controller($scope, $routeParams, $http, $location, $timeout, breezeservice, breeze) {
        $scope.Item = { Name : "", UPCCode: "", Quantity: "", Latitude: "", Longitude: "" };
        $scope.Products = ["Product 1", "Product 2", "Product 3", "Product 4", "Product 5"];
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);


        $scope.Search = function () {
            var p1 = new breeze.Predicate('Quantity', '>', 1);
            var p2 = new breeze.Predicate('Longitude', '<', 1);
            var predicate = new breeze.Predicate.and([p1, p2]);
            //MerchandiseService.Search(null, 0, 20, false).then(function (data) {
            //    $scope.Items = data;
            //});
        }

        function onPositionUpdate(position) {
            $scope.Item.Latitude = position.coords.latitude;
            $scope.Item.Longitude = position.coords.longitude;
            $scope.Search();
        }

        $scope.Submit = function(){
            MerchandiseService.Create($scope.Item).then(function (data) {
                $scope.Item.Name = "";
                $scope.Item.UPCCode = "";
                $scope.Item.Quantity = "";  
                $scope.Search();
            });
        }

        $scope.Delete = function(id){
            MerchandiseService.Delete(id).then(function (data) {
                $scope.Search();
            });
        }
    }]);

})(moment);