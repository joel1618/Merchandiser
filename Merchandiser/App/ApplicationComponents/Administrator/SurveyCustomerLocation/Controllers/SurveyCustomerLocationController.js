(function (moment) {
    "use strict";    
    angular.module('Main').controller('SurveyCustomerLocationController', ['$scope', '$state', '$routeParams', '$http', '$location', '$timeout', 'breezeservice', 'breeze', 'SurveyCustomerLocationService',
        'CompanyApplicationService', 'SurveyApplicationService', 'SelectionApplicationService',
    function controller($scope, $state, $routeParams, $http, $location, $timeout, breezeservice, breeze, SurveyCustomerLocationService,
        CompanyApplicationService, SurveyApplicationService, SelectionApplicationService) {
        $scope.Search = function () {
            var p1 = new breeze.Predicate('SurveyId', '==', SelectionApplicationService.GetSurveyId());
            //var p2 = new breeze.Predicate('Longitude', '<', 1);
            //var predicate = new breeze.Predicate.and([p1, p2]);
            SurveyCustomerLocationService.Search(p1, 0, 100, false).then(function (data) {
                $scope.items = data;
            });
        }
        $scope.Search();

        $scope.Edit = function (Id) {
            $state.go('main.admin.surveycustomerlocation.addedit', { id: Id }, { reload: false });
        }

        $scope.Delete = function (Id) {
            SurveyCustomerLocationService.Delete(Id).then(function (data) {
                $scope.Search();
            })
        }
    }]);

})(moment);