app.service("BotanifyApplicationService", function ($http) {

    this.registerSubmitFunc = function (registrationData) {
        var response = $http({
            method: "post",
            url: "/Home/RegisterUser",
            data: registrationData
        })
        return response;
    }

    this.addProductFunc = function (productData) {
        var response = $http({
            method: "post",
            url: "/Home/AddProduct",
            data: productData
        })
        return response;
    }
});
