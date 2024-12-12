app.service("BotanifyApplicationService", function ($http) {

    //TEST LANG NG ADD
    this.submitFunc = function (registrationData) {
        var response = $http({
            method: "post",
            url: "/Home/AddUser",
            data: registrationData
        })
        return response;
    }
});
