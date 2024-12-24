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

    this.addProdToCart = function (cartData) {
        var response = $http({
            method: "post",
            url: "/Home/AddToCart",
            data: cartData
        });
        return response;
    };
   
    this.getCartItems = function (userId) {
        return $http.get('/Home/GetCartItems', { params: { userId: userId } });
    };

    this.removeCartItem = function (cartId) {
        return $http.post('/Home/DeleteCartItem', { cartId: cartId });
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

    this.updateCartItemQuantity = function (cartId, quantity) {
        return $http.post('/Home/UpdateCartItemQuantity', { cartId: cartId, quantity: quantity });
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

    this.createPaymongoCheckout = function (checkoutData) {
        const paymongoUrl = 'https://api.paymongo.com/v1/checkout_sessions';

        const lineItems = checkoutData.lineItems.map(item => ({
            currency: 'PHP',
            amount: item.amount,
            name: item.name,
            quantity: item.quantity
        }));

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic c2tfdGVzdF9CanFqOUFrZW5wdm4xUGRyVDRxemt1R3o='
            },
            body: JSON.stringify({
                data: {
                    attributes: {
                        send_email_receipt: true,
                        show_description: true,
                        show_line_items: true,
                        line_items: lineItems,
                        payment_method_types: ['card', 'gcash'],
                        reference_number: 'ORDER-' + Date.now(),
                        description: 'Botanify Order',
                        billing: {
                            address: {
                                line1: checkoutData.billing.address.line1,
                                city: checkoutData.billing.address.city,
                                state: checkoutData.billing.address.state,
                                postal_code: checkoutData.billing.address.postal_code,
                                country: checkoutData.billing.address.country
                            },
                            name: checkoutData.billing.name,
                            email: checkoutData.billing.email,
                            phone: checkoutData.billing.phone
                        },
                        customer_info: {
                            first_name: checkoutData.customerInfo.firstName,
                            last_name: checkoutData.customerInfo.lastName,
                            email: checkoutData.customerInfo.email,
                            phone: checkoutData.customerInfo.phone
                        }
                    }
                }
            })
        };

        return $http({
            method: 'POST',
            url: paymongoUrl,
            headers: options.headers,
            data: JSON.parse(options.body)
        });
    };




});
