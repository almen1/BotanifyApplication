app.service("BotanifyApplicationService", function ($http) {

    this.registerSubmitFunc = function (regData) {
        var response = $http({
            method: "post",
            url: "/Home/RegisterUser",
            data: regData
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
    this.updateProductFunc = function (productData) {
        var response = $http({
            method: "post",
            url: "/Home/UpdateProduct",
            data: productData
        });
        return response;
    };

    this.loadUserFunc = function () {
        return $http.get("/Home/LoadUser");
    }

    this.loadProductFunc = function () {
        return $http.get("/Home/LoadProduct");
    }

    this.loadFilterFunc = function () {
        return $http.get("/Home/LoadFilter");
    }

    this.viewItemFunc = function (productId) {
        return $http.get('/Home/LoadItem', { params: { productId: productId } });
    };

    this.deleteItemFunc = function (productId) {
        return $http.post('/Home/DeleteProduct', { productId: productId });
    };

    this.deleteUserFunc = function (userId) {
        return $http.post('/Home/DeleteUser', { userId: userId });
    };


});
