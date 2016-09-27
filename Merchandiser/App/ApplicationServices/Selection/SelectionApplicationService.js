angular.module('ApplicationServices').service('SelectionApplicationService', function () {

    this.CompanyId = null;
    this.CustomerId = null;
    this.LocationId = null;
    this.SurveyId = null;
    this.SurveyHeaderId = null;

    this.GetCompanyId = function () {
        return this.CompanyId;
    };

    this.SetCompanyId = function (id) {
        this.CompanyId = id;
    }

    this.GetCustomerId = function () {
        return this.CustomerId;
    };

    this.SetCustomerId = function (id) {
        this.CustomerId = id;
    }

    this.GetLocationId = function () {
        return this.LocationId;
    };

    this.SetLocationId = function (id) {
        this.LocationId = id;
    }

    this.GetSurveyId = function () {
        return this.SurveyId;
    };

    this.SetSurveyId = function (id) {
        this.SurveyId = id;
    }

    this.GetSurveyHeaderId = function () {
        return this.SurveyHeaderId;
    };

    this.SetSurveyHeaderId = function (id) {
        this.SurveyHeaderId = id;
    }
});