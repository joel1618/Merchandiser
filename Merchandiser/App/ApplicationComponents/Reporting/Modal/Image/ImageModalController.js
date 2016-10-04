angular.module('Main').controller('ImageModalController', function ($uibModalInstance, $scope, title, image) {
    $scope.image = image;
    $scope.title = title;

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});