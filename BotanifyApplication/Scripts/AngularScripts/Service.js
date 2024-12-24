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
                        },
                        success_url: 'https://localhost:44338/Home/SuccessPage',
                        failure_url: 'https://localhost:44338/Home/CartPage'
                    }
                }
            })
        };

        return fetch(paymongoUrl, options)
            .then(res => res.json())
            .then(res => {
                console.log(res);

                if (res.data && res.data.attributes.checkout_url) {
                    const checkoutUrl = res.data.attributes.checkout_url;
                    const checkoutSessionId = res.data.id;
                    window.location.href = checkoutUrl;

                    return checkoutSessionId;
                } else {
                    throw new Error('Failed to retrieve checkout session');
                }
            })
            .catch(err => {
                console.error('Error creating checkout session:', err);
                throw err;
            });
    };

    this.fetchCheckoutSessionDetails = function (checkoutSessionId) {
        const paymongoUrl = `https://api.paymongo.com/v1/checkout_sessions/${checkoutSessionId}`;

        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic c2tfdGVzdF9CanFqOUFrZW5wdm4xUGRyVDRxemt1R3o='
            }
        };

        return fetch(paymongoUrl, options)
            .then(res => res.json())
            .then(res => {
                if (res.data) {
                    const checkoutSession = res.data;
                    const sessionId = checkoutSession.id;
                    const referenceNumber = checkoutSession.attributes.reference_number;

                    const totalAmount = checkoutSession.attributes.payments[0].attributes.amount / 100;
                    const paymentMethod = checkoutSession.attributes.payments[0].attributes.source.type;

                    const status = checkoutSession.attributes.payments[0].attributes.status;
                    const orderDate = new Date(checkoutSession.attributes.created_at * 1000).toLocaleString();

                    console.log(sessionId);

                    alert(`Purchase Successful! \nCheckout Session ID: ${sessionId} \nReference Number: ${referenceNumber} \nTotal Amount: PHP ${totalAmount} \nPayment Method: ${paymentMethod} \nOrder Status: ${status} \nOrder Date: ${orderDate}`);
                } else {
                    throw new Error('Failed to retrieve checkout session details');
                }
            })
            .catch(err => {
                console.error('Error retrieving checkout session details:', err);
                alert('Error: ' + err.message);
            });
    };




});
