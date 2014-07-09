define([
    "app",
    "Q"
], function (IntranetManager, Q) {

    IntranetManager.module("Entities",
        function (Entities, IntranetManager, Backbone, Marionette, $, _) {


            var apiEndPoint = 'blogs';
            var apiEntityEndPoint = 'blogposts';

            Entities.BlogPost = Backbone.Model.extend({
                url: IntranetManager.opts.API + apiEntityEndPoint
            });


            Entities.BlogPostCollection = Backbone.Collection.extend({

                url: IntranetManager.opts.API + apiEntityEndPoint,

                model: Entities.BlogPost,
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

                query: function (endpoint) {
                    return this.getDAOCollection(endpoint);
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

            IntranetManager.reqres.setHandler("blogs:blogs", function () {
                return API.getEntities(null);
            });

            IntranetManager.reqres.setHandler("blogs:posts:search", function (query) {
                return API.search(query);
            });

            IntranetManager.reqres.setHandler("blogs:posts:recent", function (query) {
                var endpoint =  API.getEndPoint() + '/' + query.applicationId + '/recent';
                return API.getEntities(endpoint);
            });

            IntranetManager.reqres.setHandler("blogs:post", function (id) {
                  var endpoint = API.getEntityEndPoint()+ '/' + id;
                return API.getEntity(id, endpoint);
            });

            IntranetManager.reqres.setHandler("blogs:post:new", function () {
                return new Entities.BlogPost();
            });

            IntranetManager.reqres.setHandler("blogs:blog:posts", function (options) {
                var endpoint = API.getEndPoint() + '/' + options.applicationId + '/posts';
                return API.query(endpoint);
            });

            IntranetManager.reqres.setHandler("blogs:blog:posts:search", function (options) {
                var query;
                query = 'parent_application=' + options.applicationId;
                if (options.criterion)   query = query + '&criterion=' + options.criterion;

                return API.search(query);
            });


        });

    return;
});
