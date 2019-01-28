angular.module("angularJsApp").controller("loginC", function ($scope, $state, sellerHomeService, $http) {

    $scope.signInObj = {};
    $scope.sellerHomeService = sellerHomeService;
    $scope.loginClick = function () {
        var errorDiv = $("#error_msg");
        errorDiv.html("");
        if (!$scope.signInObj.user_name || !$scope.signInObj.password) {
            errorDiv.html("<div class='alert alert-danger'>Please enter valid username or password.</div>");
            return;
        }
        var param = {
            user_name: $scope.signInObj.user_name,
            password: $scope.signInObj.password
        }
        console.log(param);
        $scope.sellerHomeService.makePostServiceCall('api/user/free/login', param, (response) => {
            console.log(response);
            if (!response.data.error) {
                localStorage.setItem('loginUser',JSON.stringify(response.data));
                location.href = "/#!/admin/admin-business";
                location.reload();
            } else {
                errorDiv.html("<div class='alert alert-danger'>" + response.data.error + "</div>");
            }
        });
        // $http({
        //     method: 'POST',
        //     url: $scope.sellerHomeService.url + 'api/user/free/login',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     },
        //     data: $.param(param)
        // }).then(function (res) {
        //     console.log("______data below_____");
        //     console.log(res.data);
        //     console.log(JSON.stringify(res.data));
        //     localStorage.setItem('loginUser',JSON.stringify(res.data));
        //     location.href = "/#!/admin/admin-business";
        //     location.reload();
        // });


    }
    $scope.helloWorld = function () {
        console.log('hello World');
    }
    $scope.helloWorld();



});

