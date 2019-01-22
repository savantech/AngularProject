angular.module("angularJsApp").controller('adminUser', function ($state,sellerHomeService, $location, $scope, $http) {
    $scope.sellerHomeService = sellerHomeService;
    $scope.listOfUsers = [];
    $scope.start = 0;
    $scope.search = {
        searchName: ''
    }
    
    $scope.getAllUserDetail = function (start) {
        $scope.listOfUsers = null;
        $scope.checkNextPrev(start, 10);
        $scope.start = start;
        var str = {
            start: (start * 10),
            count: 10
        };
        if ($scope.search.searchName && $scope.sellerHomeService.checkPhoneNumberOrEmail($scope.search.searchName)) {
            str.phone_number = $scope.search.searchName
        }else{
            str.email = $scope.search.searchName
        }
        console.log(str);
        // return ;
        $http(
            {
                method: 'GET',
                url: '/capitallever/api/user/list_all_users',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params: str
            }).then(function (response) {
                $scope.listOfUsers = response.data;
                $scope.listOfUsers.filter(data => data.active = data.active.toString());
                console.log($scope.listOfUsers);
                $scope.checkNextPrev(start, $scope.listOfUsers.length);
            }, function (error) {
                $scope.listOfUsers = [];
            });
    }

    $scope.checkNextPrev = function (ppos, npos) {
        console.log(npos);
        if (ppos <= 0) {
            $scope.hasPrev = false;
        } else {
            $scope.hasPrev = true;
        }
        if (npos <= 9) {
            $scope.hasNext = false;
        } else {
            $scope.hasNext = true;
        }
    }
    $scope.checkNextPrev(0, 10);

    $scope.init = function (){
        console.log('init Of User');
        $scope.getAllUserDetail($scope.start);
    }
    $scope.init();
    
});