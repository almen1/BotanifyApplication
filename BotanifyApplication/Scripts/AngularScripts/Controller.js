app.controller("BotanifyApplicationController", function ($scope, BotanifyApplicationService) {



    //SHOW DROPDOWN FOR MOBILE
    $scope.isDropdownVisible = false;
    $scope.showDropdown = function () {
        $scope.isDropdownVisible = !$scope.isDropdownVisible;
    };

    //EDIT PRODUCT


    //SUCCESS
    $scope.isSuccessVisible = false;
    $scope.showSuccess = function () {
        $scope.isSuccessVisible = !$scope.isSuccessVisible;

    };






    //if user is not logged in take to login but if user is logged in take to account page
    //code here




    //GENERAL NAVIGATION
    $scope.navigateTo = function (path) {
        window.location.href = path;
    };


    //QUANTITY BUTTON
    $scope.quantity = 1;

    $scope.decreaseQuantity = function () {
        if ($scope.quantity > 1) {
            $scope.quantity--;
        }
    };
    $scope.increaseQuantity = function () {
        if ($scope.quantity < 10) {
            $scope.quantity++;
        }
    };
    $scope.$watch('quantity', function (newValue) {
        console.log("Quantity changed:", newValue);
    });


    //FILTER CATEGORIES
    $scope.loadFilterFunc = function () {
        var getData = BotanifyApplicationService.loadFilterFunc();

        getData.then(function (ReturnedData) {
            $scope.sizes = ReturnedData.data.sizes;
            $scope.categories = ReturnedData.data.categories;
        });
    }

    //REGISTRATION SUBMIT FUNCTION
    $scope.registerSubmitFunc = function () {
        var regData = {
            fName: $scope.firstName,
            lName: $scope.lastName,
            uEmail: $scope.userEmail,
            uPassword: $scope.userPassword,
        }
        var getData = BotanifyApplicationService.registerSubmitFunc(regData);
        getData.then(function (ReturnedData) {

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
    }


    //CLOSE MODAL BUTTON ADMIN
    $scope.isViewVisible = false;
    $scope.closeModal = function () {
        $scope.isViewVisible = !$scope.isViewVisible;
    };


    //VIEW INDIV ITEM IN ADMIN
    $scope.viewItemFunc = function (productId) {
        var getData = BotanifyApplicationService.viewItemFunc(productId);
        getData.then(function (ReturnedData) {
            if (ReturnedData.data.success) {
                $scope.modalData = ReturnedData.data;
                $scope.isViewVisible = true;

                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            } else {
                alert("Product not found: " + ReturnedData.data.message);
            }
        });
    };


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
        $scope.productTipsError = false;
        $scope.categoryIdError = false;
        $scope.sizeIdError = false;

        var regexSku = /^.{1,50}$/;
        var regexProdName = /^.{1,50}$/;
        var regexProdSciName = /^.{1,50}$/;
        var regexProdDescription = /^.{1,1000}$/;
        var regexProdTips = /^.{1,1000}$/;
        var regexProdImage = /^.+$/;
        var regexProdPrice = /^[0-9]+$/;
        var regexProdStock = /^[0-9]+$/;

        var validOptions = ["1", "2", "3", "4"];

        $scope.categoryIdError = validOptions.indexOf($scope.categoryId) === -1;
        $scope.sizeIdError = validOptions.indexOf($scope.sizeId) === -1;

        if ($scope.sku.trim() === "" || !regexSku.test($scope.sku)) {
            $scope.skuError = true;
        }
        if ($scope.productName.trim() === "" || !regexProdName.test($scope.productName)) {
            $scope.productNameError = true;
        }
        if ($scope.productDescription.trim() === "" || !regexProdDescription.test($scope.productDescription)) {
            $scope.productDescriptionError = true;
        }
        if ($scope.productSciName.trim() === "" || !regexProdSciName.test($scope.productSciName)) {
            $scope.productSciNameError = true;
        }
        if ($scope.productImage.trim() === "" || !regexProdImage.test($scope.productImage)) {
            $scope.productImageError = true;
        }
        if ($scope.productPrice.trim() === "" || !regexProdPrice.test($scope.productPrice)) {
            $scope.productPriceError = true;
        }
        if ($scope.productStock.trim() === "" || !regexProdStock.test($scope.productStock)) {
            $scope.productStockError = true;
        }
        if ($scope.productTips.trim() === "" || !regexProdDescription.test($scope.productTips)) {
            $scope.productTipsError = true;
        }

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
        }, function (error) {
            alert("Error adding product: " + error.message);
        });
    };

    $scope.deleteItemFunc = function (productId) {
        var getData = BotanifyApplicationService.deleteItemFunc(productId);
        getData.then(function (ReturnedData) {
            if (ReturnedData.data.success) {
                alert("Product deleted successfully.");
                // Optionally, refresh the list of products or update the view
            } else {
                alert("Error: " + ReturnedData.data.message);
            }
        });
    };


});
