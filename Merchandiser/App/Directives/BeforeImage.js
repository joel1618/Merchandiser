//http://stackoverflow.com/questions/19986178/displaying-an-image-after-uploading-in-angular-js
var app = angular.module('Directives');

app.directive('beforeImage', [function () {
    return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $scope.BeforeImage = e.target.result;
                $scope.$apply();
            }

            elem.on('change', function () {
                $scope.Header.IsBeforeImage = true;
                $scope.Header.BeforeImage = elem[0].files[0];
                reader.readAsDataURL(elem[0].files[0]);
            });
        }
    }
}]);