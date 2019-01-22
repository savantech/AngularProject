angular.module("angularJsApp").service('sellerHomeService', function ($filter, $http, $rootScope) {

    this.Url = "";
    this.makeGetServiceCall = function (api) {
        return $http.get(api);
    };

    this.webRoot = 'http://localhost:8000/';
    this.makeGetServiceCallWithParam = function (api, param) {
        return $http.get(api, { params: param });
    };


    return this;
})
