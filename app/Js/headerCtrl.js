angular.module("angularJsApp").controller('headerCtrl', function ($state, $location, sellerHomeService, $scope, $http, $uibModal) {
    //console.log(GLOBAL_USER_NAME);
    $scope.sellerHomeService = sellerHomeService;
    $scope.userObject = {};
    
    $scope.init = function () {
        $scope.sellerHomeService.userObject = JSON.parse(localStorage.getItem('loginUser'));
        if($scope.sellerHomeService.userObject){
            $scope.sellerHomeService.apiKey = $scope.sellerHomeService.userObject.apiKey;
            $scope.sellerHomeService.apiId = $scope.sellerHomeService.userObject.apiId;
        }

    }
    $scope.init()

    // $scope.switchUser = function (bussinessType) {
    //     var str = LOGGED_IN_USER_ID + '/business_type?business_type=' + bussinessType;
    //     $http.post('/capitallever/api/user/' + str).then(function (response) {
    //         console.log(response.data);
    //         localStorage.setItem('lastLoginBusinessType', bussinessType);
    //         location.href = "/capitallever/app/" + bussinessType + "#!/dashboard";
    //     }, function (error) {
    //         $scope.sellerHomeService.openAlert({alertMsg: error.data.error, alertApi: error.config.url});
    //     });
    // }




    $scope.logout = function () {
        console.log('called')
        localStorage.removeItem('loginUser');
        location.href = "/#!/login";
    }
});