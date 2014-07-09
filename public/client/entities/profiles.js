define([
    "app",
    "Q"
], function (IntranetManager, Q) {

    IntranetManager.module("Entities",
        function (Entities, IntranetManager, Backbone, Marionette, $, _) {


            var apiEndPoint = 'profiles';
            var apiEntityEndPoint = 'profiles';

            Entities.Profile = Backbone.Model.extend({
                url: IntranetManager.opts.API + apiEntityEndPoint
            });


            Entities.ProfileCollection = Backbone.Collection.extend({

                url: IntranetManager.opts.API + apiEntityEndPoint,

                model: Entities.Profile,
                comparator: "title"
            });

            var API = {

                getEndPoint: function () {
                    return IntranetManager.opts.API + apiEndPoint;
                },

                getEntityEndPoint: function () {
                    return IntranetManager.opts.API + apiEntityEndPoint;
                },

                getEntities: function (endpoint) {
                    if (endpoint) {
                        return this.getDAOCollection(endpoint);
                    }
                    return this.getDAOCollection(apiEntityEndPoint);
                },

                getEntity: function (id, endpoint) {

                    var item = new Entities.BlogPost();
                    if (id) {
                        item.id = id;
                    }
                    item.url = endpoint;
                    return this.getDAOdeferred(item);
                },

                query: function (query) {
                    var url = '?' + query;
                    return this.getDAOCollection(url);
                },

                search: function (query) {
                    var url = '/search?' + query;
                    return this.getDAOCollection(url);
                },

                getDAOCollection: function (endpoint) {

                    console.log('<< getDAOCollection: -> ' + endpoint + '  >>');


                    //var url = this.getEntityEndPoint() + endpoint;

                    var collection = new Entities.BlogPostCollection();
                    collection.url = endpoint;

                    console.log('%c!Fetching api endpoint - > ' + endpoint, "color: blue;");

                    return this.getDAOdeferred(collection);
                },

                getDAOdeferred: function (queryObject) {

                    return Q(queryObject.fetch())
                        .then(function (data) {

                            console.log(data);
                            return queryObject;

                        }, function (xhr) {

                            console.log('err occurred during fetch');
                            return undefined;
                        }
                    );

                }

            };


            IntranetManager.reqres.setHandler("profiles:entity", function (id) {
                  var endpoint = API.getEntityEndPoint()+ '/' + id;
                return API.getEntity(id, endpoint);
            });

            IntranetManager.reqres.setHandler("profiles:entity:user", function (id) {
                var endpoint = API.getEntityEndPoint()+ '/user/' + id;
                return API.getEntity(id, endpoint);
            });


        });

    return;
});
