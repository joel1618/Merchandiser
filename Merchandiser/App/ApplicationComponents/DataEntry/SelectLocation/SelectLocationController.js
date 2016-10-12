(function (moment) {
    "use strict";
    angular.module('Main').config(function ($stateProvider) {
        $stateProvider
        .state('main.selectlocation', {
            url: "/selectlocation/:redirectState",
            templateUrl: "ApplicationComponents/DataEntry/SelectLocation/SelectLocation.html"
        })
    });
    angular.module('Main').controller('SelectLocationController', ['$scope', '$state', '$stateParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze',
        'CompanyService', 'LocationService', 'CustomerService', 'SurveyService', 'UserService', 'UserRoleService',
        'RoleService', 'SurveyCustomerLocationService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, UserRoleService,
        RoleService, SurveyCustomerLocationService, SelectionApplicationService) {
        
        $scope.Search = function () {
            var predicate = { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } };

            var predicate = {
                and: [
                   { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } },
                   { "Latitude": { '>=': $scope.Latitude - .1 } },
                   { "Latitude": { '<=': $scope.Latitude + .1 } },
                   { "Longitude": { '>=': $scope.Longitude - .1 } },
                   { "Longitude": { '<=': $scope.Longitude + .1 } }
                ]
            }
            LocationService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                $scope.Location = data;
            });
        }
        navigator.geolocation.getCurrentPosition(function (position) {
            $scope.Latitude = position.coords.latitude;
            $scope.Longitude = position.coords.longitude;
            $scope.Search();
        });

        $scope.Select = function (item) {
            SelectionApplicationService.SetLocation(item);
            SelectionApplicationService.SetLocationId(item.Id);
            $state.go('main.selectsurvey');
        }

        $scope.Go = function (item) {
            SelectionApplicationService.SetLocation(item);
            SelectionApplicationService.SetLocationId(item.Id);
            $state.go(SelectionApplicationService.GetRedirectState());
        }

        $scope.IsGoShown = function () {
            if (SelectionApplicationService.GetRedirectState() == 'main.survey') {
                return false;
            }
            else {
                return true;
            }
        }
    }]);
})(moment);