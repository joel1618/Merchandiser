﻿(function (moment) {
    "use strict";    
    angular.module('Main').controller('AdminController', ['$scope', '$state', 'SelectionApplicationService',
    function controller($scope, $state, SelectionApplicationService) {
        //TODO: If a regular user go to company, if a company customer assigned to a survey, go to the survey data page.
        $scope.SelectedCompany = null;
        SelectionApplicationService.RegisterObserver(function () {
            $scope.SelectedCompany = SelectionApplicationService.GetCompany();
        })

        $scope.SelectedSurvey = null;
        SelectionApplicationService.RegisterObserver(function(){
            $scope.SelectedSurvey = SelectionApplicationService.GetSurvey();
        })

        $scope.SelectedProductTypeHeader = null;
        SelectionApplicationService.RegisterObserver(function () {
            $scope.SelectedProductTypeHeader = SelectionApplicationService.GetProductTypeHeader();
        })

        $scope.Route = function (state) {
            if (state == "main.admin.company.addedit") {
                $state.go(state);
            }
            else {
                if (state == "main.admin.surveycustomerlocationproductquestion.addedit") {
                    if (SelectionApplicationService.GetSurvey() == null || SelectionApplicationService.GetSurveyId() == null) {
                        toastr.error("A survey must be selected first.");
                    }
                    else {
                        $state.go(state);
                    }
                }
                else if(state == "main.admin.producttypedetail.addedit") {
                    if (SelectionApplicationService.GetProductTypeHeader() == null) {
                        toastr.error("A product type must be selected first.");
                    }
                    else {
                        $state.go(state);
                    }
                }
                else {
                    if (SelectionApplicationService.GetCompany() == null || SelectionApplicationService.GetCompanyId() == null) {
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