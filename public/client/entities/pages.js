define([
    "app",
    "Q"
], function (IntranetManager, Q) {

    IntranetManager.module("Entities",
        function (Entities, IntranetManager, Backbone, Marionette, $, _) {


            var apiEndPoint = 'pages';
            var apiEntityEndPoint = 'pages';

            Entities.PagePost = Backbone.Model.extend({
                url: IntranetManager.opts.API + apiEntityEndPoint
            });


            Entities.PagePostCollection = Backbone.Collection.extend({

                url: IntranetManager.opts.API + apiEntityEndPoint,

                model: Entities.PagePost,
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

                    var item = new Entities.PagePost();
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

                queryEndPoint: function(endpoint){
                    //console.log(endpoint);
                    return this.getDAOCollection(endpoint);
                },

                search: function (query) {
                    var url = '/search?' + query;
                    return this.getDAOCollection(url);
                },

                getDAOCollection: function (endpoint) {

                    console.log('<< getDAOCollection: Project -> ' + endpoint + '  >>');
                   // var url = this.getEntityEndPoint() + endpoint;

                    var collection = new Entities.PagePostCollection();
                    collection.url = endpoint;

                    console.log('%c!Fetching api endpoint - > ' + endpoint, "color: blue;");
                    return this.getDAOdeferred(collection);
                },

                getDAOdeferred: function (queryObject) {

                   // alert('in dao de');
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

            IntranetManager.reqres.setHandler("pages:posts", function () {
                return API.getEntities(null);
            });

            IntranetManager.reqres.setHandler("pages:post:search", function (query) {
                return API.search(query);
            });

            IntranetManager.reqres.setHandler("pages:post", function (id) {
                  var endpoint = API.getEntityEndPoint()+ '/' + id;
                //alert(endpoint);
                return API.getEntity(id, endpoint);
            });

            IntranetManager.reqres.setHandler("pages:post:new", function () {
                return new Entities.PagePost();
            });

            IntranetManager.reqres.setHandler("pages:app:posts", function (options) {
                var endpoint =  API.getEndPoint() + '/' + options.applicationId + '/entries';

                //query = 'parent_application=' + options.applicationId;
                //if (options.criterion)   query = query + '&criterion=' + options.criterion;

                return API.queryEndPoint(endpoint);
            });

            IntranetManager.reqres.setHandler("pages:app:posts:search", function (options) {
                var query;
                query = 'parent_application=' + options.applicationId;
                if (options.criterion)   query = query + '&criterion=' + options.criterion;

                return API.search(query);
            });


        });

    return;
});
