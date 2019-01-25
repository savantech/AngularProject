angular.module("angularJsApp").controller("loginC", function ($scope,$state,sellerHomeService, $http) {

    $scope.signInObj = {};
    $scope.sellerHomeService = sellerHomeService;
    $scope.loginClick = function () {
        console.log('sendtopathss');
        // window.location = "/admin-business";
        // $state.go('admin-business');
        var param = {
            user_name: $scope.signInObj.user_name,
            password: $scope.signInObj.password
        }
        $http({
            method: 'POST',
            url: $scope.sellerHomeService.url + 'api/user/free/login',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: $.param(param)
        }).then(function (res) {
            console.log("______data below_____");
            console.log(res.data);
            console.log(JSON.stringify(res.data));
            localStorage.setItem('loginUser',JSON.stringify(res.data));
            location.href = "/#!/admin/admin-business";
            location.reload();
        });


    }
    $scope.helloWorld = function () {
        console.log('hello World');
    }
    $scope.helloWorld();

    

});

