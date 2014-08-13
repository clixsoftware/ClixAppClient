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

            var featureAlias = "forums";
            var apiEndPoint =  IntranetManager.opts.API()  + 'forums';

            Entities.ForumPost = Backbone.Model.extend({

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



            Entities.ForumPostCollection = Backbone.Collection.extend({

                initialize: function (options) {
                   // console.log(options);
                    this.on("error", this.error, this)
                },

                url: apiEndPoint,

                model: Entities.ForumPost,

                error: function (model, response, options) {
                        console.group('Entity: ForumPostCollection - Error');
                        console.log(model);
                        console.log(response);
                        console.log(options);
                        console.groupEnd();
                    }

            });

            Entities.ForumPostSearchResults = Entities.ForumPostCollection.extend({

                url: apiEndPoint + '/posts/search',

                model: Entities.ForumPost,

                parse: function ( resp, options ) {
                     this.page = resp.page;
                     this.limit = resp.limit;
                     this.total = resp.total;
                     return resp.models;
                 },

                error: function (model, response, options) {
                    console.group('Entity: ForumPostSearchResults - Error');
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

                    console.group('API: Forums ::  getEntity');

                    console.info(endpoint);
                    console.info('ID : ' + id);

                    var item = new Entities.ForumPost();
                    if(id){
                        item.id = id;
                    }
                    item.url = apiEndPoint + endpoint + id;

                    console.log(item.url);
                    console.groupEnd();

                    return this.getDAOdeferred(item);
                },

                query: function(criteria){

                    console.group('API: Forums :: query');
                    var url = apiEndPoint + criteria;

                    console.log(url);
                    console.groupEnd();

                    return this.getDAOCollection(url);
                },


                getDAOCollection: function(endpoint){

                    console.group('API: Forums :: getDAOCollection');

                    var collection = new Entities.ForumPostCollection();

                    collection.url =  endpoint;

                    console.log(collection.url);

                    console.groupEnd();
                    return this.getDAOdeferred(collection);
                },


                find: function(options){

                    console.group('API: Forums :: find');
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

                    console.group('API: Forums :: search');

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

                    console.group('API : Forums :: getSearchResults ');

                    var collection = new Entities.ForumPostSearchResults();

                    collection.url =  endpoint;

                    console.log(collection.url);
                    console.groupEnd();
                    return this.getDAOdeferred(collection);
                },

                getDAOdeferred: function(queryObject){

                    console.group('API : Forums :: getDAOdeferred ');
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

            IntranetManager.reqres.setHandler("forums:new:data:entities", function (data) {
                console.group('Forums Handler :: forums:new:data:entities');
                console.log(data);
                console.groupEnd();
                return new Entities.ForumPostCollection(data);
            });

            IntranetManager.reqres.setHandler("forums:posts:entities", function () {
                console.group('Forums Handler :: forums:posts:entities');
                console.groupEnd();
                return API.getEntities(null);
            });

            IntranetManager.reqres.setHandler("forums:posts:feature:alias", function (options ) {
                console.group('Forums Handler :: forums:posts:feature:alias');

                var query = '{"featured": false , "parent_application_alias":"' + options.alias +'"}';
                var criteria = '/posts?where=' + query;

                console.log(criteria);
                console.groupEnd();

                return API.query(criteria);

            });

           IntranetManager.reqres.setHandler("forums:app:posts:entity", function (options) {
               console.group('Forums Handler :: forums:app:posts:entity');
                var endpoint =  '/' + options.parent_application + '/posts/';

               console.log(endpoint);
               console.groupEnd();

                return API.getEntity(options.id, endpoint);
            });

            IntranetManager.reqres.setHandler("forums:app:posts:find", function (options ) {
                console.group('Forums Handler :: forums:app:posts:find');

                var endPointTemplate = API.getEndPoint() + '/{{parent_application}}/posts';
                options.endPoint  =  S(endPointTemplate).template(options).s;
                console.info(options);

                console.groupEnd();

                return API.find(options);
            });

            IntranetManager.reqres.setHandler("forums:apps:posts:featured", function (options) {

                console.group('Forums Handler ::  forums:app:posts:search');

               //var criteria = '/posts?where={"tags":{"contains":"featured"}}'  ;
                //var query = '{"featured": false  }';
                //var criteria = '/posts?where={"featured": 1}'  ;

                var query = '{"featured": true, "feature_alias" : "forums"}';
                var criteria = '/posts?where=' + query +  '&limit=2&sort=updatedAt desc';
                console.info(criteria);
                console.groupEnd();
               return API.query(criteria);
            });

            IntranetManager.reqres.setHandler("forums:apps:posts:forums", function (options) {

                console.group('Forums Handler ::  forums:apps:posts:forums');

                var endPointTemplate = API.getEndPoint() + '/{{parent_application}}/forum/posts';
                options.endPoint  =  S(endPointTemplate).template(options).s;
                console.log(options);
                console.groupEnd();
                return API.getSearchResults(options.endPoint );
            });

            IntranetManager.reqres.setHandler("forums:apps:posts:forum_categories", function (options) {

                console.group('Forums Handler ::  forums:apps:posts:forum_categories');

                var endPointTemplate = API.getEndPoint() + '/{{parent_application}}/forum-category/{{parent_node}}/posts';
                options.endPoint  =  S(endPointTemplate).template(options).s;
                console.log(options);
                console.groupEnd();
                return API.getSearchResults(options.endPoint );
            });
            IntranetManager.reqres.setHandler("forums:app:posts:search", function (options) {
/*               options = {
                    page: page # (defaults 0),
                    parent_application: application id (required),
                    categories: uuid of the category (optional only when searching by category
                    criterion: filterCriterion (optional) searching for text in title,
                };*/
                console.group('Forums Handler ::  forums:app:posts:search');

                var endPointTemplate = API.getEndPoint() + '/{{parent_application}}/posts/search';
                options.endPoint  =  S(endPointTemplate).template(options).s;

                console.log(options);
                console.groupEnd();

                return API.search(options);

            });
        });

    return;
});
