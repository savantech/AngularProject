angular.module("angularJsApp").directive('businessAddress', function () {
	return {
		restrict: 'AE',
		scope: {
			business: '=',
			submitted: '=',
			sameAsAbove: '=',
		},
		templateUrl: 'templates/directive/business-address.html',
		controller: function ($scope, $http, sellerHomeService) {
            $scope.sellerHomeService = sellerHomeService;
            // $scope.sameAsAbove = false;
            
			$scope.init = function () {
                $scope.sameAsAbove = false;
			}

			
            $scope.init();
            $scope.setRegisterAddressAsCorrespondence = function (){
                if($scope.sameAsAbove){
                    $scope.business.correspondence_address = {
                        state:'',
                        country:'',
                        pinCode:'',
                        city:'',
                        address:'',
                    }
                    if($scope.business.registered_address && $scope.business.registered_address.state && $scope.business.registered_address.country
                        && $scope.business.registered_address.pinCode && $scope.business.registered_address.city 
                        && $scope.business.registered_address.address){
                        $scope.business.correspondence_address.state = $scope.business.registered_address.state;
                        $scope.business.correspondence_address.country = $scope.business.registered_address.country;
                        $scope.business.correspondence_address.pinCode = $scope.business.registered_address.pinCode;
                        $scope.business.correspondence_address.city = $scope.business.registered_address.city;
                        $scope.business.correspondence_address.address = $scope.business.registered_address.address;
                    }else{
                        alert('Please enter all field in Registered Address.');
                        $scope.sameAsAbove = false;
                    }
                }
            }

		},
		link: function (scope, elem, attr) {
			// console.log("a......" + attr.businessTitle);
			// scope.factoringTitle = attr.businessTitle;

		}
	}

});