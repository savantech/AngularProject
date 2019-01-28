angular.module("angularJsApp")
    .directive(
        'fiBusinessType',
        function () {
            return {
                restrict: 'AE',
                scope: {
                    businessId: '=',
                    businessTypeParams: '=',
                    editFiBusinessTypeCallBack: '&'
                },
                templateUrl: 'templates/directive/fi-business-type-directive.html',
                controller: function ($scope, $http, sellerHomeService) {
                    console.log("call fi business type directive..." + $scope.businessId);
                    $scope.sellerHomeService = sellerHomeService;
                    $scope.oneToThirty = [];
                    $scope.businessTypeParams.enable_marketplace = true;
                    // $scope.errorDivForBusinessType = $("#displayMsgOfEditBusinessType");
                    // $scope.businessTypeParams = {};
                    for (var i = 0; i <= 30; i++) {
                        $scope.oneToThirty.push(i);
                    }
                    $scope.penalRate = [];
                    for (var i = 0; i <= 10; i++) {
                        $scope.penalRate.push(i);
                    }

                    $scope.getFiDetail = function () {
                        // $scope.businessId = businessId;
                        // $scope.errorDivForBusiness
                        //     .html("");
                        console.log($scope.businessId);
                        if ($scope.businessId) {
                            // $scope.sellerHomeService.makeGetServiceCall("api/business/list", param,  (response) => {
                            //     console.log(response);
                            //     if(!response.data.error){
                            //         $scope.latestBusiness = response.data;
                            //         $scope.checkNextPrev(start, $scope.latestBusiness.length);
                            //     }else{
                            //         $scope.sellerHomeService.openAlert({ alertMsg: response.data.error, alertApi: '' });
                            //         $scope.latestBusiness = [];
                            //     }
                            // });
                                // $http(
                                // {
                                //     method: 'GET',
                                //     url: '/capitallever/api/fi/' + $scope.businessId,
                                //     headers: {
                                //         'Content-Type': 'application/x-www-form-urlencoded'
                                //     }
                                // }).then(function (response) {
                                //     console.log(response.data);
                                //     $scope.businessTypeParams.financier_type = response.data.financierType;
                                //     $scope.businessTypeParams.penalty_interest_applicable_after_days = response.data.penaltyInterestAfterDays != null ? response.data.penaltyInterestAfterDays.toString() : '';
                                //     $scope.businessTypeParams.penalty_interest_additional_increment = response.data.penaltyInterestAdditionalIncrement != null ? response.data.penaltyInterestAdditionalIncrement.toString() : '';
                                //     $scope.businessTypeParams.loan_procesing_average_time_days = response.data.loanProcessingTimeInDays != null ? response.data.loanProcessingTimeInDays.toString() : '';
                                //     $scope.businessTypeParams.platform_maximum_exposure = response.data.platformMaxExposure != null ? response.data.platformMaxExposure.toString() : '';
                                //     $scope.businessTypeParams.stamp_duty_state = response.data.stampDuty != null ? response.data.stampDuty.toString() : '';
                                //     $scope.businessTypeParams.platform_rate_yearly = response.data.platformRateYearly;
                                //     $scope.businessTypeParams.penalty_processing_flat_fee = response.data.penaltyProcessingFlatFee;
                                //     $scope.businessTypeParams.enable_marketplace = response.data.enableMarketplace;
                                // });
                        }
                    }

                    $scope.createOrUpdateBusinessType = function () {
                        if ($scope.business_type_display === '') {
                            // $scope.sellerHomeService.openAlert("Select a business type.");
                            // errorDiv
                            //     .html("<div class='alert alert-danger' align='center' >Select a business type.</div>");
                            return;
                        }
                        if ($scope.businessId) {
                            $http(
                                {
                                    method: 'POST',
                                    url: '/capitallever/api/fi/'
                                        + $scope.businessId,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    },
                                    data: $.param($scope.businessTypeParams)
                                }).then(function (res) {
                                    $scope.getFiDetail();
                                }, function (error) {
                                    // $scope.sellerHomeService.openAlert({ alertMsg: error.data.error, alertApi: error.config.url });
                                });
                        }
                    }
                    $scope.getFiDetail();
                },
                link: function (scope, elem, attr) {
                    console.log(scope)
                    scope.editFiBusinessTypeCallBack({
                        editFiBusinessType: function (businessId, isUpdate) {
                            console.log("call fi edit");
                            if (businessId) {
                                scope.businessId = businessId;
                                if (isUpdate) {
                                    scope.createOrUpdateBusinessType();
                                } else {
                                    scope.getFiDetail();
                                }
                            }
                        }
                    });
                }
            }
        })