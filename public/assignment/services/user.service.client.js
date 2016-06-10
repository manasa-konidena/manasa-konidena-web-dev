(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function createUser(newUser){
                 var brandNewUser = {
                    username: newUser.username,
                    password: newUser.password
                };
                return $http.post("/api/user", brandNewUser);
        }


        function findUserByCredentials(username, password){
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function findUserById(userId) {
            var url = "/api/user/"+ userId;
            return $http.get(url);
        }

        function findUserByUsername(username){
            var url = "/api/user?username="+ username;
            return $http.get(url);
        }

        function updateUser(userId, newUser) {
            var url = "/api/user/" + userId;
            return $http.put(url, newUser);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }
    }
})();
