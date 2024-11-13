app.controller("BotanifyApplicationController", function ($scope, BotanifyApplicationService) {

    $scope.dropdownVisible = false;
    $scope.toggleDropdown = function () {
        $scope.dropdownVisible = !$scope.dropdownVisible;
    };

    $scope.shopCategories = [
        { title: 'Shop by collections', links: ['Test Link 1', 'Test Link 2', 'Test Link 3', 'Test Link 4'] },
        { title: 'Shop by price', links: ['Test Link 1', 'Test Link 2', 'Test Link 3', 'Test Link 4'] },
        { title: 'Shop by size', links: ['Test Link 1', 'Test Link 2', 'Test Link 3', 'Test Link 4'] },
        { title: 'Shop by category', links: ['Test Link 1', 'Test Link 2', 'Test Link 3', 'Test Link 4'] }
    ];

});
