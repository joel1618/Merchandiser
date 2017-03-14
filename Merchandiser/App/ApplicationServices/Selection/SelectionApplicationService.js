(function (moment) {
    "use strict";
    angular.module('ApplicationServices').service('SelectionApplicationService', function (localStorageService) {
        var observers = [];
        this.RegisterObserver = function (callback) {
            observers.push(callback);
        }

        this.NotifyObservers = function () {
            angular.forEach(observers, function (callback) {
                callback();
            });
        };

        this.RedirectState = null;
        this.GetRedirectState = function () {
            return this.RedirectState;
        }

        this.SetRedirectState = function (state) {
            this.RedirectState = state;
        }

        this.CompanyId = null;
        this.GetCompanyId = function () {
            var localStorage = localStorageService.get('CompanyId');
            if (localStorage != null)
                return localStorage;
            return this.CompanyId;
        };

        this.SetCompanyId = function (id) {
            localStorageService.set('CompanyId', id);
            this.CompanyId = id;
            this.NotifyObservers();
        }

        this.Company = null;
        this.GetCompany = function () {
            var localStorage = localStorageService.get('Company');
            if (localStorage != null)
                return localStorage;
            return this.Company;
        };

        this.SetCompany = function (item) {
            localStorageService.set('Company', item);
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

        this.Customer = null;
        this.GetCustomer = function () {
            return this.Customer;
        };

        this.SetCustomer = function (item) {
            this.Customer = item;
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

        this.Location = null;
        this.GetLocation = function () {
            return this.Location;
        };

        this.SetLocation = function (item) {
            this.Location = item;
            this.NotifyObservers();
        }

        this.SurveyId = null;
        this.GetSurveyId = function () {
            var localStorage = localStorageService.get('SurveyId');
            if (localStorage != null)
                return localStorage;
            return this.SurveyId;
        };

        this.SetSurveyId = function (id) {
            localStorageService.set('SurveyId', id);
            this.SurveyId = id;
            this.NotifyObservers();
        }

        this.Survey = null;
        this.GetSurvey = function () {
            var localStorage = localStorageService.get('Survey');
            if (localStorage != null)
                return localStorage;
            return this.Survey;
        };

        this.SetSurvey = function (item) { 
            localStorageService.set('Survey', item);
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

        this.Role = null;
        this.GetRole = function () {
            return this.Role;
        }

        this.SetRole = function (role) {
            this.Role = role;
            this.NotifyObservers();
        }

        this.momentStartDate = moment().startOf('isoWeek');
        this.StartDate = new Date(this.momentStartDate);
        this.GetStartDate = function () {
            var date = this.StartDate;
            return date;
        }

        this.SetStartDate = function (date) {
            this.StartDate = date;
        }

        this.EndDate = new Date(moment().add(2, "days"));
        this.GetEndDate = function () {
            var date = this.EndDate;
            return date;
        }

        this.SetEndDate = function (date) {
            this.EndDate = date;
        }

        this.ProductTypeHeader = null;
        this.GetProductTypeHeader = function () {
            var localStorage = localStorageService.get('ProductTypeHeader');
            if (localStorage != null)
                return localStorage;
            return this.ProductTypeHeader;
        }

        this.SetProductTypeHeader = function (item) {
            localStorageService.set('ProductTypeHeader', item);
            this.ProductTypeHeader = item;
            this.NotifyObservers();
        }

        this.Clear = function () {
            this.RedirectState = null;

            this.CompanyId = null;
            this.Company = null;

            this.CustomerId = null;
            this.Customer = null;

            this.LocationId = null;
            this.Location = null;

            this.SurveyId = null;
            this.Survey = null;

            this.SurveyHeaderId = null;
        }
    });
})(moment);