app.controller("BotanifyApplicationController", function ($scope, BotanifyApplicationService) {

    //SHOW DROPDOWN FOR MOBILE
    $scope.isDropdownVisible = false;
    $scope.showDropdown = function () {
        $scope.isDropdownVisible = !$scope.isDropdownVisible;
    };

    //SHOW MODAL
    $scope.isModalVisible = false;

    $scope.showModal = function () {
        $scope.isModalVisible = !$scope.isModalVisible;
    };


    $scope.isSuccessVisible = false;


    //temp code, when checkout clear cart go to landing and show success
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




});
