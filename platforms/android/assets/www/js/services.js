angular.module('vnnovel.services', [])

    .factory('NovelService', function($http, $q, $cacheFactory) {

        return {
            setUrl: function(url) {
                return this.url = url || '';
            },

            findAll: function() {
                var $httpDefaultCache = $cacheFactory.get('$http'),
                    deferred = $q.defer(),
                    data = $httpDefaultCache.get(this.url);

                if (!data) {
                    $http.get(this.url, { cache: true }).then(function(result){
                        deferred.resolve(result.data);
                    });
                } else {
                    deferred.resolve(angular.fromJson(data[1]));
                }

                return deferred.promise;
            },

            findById: function(novelId) {
                return this.findAll().then(function(data) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].id === parseInt(novelId)) {
                            return data[i];
                        }
                    }
                    return $q.reject('Not found'); // id not found
                });
            },

            findByName: function(searchKey) {
                return this.findAll().then(function(data) {
                    var deferred = $q.defer(),
                        results = data.filter(function(element) {
                        var fullName = element.firstName + " " + element.lastName;
                        return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
                    });

                    deferred.resolve(results);
                    return deferred.promise;
                });
            },

            findByManager: function (managerId) {
                return this.findAll().then(function(data) {
                    var deferred = $q.defer(),
                        results = data.filter(function (element) {
                            return parseInt(managerId) === element.managerId;
                        });
                        
                    deferred.resolve(results);
                    return deferred.promise;
                });
            }

        }

    });