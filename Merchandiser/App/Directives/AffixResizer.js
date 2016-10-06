var app = angular.module('Directives');

app.directive('affixResizer', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {

            angular.element($window).on('resize', function () {
                if ($window.innerWidth > 992) {
                    elem.addClass('affix');
                }
                else {
                    elem.removeClass('affix');
                }
            });

            angular.element($window).on('load', function () {
                debugger;
                if ($window.innerWidth > 992) {
                    elem.addClass('affix');
                }
                else {
                    elem.removeClass('affix');
                }
            });
        }
    }
}]);