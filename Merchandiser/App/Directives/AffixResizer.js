var app = angular.module('Directives');

app.directive('affixResizer', ['$window', '$timeout', function ($window, $timeout) {
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

            $timeout(function () {
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