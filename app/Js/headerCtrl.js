angular.module("angularJsApp").controller('headerCtrl', function ($state, $location,sellerHomeService, $scope, $http, $uibModal) {
    //console.log(GLOBAL_USER_NAME);
    $scope.sellerHomeService = sellerHomeService;
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
        // localStorage.removeItem('lastLoginBusinessType');
        location.href = "/#!/login";
    }
});