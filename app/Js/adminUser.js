angular.module("angularJsApp").controller('adminUser', function ($state, sellerHomeService, $location, $scope, $http) {
    $scope.sellerHomeService = sellerHomeService;
    $scope.listOfUsers = [];
    $scope.start = 0;
    $scope.tab = 1;
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
        } else {
            str.email = $scope.search.searchName
        }
        console.log(str);
       
        $scope.listOfUsers = [];
        $scope.sellerHomeService.makeGetServiceCall( 'api/user/list_all_users',str,(response)=>{
            console.log(response);
            if(response.data && !response.data.error){
                $scope.listOfUsers = response.data;    
                $scope.listOfUsers.filter(data => data.active = data.active.toString()); 
                $scope.checkNextPrev(start, $scope.listOfUsers.length);           
            }else{
                $scope.listOfUsers = [];
            }
        });
    }


    $scope.addUserClick = function () {

        console.log('adduser');
        var param = {
            name: 'abc2',
            phone_number: '8989898933',
            email: 'abc2@gmail.com',
            password: 'abc123'
        };
        if (!param.name || !param.phone_number || !param.email || !param.password) {
            errorDiv.html("<div class='alert alert-danger'>All Fields are Required.</div>");
        }
        else {
            $scope.sellerHomeService.makePostServiceCall('api/user/adduser',param , (response)=>{
                console.log(response);
            });

        }
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

    $scope.init = function () {
        console.log('init Of User');
        $scope.getAllUserDetail($scope.start);
    }
    $scope.init();

});