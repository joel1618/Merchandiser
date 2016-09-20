(function (moment) {
    "use strict";    
    angular.module('Main').controller('MainController', ['$scope', '$state', 'CompanyApplicationService', 'SurveyApplicationService',
    function controller($scope, $state, CompanyApplicationService, SurveyApplicationService) {      
        //TODO: If a regular user go to company, if a company customer assigned to a survey, go to the survey data page.
        $scope.SelectedCompany = null;
        CompanyApplicationService.RegisterObserver(function () { 
            $scope.SelectedCompany = CompanyApplicationService.SelectedCompany;
        })

        $scope.SelectedSurvey = null;
        SurveyApplicationService.RegisterObserver(function(){
            $scope.SelectedSurvey = SurveyApplicationService.SelectedSurvey;
        })

        $scope.Route = function (state) {
            if (state == "main.company.addedit") {
                $state.go(state);
            }
            else {
                if (state == "main.surveycustomerlocation.addedit" || state == "main.surveyproductquestion.addedit") {
                    if (SurveyApplicationService.SelectedSurvey == undefined || SurveyApplicationService.SelectedSurvey == null || SurveyApplicationService.SelectedSurvey == "") {
                        toastr.error("A survey must be selected first.");
                    }
                    else {
                        $state.go(state);
                    }
                }
                else {
                    if (CompanyApplicationService.SelectedCompany == undefined || CompanyApplicationService.SelectedCompany == null || CompanyApplicationService.SelectedCompany == "") {
                        toastr.error("A company must be selected first.");
                    }
                    else {
                        $state.go(state);
                    }
                }
            }
        }
    }]);

})(moment);