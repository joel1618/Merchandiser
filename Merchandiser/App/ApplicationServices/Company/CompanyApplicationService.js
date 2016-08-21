angular.module('ApplicationServices').service('CompanyApplicationService', function () {
    
    var observers = [];
    this.RegisterObserver = function (callback) {
        observers.push(callback);
    }

    this.NotifyObservers = function () {
        angular.forEach(observers, function (callback) {
            callback();
        });
    };

    this.SelectedCompany = {};
    this.GetSelectedCompany = function () {
        return SelectedCompany;
    };

    this.SetSelectedCompany = function (company) {
        this.SelectedCompany = company;
        this.NotifyObservers();
    }
});