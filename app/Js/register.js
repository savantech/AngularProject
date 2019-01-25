angular.module("angularJsApp").controller('registerCtrl', function ($state, sellerHomeService, $location, $scope, $http) {
    $scope.signupObj = {};
    $scope.sellerHomeService = sellerHomeService;
    $scope.callSignUp = function () {
        var errorDiv = $("#error_msg");
        var param = {
            name: $scope.signupObj.name,
            phone_number: $scope.signupObj.phone_number,
            email: $scope.signupObj.email,
            password: $scope.signupObj.password
        };
        if (!param.name || !param.phone_number || !param.email || !param.password) {
            errorDiv.html("<div class='alert alert-danger'>All Fields are Required.</div>");
        }
        else {
            // $http({
            //     method: 'POST',
            //     // url: $scope.sellerHomeService.url + 'api/user/free/signup?api_key'+"123"+"&api_id"+"456",
            //     url: $scope.sellerHomeService.url + 'api/user/free/signup',
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     },
            //     data: $.param(param)
            // }).then(function (res) {
            //     console.log("______data below_____");
            //     console.log(res);
            //     location.href = "/#!/login";
                
                
            // });
            $scope.sellerHomeService.makePostServiceCall('api/user/free/signup', param , (response)=>{
                console.log(response);
                location.href = "/#!/login";
            });
        }
    }

    $scope.helloWorld = function () {
        console.log('hello World with sign up');
        // console.log($scope.sellerHomeService.onObj);
    }
    $scope.helloWorld();
});

