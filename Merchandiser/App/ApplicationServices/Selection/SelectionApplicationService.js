angular.module('ApplicationServices').service('SelectionApplicationService', function () {
    var observers = [];
    this.RegisterObserver = function (callback) {
        observers.push(callback);
    }

    this.NotifyObservers = function () {
        angular.forEach(observers, function (callback) {
            callback();
        });
    };

    this.CompanyId = null;
    this.GetCompanyId = function () {
        return this.CompanyId;
    };

    this.SetCompanyId = function (id) {
        this.CompanyId = id;
        this.NotifyObservers();
    }

    this.Company = null;
    this.GetCompany = function () {
        return this.Company;
    };

    this.SetCompany = function (item) {
        this.Company = item;
        this.NotifyObservers();
    }

    this.CustomerId = null;
    this.GetCustomerId = function () {
        return this.CustomerId;
    };

    this.SetCustomerId = function (id) {
        this.CustomerId = id;
        this.NotifyObservers();
    }

    this.LocationId = null;
    this.GetLocationId = function () {
        return this.LocationId;
    };

    this.SetLocationId = function (id) {
        this.LocationId = id;
        this.NotifyObservers();
    }

    this.SurveyId = null;
    this.GetSurveyId = function () {
        return this.SurveyId;
    };

    this.SetSurveyId = function (id) {
        this.SurveyId = id;
        this.NotifyObservers();
    }

    this.Survey = null;
    this.GetSurvey = function () {
        return this.Survey;
    };

    this.SetSurvey = function (item) {
        this.Survey = item;
        this.NotifyObservers();
    }

    this.SurveyHeaderId = null;
    this.GetSurveyHeaderId = function () {
        return this.SurveyHeaderId;
    };

    this.SetSurveyHeaderId = function (id) {
        this.SurveyHeaderId = id;
        this.NotifyObservers();
    }

    this.Clear = function () {
        this.CompanyId = null;
        this.Company = null;
        this.CustomerId = null;
        this.LocationId = null;
        this.SurveyId = null;
        this.Survey = null;
        this.SurveyHeaderId = null;
    }
});