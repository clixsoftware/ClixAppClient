/*
 * Application: Workspace
 * Model: Workspace Model
 * Module: WorkspaceManager.Entities
 * */


define([
    "app",
    "Q",
    "S"
], function ( IntranetManager, Q, S ) {

    IntranetManager.module("Entities",
        function ( Entities, IntranetManager, Backbone, Marionette, $, _ ) {

            var featureAlias = "blogs";
            var apiEndPoint =  IntranetManager.opts.API()  + 'blogs';

            Entities.BlogsPost = Backbone.Model.extend({

                url: apiEndPoint,

                validation: {
                    title: {
                        required: true,
                        minLength: 8

                    },
                    description: {
                        required: true
                    }

                }

            });



            Entities.BlogsPostCollection = Backbone.Collection.extend({

                initialize: function (options) {
                   // console.log(options);
                    this.on("error", this.error, this)
                },

                url: apiEndPoint,

                model: Entities.BlogsPost,

                error: function (model, response, options) {
                        console.group('Entity: BlogsPostCollection - Error');
                        console.log(model);
                        console.log(response);
                        console.log(options);
                        console.groupEnd();
                    }

            });

            Entities.BlogsPostSearchResults = Entities.BlogsPostCollection.extend({

                url: apiEndPoint + '/posts/search',

                model: Entities.BlogsPost,

                parse: function ( resp, options ) {
                     this.page = resp.page;
                     this.limit = resp.limit;
                     this.total = resp.total;
                     return resp.models;
                 },

                error: function (model, response, options) {
                    console.group('Entity: BlogsPostSearchResults - Error');
                    console.log(model);
                    console.log(response);
                    console.log(options);
                    console.groupEnd();
                }


            });

            //API Definition
            var API = {

                getFeatureAlias: function(){
                    return featureAlias;
                },

                getEndPoint: function(){
                    return apiEndPoint;
                },

                getEntities: function (endpoint) {

                    if(endpoint){
                        return this.getDAOCollection(endpoint);
                    }

                    return this.getDAOCollection(apiEndPoint);
                },

                getEntity: function (id, endpoint) {

                    console.group('API: Blogs ::  getEntity');

                    console.info(endpoint);
                    console.info('ID : ' + id);

                    var item = new Entities.BlogsPost();
                    if(id){
                        item.id = id;
                    }
                    item.url = apiEndPoint + endpoint + id;

                    console.log(item.url);
                    console.groupEnd();

                    return this.getDAOdeferred(item);
                },

                query: function(criteria){

                    console.group('API: Blogs :: query');
                    var url = apiEndPoint + criteria;

                    console.log(url);
                    console.groupEnd();

                    return this.getDAOCollection(url);
                },


                getDAOCollection: function(endpoint){

                    console.group('API: Blogs :: getDAOCollection');

                    var collection = new Entities.BlogsPostCollection();

                    collection.url =  endpoint;

                    console.log(collection.url);

                    console.groupEnd();
                    return this.getDAOdeferred(collection);
                },


                find: function(options){

                    console.group('API: Blogs :: find');
                    var apiQuery = {
                        where: {
                            // "parent_application": options.parent_application
                        },
                        sort: (options.sort) ? options.sort : "title asc",
                        limit: (options.limit) ? options.limit : 10
                    };

                    var page = (options.page) ? options.page : 0;

                    if(page > 0){
                        apiQuery.skip = page - 1;
                    }

                    if(options.criterion){
                        apiQuery.where.title =  {
                            "contains": options.criterion
                        };
                    }

                    if(options.categories){
                        apiQuery.where.categories =  {
                            "contains": options.categories
                        };
                    }
                    if(options.tag){
                        apiQuery.where.tags =  {
                            "contains": options.tag
                        };
                    }
                    var queryEndpoint = options.endPoint + IntranetManager.buildQuery(apiQuery)

                    console.info(queryEndpoint);
                    console.groupEnd();


                    return this.getEntities(queryEndpoint);
                },

                search: function(options){

                    console.group('API: Blogs :: search');

                    var apiQuery = {
                        where: {
                            // "parent_application": options.parent_application
                        },
                        sort: (options.sort) ? options.sort : "title asc",
                        limit: (options.limit) ? options.limit : 10
                    };

                    var page = (options.page) ? options.page : 0;

                    if(page > 0){
                        apiQuery.skip = page - 1;
                    }

                    if(options.criterion){
                        apiQuery.where.title =  {
                            "contains": options.criterion
                        };
                    }

                    if(options.categories){
                        apiQuery.where.categories =  {
                            "contains": options.categories
                        };
                    }

                    if(options.tag){
                        apiQuery.where.tags =  {
                            "contains": options.tag
                        };
                    }
                    var queryEndpoint = options.endPoint + IntranetManager.buildQuery(apiQuery)

                    console.info(queryEndpoint);
                    console.groupEnd();

                    return this.getSearchResults(queryEndpoint);
                },


                getSearchResults: function(endpoint){

                    console.group('API : Blogs :: getSearchResults ');

                    var collection = new Entities.BlogsPostSearchResults();

                    collection.url =  endpoint;

                    console.log(collection.url);
                    console.groupEnd();
                    return this.getDAOdeferred(collection);
                },

                getDAOdeferred: function(queryObject){

                    console.group('API : Blogs :: getDAOdeferred ');
                    console.log(queryObject);
                    console.groupEnd();

                    return Q(queryObject.fetch())
                        .then(function(data){
                            return queryObject;
                        })
                        .fail(function(xhr){

                            console.log(xhr);
                            return undefined;
                        });
                }

            };

            IntranetManager.reqres.setHandler("blogs:posts:entities", function () {
                console.group('Blogs Handler :: blogs:posts:entities');
                console.groupEnd();
                return API.getEntities(null);
            });

            IntranetManager.reqres.setHandler("blogs:posts:feature:alias", function (options ) {
                console.group('Blogs Handler :: blogs:posts:feature:alias');

                var query = '{"featured": false , "parent_application_alias":"' + options.alias +'"}';
                var criteria = '/posts?where=' + query;

                console.log(criteria);
                console.groupEnd();

                return API.query(criteria);

            });

           IntranetManager.reqres.setHandler("blogs:app:posts:entity", function (options) {
               console.group('Blogs Handler :: blogs:app:posts:entity');
                var endpoint =  '/' + options.parent_application + '/posts/';

               console.log(endpoint);
               console.groupEnd();

                return API.getEntity(options.id, endpoint);
            });

            IntranetManager.reqres.setHandler("blogs:app:posts:find", function (options ) {
                console.group('Blogs Handler :: blogs:app:posts:find');

                var endPointTemplate = API.getEndPoint() + '/{{parent_application}}/posts';
                options.endPoint  =  S(endPointTemplate).template(options).s;
                console.info(options);

                console.groupEnd();

                return API.find(options);
            });

            IntranetManager.reqres.setHandler("blogs:apps:posts:featured", function (options) {

                console.group('Blogs Handler ::  blogs:app:posts:search');

               //var criteria = '/posts?where={"tags":{"contains":"featured"}}'  ;
                //var query = '{"featured": false  }';
                //var criteria = '/posts?where={"featured": 1}'  ;

                var query = '{"featured": true, "feature_alias" : "blogs"}';
                var criteria = '/posts?where=' + query +  '&limit=2&sort=updatedAt desc';
                console.info(criteria);
                console.groupEnd();
               return API.query(criteria);
            });

            IntranetManager.reqres.setHandler("blogs:app:posts:search", function (options) {
/*               options = {
                    page: page # (defaults 0),
                    parent_application: application id (required),
                    categories: uuid of the category (optional only when searching by category
                    criterion: filterCriterion (optional) searching for text in title,
                };*/
                console.group('Blogs Handler ::  blogs:app:posts:search');

                var endPointTemplate = API.getEndPoint() + '/{{parent_application}}/posts/search';
                options.endPoint  =  S(endPointTemplate).template(options).s;

                console.log(options);
                console.groupEnd();

                return API.search(options);

            });
        });

    return;
});
