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
        errorDiv.html("");
        if (!param.name || !param.phone_number || !param.email || !param.password) {
            errorDiv.html("<div class='alert alert-danger'>All Fields are Required.</div>");
        }
        else {
            $scope.sellerHomeService.makePostServiceCall('api/user/free/signup', param , (response)=>{
                console.log(response);
                if(!response.data.error){
                    location.href = "/#!/login";
                }else{
                    errorDiv.html("<div class='alert alert-danger'>"+ response.data.error +"</div>");
                }
            });
        }
    }

    $scope.helloWorld = function () {
        console.log('hello World with sign up');
        // console.log($scope.sellerHomeService.onObj);
    }
    $scope.helloWorld();
});

