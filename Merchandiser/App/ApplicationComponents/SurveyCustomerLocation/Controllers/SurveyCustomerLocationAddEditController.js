(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyCustomerLocationAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyCustomerLocationService',
        'CompanyApplicationService', 'SurveyApplicationService', 'CustomerService', 'LocationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyCustomerLocationService,
        CompanyApplicationService, SurveyApplicationService, CustomerService, LocationService) {

        CompanyApplicationService.NotifyObservers();
        SurveyApplicationService.NotifyObservers();

        $scope.item = { Id : null }
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                SurveyCustomerLocationService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.SearchCustomers = function (value) {
            var p1 = new breeze.Predicate('Name', "substringof", value);
            var p2 = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
            var predicate = new breeze.Predicate.and([p1, p2]);
            return CustomerService.Search(predicate, 0, 20, false).then(function (data) {
                return data;
            });
        }

        $scope.SelectCustomer = function (item, model, label) {
            $scope.item.CustomerId = item.Id;
        }

        $scope.SearchLocations = function (value) {
            var p1 = new breeze.Predicate('Name', "substringof", value);
            var p2 = new breeze.Predicate('CompanyId', '==', CompanyApplicationService.SelectedCompany.Id);
            var predicate = new breeze.Predicate.and([p1, p2]);
            return LocationService.Search(predicate, 0, 20, false).then(function (data) {
                return data;
            });
        }

        $scope.SelectLocation = function (item, model, label) {
            $scope.item.LocationId = item.Id;
        }

        $scope.Save = function () {
            if ($scope.item.Id !== undefined && $scope.item.Id !== null && $scope.item.Id !== "") {
                SurveyCustomerLocationService.Update($scope.item.Id, $scope.item).then(function (data) {
                    $scope.$parent.Search();
                    //$state.go('main.surveycustomerlocation.addedit', { }, { reload: true, inherit: false });
                }, function (error) {
                    alert(error);
                });
            }
            else {
                $scope.item.CompanyId = CompanyApplicationService.SelectedCompany.Id;
                $scope.item.SurveyId = SurveyApplicationService.SelectedSurvey.Id;
                SurveyCustomerLocationService.Create($scope.item).then(function (data) {
                    $scope.$parent.Search();
                    //$state.go('main.surveycustomerlocation.addedit', {}, { reload: true, inherit: false });
                }, function (error) {
                    alert(error);
                });
            }
        }
    }]);

})(moment);