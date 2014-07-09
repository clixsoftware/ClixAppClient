define([
    "app",
    "Q"
], function (IntranetManager, Q) {

    IntranetManager.module("Entities",
        function (Entities, IntranetManager, Backbone, Marionette, $, _) {


            var apiEndPoint = 'projects';
            var apiEntityEndPoint = 'project';

            Entities.Project = Backbone.Model.extend({
                url: IntranetManager.opts.API + apiEntityEndPoint
            });


            Entities.ProjectCollection = Backbone.Collection.extend({

                url: IntranetManager.opts.API + apiEntityEndPoint,

                model: Entities.Project,
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

                    var item = new Entities.Project();
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

                    console.log('<< getDAOCollection: Project -> ' + endpoint + '  >>');


                    var url = this.getEntityEndPoint() + endpoint;

                    var collection = new Entities.ProjectCollection();
                    collection.url = url;

                    console.log('%c!Fetching api endpoint - > ' + url, "color: blue;");

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

            IntranetManager.reqres.setHandler("projects:projects", function () {
                return API.getEntities(null);
            });

            IntranetManager.reqres.setHandler("projects:projects:search", function (query) {
                return API.search(query);
            });

            IntranetManager.reqres.setHandler("projects:project", function (id) {
                  var endpoint = API.getEntityEndPoint()+ '/' + id;
                return API.getEntity(id, endpoint);
            });

            IntranetManager.reqres.setHandler("projects:project:new", function () {
                return new Entities.YPPost();
            });

            IntranetManager.reqres.setHandler("projects:app:projects", function (options) {
                var query;
                query = 'parent_application=' + options.applicationId;
                if (options.criterion)   query = query + '&criterion=' + options.criterion;

                return API.query(query);
            });

            IntranetManager.reqres.setHandler("projects:app:projects:search", function (options) {
                var query;
                query = 'parent_application=' + options.applicationId;
                if (options.criterion)   query = query + '&criterion=' + options.criterion;

                return API.search(query);
            });


        });

    return;
});
