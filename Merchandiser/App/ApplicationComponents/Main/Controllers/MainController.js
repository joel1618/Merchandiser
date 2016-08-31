(function (moment) {
    "use strict";    
    angular.module('Main').controller('MainController', ['$scope', 'CompanyApplicationService', 'SurveyApplicationService',
    function controller($scope, CompanyApplicationService, SurveyApplicationService) {      
        //TODO: If a regular user go to company, if a company customer assigned to a survey, go to the survey data page.
        $scope.SelectedCompany = null;
        CompanyApplicationService.RegisterObserver(function () { 
            $scope.SelectedCompany = CompanyApplicationService.SelectedCompany;
        })

        $scope.SelectedSurvey = null;
        SurveyApplicationService.RegisterObserver(function(){
            $scope.SelectedSurvey = SurveyApplicationService.SelectedSurvey;
        })
        
        $scope.SelectedNavigation = "Companies";
    }]);

})(moment);