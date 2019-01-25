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
        return $http.post(apiName, params, { headers: headers }).then(function (response) {
            console.log(response);
            callback(response)
        }, function (error) {
            console.log('err');
            console.log(error.data.error);
            callback(error)
        });
    }

    this.isEmptyObject = function(obj) {
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

    function isEmailValid(x) {
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
            if (!isEmailValid($('#sign_email').val())) {
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

    return this;
})
