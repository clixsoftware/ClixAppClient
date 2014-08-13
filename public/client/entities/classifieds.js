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

            var featureAlias = "classifieds";
            var apiEndPoint =  IntranetManager.opts.API()  + 'classifieds';

            Entities.ClassifiedAd = Backbone.Model.extend({

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



            Entities.ClassifiedAdCollection = Backbone.Collection.extend({

                initialize: function (options) {
                   // console.log(options);
                    this.on("error", this.error, this)
                },

                url: apiEndPoint,

                model: Entities.ClassifiedAd,

                error: function (model, response, options) {
                        console.group('Entity: ClassifiedAdCollection - Error');
                        console.log(model);
                        console.log(response);
                        console.log(options);
                        console.groupEnd();
                    }

            });

            Entities.ClassifiedAdSearchResults = Entities.ClassifiedAdCollection.extend({

                url: apiEndPoint + '/posts/search',

                model: Entities.ClassifiedAd,

                parse: function ( resp, options ) {
                     this.page = resp.page;
                     this.limit = resp.limit;
                     this.total = resp.total;
                     return resp.models;
                 },

                error: function (model, response, options) {
                    console.group('Entity: ClassifiedAdSearchResults - Error');
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

                    console.group('API: Classifieds ::  getEntity');

                    console.info(endpoint);
                    console.info('ID : ' + id);

                    var item = new Entities.ClassifiedAd();
                    if(id){
                        item.id = id;
                    }
                    item.url = apiEndPoint + endpoint + id;

                    console.log(item.url);
                    console.groupEnd();

                    return this.getDAOdeferred(item);
                },

                query: function(criteria){

                    console.group('API: Classifieds :: query');
                    var url = apiEndPoint + criteria;

                    console.log(url);
                    console.groupEnd();

                    return this.getDAOCollection(url);
                },


                getDAOCollection: function(endpoint){

                    console.group('API: Classifieds :: getDAOCollection');

                    var collection = new Entities.ClassifiedAdCollection();

                    collection.url =  endpoint;

                    console.log(collection.url);

                    console.groupEnd();
                    return this.getDAOdeferred(collection);
                },


                find: function(options){

                    console.group('API: Classifieds :: find');
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

                    console.group('API: Classifieds :: search');

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

                    console.group('API : Classifieds :: getSearchResults ');

                    var collection = new Entities.ClassifiedAdSearchResults();

                    collection.url =  endpoint;

                    console.log(collection.url);
                    console.groupEnd();
                    return this.getDAOdeferred(collection);
                },

                getDAOdeferred: function(queryObject){

                    console.group('API : Classifieds :: getDAOdeferred ');
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


            IntranetManager.reqres.setHandler("classifieds:posts:new", function () {

                var post = new Entities.ClassifiedAd();
                post.set('title', 'New Classified Ad Form');
                return post;

            });

            IntranetManager.reqres.setHandler("classifieds:app:posts:new", function (options) {
                console.group('Classifieds Handler ::  classifieds:app:posts:new');
                var endPointTemplate = API.getEndPoint() + '/{{parent_application}}/posts';
                options.endPoint  =  S(endPointTemplate).template(options).s;

                var post = new Entities.ClassifiedAd();
                post.url =  options.endPoint

                console.log(options);
                console.groupEnd();

               // post.set('title', 'New Classified Ad Form');
                return post;

            });
            IntranetManager.reqres.setHandler("classifieds:posts:entities", function () {
                console.group('Classifieds Handler :: classifieds:posts:entities');
                console.groupEnd();
                return API.getEntities(null);
            });

           IntranetManager.reqres.setHandler("classifieds:app:posts:entity", function (options) {
               console.group('Classifieds Handler :: classifieds:app:posts:entity');
                var endpoint =  '/' + options.parent_application + '/posts/';

               console.log(endpoint);
               console.groupEnd();

                return API.getEntity(options.id, endpoint);
            });

            IntranetManager.reqres.setHandler("classifieds:app:posts:find", function (options ) {
                console.group('Classifieds Handler :: classifieds:app:posts:find');

                var endPointTemplate = API.getEndPoint() + '/{{parent_application}}/posts';
                options.endPoint  =  S(endPointTemplate).template(options).s;
                console.info(options);

                console.groupEnd();

                return API.find(options);
            });

            IntranetManager.reqres.setHandler("classifieds:app:posts:search", function (options) {
/*               options = {
                    page: page # (defaults 0),
                    parent_application: application id (required),
                    categories: uuid of the category (optional only when searching by category
                    criterion: filterCriterion (optional) searching for text in title,
                };*/
                console.group('Classifieds Handler ::  classifieds:app:posts:search');

                var endPointTemplate = API.getEndPoint() + '/{{parent_application}}/posts/search';
                options.endPoint  =  S(endPointTemplate).template(options).s;

                console.log(options);
                console.groupEnd();

                return API.search(options);

            });
        });

    return;
});
