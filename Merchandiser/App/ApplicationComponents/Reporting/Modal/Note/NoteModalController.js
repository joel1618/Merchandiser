angular.module('Main').controller('NoteModalController', function ($scope, $uibModalInstance, note) {
    debugger;
    $scope.note = note;

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});