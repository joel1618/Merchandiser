angular.module('ApplicationServices').service('SelectionApplicationService', function () {
    this.CompanyId = null;
    this.GetCompanyId = function () {
        return this.CompanyId;
    };

    this.SetCompanyId = function (id) {
        this.CompanyId = id;
    }

    this.CustomerId = null;
    this.GetCustomerId = function () {
        return this.CustomerId;
    };

    this.SetCustomerId = function (id) {
        this.CustomerId = id;
    }

    this.LocationId = null;
    this.GetLocationId = function () {
        return this.LocationId;
    };

    this.SetLocationId = function (id) {
        this.LocationId = id;
    }

    this.SurveyId = null;
    this.GetSurveyId = function () {
        return this.SurveyId;
    };

    this.SetSurveyId = function (id) {
        this.SurveyId = id;
    }

    this.SurveyHeaderId = null;
    this.GetSurveyHeaderId = function () {
        return this.SurveyHeaderId;
    };

    this.SetSurveyHeaderId = function (id) {
        this.SurveyHeaderId = id;
    }
});