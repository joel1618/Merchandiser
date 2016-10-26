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
        'RoleService', 'SurveyCustomerLocationProductQuestionService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $http, $location, $timeout, breezeservice, breeze,
        CompanyService, LocationService, CustomerService, SurveyService, UserService, UserRoleService,
        RoleService, SurveyCustomerLocationProductQuestionService, SelectionApplicationService) {
        
        $scope.LocationServicesDisabled = false;
        $scope.Location = [];
        $scope.Search = function () {
            if (SelectionApplicationService.GetRedirectState() == 'main.survey') {
                var predicate = {
                    and: [
                       { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } },
                       { "CustomerId": { '==': SelectionApplicationService.GetCustomerId() } }
                    ]
                }
                SurveyCustomerLocationProductQuestionService.Search(predicate, ["Created asc"], 0, 100, false).then(function (data) {
                    angular.forEach(data, function (value, key) {
                        var item = {
                            Id: value.Location.Id,
                            Name: value.Location.Name
                        }
                        if ($scope.Location.indexOf(item) == -1) {
                            $scope.Location.push(item);
                        }
                    });
                });
            }
            else {
                var predicate = {
                    and: [
                       { "CompanyId": { "==": SelectionApplicationService.GetCompanyId() } },
                       { "Latitude": { '>=': $scope.Latitude - .0725 } },
                       { "Latitude": { '<=': $scope.Latitude + .0725 } },
                       { "Longitude": { '>=': $scope.Longitude - .0725 } },
                       { "Longitude": { '<=': $scope.Longitude + .0725 } }
                    ]
                }
                LocationService.Search(predicate, ["Name asc"], 0, 100, false).then(function (data) {
                    if (SelectionApplicationService.GetRole() == "Customer") {
                        $state.go('main.selectsurvey');
                    }
                    if (data.length < 1) {
                        $scope.LocationServicesDisabled = true;
                    }
                    else if (data.length == 1) {
                        $scope.Select(data[0]);
                    }
                    $scope.Location = data;
                });
            }
            
        }
        navigator.geolocation.getCurrentPosition(function (position) {
            $scope.Latitude = position.coords.latitude;
            $scope.Longitude = position.coords.longitude;
            $scope.Search();
        }, function (error) {
            toastr.error("User has denied geolocation for this site.  Please allow location services to get your location to find locations near you.");
            $scope.LocationServicesDisabled = true;
        });

        $scope.ChangeAddress = function (value) {
            var address = JSON.stringify(value);
            return $http.get('https://maps.google.com/maps/api/geocode/json?address=' + address + '&sensor=false').then(function (data) {
                return data.data.results;
            });
        }

        $scope.SelectAddress = function (item, model, label) {
            $scope.Latitude = item.geometry.location.lat;
            $scope.Longitude = item.geometry.location.lng;
            $scope.LocationServicesDisabled = false;
            $scope.Search();
        }

        $scope.Select = function (item) {
            SelectionApplicationService.SetLocation(item);
            SelectionApplicationService.SetLocationId(item.Id);
            $state.go('main.selectsurvey');
        }

        $scope.Continue = function () {
            $state.go('main.selectsurvey');
        }

        $scope.IsContinueShown = function () {
            if (SelectionApplicationService.GetRedirectState() == 'main.survey') {
                return false;
            }
            else {
                return true;
            }
        }
    }]);
})(moment);