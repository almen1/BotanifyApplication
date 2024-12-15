﻿app.controller("BotanifyApplicationController", function ($scope, BotanifyApplicationService) {

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

    //GET INDIV ITEM BASED ON PRODUCT ID NOT WORKING YET
    $scope.loadItemFunc = function (productId) {
        var getData = BotanifyApplicationService.loadItemFunc(productId);
        getData.then(function (ReturnedData) {
            $scope.itemData = ReturnedData.data;

            alert(JSON.stringify($scope.itemData));

            if ($scope.itemData) {
                window.location.href = "/Home/ProductPage/" + productId;
            }
        });
        alert("this is the prodId" + productId);
    };


    


    //GET ALL PRODUCTS
    $scope.loadProductFunc = function () {
        var getData = BotanifyApplicationService.loadProductFunc();
        getData.then(function (ReturnedData) {
            $scope.productsData = ReturnedData.data;
            $(document).ready(function () {
                $('#myTable').DataTable();
            });
        });
    }

    //ADD PRODUCT BUTTON
    $scope.isAddVisible = false;
    $scope.addProduct = function () {
        $scope.isAddVisible = !$scope.isAddVisible;
        $scope.showForm = true;
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

});
