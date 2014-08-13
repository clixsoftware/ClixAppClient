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

         var featureAlias = "howdois";
        var apiEndPoint = IntranetManager.opts.API()  + 'howdois';
         var apiSearchEndPoint = IntranetManager.opts.API()  + 'content';

            Entities.HowDoIPost = Backbone.Model.extend({

                url: apiEndPoint + '/posts'
            });

            //Entities.configureStorage(Entities.Contact);

            Entities.HowDoICollection = Backbone.Collection.extend({

                url:  apiEndPoint + '/posts',

                model: Entities.HowDoIPost

            });

            Entities.HowDoISearchResults = Entities.HowDoICollection.extend({

                initialize: function () {
                    /*                    _.bindAll(this, 'parse', 'url', 'pageInfo', 'nextPage', 'previousPage');
                     typeof(options) != 'undefined' || (options = {});
                     this.page = 1;
                     typeof(this.perPage) != 'undefined' || (this.perPage = 10);*/
                },

                parse: function (resp) {
                    this.page = resp.page;
                    this.limit = resp.limit;
                    this.total = resp.total;

                    console.log('Total models = ' + this.total);
                    return resp.models;

                },

                url: function () {
                    var thisurl = this.baseUrl + '&' + $.param({page: this.page, limit: this.limit});
                    console.log('paginated url ' + thisurl);
                    return thisurl;
                },

                nextPage: function () {
                    if (!this.pageInfo().next) {
                        return false;
                    }
                    this.page = this.page + 1;
                    return this.fetch();
                },
                previousPage: function () {
                    if (!this.pageInfo().prev) {
                        return false;
                    }
                    this.page = this.page - 1;
                    return this.fetch();
                }

            });

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
                    console.group('API: How Do I  - getEntity');

                    console.info(endpoint);
                    console.info('ID : ' + id);
                    var item = new Entities.HowDoIPost();
                    if(id){
                        item.id = id;
                    }
                    item.url = apiEndPoint + endpoint + id;

                    console.log(item.url);
                    console.groupEnd();

                    return this.getDAOdeferred(item);
                },

                query: function(criteria){
                    var url = apiEndPoint + criteria;
                    return this.getDAOCollection(url);
                },


                getDAOCollection: function(endpoint){

                    console.group('getDAOCollection: How Do I  Posts ');

                    var collection = new Entities.HowDoICollection();

                    collection.url =  endpoint;

                    console.log(collection.url);

                    console.groupEnd();
                    return this.getDAOdeferred(collection);

                },

                find: function(options){

                    console.group('API: How DO I : find');
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

                    //var url = apiEndPoint + '/search' +  criteria;

                    return this.getEntities(queryEndpoint);
                },

                search: function(options){

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

                    //var url = apiEndPoint + '/search' +  criteria;

                    return this.getSearchResults(queryEndpoint);
                },


                getSearchResults: function(endpoint){

                    console.group('API - How Do I : getSearchResults ');

                    var collection = new Entities.HowDoISearchResults();

                    collection.url =  endpoint;

                    console.log(collection.url);
                    console.groupEnd();
                    return this.getDAOdeferred(collection);
                },


                getDAOdeferred: function(queryObject){

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

        IntranetManager.reqres.setHandler("howdoi:app:posts:entity", function (options) {
            var endpoint =  '/' + options.parent_application + '/posts/';
            return API.getEntity(options.id, endpoint);
        });

        IntranetManager.reqres.setHandler("howdoi:app:posts:search", function (options) {
            // var query;
            // var skip;
            console.group('Handler howdoi:app:posts:search');

            var endPointTemplate = API.getEndPoint() + '/{{parent_application}}/posts/search';
            options.endPoint  =  S(endPointTemplate).template(options).s;

            console.log(options);
            console.groupEnd();

            return API.search(options);

        });

        IntranetManager.reqres.setHandler("howdoi:app:posts:popular", function (options) {

            console.group('Handler:  howdoi:app:posts:popular');
            options.endPoint  =  S(API.getEndPoint() + '/{{parent_application}}/posts').template(options).s;

            options.sort = 'views desc';

            console.log(options);
            console.groupEnd();

            return API.find(options);

        });

        IntranetManager.reqres.setHandler("howdoi:posts:recent", function () {
                //return API.search('parent_application=' +  applicationId);
                return API.recent('limit=5');
            });

        IntranetManager.reqres.setHandler("howdoi:posts:search:category", function (options) {

            console.log('search ' + JSON.stringify(options));

            var query;
            var endpoint;
            //query = 'parent_application_alias=' + options.feature;

            if(options.criterion){
                //query = query + '&criterion=' + options.criterion;
                endpoint = '/category/' + options.category + '?q=' + options.criterion;
            }else{
                endpoint = '/category/' + options.category;
            }

           // alert(endpoint);

            return API.getDAOCollection(endpoint);
            //return API.getEndpointEntities(query, 'search');
        });

    });

    return;
});
