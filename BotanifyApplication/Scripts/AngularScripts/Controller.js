app.controller("BotanifyApplicationController", function ($scope, BotanifyApplicationService) {

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
        { name: "Test Plant 1", price: 500, imageUrl: "path_to_image1.jpg" },
        { name: "Test Plant 2", price: 750, imageUrl: "path_to_image2.jpg" },
        { name: "Test Plant 3", price: 1200, imageUrl: "path_to_image3.jpg" },
        { name: "Test Plant 4", price: 1200, imageUrl: "path_to_image3.jpg" },
        { name: "Test Plant 5", price: 1200, imageUrl: "path_to_image3.jpg" },
        { name: "Test Plant 6", price: 1200, imageUrl: "path_to_image3.jpg" },
    ];

    //for testing lang hehe
    $scope.addToCart = function (product) {
        console.log(product.name + "test");
    };

});
