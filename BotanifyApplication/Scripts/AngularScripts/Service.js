app.service("BotanifyApplicationService", function ($http) {

    this.registerSubmitFunc = function (regData) {
        var response = $http({
            method: "post",
            url: "/Home/RegisterUser",
            data: regData
        })
        return response;
    }
    this.checkEmailFunc = function (emailData) {
        var response = $http({
            method: "post",
            url: "/Home/CheckEmail",
            data: emailData
        });
        return response;
    };

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
    this.loginUserFunc = function (email, password) {
        return $http.post('/Home/LoginUser', { email: email, password: password });
    };

    this.checkLoginStatus = function () {
        return $http.get('/Home/CheckLoginStatus');
    };
    this.logoutUserFunc = function () {
        return $http.get('/Home/LogoutUser');
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
    this.viewIndivUser = function (userId) {
        return $http.get('/Home/LoadUserInfo', { params: { userId: userId } });
    };

    this.deleteItemFunc = function (productId) {
        return $http.post('/Home/DeleteProduct', { productId: productId });
    };

    this.deleteUserFunc = function (userId) {
        return $http.post('/Home/DeleteUser', { userId: userId });
    };


});
