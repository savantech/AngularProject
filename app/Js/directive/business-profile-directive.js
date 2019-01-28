angular.module("angularJsApp").directive('businessProfile', function () {
	return {
		restrict: 'AE',
		scope: {
			business: '=',
			role: '=',
			submitted: '=',
			updatted: '=',
			businessTitle: '@',
		},
		templateUrl: 'templates/directive/business-profile.html',
		controller: function ($scope, $http, sellerHomeService) {
			$scope.sellerHomeService = sellerHomeService;
			$scope.listOfUser = [];
			$scope.url = window.COMPANY_LOGO;
			$scope.oneToFifty = [];

			$scope.init = function () {
				if ($scope.role == $scope.sellerHomeService.adminRole) {
					var param = {
						'start': 0,
						'count': -1
					};
					$scope.sellerHomeService.makeGetServiceCall("api/user/list_all_users",param ,(response) => {
						console.log(response);
						if(!response.data.error){
							$scope.listOfUser = response.data;
						}else{
							$scope.sellerHomeService.openAlert({ alertMsg: response.data.error, alertApi: '' });
						}
					});
				}
			}

			$scope.companyTypeRange = [{
				name: "Private Limited",
				value: "PRIVATE_LIMITED"
			}, {
				name: "Public Limited",
				value: 'PUBLIC_LIMITED'
			},{
				name: "Partnership",
				value: 'PARTNERSHIP'
			}, {
				name: "Sole Proprietorship",
				value: 'SOLE_PROPRIETORSHIP'
			}, {
				name: "LLP",
				value: "LLP"
			}];

			// $scope.$watch('business.business_type', function () {
			// 	$scope.business.designation = "Director";
			// 	console.log($scope.business.designation);
			// });

			$scope.verticalRange = [{
				name: "Automotive",
				value: "AUTOMOTIVE"
			}, {
				name: "Finance",
				value: "FINANCE"
			}, {
				name: "Services",
				value: "SERVICES"
			}, {
				name: "FMCG",
				value: "FMCG"
			}, {
				name: "Manufacturing",
				value: "MANUFACTURING"
			}, {
				name: "Energy/Oil and Gas",
				value: "ENERGY/OIL AND GAS"
			}, {
				name: "Information Technology",
				value: "INFORMATION TECHNOLOGY"
			}, {
				name: "Real Estate",
				value: "REAL ESTATE"
			}, {
				name: "Construction",
				value: "CONSTRUCTION"
			}, {
				name: "Entertainment",
				value: "ENTERTAINMENT"
			}, {
				name: "Hospitality",
				value: "HOSPITALITY"
			}, {
				name: "Retail",
				value: "RETAIL"
			}, {
				name: "Logistics",
				value: "LOGISTICS"
			}, {
				name: "Insurance",
				value: "INSURANCE"
			}, {
				name: "Government",
				value: "GOVERNMENT"
			}, {
				name: "Non profit",
				value: "NON PROFIT"
			}, {
				name: "Telecommunications",
				value: "TELECOMMUNICATIONS"
			}, {
				name: "Legal",
				value: "LEGAL"
			}, {
				name: "Electronics",
				value: "ELECTRONICS"
			}];

			for (var i = 0; i <= 50; i++) {
				$scope.oneToFifty.push({
					name: i,
					value: i.toString()
				});
			}

			$scope.open = function (type) {
				if (type) {
					$scope.popup[type] = true;
				} else {
					$scope.popup.opened = true;
				}
			};
			$scope.openForBusinessCreate = function (type) {
				if (type) {
					$scope.popupForBusinessCreate[type] = true;
				} else {
					$scope.popupForBusinessCreate.openedForBusinessCreate = true;
				}
			};

			$scope.popupForBusinessCreate = {
				openedForBusinessCreate: false,
				raiseOpenedForBusinessCreate: false
			};
			$scope.popup = {
				opened: false,
				raiseOpened: false
			};

			$scope.format = 'dd/MM/yyyy';

			$scope.employeRange = [{
				name: "1-10",
				value: "RANGE_1_10"
			}, {
				name: "10-25",
				value: "RANGE_10_25"
			}, {
				name: "25-100",
				value: "RANGE_25_100"
			}, {
				name: "100-500",
				value: "RANGE_100_500"
			}, {
				name: ">500",
				value: "RANGE_500_AND_ABOVE"
			}];


			$scope.revenueRange = ["< 5 lakhs", "5-10 lakhs",
				"10-25 lakhs", "25-50 lakhs", "50 lakhs - 1 crore",
				"1-5 crore", "5-10 crore", "> 10 crore"];

			$scope.revenueRange = [{
				name: "< 5 lakhs",
				value: "RANGE_1_5LAKHS"
			}, {
				name: "5-10 lakhs",
				value: "RANGE_5_10LAKHS"
			}, {
				name: "10-25 lakhs",
				value: "RANGE_10_25LAKHS"
			}, {
				name: "25-50 lakhs",
				value: "RANGE_25_50LAKHS"
			}, {
				name: "50 lakhs - 1 crore",
				value: "RANGE_50LAKHS_1CRORE"
			}, {
				name: "1-5 crore",
				value: "RANGE_1CRORE_5CRORE"
			}, {
				name: "5-10 crore",
				value: "RANGE_5CRORE_10CRORE"
			}, {
				name: "10-50 crore",
				value: "RANGE_10CRORE_50CRORE"
			}, {
				name: "50-100 crore",
				value: "RANGE_50CRORE_100CRORE"
			}, {
				name: "100-500 crore",
				value: "RANGE_100CRORE_500CRORE"
			}, {
				name: "500-1000 crore",
				value: "RANGE_500CRORE_1000CRORE"
			}, {
				name: ">1000 crore",
				value: "RANGE_GTE1000CRORE"
			}];

			$scope.statesList = [{
				"key": "AN",
				"name": "Andaman and Nicobar Islands"
			}, {
				"key": "AP",
				"name": "Andhra Pradesh"
			}, {
				"key": "AR",
				"name": "Arunachal Pradesh"
			}, {
				"key": "AS",
				"name": "Assam"
			}, {
				"key": "BR",
				"name": "Bihar"
			}, {
				"key": "CG",
				"name": "Chandigarh"
			}, {
				"key": "CH",
				"name": "Chhattisgarh"
			}, {
				"key": "DH",
				"name": "Dadra and Nagar Haveli"
			}, {
				"key": "DD",
				"name": "Daman and Diu"
			}, {
				"key": "DL",
				"name": "Delhi"
			}, {
				"key": "GA",
				"name": "Goa"
			}, {
				"key": "GJ",
				"name": "Gujarat"
			}, {
				"key": "HR",
				"name": "Haryana"
			}, {
				"key": "HP",
				"name": "Himachal Pradesh"
			}, {
				"key": "JK",
				"name": "Jammu and Kashmir"
			}, {
				"key": "JH",
				"name": "Jharkhand"
			}, {
				"key": "KA",
				"name": "Karnataka"
			}, {
				"key": "KL",
				"name": "Kerala"
			}, {
				"key": "LD",
				"name": "Lakshadweep"
			}, {
				"key": "MP",
				"name": "Madhya Pradesh"
			}, {
				"key": "MH",
				"name": "Maharashtra"
			}, {
				"key": "MN",
				"name": "Manipur"
			}, {
				"key": "ML",
				"name": "Meghalaya"
			}, {
				"key": "MZ",
				"name": "Mizoram"
			}, {
				"key": "NL",
				"name": "Nagaland"
			}, {
				"key": "OR",
				"name": "Odisha"
			}, {
				"key": "PY",
				"name": "Puducherry"
			}, {
				"key": "PB",
				"name": "Punjab"
			}, {
				"key": "RJ",
				"name": "Rajasthan"
			}, {
				"key": "SK",
				"name": "Sikkim"
			}, {
				"key": "TN",
				"name": "Tamil Nadu"
			}, {
				"key": "TS",
				"name": "Telangana"
			}, {
				"key": "TR",
				"name": "Tripura"
			}, {
				"key": "UK",
				"name": "Uttar Pradesh"
			}, {
				"key": "UP",
				"name": "Uttarakhand"
			}, {
				"key": "WB",
				"name": "West Bengal"
			}];
			$scope.init();

		},
		link: function (scope, elem, attr) {
			console.log("a......" + attr.businessTitle);
			scope.factoringTitle = attr.businessTitle;

		}
	}

});