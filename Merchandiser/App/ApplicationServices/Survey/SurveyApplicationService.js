angular.module('ApplicationServices').service('SurveyApplicationService', function () {
    
    var observers = [];
    this.RegisterObserver = function (callback) {
        observers.push(callback);
    }

    this.NotifyObservers = function () {
        angular.forEach(observers, function (callback) {
            callback();
        });
    };

    this.SelectedSurvey = {};
    this.GetSelectedCompany = function () {
        return SelectedSurvey;
    };

    this.SetSelectedSurvey = function (survey) {
        this.SelectedSurvey = survey;
        this.NotifyObservers();
    }
});