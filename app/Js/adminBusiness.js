angular.module("angularJsApp").controller('adminBusiness', function ($state, $filter, sellerHomeService, $location, $scope, $http) {
    $scope.sellerHomeService = sellerHomeService;
    $scope.businessStatusList = [];
    $scope.latestBusiness = [];
    $scope.start = 0;
    $scope.submitBusiness = false;
    $scope.submitted = false;
    $scope.business = {};
    $scope.sameAsAbove = false;
    $scope.profile = {};
    $scope.injectedObject = {};
    $scope.businessId = '';
    console.log("business id*******************..." + $scope.businessId)
    $scope.errorDiv = $("#displayMsg");
    $scope.errorDivEdit = $("#displayMsgEdit");
    $scope.errorDivAddressEdit = $("#displayMsgAddressEdit");
    $scope.errorDivAddress = $("#displayMsgAddress");
    $scope.errorDivForUserAndBusiness = $("#errorDivForUserAndBusiness");
    $scope.errorDivForBusinessType = $("#displayMsgOfEditBusinessType");
    $scope.errorDivForBusiness = $("#displayErrorMsg3");

    // $scope.businessDetail = [];

    $scope.serchVar = {
        selectedBusinessStatus: '',
        searchName: ''
    };

    $scope.isLoad = false;
    $scope.isBankAdd = false;
    $scope.loadStatus = false;
    $scope.isAPiCall = false;
    $scope.editBusiness = false;
    $scope.isAddBusinessType = true;

    $scope.tab = 1;
    $scope.tabEdit = 1;
    $scope.business_type_params = {};
    $scope.register_fi = window.REGISTER_FI;
    $scope.acDetails = {};
    $scope.businessTypes = {};
    $scope.userAndBusinessDetail = {};
    $scope.companyTypeRange = [{
        name: "Private Limited",
        value: "PRIVATE_LIMITED"
    }, {
        name: "Public Limited",
        value: "PUBLIC_LIMITED"
    }, {
        name: "Partnership",
        value: 'PARTNERSHIP'
    }, {
        name: "Sole Proprietorship",
        value: 'SOLE_PROPRIETORSHIP'
    }, {
        name: "LLP",
        value: "LLP"
    }];
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
        value: "TELECOM"
    }, {
        name: "Legal",
        value: "LEGAL"
    }, {
        name: "Electronics",
        value: "ELECTRONICS"
    }];

    $scope.fetchBusinessWithStatus = function (start) {
        console.log('getting data')
        $scope.latestBusiness = null;
        $scope.checkNextPrev(start, 10);
        $scope.start = start;
        // var str = 'start=' + (start * 10) + "&count=10";
        var param = {
            'start': (start * 10),
            'count': 10,
            'business_status': $scope.serchVar.selectedBusinessStatus,
            'business_name': $scope.serchVar.searchName
        };
        $scope.sellerHomeService.makeGetServiceCall("api/business/list", param, (response) => {
            console.log(response);
            if (!response.data.error) {
                $scope.latestBusiness = response.data;
                $scope.checkNextPrev(start, $scope.latestBusiness.length);
            } else {
                $scope.sellerHomeService.openAlert({ alertMsg: response.data.error, alertApi: '' });
                $scope.latestBusiness = [];
            }
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
    $scope.emptyBusinessDetail = function () {
        $scope.isBankAdd = false;
        $scope.errorDivForBusinessType.html('');
        $scope.errorDiv.html('');
        $scope.errorDivEdit.html('');
        $scope.errorDivAddressEdit.html('');
        $scope.errorDivAddress.html('');
        $scope.business = {};
        $scope.isAPiCall = false
        $scope.isAddBusinessType = true;
        $scope.submitted = false;
        $scope.tab = 1;
        $scope.tabEdit = 1;
        $scope.business_type_params = {};
        $scope.userAndBusinessDetail = {};
        $scope.sameAsAbove = false;
    }
    $scope.prevPage = function () {
        $scope.tab = 1;
    }
    $scope.prevPageEdit = function () {
        $scope.tabEdit = 1;
    }
    $scope.nextOnEdit = function () {
        // $scope.tabEdit = 2;
        $scope.errorDivEdit = $("#displayMsgEdit");
        $scope.errorDivEdit.html(' ');
        $scope.submitted = true;
        var businessPram = {
            // business_owner_id: $scope.business.business_owner_id,
            business_name: $scope.business.business_name,
            creation_date: $filter('date')
                ($scope.business.creation_date,
                'dd-MM-yyyy'),
            description: $scope.business.description,
            domain_name: $scope.business.domain_name,
            business_emails: $scope.business.business_emails,
            vertical: $scope.business.vertical,
            business_start_date: $filter('date')
                ($scope.business.business_start_date,
                'dd-MM-yyyy'),
            employee_range: $scope.business.employee_range,
            business_phones: $scope.business.business_phones,
            designation: $scope.business.designation,
            revenue_range: $scope.business.revenue_range,
            gstn: $scope.business.gstn,
            cin: $scope.business.cin_no,
            tin: $scope.business.tan_no,
            pan: $scope.business.business_pan,
            company_type: $scope.business.business_type,
        };

        if (
            // !businessPram.business_owner_id  ||
            (!$scope.business.trackingId && !businessPram.business_name) ||
            (!$scope.business.trackingId && !businessPram.company_type) ||
            !businessPram.creation_date ||
            !businessPram.vertical ||
            !businessPram.company_type ||
            !businessPram.business_start_date || !businessPram.gstn ||
            !businessPram.pan || !businessPram.designation ||
            !businessPram.revenue_range ||
            !businessPram.employee_range ||
            !businessPram.description) {
            $scope.errorDivEdit
                .html("<div class='alert alert-danger' align='center' >All (*) Fields are Required.</div>")
        } else {
            console.log("else")
            console.log($scope.checkValidation());
            if (!$scope.checkValidation()) {
                return;
            }
            // $scope.tab = 2;
            $scope.tabEdit = 2;
            $scope.submitted = false;
            $scope.loadStatus = false;
        }
    }
    $scope.businessDetailCheck = function () {
        // $scope.tab = 2;
        $scope.submitted = true;
        $scope.errorDiv = $("#displayMsg");
        $scope.errorDiv.html(' ');
        console.log($scope.business);
        var businessPram = {
            business_owner_id: $scope.business.business_owner_id,
            business_name: $scope.business.business_name,
            creation_date: $filter('date')
                ($scope.business.creation_date,
                'dd-MM-yyyy'),
            description: $scope.business.description,
            domain_name: $scope.business.domain_name,
            business_emails: $scope.business.business_emails,
            vertical: $scope.business.vertical,
            business_start_date: $filter('date')
                ($scope.business.business_start_date,
                'dd-MM-yyyy'),
            employee_range: $scope.business.employee_range,
            business_phones: $scope.business.business_phones,
            designation: $scope.business.designation,
            revenue_range: $scope.business.revenue_range,
            gstn: $scope.business.gstn,
            cin: $scope.business.cin_no,
            tin: $scope.business.tan_no,
            pan: $scope.business.business_pan,
            company_type: $scope.business.business_type,
        };
        // console.log(JSON.stringify(obj));

        if (!businessPram.business_owner_id || !businessPram.business_name ||
            !businessPram.creation_date ||
            !businessPram.vertical ||
            !businessPram.business_emails ||
            !businessPram.business_phones ||
            !businessPram.company_type ||
            !businessPram.business_start_date || !businessPram.gstn ||
            !businessPram.pan || !businessPram.designation ||
            !businessPram.revenue_range ||
            !businessPram.employee_range ||
            !businessPram.description) {
            $scope.errorDiv
                .html("<div class='alert alert-danger' align='center' >All (*) Fields are Required.</div>")
        } else {
            console.log("else")
            console.log($scope.checkValidation());
            if (!$scope.checkValidation()) {
                return;
            }
            $scope.tab = 2;
            $scope.submitted = false;
            $scope.loadStatus = false;
        }
    }
    $scope.addBusimessDetail = function (modalId) {
        $scope.submitted = true;
        $scope.errorDivAddress = $("#displayMsgAddress");
        $scope.errorDivAddress.html(' ');

        if (!$scope.business.registered_address || (!$scope.business.registered_address.address ||
            !$scope.business.registered_address.city || !$scope.business.registered_address.pinCode
            || !$scope.business.registered_address.state || !$scope.business.registered_address.country) ||
            !$scope.business.correspondence_address ||
            (!$scope.business.correspondence_address.address || !$scope.business.correspondence_address.city ||
                !$scope.business.correspondence_address.pinCode
                || !$scope.business.correspondence_address.state || !$scope.business.correspondence_address.country)) {
            console.log('errrr')
            $scope.errorDivAddress.html("<div class='alert alert-danger' align='center' >All (*) Fields are Required.</div>")
        } else {

            var businessPram = {
                correspondence_address: JSON.stringify($scope.business.correspondence_address),
                registered_address: JSON.stringify($scope.business.registered_address),
                business_owner_id: $scope.business.business_owner_id,
                business_name: $scope.business.business_name,
                creation_date: $filter('date')
                    ($scope.business.creation_date,
                    'dd-MM-yyyy'),
                description: $scope.business.description,
                domain_name: $scope.business.domain_name,
                business_emails: $scope.business.business_emails,
                vertical: $scope.business.vertical,
                business_start_date: $filter('date')
                    ($scope.business.business_start_date,
                    'dd-MM-yyyy'),
                employee_range: $scope.business.employee_range,
                business_phones: $scope.business.business_phones,
                designation: $scope.business.designation,
                revenue_range: $scope.business.revenue_range,
                gstn: $scope.business.gstn,
                cin: $scope.business.cin_no,
                tan: $scope.business.tan_no,
                pan: $scope.business.business_pan,
                company_type: $scope.business.business_type
            };
            console.log(businessPram);
            console.log('innnnnnnnnnnnnnnnnnn')
            $scope.submitted = false;

            $scope.loadStatus = true;
            $http({
                method: 'POST',
                url: '/capitallever/api/business/admin/create/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $.param(businessPram)
            }).then(function (res) {
                console.log(res.data)
                $scope.businessId = res.data.id;
                console.log("id........" + $scope.businessId);
                $scope.tab = 3;
                $scope.loadStatus = false;
                $scope.sameAsAbove = false;
                $('' + '#' + modalId + '').modal('hide');
                $scope.fetchBusinessWithStatus($scope.start);
            }, function (error) {
                $scope.loadStatus = false;
                $scope.sameAsAbove = false;
                $scope.errorDivAddress.html("<div class='alert alert-danger' align='center' >" + error.data.error + "</div>");
            });
        }
    }

    $scope.checkValidation = function () {
        var validPhoneNo = $scope.sellerHomeService.objRegex.test($scope.business.business_phones);
        if (!$scope.sellerHomeService.isEmailValid($scope.business.business_emails)) {
            $scope.errorDiv
                .html("<div class='alert alert-danger' align='center' >Please enter valid email.</div>");
            $scope.errorDivEdit
                .html("<div class='alert alert-danger' align='center' >Please enter valid email.</div>");
            return false;
        }
        if (!validPhoneNo) {
            $scope.errorDiv
                .html("<div class='alert alert-danger' align='center' >Please enter valid Phone No.</div>");
            $scope.errorDivEdit
                .html("<div class='alert alert-danger' align='center' >Please enter valid Phone No.</div>");
            return false;
        }
        if ($scope.business.business_type == 'PRIVATE_LIMITED' && !$scope.business.cin_no) {
            $scope.errorDiv
                .html("<div class='alert alert-danger' align='center' >Please enter CIN no.</div>");
            $scope.errorDivEdit
                .html("<div class='alert alert-danger' align='center' >Please enter CIN no.</div>");
            return false;
        }
        if ($scope.business.business_type == 'LLP' && !$scope.business.cin_no) {
            $scope.errorDiv
                .html("<div class='alert alert-danger' align='center' >Please enter LLPIN no.</div>");
            $scope.errorDivEdit
                .html("<div class='alert alert-danger' align='center' >Please enter LLPIN no.</div>");
            return false;
        }

        if (($scope.business.business_type == 'PRIVATE_LIMITED' || $scope.business.business_type == 'PARTNERSHIP') && !$scope.business.tan_no) {
            $scope.errorDiv
                .html("<div class='alert alert-danger' align='center' >Please enter tan no.</div>");
            $scope.errorDivEdit
                .html("<div class='alert alert-danger' align='center' >Please enter tan no.</div>");
            return false;
        }
        return true;
    }
    $scope.editBusinessProfile = function (businessDetail) {
        console.log(businessDetail);
        $scope.tabEdit = 1;
        $scope.errorDiv.html('');
        $scope.errorDivEdit.html('');
        $scope.errorDivAddressEdit.html('');
        $scope.errorDivAddress.html('');
        $scope.editBusiness = true;
        $scope.submitted = false;
        $scope.sameAsAbove = false;
        $scope.business.id = businessDetail.id
        $scope.business.trackingId = businessDetail.id
        $scope.business.business_name = businessDetail.name;
        $scope.business.business_type = businessDetail.companyType;
        $scope.business.business_pan = businessDetail.pan;
        $scope.business.gstn = businessDetail.gstn;
        $scope.business.tan_no = businessDetail.tan;
        $scope.business.cin_no = businessDetail.cin;
        $scope.business.domain_name = businessDetail.domainName;
        $scope.business.registered_address = businessDetail.registeredAddress;
        $scope.business.correspondence_address = businessDetail.address;
        $scope.business.business_start_date = businessDetail.businessStartDate;
        $scope.business.business_emails = businessDetail.emailId;
        $scope.business.business_phones = businessDetail.phoneNumber;
        $scope.business.description = businessDetail.description;
        $scope.business.vertical = businessDetail.vertical;
        $scope.business.creation_date = businessDetail.creationDate;
        $scope.business.employee_range = businessDetail.employeeRange;
        $scope.business.revenue_range = businessDetail.revenueRange;

    }
    $scope.updateBusimessDetail = function (modalId) {

        $scope.errorDivAddressEdit.html('');
        if (!$scope.business.registered_address || (!$scope.business.trackingId && !$scope.business.business_name) ||
            (!$scope.business.trackingId && !$scope.business.business_type) ||
            (!$scope.business.registered_address.address || !$scope.business.registered_address.city ||
                !$scope.business.registered_address.pinCode || !$scope.business.registered_address.state ||
                !$scope.business.registered_address.country) || !$scope.business.correspondence_address ||
            (!$scope.business.correspondence_address.address || !$scope.business.correspondence_address.city ||
                !$scope.business.correspondence_address.pinCode || !$scope.business.correspondence_address.state ||
                !$scope.business.correspondence_address.country)) {
            $scope.errorDivAddressEdit
                .html("<div class='alert alert-danger' align='center' >All (*) Fields are Required.</div>")
        } else {

            // JSON.stringify(obj)
            var businessPram = {
                correspondence_address: JSON.stringify($scope.business.correspondence_address),
                registered_address: JSON.stringify($scope.business.registered_address),
                businessId: $scope.business.id,
                business_name: $scope.business.business_name,
                business_emails: $scope.business.business_emails,
                business_phones: $scope.business.business_phones,
                creation_date: $filter('date')
                    ($scope.business.creation_date,
                    'dd-MM-yyyy'),
                description: $scope.business.description,
                domain_name: $scope.business.domain_name,
                vertical: $scope.business.vertical,
                business_start_date: $filter('date')
                    ($scope.business.business_start_date,
                    'dd-MM-yyyy'),
                employee_range: $scope.business.employee_range,
                designation: $scope.business.designation,
                revenue_range: $scope.business.revenue_range,
                gstn: $scope.business.gstn,
                cin: $scope.business.cin_no,
                tin: $scope.business.tan_no,
                pan: $scope.business.business_pan,
                company_type: $scope.business.business_type
            }
            console.log(businessPram)
            console.log("elsess")

            $scope.loadStatus = true;
            $http({
                method: 'POST',
                url: '/capitallever/api/business/' + businessPram.businessId,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $.param(businessPram)
            }).then(function (res) {
                $scope.loadStatus = false;
                $('' + '#' + modalId + '').modal('hide');
                $scope.emptyBusinessDetail();
                $scope.fetchBusinessWithStatus($scope.start);

            }, function (error) {
                $scope.loadStatus = false;
                console.log(error.data.error);
                $scope.errorDivAddressEdit.html("<div class='alert alert-danger' align='center' >" + error.data.error + "</div>");
            });
        }
    }

    $scope.saveUser = function () {
        $http({
            method: 'POST',
            url: '/capitallever/api/business/' + businessPram.businessId,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: $.param(businessPram)
        }).then(function (res) {
            $('' + '#' + modalId + '').modal('hide');
        }, function (error) {
            $scope.errorDiv
                .html("<div class='alert alert-danger' align='center' >" + error.data.error + "</div>");
        });
    }
    $scope.saveUserAndBusiness = function () {
        $scope.errorDivForUserAndBusiness
            .html("");
        if (!$scope.userAndBusinessDetail.user_name ||
            !$scope.userAndBusinessDetail.password ||
            !$scope.userAndBusinessDetail.business_name ||
            !$scope.userAndBusinessDetail.vertical ||
            !$scope.userAndBusinessDetail.city ||
            !$scope.userAndBusinessDetail.state ||
            !$scope.userAndBusinessDetail.phone_number ||
            !$scope.userAndBusinessDetail.email ||
            !$scope.userAndBusinessDetail.company_type ||
            !$scope.userAndBusinessDetail.description) {
            $scope.errorDivForUserAndBusiness
                .html("<div class='alert alert-danger' align='center' >All (*) Fields are Required.</div>");
            return;
        } else {
            if (!$scope.sellerHomeService.isEmailValid($scope.userAndBusinessDetail.email)) {
                $scope.errorDivForUserAndBusiness
                    .html("<div class='alert alert-danger' align='center' >Please enter valid email.</div>");
                return;
            }
            $scope.loadStatus = true;
            $http({
                method: 'POST',
                url: '/capitallever/api/business/admin/create_user_and_business',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $.param($scope.userAndBusinessDetail)
            }).then(function (res) {
                $scope.loadStatus = false;
                $scope.fetchBusinessWithStatus($scope.start);
                $('#addUserAndBusiness').modal('hide');
            }, function (error) {
                $scope.loadStatus = false;
                $scope.errorDivForUserAndBusiness
                    .html("<div class='alert alert-danger' align='center' >" + error.data.error + "</div>");
            });
        }
    }
    $scope.registerCallBack = function (callback) {
        $scope.conCallBack = callback;
    }
    $scope.doButtonCall = function (businessId) {
        $scope.businessId = businessId;
        $scope.conCallBack(businessId);
    }
    $scope.registerCallBack = function (callback) {
        $scope.conCallBack = callback;
    }
    $scope.doButtonCall = function (businessId) {
        $scope.businessId = businessId;
        $scope.conCallBack(businessId);
    }
    $scope.businessTypeCallBack = function (callback) {
        $scope.businessType = callback;
    }
    $scope.businessTypeButtonCall = function (businessId) {
        console.log(businessId)
        $scope.businessId = businessId;
        $scope.businessType($scope.businessId);
    }
    $scope.editBusinessTypeCallBack = function (callback) {
        // console.log(callback);
        $scope.editBusinessType = callback;
    }
    $scope.editBusinessTypeButtonCall = function (businessId, isUpdate) {
        $scope.businessId = businessId;
        $scope.isAddBusinessType = false;
        $scope.isUpdate = isUpdate;
        console.log("is buisness id.....*****" + $scope.businessId)
        $scope.editBusinessType(businessId, isUpdate);
    }
    $scope.businessMemberCallBack = function (callback) {
        $scope.conCallBack1 = callback;
    }
    $scope.memberDoButtonCall = function (businessId) {
        $scope.businessId = businessId;
        $scope.conCallBack1(businessId);
    }


    $scope.openNetworkModal = function (businessId) {
        console.log("call  to open popup");
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: GLOBAL_WEB_ROOT + 'templates/dialogs/add-to-network.html',
            controller: 'addToNetworkCtrl',
            size: 'lg',
            resolve: {
                businessId: function () {
                    return businessId;
                }
            }
        });
    }


});