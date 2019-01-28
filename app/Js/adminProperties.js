angular.module("angularJsApp").controller('adminProperties', function ($state, sellerHomeService, $location, $scope, $http) {
    $scope.sellerHomeService = sellerHomeService;
    $scope.properties = {}
    $scope.loadStatus = false;
    $scope.init = function () {
        $scope.propertiesList = null;
        $scope.sellerHomeService.makePostServiceCall('api/system/properties/list', '' , (response)=>{
            console.log(response);
            if(!response.data.error){
                $scope.propertiesList = response.data;
            }else{
                $scope.sellerHomeService.openAlert({ alertMsg: response.data.error, alertApi: '' });
                $scope.propertiesList = [];
            }
        });
    }

    $scope.editProperties = function (property) {
        $scope.properties.id = property.id;
        $scope.properties.key = property.key.toString();
        $scope.properties.value = property.value.toString();
    }

    $scope.updateProperties = function (modalId) {
        $scope.errorDiv = $("#displayMsgOfEdit");
        $scope.errorDiv.html('');
        var properties = {
            id: $scope.properties.id,
            name: $scope.properties.key,
            value: $scope.properties.value
        };

        if (!properties.name || !properties.value) {
            $scope.errorDiv
                .html("<div class='alert alert-danger' align='center' >All (*) Fields are Required.</div>")
        } else {
            console.log(properties);
            $scope.loadStatus = true;
            $http(
                {
                    method: 'POST',
                    // /capitallever/api/business/' + businessPram.businessId,
                    url: '/capitallever/api/system/properties/update',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param(properties)
                }).then(function (res) {
                    $scope.loadStatus = false;
                    $('' + '#' + modalId + '').modal('hide');
                    $scope.propertyEmpty();
                    $scope.init();
                }, function (error) {
                    $scope.loadStatus = false;
                    $scope.errorDiv
                        .html("<div class='alert alert-danger' align='center' >" + error.data.error + "</div>");
                });
        }
    }

    $scope.propertyEmpty = function () {
        $scope.properties = {};
        $scope.errorDiv.html('');
    }
    $scope.init();

});