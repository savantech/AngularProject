angular.module("angularJsApp").controller('adminUser', function ($state, sellerHomeService, $location, $scope, $http) {
    $scope.sellerHomeService = sellerHomeService;
    $scope.listOfUsers = [];
    $scope.profile = {};
    $scope.errorDiv = $("#displayMsg");
    $scope.errorDivForPassword = $("#displayMsgForChangePassword");
    $scope.activeStatus = [{ name: "Enable", value: true }, { name: "Disable", value: false }]
    $scope.basicProfileDetail = {};
    $scope.profileSubmit = false;
    $scope.loadStatus = false;
    $scope.start = 0;
    $scope.tab = 1;
    $scope.changePassword = {};
    $scope.userId;
    $scope.search = {
        searchName: ''
    }

    $scope.showTab = function (tab) {
        if (($scope.profile.id && tab == 2) || ($scope.profile.trackingId && tab == 1)) {
            $scope.errorDiv.html("");
            console.log(tab);
            return $scope.tab = tab;
        }
    }

    $scope.closeTab = function () {
        $scope.basicProfileDetail = {};
        $scope.profile = {};
        $scope.tab = 1;
        $scope.profileSubmit = false;
        $scope.submitted1 = false;
        $scope.errorDiv = $("#displayMsg");
        $scope.errorDiv.html("");
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
        $scope.sellerHomeService.makeGetServiceCall('api/user/list_all_users', str, (response) => {
            console.log(response);
            if (response.data && !response.data.error) {
                $scope.listOfUsers = response.data;
                $scope.listOfUsers.filter(data => data.active = data.active.toString());
                $scope.checkNextPrev(start, $scope.listOfUsers.length);
            } else {
                $scope.listOfUsers = [];
                $scope.sellerHomeService.openAlert({ alertMsg: response.data.error, alertApi: '' });
            }
        });
    }


    $scope.editUser = function (user) {
        console.log(user);
        $scope.profile.trackingId = user.id;
        $scope.profile.userName = user.fullName ? user.fullName : null;
        $scope.profile.id = user.id;
        $scope.profile.city = user.address.city ? user.address.city : null;
        $scope.profile.state = user.address.state ? user.address.state : null;
        $scope.profile.address = user.address.address ? user.address.address : null;
        $scope.profile.pin_code = user.address.pinCode ? user.address.pinCode : null;
        $scope.profile.pan_card = user.panCard ? user.panCard : null;
        $scope.profile.aadhar = user.aadhar ? user.aadhar : null;
        // $scope.profile.phone = user.phoneNumber ? user.phoneNumber : null;

        $scope.basicProfileDetail.name = user.fullName ? user.fullName : null;
        $scope.basicProfileDetail.phone_number = user.phoneNumber ? user.phoneNumber : null;
        $scope.basicProfileDetail.email = user.email ? user.email : null;
        $scope.basicProfileDetail.emails = user.email ? user.email : null;
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

    $scope.saveUserProfileDetail = function () {
        $scope.errorDiv.html("");
        console.log($scope.basicProfileDetail);
        var validPhoneNo = /^\d+$/.test($scope.basicProfileDetail.phone_number);
        if ((!$scope.basicProfileDetail.phone_number && !$scope.profile.trackingId) || !$scope.basicProfileDetail.name
            || (!$scope.basicProfileDetail.password && !$scope.profile.trackingId)
            || (!$scope.basicProfileDetail.email && !$scope.profile.trackingId)) {
            console.log('in')
            $scope.errorDiv.html("<div class='alert alert-danger' align='center' >All (*) Fields are Required.</div>")
            console.log($scope.errorDiv);
        } else {
            if (!validPhoneNo) {
                $scope.errorDiv
                    .html("<div class='alert alert-danger' align='center' >Please enter valid Phone No.</div>");
                return;
            }
            if (!$scope.sellerHomeService.isEmailValid($scope.basicProfileDetail.email)) {
                $scope.errorDiv
                    .html("<div class='alert alert-danger' align='center' >Please enter valid Email.</div>");
                return;
            }
            console.log("call to save");
            $scope.loadStatus = true;
            if (!$scope.profile.trackingId) {

                $scope.sellerHomeService.makePostServiceCall('api/user/adduser', $scope.basicProfileDetail, (response) => {
                    console.log(response);
                    if (!response.data.error) {
                        $scope.profile.id = response.data.id;
                        $scope.profile.phone = response.data.phoneNumber;
                        $scope.showTab(2);
                        $scope.loadStatus = false;
                    } else {
                        $scope.loadStatus = false;
                        $scope.errorDiv.html("<div class='alert alert-danger'>" + response.data.error + "</div>");
                    }
                });

            } else {
                console.log('edit')
                var param = {
                    'name': $scope.basicProfileDetail.name,
                    'phone_number': $scope.basicProfileDetail.phone_number,
                    'email_id': $scope.basicProfileDetail.emails
                }

                $scope.sellerHomeService.makePostServiceCall('api/user/' + $scope.profile.id + '/personal', param, (response) => {
                    console.log(response);
                    if (!response.data.error) {
                        $scope.profile.userName = $scope.basicProfileDetail.name ? $scope.basicProfileDetail.name : null;
                        $scope.showTab(2);
                        $scope.loadStatus = false;
                        $scope.getAllUserDetail($scope.start);
                    } else {
                        $scope.loadStatus = false;
                        $scope.errorDiv.html("<div class='alert alert-danger'>" + response.data.error + "</div>");
                    }
                });
            }
        }
    }

    $scope.saveUserContactDetail = function (modalName) {
        $scope.errorDiv
            .html('');
        $scope.submitted1 = true;
        var validPincode = /^\d+$/.test($scope.profile.pin_code);
        console.log(modalName);
        console.log($scope.profile);
        if (!$scope.profile.city
            || !$scope.profile.state
            || !$scope.profile.address
            || !$scope.profile.pin_code
            || !$scope.profile.pan_card || !$scope.profile.aadhar) {
            $scope.errorDiv
                .html("<div class='alert alert-danger' align='center' >All (*) Fields are Required.</div>")

        } else {
            if (!validPincode) {
                $scope.errorDiv
                    .html("<div class='alert alert-danger' align='center' >Please enter pin code.</div>");
                return;
            }
            $scope.loadStatus = true;
            $scope.sellerHomeService.makePostServiceCall('api/user/' + $scope.profile.id + '/update', $scope.profile, (response) => {
                console.log(response);
                if (!response.data.error) {
                    $scope.loadStatus = false;
                    $scope.closeTab();
                    $scope.getAllUserDetail($scope.start);
                    $('' + '#' + modalName + '').modal("hide");
                } else {
                    $scope.loadStatus = false;
                    $scope.errorDiv
                        .html("<div class='alert alert-danger' align='center' >" + response.data.error + "</div>");
                    $('' + '#' + modalName + '').modal("hide");
                }
            });
        }
    }
    $scope.updateUserPassword = function (modalId) {
        $scope.errorDivForPassword.html("");
        if (!$scope.changePassword.password_new || !$scope.changePassword.password_confirm) {
            $scope.errorDivForPassword.html("<div class='alert alert-danger' align='center' >All (*) Fields are Required.</div>");
            return;
        }
        if ($scope.changePassword.password_new != $scope.changePassword.password_confirm) {
            $scope.errorDivForPassword.html("<div class='alert alert-danger' align='center' >Password and confirm password are not match.</div>");
            return;
        }
        var param = {
            password_new: $scope.changePassword.password_new
        }
        $scope.loadStatus = true;
        $scope.sellerHomeService.makePostServiceCall('api/user/' + $scope.userId + '/changepasswordadmin', param, (response) => {
            console.log(response);
            if (!response.data.error) {
                $scope.loadStatus = false;
                $('' + '#' + modalId + '').modal('hide');
            } else {
                $scope.loadStatus = false;
                $scope.errorDivForPassword
                    .html("<div class='alert alert-danger' align='center' >" + response.data.error + "</div>");
                $('' + '#' + modalId + '').modal("hide");
            }
        });

    }

    $scope.changeUserStatus = function (userId, status) {
        console.log(userId + "......." + status);
        var str = '';
        if (status == 'true') {
            str = 'enable';
        } else {
            str = 'disable';
        }
        $scope.sellerHomeService.makePostServiceCall('api/user/' + userId + '/' + str, '', (response) => {
            console.log(response);
            if (response.data.error) {
                $scope.sellerHomeService.openAlert({
                    alertMsg: response.data.error,
                    alertApi: ''
                });
            }
        });
       
    }

    $scope.init = function () {
        console.log('init Of User');
        $scope.getAllUserDetail($scope.start);
    }
    $scope.init();

});