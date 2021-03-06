(function(){
    angular
        .module("FoodsterApp")
        .controller("OtherUserController", OtherUserController);

    function OtherUserController(UserService, $routeParams, $rootScope, $location, RecipeService, $window){
        var vm = this;

        var userId = $routeParams.userId;
        vm.follow = follow;
        vm.unfollow = unfollow;
        vm.goBack = goBack;
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/login")
                    },
                    function (err) {
                        $location.url("/login")
                    }
                )
        }

        function goBack() {
            $window.history.back();
        }


        var currentUser = $rootScope.currentUser;
        var loggedInUser = $rootScope.currentUser._id;


        function follow(toBeFollowedId, toBeFollowedUsername, foodiethought) {
           var followingUser = {
                userId: toBeFollowedId,
                username: toBeFollowedUsername,
                foodiethought: foodiethought
           };

            var followedByUser = {
                userId : currentUser._id,
                username: currentUser.username,
                foodiethought: currentUser.foodiethought
            };

            UserService
                .follow(loggedInUser, followingUser)
                .then(
                    function (response) {
                        vm.sucess = "Followed";
                        UserService
                            .findUserById(loggedInUser)
                            .then(
                                function (response) {
                                    var user = response.data;
                                    if(user) {
                                        for (var i in user.followingUsers) {
                                            if (user.followingUsers[i].userId === toBeFollowedId) {
                                                vm.followed = true;
                                                vm.unfollowed = false;
                                                return;
                                            }
                                        }
                                        vm.unfollowed = true;
                                        vm.followed = false;
                                    }
                                }
                            );
                        init();
                    }
                );

            UserService
                .followedBy(followedByUser, userId)
                .then(
                  function (response) {
                      vm.added = "Added";
                  }
                );

        }

        function unfollow() {
            UserService
                .unfollow(loggedInUser, userId)
                .then(
                    function (response) {
                        vm.success = "Unfollowed";
                        UserService
                            .findUserById(loggedInUser)
                            .then(
                                function (response) {
                                    var user = response.data;
                                    if(user) {
                                        for (var i in user.followingUsers) {
                                            if (user.followingUsers[i].userId === userId) {
                                                vm.followed = true;
                                                vm.unfollowed = false;
                                                return;
                                            }
                                        }
                                        vm.unfollowed = true;
                                        vm.followed = false;
                                    }
                                    init();
                                }

                            );
                    }
                );

            UserService
                .unfollowedBy(loggedInUser, userId)
                .then(
                    function (response) {
                        vm.removed = "Removed";
                    }
                );
        }


        function init(){
            UserService
                .findUserById(userId)
                .then(function (response) {
                    vm.user = response.data;
                });

            RecipeService
                .findRecipesByUser(userId)
                .then(function (response) {
                    vm.createdRecipes = response.data;
                    }

                );

            UserService
                .findUserById(loggedInUser)
                .then(
                    function (response) {
                        var user = response.data;
                        if(user) {
                            for (var i in user.followingUsers) {
                                if (user.followingUsers[i].userId === userId) {
                                    vm.followed = true;
                                    vm.unfollowed = false;
                                    return;
                                }
                            }
                            vm.unfollowed = true;
                            vm.followed = false;
                        }
                    }
                );
        }
        init();


    }
})();