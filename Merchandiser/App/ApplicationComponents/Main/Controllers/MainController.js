(function (moment) {
    "use strict";    
    angular.module('Main').controller('MainController', ['$scope', 'CompanyApplicationService',
    function controller($scope, CompanyApplicationService) {       

        $scope.SelectedCompany = null;
        CompanyApplicationService.RegisterObserver(function () {
            $scope.SelectedCompany = CompanyApplicationService.SelectedCompany;
        })
        //TODO: If a regular user go to company, if a company customer assigned to a survey, go to the survey data page.
    }]);

})(moment);