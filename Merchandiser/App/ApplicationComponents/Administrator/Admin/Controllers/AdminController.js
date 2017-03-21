(function (moment) {
    "use strict";
    angular.module('Main').controller('AdminController', ['$scope', '$state', 'SelectionApplicationService', 'SurveyCustomerLocationProductQuestionService',
    function controller($scope, $state, SelectionApplicationService, SurveyCustomerLocationProductQuestionService) {
        //TODO: If a regular user go to company, if a company customer assigned to a survey, go to the survey data page.
        $scope.SelectedCompany = null;
        SelectionApplicationService.RegisterObserver(function () {
            $scope.SelectedCompany = SelectionApplicationService.GetCompany();
        })

        $scope.SelectedSurvey = null;
        SelectionApplicationService.RegisterObserver(function () {
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
                else if (state == "main.admin.surveycustomerlocationproductquestion2.addedit") {
                    if (SelectionApplicationService.GetSurvey() == null || SelectionApplicationService.GetSurveyId() == null) {
                        toastr.error("A survey must be selected first.");
                    }
                    else {
                        $state.go(state);
                    }
                }
                else if (state == "main.admin.producttypedetail.addedit") {
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

        $scope.PreviewSurvey = function () {
            var selectedSurveyId = SelectionApplicationService.GetSurveyId();
            if (selectedSurveyId != null) {
                SurveyCustomerLocationProductQuestionService.Search()
                var predicate = {
                    and: [
                        { "SurveyId": { "==": selectedSurveyId } }
                    ]
                }
                SurveyCustomerLocationProductQuestionService.Search(predicate, [], 0, 1, false).then(function (data) {
                    if (data.Results.length != 0) {
                        SelectionApplicationService.SetCompanyId(data.Results[0].CompanyId);
                        SelectionApplicationService.SetCustomerId(data.Results[0].CustomerId);
                        SelectionApplicationService.SetLocationId(data.Results[0].LocationId);
                        SelectionApplicationService.SetSurveyId(data.Results[0].SurveyId);
                        $state.go('main.survey');
                    }
                    else {
                        toastr.error("No elements have been added to this survey to preview");
                    }
                });

            }
            else {
                toastr.error("A survey must be selected first.");
            }
        }
    }]);

})(moment);