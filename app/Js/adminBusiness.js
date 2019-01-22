angular.module("angularJsApp").controller('adminBusiness', function ($state, sellerHomeService, $location, $scope, $http) {
    $scope.sellerHomeService = sellerHomeService;
    $scope.businessStatusList = [];
    $scope.latestBusiness = [];
    $scope.start = 0;
    $scope.serchVar = {
        selectedBusinessStatus: '',
        searchName: ''
    };

    $scope.fetchBusinessWithStatus = function (start) {
        console.log('getting data')
        $scope.latestBusiness = null;
        $scope.checkNextPrev(start, 10);
        $scope.start = start;
        var str = 'start=' + (start * 10) + "&count=10";
        $scope.sellerHomeService.makeGetServiceCall("/capitallever/api/business/list?" + str +
            "&business_status=" + $scope.serchVar.selectedBusinessStatus + '&business_name=' + $scope.serchVar.searchName).then(function (response) {
                $scope.latestBusiness = response.data;
                $scope.checkNextPrev(start, $scope.latestBusiness.length);
            }, function (error) {
                console.log('come here so display')
                $scope.latestBusiness = [];
            });
    }
    $scope.init = function () {
        $scope.fetchBusinessWithStatus($scope.start);
        console.log('init from buisness')
    }


    $scope.checkNextPrev = function (ppos, npos) {
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
    $scope.init();

});