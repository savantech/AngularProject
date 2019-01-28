angular.module("angularJsApp").service('sellerHomeService', function ($filter, $http, $rootScope) {

    this.webRoot = 'http://localhost:8000/';
    this.url = 'http://101.53.139.60/insurance/';


    this.apiKey = '';
    this.apiId = '';
    this.userObj = {};

    this.objRegex = /^[\d -]+$/;

    this.onObj = {
        name: 'names is  here',
        checkEmail: function () { },
        checkName: function () { },
        checkPhoneNumber: function (phoneno) { },
        checkPassword: function () { },
        openAlert: function () { },
    };

    this.arrayOfapiNameToExcludeToken = ['api/user/free/login', 'api/user/free/signup']

    /**@param api 
     * @param params
     * @param callback
     * @description api for post method
     */
    this.makePostServiceCall = function (api, params, callback) {
        var headers = {}
        var apiName = '';
        if (!this.arrayOfapiNameToExcludeToken.includes(api)) {
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'api_key': this.apiKey,
                'api_id': this.apiId
            }
            apiName = this.url + api + '?api_key=' + this.apiKey + '&api_id=' + this.apiId;
        } else {
            apiName = this.url + api;
        }
        console.log(params);
        return $http({ method: 'POST', url: apiName, headers: headers, params: params }).then(function (response) {
            console.log(response);
            callback(response)
        }, function (error) {
            // console.log('err');
            console.log(error.data.error);
            callback(error)
        });
    }

    this.isEmptyObject = function (obj) {
        return (obj && (Object.keys(obj).length === 0));
    }

    /**@param api 
     * @param callback
     * @description api for get method
     */
    this.makeGetServiceCall = function (api, params, callback) {
        var headers = {}
        var apiName = ''
        console.log(params);
        if (!this.arrayOfapiNameToExcludeToken.includes(api)) {
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'api_key': this.apiKey,
                'api_id': this.apiId
            }
            apiName = this.url + api + '?api_key=' + this.apiKey + '&api_id=' + this.apiId;
        } else {
            apiName = this.url + api;
        }
        return $http.get(apiName, { params: params, headers: headers }).then(function (response) {
            console.log(response);
            callback(response)
        }, function (error) {
            console.log('err');
            console.log(error.data.error);
            callback(error)
        });
    }



    this.checkPhoneNumber = function (that) {
        if (!this.objRegex.test(that.value)) {
            that.value = that.value.slice(0, -1);
            if (that.value.length > 0)
                this.checkPhoneNumber(that);
        }

    }

    this.isEmailValid = function(x) {
        console.log('xxxxxxxxxxxxxxxx')
        var atpos = x.indexOf("@");
        var dotpos = x.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
            console.log("false");
            return false;
        }
        // console.log("true");
        return true;
    }

    this.checkEmail = function () {
        var errorDiv = $("#error_msg");
        if ($('#sign_email').val().trim() != "") {
            if (!this.isEmailValid($('#sign_email').val())) {
                errorDiv.html("<div class='alert alert-danger'>Please Enter Valid Email.</div>");
                return;
            } else {
                errorDiv.html('');
            }
            var param = { email: $('#sign_email').val() };
            $http(
                {
                    type: "GET",
                    url: this.url + 'api/user/free/email_exists',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    // data: $.param(param),
                    params: param,
                }).then(function (response) {
                    console.log('in')
                    console.log(response.data)
                    if (response.data) {
                        if (!errorDiv.children().hasClass('emailTrack'))
                            errorDiv.append("<div class='alert alert-danger emailTrack'>Email Already Registred.</div>");
                    } else {

                        $(".emailTrack").remove();
                    }
                });
        } else {
            errorDiv.html("<div class='alert alert-danger'>Email Requiredss.</div>");
        }

    }

    /*name & password*/
    this.checkName = function () {
        var errorDiv = $("#error_msg");
        if ($('#sign_name').val().trim() == "") {
            errorDiv.html("<div class='alert alert-danger'>Name Is Required.</div>");
        }

    }
    this.checkPassword = function () {
        var errorDiv = $("#error_msg");
        if ($('#sign_password').val().trim() == "") {
            errorDiv.html("<div class='alert alert-danger'>Password Is Required.</div>");
        }
    }

    this.openAlert = function (alertData) {
		console.log("call to open popup");
		console.log(alertData);
		showajaxerror(alertData);
	}

    this.statesList = [{
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
    return this;
})
