angular.module("angularJsApp").directive('businessType', function () {

    return {
        restrict: 'AE',
        scope: {
            businessTypeCallBack: '&',
            editBusinessTypeCallBack: '&',
            modalId: '=',
            isAddBusinessType: '='
        },
        templateUrl: 'templates/directive/business-type-directive.html',
        controller: function ($scope, $http, sellerHomeService) {
            $scope.globalWebRoot = '';
            $scope.sellerHomeService = sellerHomeService;
            $scope.businessTypeParams = {};
            $scope.isValidForm = false;
            $scope.isUpdate;
            // $scope.businessTypeParams.account_change_buyer_config = 'after_onboarding_vendor';
            $scope.listOfAccountChangeBuyerConfig = [{ key: 'after_onboarding_vendor', value: 'AFTER_ONBOARDING_VENDOR' }, { key: 'on_invoice_submit', value: 'ON_INVOICE_SUBMIT' }, { key: 'after_financing_approved', value: 'AFTER_FINANCING_APPROVED' }];
            $scope.business_type_display = 'seller';
            $scope.errorDiv = $("#displayMsgOfEditBusinessType");
            $scope.creditRate = [
                { name: 'AA', value: 'AA' },
                { name: 'AA_PLUS', value: 'AA_PLUS' },
                { name: 'AA_MINUS', value: 'AA_MINUS' },
                { name: 'B', value: 'B' },
                { name: 'B_PLUS', value: 'B_PLUS' },
                { name: 'B_MINUS', value: 'B_MINUS' },
                { name: 'C', value: 'C' },
                { name: 'C_PLUS', value: 'C_PLUS' },
                { name: 'C_MINUS', value: 'C_MINUS' },
            ];
            $scope.oneToThirty = [];
            for (var i = 0; i <= 30; i++) {
                $scope.oneToThirty.push(i);
            }
            $scope.penalRate = [];
            for (var i = 0; i <= 10; i++) {
                $scope.penalRate.push(i);
            }
            $scope.init = function () {
                console.log($scope.businessId)
                $scope.businessTypeParams.account_change_buyer_config = 'AFTER_ONBOARDING_VENDOR';
                $scope.isValidForm = false;
            }
            $scope.sayHii = function () {
                console.log("hello from 2nd directive")
            }

            $scope.radio_changed = function (businessType) {
                console.log(businessType)
                console.log("business id...." + $scope.businessId)
                console.log($scope.businessTypeParams);
                $scope.businessTypeParams = {};
                $scope.businessTypeParams.enable_marketplace = true;
                $scope.business_type_display = businessType;
            }
            $scope.createOrUpdateBusinessType = function (businessId) {
                if ($scope.businessId) {
                    $scope.errorDiv.html("");
                    console.log($scope.business_type_display)
                    if ($scope.business_type_display === '') {
                        $scope.errorDiv
                            .html("<div class='alert alert-danger' align='center' >Select a business type.</div>");
                        return;
                    } else {
                        $scope.isValidForm = true;
                        if ($scope.business_type_display == 'seller' && (!$scope.businessTypeParams.credit_rating)) {
                            console.log('error')
                            return;
                        } else {
                            $scope.isValidForm = false;
                            console.log($scope.businessTypeParams)
                            $http({
                                method: 'POST',
                                url: '/capitallever/api/' +
                                    $scope.business_type_display + '/' +
                                    $scope.businessId,
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                data: $.param($scope.businessTypeParams)
                            }).then(function (res) {
                                console.log(res.data)
                                if ($scope.modalId) {
                                    $('' + '#' + $scope.modalId + '').modal("hide");
                                }
                            }, function (error) {
                                $scope.errorDiv
                                    .html("<div class='alert alert-danger' align='center' >" + error.data.error + "</div>");
                            });
                        }
                    }
                }
            }
            $scope.getBusinessType = function (businessId) {
                if (businessId) {
                    $scope.business_type_display = '';
                    $http({
                        method: 'GET',
                        url: '/capitallever/api/business/' + businessId + '/types',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function (response) {
                        console.log("-===================")
                        console.log(response.data)
                        console.log("-===================")

                        $scope.businessTypes = response.data;
                        console.log($scope.businessTypes.buyerCreated)
                        if ($scope.businessTypes.buyerCreated == true) {
                            console.log("if1")
                            $scope.business_type_display = 'buyer';
                            $scope.getBuyerDetail(businessId);
                            $scope.isAddBusinessType = false;
                            $scope.isUpdate = true;
                        }
                        if ($scope.businessTypes.fiCreated == true) {
                            console.log("if2")
                            $scope.business_type_display = 'fi';
                            $scope.getFiDetail(businessId);
                            $scope.isAddBusinessType = false;
                            $scope.isUpdate = true;
                        }
                        if ($scope.businessTypes.sellerCreated == true) {
                            console.log("if3")
                            $scope.business_type_display = 'seller';
                            $scope.getSellerDetail(businessId);
                            $scope.isAddBusinessType = false;
                            $scope.isUpdate = true;
                        }
                        if (!$scope.businessTypes.buyerCreated && !$scope.businessTypes.fiCreated && !$scope.businessTypes.sellerCreated) {
                            console.log("if4")
                            $scope.isAddBusinessType = true;
                            $scope.isUpdate = false;
                            $scope.businessTypeParams = {};
                            $scope.business_type_display = 'seller';
                        }

                    });
                    console.log("..................." + $scope.isUpdate)
                }
            }
            $scope.getSellerDetail = function (businessId) {
                $scope.businessId = businessId;
                if (businessId) {
                    $http({
                        method: 'GET',
                        url: '/capitallever/api/seller/' + businessId,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function (response) {
                        $scope.businessTypeParams.credit_rating = response.data.creditRating.toString();
                        $scope.businessTypeParams.escrow_account_id = response.data.escrowAccountId.toString();
                    }, function (error) {
                        $scope.errorDiv
                            .html("<div class='alert alert-danger' align='center' >" + error.data.error + "</div>");
                    });
                }
            }
            $scope.getBuyerDetail = function (businessId) {
                $scope.businessId = businessId;
                if (businessId) {
                    $http({
                        method: 'GET',
                        url: '/capitallever/api/buyer/' + businessId,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function (response) {
                        $scope.businessTypeParams.finance_vendors = response.data.financeOwnVendors;
                        $scope.businessTypeParams.credit_rating = response.data.creditRating.toString();
                        $scope.businessTypeParams.platform_rate_as_financier_yearly = response.data.platformRateAsFinancierYearly.toString();
                        $scope.businessTypeParams.platform_rate_for_vendor_yearly = response.data.platformRateForVendorYearly.toString();
                        // $scope.businessTypeParams.change_account_on_invoice_submit = response.data.changeAccountOnInvoiceSubmit.toString();
                        $scope.businessTypeParams.account_change_buyer_config = response.data.accountChangeConfig;
                        console.log($scope.businessTypeParams)
                    }, function (error) {
                        $scope.errorDiv
                            .html("<div class='alert alert-danger' align='center' >" + error.data.error + "</div>");
                    });
                }
            }
            $scope.getFiDetail = function (businessId) {
                $scope.businessId = businessId;
                console.log($scope.businessId)
                if (businessId) {
                    $scope.errorDiv
                        .html("");
                    $http({
                        method: 'GET',
                        url: '/capitallever/api/fi/' + businessId,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function (response) {
                        console.log(response);
                        $scope.businessTypeParams.financier_type = response.data.financierType;
                        $scope.businessTypeParams.penalty_interest_applicable_after_days = response.data.penaltyInterestAfterDays ? response.data.penaltyInterestAfterDays.toString() : '';
                        $scope.businessTypeParams.penalty_interest_additional_increment = response.data.penaltyInterestAdditionalIncrement ? response.data.penaltyInterestAdditionalIncrement.toString() : '';
                        $scope.businessTypeParams.loan_procesing_average_time_days = response.data.loanProcessingTimeInDays ? response.data.loanProcessingTimeInDays.toString() : '';
                        $scope.businessTypeParams.platform_maximum_exposure = response.data.platformMaxExposure ? response.data.platformMaxExposure.toString() : '';
                        $scope.businessTypeParams.stamp_duty_state = response.data.defaultStampDutyState ? response.data.defaultStampDutyState.toString() : '';
                        $scope.businessTypeParams.platform_rate_yearly = response.data.platformRateYearly;
                        $scope.businessTypeParams.penalty_processing_flat_fee = response.data.penaltyProcessingFlatFee;
                        $scope.businessTypeParams.enable_marketplace = response.data.enableMarketplace;

                    }, function (error) {
                        $scope.errorDiv
                            .html("<div class='alert alert-danger' align='center' >" + error.data.error + "</div>");
                    });
                }
            }
            $scope.setPlateFormRate = function () {
                $scope.businessTypeParams.platform_rate_as_financier_yearly = '';
            }
            $scope.init();
        },
        link: function (scope, elem, attr) {
            console.log(scope.businessId)
            scope.businessTypeCallBack({
                businessType: function (businessId) {
                    if (businessId) {
                        console.log("save....." + businessId);
                        scope.businessId = businessId;
                        scope.isAddBusinessType = true;
                        scope.isValidForm = false;
                        scope.createOrUpdateBusinessType(scope.businessId);
                    }
                }
            });
            scope.editBusinessTypeCallBack({
                editBusinessType: function (businessId, isUpdate) {
                    if (businessId) {
                        scope.isAddBusinessType = false;
                        scope.isValidForm = false;
                        scope.businessId = businessId;
                        scope.isUpdate = isUpdate;
                        console.log("isUpdate....." + isUpdate)
                        if (isUpdate) {
                            scope.createOrUpdateBusinessType(scope.businessId);
                        } else {
                            scope.businessTypeParams = {};
                            console.log("update")
                            scope.getBusinessType(scope.businessId);
                        }
                    }
                }
            });
        }
    }
})