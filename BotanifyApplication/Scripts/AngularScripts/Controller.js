app.controller("BotanifyApplicationController", function ($scope, BotanifyApplicationService) {

    //show nav dropdown
    $scope.isDropdownVisible = false;
    $scope.showDropdown = function () {
        $scope.isDropdownVisible = !$scope.isDropdownVisible;
    };


    //if user is not logged in take to login but if user is logged in take to account page
    $scope.showShop = function () {
        window.location.href = "/Home/ShopPage";
    }

    $scope.showProduct = function () {
        window.location.href = "/Home/ProductPage";
    }

    $scope.loginBtn = function () {
        window.location.href = "/Home/LoginPage";
    }
    $scope.showCart = function () {
        window.location.href = "/Home/CartPage";
    }

    //qty button
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


    //maybe final
    $scope.filters = [
        {
            title: 'Price',
            name: 'price',
            options: [
                { label: 'Under ₱2000', selected: false },
                { label: 'Under ₱1500', selected: false },
                { label: 'Under ₱1000', selected: false },
                { label: 'Under ₱500', selected: false }
            ]
        },
        {
            title: 'Size',
            name: 'size',
            options: [
                { label: 'Small', selected: false },
                { label: 'Medium', selected: false },
                { label: 'Large', selected: false },
                { label: 'Hanging', selected: false }
            ]
        },
        {
            title: 'Category',
            name: 'category',
            options: [
                { label: 'Air Purifiers', selected: false },
                { label: 'Pet-Friendly', selected: false },
                { label: 'Low Light', selected: false },
                { label: 'For Beginners', selected: false }
            ]
        }
    ];

    //not final for testing only
    $scope.products = [
        { name: "Austral Gem Fern", price: 500, imageUrl: "/Content/assets/plants/australfern_800x.png" },
        { name: "Sansevieria Snake, Dwarf", price: 750, imageUrl: "path_to_image2.jpg" },
        { name: "Aglaonema White Variegata", price: 1200, imageUrl: "path_to_image3.jpg" },
        { name: "Test Plant 4", price: 1200, imageUrl: "path_to_image3.jpg" },
        { name: "Test Plant 5", price: 1200, imageUrl: "path_to_image3.jpg" },
        { name: "Test Plant 6", price: 1200, imageUrl: "path_to_image3.jpg" },
    ];

    //for testing lang hehe
    $scope.addToCart = function (product) {
        console.log(product.name + "test");
    };

});
