app.controller("BotanifyApplicationController", function ($scope, $window, BotanifyApplicationService) {



    //SHOW DROPDOWN FOR MOBILE
    $scope.isDropdownVisible = false;
    $scope.showDropdown = function () {
        $scope.isDropdownVisible = !$scope.isDropdownVisible;
    };

    //SORT PRODUCTS
    $scope.sortOption = '0';
    $scope.sortProducts = function () {
        switch ($scope.sortOption) {
            case '0':
                $scope.productsData.sort(function (a, b) {
                    return a.productId - b.productId;
                });
                break;
            case '1':
                $scope.productsData.sort(function (a, b) {
                    return a.productName.localeCompare(b.productName);
                });
                break;
            case '2':
                $scope.productsData.sort(function (a, b) {
                    return b.productName.localeCompare(a.productName);
                });
                break;
            case '3':
                $scope.productsData.sort(function (a, b) {
                    return b.productPrice - a.productPrice;
                });
                break;
            case '4':
                $scope.productsData.sort(function (a, b) {
                    return a.productPrice - b.productPrice;
                });
                break;
            default:
                break;
        }
    };




    //GENERAL NAVIGATION
    $scope.navigateTo = function (path) {
        window.location.href = path;
    };


    //FILTER CATEGORIES
    $scope.loadFilterFunc = function () {
        var getData = BotanifyApplicationService.loadFilterFunc();

        getData.then(function (ReturnedData) {
            $scope.sizes = ReturnedData.data.sizes;
            $scope.categories = ReturnedData.data.categories;

            $scope.sizes.forEach(function (size) {
                size.selected = size.selected || false;
            });

            $scope.categories.forEach(function (category) {
                category.selected = category.selected || false;
            });

            $scope.applyFilter();
        });
    }
    //APPLY FILTER
    $scope.applyFilter = function () {
        var filteredProducts = $scope.productsData;

        if ($scope.sizes) {
            var selectedSizes = $scope.sizes.filter(function (size) {
                return size.selected;
            }).map(function (size) {
                return size.sizeId; 
            });

            if (selectedSizes.length > 0) {
                filteredProducts = filteredProducts.filter(function (product) {
                    return selectedSizes.includes(product.sizeId);
                });
            }
        }

        if ($scope.categories) {
            var selectedCategories = $scope.categories.filter(function (category) {
                return category.selected;
            }).map(function (category) {
                return category.categoryId;  
            });

            if (selectedCategories.length > 0) {
                filteredProducts = filteredProducts.filter(function (product) {
                    return selectedCategories.includes(product.categoryId);
                });
            }
        }
        $scope.filteredProducts = filteredProducts;
    };

    //REGISTRATION SUBMIT FUNCTION
    $scope.registerSubmitFunc = function ($event) {
        $event.preventDefault();

        $scope.fnameError = false;
        $scope.lnameError = false;
        $scope.emailError = false;
        $scope.passwordError = false;
        $scope.addressError = false;
        $scope.cityError = false;
        $scope.regionError = false;
        $scope.postalError = false;
        $scope.phoneError = false;
        $scope.emailExistsError = false;

        var regexPatterns = {
            firstName: /^.{1,50}$/,
            lastName: /^.{1,50}$/,
            userEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            userPassword: /^.{6,50}$/,
            userAddress: /^.{1,100}$/,
            userCity: /^.{1,50}$/,
            userRegion: /^.{1,50}$/,
            userPostal: /^\d{4,10}$/,
            userPhone: /^\d{10,15}$/
        };

        var formData = {
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            userEmail: $scope.userEmail,
            userPassword: $scope.userPassword,
            userAddress: $scope.userAddress,
            userCity: $scope.userCity,
            userRegion: $scope.userRegion,
            userPostal: $scope.userPostal,
            userPhone: $scope.userPhone
        };

        angular.forEach(formData, function (value, key) {
            var regex = regexPatterns[key];
            if (!value.trim() || !regex.test(value)) {
                $scope[key + "Error"] = true;
            }
        });

        if (
            $scope.fnameError || $scope.lnameError || $scope.emailError ||
            $scope.passwordError || $scope.addressError || $scope.cityError ||
            $scope.regionError || $scope.postalError || $scope.phoneError
        ) {
            return;
        }

        var lowerFirstName = $scope.firstName.toLowerCase();
        var lowerLastName = $scope.lastName.toLowerCase();

        // CHECK EMAIL IN DB
        var checkEmailData = { userEmail: $scope.userEmail };
        var emailCheck = BotanifyApplicationService.checkEmailFunc(checkEmailData);
        emailCheck.then(function (emailExists) {
            if (emailExists.data) {
                $scope.emailExistsError = true;
                alert("This email is already registered!");
            } else {
                var regData = {
                    fName: lowerFirstName, 
                    lName: lowerLastName,
                    uEmail: $scope.userEmail,
                    uPassword: $scope.userPassword,
                    uAddress: $scope.userAddress,
                    uCity: $scope.userCity,
                    uRegion: $scope.userRegion,
                    uPostal: $scope.userPostal,
                    uPhone: $scope.userPhone
                };

                var getData = BotanifyApplicationService.registerSubmitFunc(regData);
                getData.then(function (ReturnedData) {
                    alert("Registration successful!");
                    window.location.href = "/Home/LoginPage";
                    $scope.resetForm();
                }, function (error) {
                    alert("Error during registration: " + error.message);
                });
            }
        });
    };

  

    // GET INDIVIDUAL ITEM BASED ON PRODUCT ID (FOR USERS SHOP PAGE -> PRODUCT PAGE)
    $scope.loadItemFunc = function (productId) {
        var getData = BotanifyApplicationService.loadProductFunc();
        getData.then(function (ReturnedData) {
            $scope.productsData = ReturnedData.data;

            var selectedItem = $scope.productsData.find(function (product) {
                return product.productId === parseInt(productId);
            });

            if (selectedItem) {
                $scope.itemData = selectedItem;

                var productQuery =
                    "?id=" + encodeURIComponent($scope.itemData.productId) +
                    "&cateid=" + encodeURIComponent($scope.itemData.categoryId) +
                    "&sci=" + encodeURIComponent($scope.itemData.productSciName) +
                    "&name=" + encodeURIComponent($scope.itemData.productName) +
                    "&category=" + encodeURIComponent($scope.itemData.category) +
                    "&price=" + encodeURIComponent($scope.itemData.productPrice) +
                    "&image=" + encodeURIComponent($scope.itemData.productImage) +
                    "&description=" + encodeURIComponent($scope.itemData.productDescription) +
                    "&tips=" + encodeURIComponent($scope.itemData.productTips);

      

                    window.location.href = "/Home/ProductPage" + productQuery;

            } else {
                alert("Product not found!");
            }
        });
    };


    //STORE DATA FOR PRODUCT PAGE (USERS)
    $scope.itemData = {};
    var params = new URLSearchParams(window.location.search);

    $scope.itemData.productId = params.get('id');
    $scope.itemData.categoryId = params.get('cateid');
    $scope.itemData.productSciName = params.get('sci');
    $scope.itemData.productName = params.get('name');
    $scope.itemData.category = params.get('category');
    $scope.itemData.productPrice = params.get('price');
    $scope.itemData.productImage = params.get('image');
    $scope.itemData.productDescription = params.get('description');
    $scope.itemData.productTips = params.get('tips');


    //GET ALL PRODUCTS
    $scope.loadProductFunc = function () {
        var getData = BotanifyApplicationService.loadProductFunc();
        getData.then(function (ReturnedData) {
            $scope.productsData = ReturnedData.data;
            $scope.sortProducts();
            $scope.applyFilter();

            $(document).ready(function () {
                $('#myTable').DataTable({
                    layout: {
                        topStart: {
                            pageLength: {
                                menu: [5, 10, 15]
                            }
                        },
                        bottomEnd: {
                            paging: {
                                buttons: 3
                            }
                        }
                    }
                });
            });
        });
    };

    //LOAD ALL USERS
    $scope.loadUserFunc = function () {
        var getData = BotanifyApplicationService.loadUserFunc();

        getData.then(function (ReturnedData) {
            $scope.usersData = ReturnedData.data;

            $(document).ready(function () {
                $('#userTable').DataTable({
                    layout: {
                        topStart: {
                            pageLength: {
                                menu: [5, 10, 15]
                            }
                        },
                        bottomEnd: {
                            paging: {
                                buttons: 3
                            }
                        }
                    }
                });
            });
        });
    }

   

    //CHECK IF LOGGED IN
    $scope.checkLoginStatus = function () {
        BotanifyApplicationService.checkLoginStatus().then(function (response) {
            if (response.data.loggedIn) {
                $scope.isLoggedIn = true;
                $scope.userEmail = response.data.userEmail;
                $scope.firstName = response.data.firstName;
                $scope.lastName = response.data.lastName;
            } else {
                $scope.isLoggedIn = false;
            }
        });
    };

    //CLOSE MODAL BUTTON ADMIN
    $scope.isViewVisible = false;
    $scope.closeModal = function () {
        $scope.isViewVisible = !$scope.isViewVisible;
    };

    // LOGIN
    $scope.isLoggedIn = false;

    $scope.loginFunc = function () {
        if (!$scope.uEmail || !$scope.uPass) {
            return;
        }
        BotanifyApplicationService.loginUserFunc($scope.uEmail, $scope.uPass)
            .then(function (response) {
                if (response.data.success) {
                    $scope.isLoggedIn = true;
                    $scope.uData = response.data;
                    return BotanifyApplicationService.viewIndivUser($scope.uData.userId);
                }
            })
            .then(function (ReturnedData) {
                if (ReturnedData.data.success) {
                    var userDetails = ReturnedData.data.data;

                    if (userDetails.firstName) {
                        userDetails.firstName = userDetails.firstName.charAt(0).toUpperCase() + userDetails.firstName.slice(1);
                    }
                    if (userDetails.lastName) {
                        userDetails.lastName = userDetails.lastName.charAt(0).toUpperCase() + userDetails.lastName.slice(1);
                    }

                    sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
                    window.location.href = '/Home/';
                } else {
                    alert("User not found: " + ReturnedData.data.message);
                }
            })
            .catch(function (error) {
                alert(error.message);
            });
    };

    $scope.userDetails = JSON.parse(sessionStorage.getItem('userDetails'));

    //LOGOUT
    $scope.logoutFunc = function () {
        BotanifyApplicationService.logoutUserFunc().then(function (response) {
            sessionStorage.removeItem('userDetails');
            window.location.href = '/Home';
        });
    };


    //VIEW INDIV ITEM IN ADMIN
    $scope.viewItemFunc = function (productId) {
        var getData = BotanifyApplicationService.viewItemFunc(productId);
        getData.then(function (ReturnedData) {
            if (ReturnedData.data.success) {
                $scope.modalData = ReturnedData.data;
                $scope.isViewVisible = true;


            } else {
                alert("Product not found: " + ReturnedData.data.message);
            }
        });
    };

    //EDIT PRODUCT
    $scope.disableField = true;
    $scope.editProductFunc = function () {
        $scope.disableField = !$scope.disableField;
    }


    //ADD PRODUCT BUTTON
    $scope.isAddVisible = false;
    $scope.addProduct = function () {
        $scope.isAddVisible = !$scope.isAddVisible;
    };

    // ADD PRODUCT
    $scope.addProductFunc = function ($event) {
        $event.preventDefault();

        $scope.skuError = false;
        $scope.productNameError = false;
        $scope.productDescriptionError = false;
        $scope.productTipsError = false;
        $scope.productSciNameError = false;
        $scope.productImageError = false;
        $scope.productPriceError = false;
        $scope.productStockError = false;
        $scope.categoryIdError = false;
        $scope.sizeIdError = false;

        var regexPatterns = {
            sku: /^.{1,50}$/,
            productName: /^.{1,50}$/,
            productSciName: /^.{1,50}$/,
            productDescription: /^.{1,1000}$/,
            productTips: /^.{1,1000}$/,
            productImage: /^.+$/,
            productPrice: /^[0-9]+$/,
            productStock: /^[0-9]+$/
        };

        var validOptions = ["1", "2", "3", "4"];

        $scope.categoryIdError = validOptions.indexOf($scope.categoryId) === -1;
        $scope.sizeIdError = validOptions.indexOf($scope.sizeId) === -1;

        var formData = {
            sku: $scope.sku,
            productName: $scope.productName,
            productDescription: $scope.productDescription,
            productSciName: $scope.productSciName,
            productImage: $scope.productImage,
            productPrice: $scope.productPrice,
            productStock: $scope.productStock,
            productTips: $scope.productTips
        };

        angular.forEach(formData, function (value, key) {
            var regex = regexPatterns[key];
            if (key !== "categoryId" && key !== "sizeId" && (!value.trim() || !regex.test(value))) {
                $scope[key + "Error"] = true;
            }
        });

        if (
            $scope.skuError || $scope.productNameError || $scope.productDescriptionError ||
            $scope.productSciNameError || $scope.productImageError || $scope.productPriceError ||
            $scope.productStockError || $scope.productTipsError || $scope.sizeIdError || $scope.categoryIdError
        ) {
            return;
        }

        var prodData = {
            skuLocal: $scope.sku,
            categoryIdLocal: $scope.categoryId,
            sizeIdLocal: $scope.sizeId,
            prodName: $scope.productName,
            prodDescription: $scope.productDescription,
            prodSciName: $scope.productSciName,
            prodImage: $scope.productImage,
            prodPrice: $scope.productPrice,
            prodStock: $scope.productStock,
            prodTips: $scope.productTips,
        };

        var getData = BotanifyApplicationService.addProductFunc(prodData);
        getData.then(function (ReturnedData) {
            alert("Product added successfully!");
            $scope.showForm = false;
            $scope.productName = '';
            $scope.sku = '';
            $scope.productSciName = '';
            $scope.productDescription = '';
            $scope.productTips = '';
            $scope.sizeId = 0;
            $scope.categoryId = 0;
            $scope.productImage = '';
            $scope.productPrice = '';
            $scope.productStock = '';
            $window.location.reload();
        }, function (error) {
            alert("Error adding product: " + error.message);
        });
    };

    //DELETE PRODUCT
    $scope.deleteItemFunc = function (productId) {
        var getData = BotanifyApplicationService.deleteItemFunc(productId);
        getData.then(function (ReturnedData) {
            if (ReturnedData.data.success) {
                alert("Product deleted successfully.");
                $window.location.reload();
            } else {
                alert("Error: " + ReturnedData.data.message);
            }
        });
    };

    //EDIT PRODUCT
    $scope.saveEditProductFunc = function ($event) {
        $event.preventDefault();

        $scope.skuError = false;
        $scope.productNameError = false;
        $scope.productDescriptionError = false;
        $scope.productTipsError = false;
        $scope.productSciNameError = false;
        $scope.productImageError = false;
        $scope.productPriceError = false;
        $scope.productStockError = false;
        $scope.categoryIdError = false;
        $scope.sizeIdError = false;

        var regexPatterns = {
            sku: /^.{1,50}$/,
            productName: /^.{1,50}$/,
            productSciName: /^.{1,50}$/,
            productDescription: /^.{1,1000}$/,
            productTips: /^.{1,1000}$/,
            productImage: /^.+$/,
            productPrice: /^\d+(\.\d{1,2})?$/,
            productStock: /^\d+$/
        };

        var validOptions = ["1", "2", "3", "4"];

        //$scope.categoryIdError = validOptions.indexOf($scope.categoryId) === -1;
        //$scope.sizeIdError = validOptions.indexOf($scope.sizeId) === -1;

        var formData = {
            sku: String($scope.modalData.data.sku || ''),
            productName: String($scope.modalData.data.productName || ''),
            productDescription: String($scope.modalData.data.productDescription || ''),
            productSciName: String($scope.modalData.data.productSciName || ''),
            productImage: String($scope.modalData.data.productImage || ''),
            productPrice: String($scope.modalData.data.productPrice || ''),
            productStock: String($scope.modalData.data.productStock || ''),
            productTips: String($scope.modalData.data.productTips || '')
        };

        angular.forEach(formData, function (value, key) {
            var regex = regexPatterns[key];
            if (!value || !regex.test(value)) {
                $scope[key + "Error"] = true;
            }
        });

        if (
            $scope.skuError || $scope.productNameError || $scope.productDescriptionError ||
            $scope.productSciNameError || $scope.productImageError || $scope.productPriceError ||
            $scope.productStockError || $scope.productTipsError || $scope.sizeIdError || $scope.categoryIdError
        ) {
            return;
        }

        var prodData = {
            productId: $scope.modalData.data.productId,
            skuLocal: $scope.modalData.data.sku,
            categoryIdLocal: $scope.modalData.data.categoryId,
            sizeIdLocal: $scope.modalData.data.sizeId,
            prodName: $scope.modalData.data.productName,
            prodDescription: $scope.modalData.data.productDescription,
            prodSciName: $scope.modalData.data.productSciName,
            prodImage: $scope.modalData.data.productImage,
            prodPrice: $scope.modalData.data.productPrice,
            prodStock: $scope.modalData.data.productStock,
            prodTips: $scope.modalData.data.productTips
        };

        var getData = BotanifyApplicationService.updateProductFunc(prodData);
        getData.then(function (ReturnedData) {
            alert("Product updated successfully!");
            $scope.disableField = true;
            $scope.isViewVisible = false;
            $window.location.reload();
        }, function (error) {
            alert("Error updating product: " + error.message);
        });
    };

    //DELETE USER
    $scope.deleteUserFunc = function (userId) {
        var getData = BotanifyApplicationService.deleteUserFunc(userId);
        getData.then(function (ReturnedData) {
            if (ReturnedData.data.success) {
                alert("User deleted successfully.");
                $window.location.reload();
            } else {
                alert("Error: " + ReturnedData.data.message);
            }
        });
    };


    //QUANTITY BUTTON
    $scope.quantity = 1;

    $scope.changeQuantity = function (direction) {
        if (direction === 'increase' && $scope.quantity < 10) {
            $scope.quantity++;
        } else if (direction === 'decrease' && $scope.quantity > 1) {
            $scope.quantity--;
        }
    };

    $scope.$watch('quantity', function (newValue) {
        console.log("Quantity changed:", newValue);
    });

    //ADD TO CART
    $scope.addToCart = function (productId) {
        if (!$scope.isLoggedIn) {
            window.location.href = "/Home/LoginPage";
            return;
        }

        var userId = $scope.userDetails.userId;
        var quantity = $scope.quantity || 1; 

        var cartData = {
            productIdLocal: productId,
            userIdLocal: userId,
            prodQtyLocal: quantity
        };

        BotanifyApplicationService.addProdToCart(cartData)
            .then(function (response) {
                if (response.data.success) {
                    alert('Product added to cart successfully.');
                } else {
                    alert('Error: ' + response.data.message);
                }
            })
    };

    //DISPLAY TO CART PAGE
    $scope.getCartItems = function (userId) {
        BotanifyApplicationService.getCartItems(userId)
            .then(function (response) {
                if (response.data.success) {
                    $scope.cartItems = response.data.cartItems;
                } else {
                    console.log('Error: ' + response.data.message);
                }
            })
            
    };

    //REMOVE FROM CART
    $scope.removeItem = function (cartId) {
        var getData = BotanifyApplicationService.removeCartItem(cartId);
        getData.then(function (ReturnedData) {
            if (ReturnedData.data.success) {
                $window.location.reload(); 
            } else {
                alert("Error: " + ReturnedData.data.message);
            }
        });
    };

    //CHANGE QUANTITY IN CART
    $scope.changeCartQuantity = function (direction, item) {
        if (direction === 'increase' && item.productQty < 10) {
            item.productQty++;
        } else if (direction === 'decrease' && item.productQty > 1) {
            item.productQty--;
        }

        BotanifyApplicationService.updateCartItemQuantity(item.cartId, item.productQty)
            .then(function (response) {
                if (response.data.success) {
                    console.log('Quantity updated successfully.');
                }
            })
    };

    //CALCULATE SUBTOTAL
    $scope.calculateSubtotal = function () {
        var subtotal = 0;
        angular.forEach($scope.cartItems, function (item) {
            subtotal += item.productPrice * item.productQty;
        });
        return subtotal;
    };

    //CREATE CHECKOUT SESSION
    $scope.createCheckout = function () {
        const lineItems = $scope.cartItems.map(item => ({
            currency: 'PHP',
            amount: item.productPrice * 100,
            name: item.productName,
            quantity: item.productQty
        }));

        const checkoutData = {
            lineItems: lineItems,
            customerInfo: {
                firstName: $scope.userDetails.firstName,
                lastName: $scope.userDetails.lastName,
                email: $scope.userDetails.userEmail,
                phone: $scope.userDetails.userPhone
            },
            billing: {
                address: {
                    line1: $scope.userDetails.address,
                    city: $scope.userDetails.city,
                    state: $scope.userDetails.region,
                    postal_code: $scope.userDetails.zipcode,
                    country: 'PH'
                },
                name: $scope.userDetails.firstName + ' ' + $scope.userDetails.lastName,
                email: $scope.userDetails.userEmail,
                phone: $scope.userDetails.userPhone
            }
        };

        BotanifyApplicationService.createPaymongoCheckout(checkoutData)
            .then(function (checkoutSessionId) {
                console.log('Checkout session ID:', checkoutSessionId);

                sessionStorage.setItem('checkoutSessionId', checkoutSessionId);

            })
            .catch(function (error) {
                alert('Error: ' + (error.message || 'Failed to create checkout'));
            });
    };

    //CHECKOUT STATUS
    $scope.checkPaymentStatus = function () {
        const checkoutSessionId = sessionStorage.getItem('checkoutSessionId');
        if (!checkoutSessionId) {
            alert('No checkout session found.');
            return;
        }

        
        BotanifyApplicationService.fetchCheckoutSessionDetails(checkoutSessionId, $scope.userDetails.userId)
            .then(() => {
                $scope.deleteCart($scope.userDetails.userId);
            })
            .catch(error => {
                alert('Error: ' + (error.message || 'Failed to process payment'));
            });
    };

    //CLEAR CART AFTER SUCCESS CHECKOUT
    $scope.deleteCart = function (userId) {
        var getData = BotanifyApplicationService.deleteCartItems(userId);
        getData.then(function (ReturnedData) {
            if (ReturnedData.data.success) {
                sessionStorage.removeItem('checkoutSessionId');
                $scope.cartItems = [];
                alert('Payment successful! Cart has been cleared.');
            } else {
                alert("Error: " + ReturnedData.data.message);
            }
        }).catch(function (error) {
            alert('Error: ' + (error.message || 'Failed to clear cart.'));
        });
    };


});
