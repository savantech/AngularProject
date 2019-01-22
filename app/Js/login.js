angular.module("angularJsApp").controller("loginC", ['$scope', '$http', function ($scope,$state, $http) {


    $scope.sendtopath = function () {
        console.log('sendtopathss');
        // window.location = "/admin-business";
        // $state.go('admin-business');
        location.href = "/#!/admin/admin-business";
        location.reload();
    }
    $scope.helloWorld = function () {
        console.log('hello World');
    }
    $scope.helloWorld();

    

}]);

