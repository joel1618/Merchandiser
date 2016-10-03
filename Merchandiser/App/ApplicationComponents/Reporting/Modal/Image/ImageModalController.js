angular.module('Main').controller('ImageModalController', function ($uibModalInstance, $scope, title, id) {
    $scope.id = id;
    $scope.title = title;

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});