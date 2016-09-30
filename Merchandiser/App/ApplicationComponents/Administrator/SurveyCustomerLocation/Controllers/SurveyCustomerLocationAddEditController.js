(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyCustomerLocationAddEditController', ['$scope', '$state', '$stateParams', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyCustomerLocationService',
        'CompanyApplicationService', 'SurveyApplicationService', 'CustomerService', 'LocationService', 'SelectionApplicationService',
    function controller($scope, $state, $stateParams, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyCustomerLocationService,
        CompanyApplicationService, SurveyApplicationService, CustomerService, LocationService, SelectionApplicationService) {

        CompanyApplicationService.NotifyObservers();
        SurveyApplicationService.NotifyObservers();

        $scope.Init = function(){
            $scope.item = { Id : null }
        }
        $scope.Search = function () {
            if ($stateParams.id !== undefined && $stateParams.id !== "") {
                SurveyCustomerLocationService.Get($stateParams.id).then(function (data) {
                    $scope.item = data;
                });
            }
        }
        $scope.Search();

        $scope.SearchCustomers = function (value) {
            var predicate = {
                and: [
                   { "Name": { "substringof": value } },
                   { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } }
                ]
            }
            return CustomerService.Search(predicate, ["Name asc"], 0, 20, false).then(function (data) {
                return data;
            });
        }

        $scope.SelectCustomer = function (item, model, label) {
            $scope.item.CustomerId = item.Id;
        }

        $scope.SearchLocations = function (value) {
            var predicate = {
                and: [
                   { "Name": { "substringof": value } },
                   { "CompanyId": { '==': SelectionApplicationService.GetCompanyId() } }
                ]
            }
            return LocationService.Search(predicate, ["Name asc"], 0, 20, false).then(function (data) {
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
                    $scope.Init();
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
                    $scope.Init();
                    //$state.go('main.surveycustomerlocation.addedit', {}, { reload: true, inherit: false });
                }, function (error) {
                    alert(error);
                });
            }
        }
    }]);

})(moment);