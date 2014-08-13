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

         var featureAlias = "ads";
        var apiEndPoint = IntranetManager.opts.API()  + 'ads';
         var apiSearchEndPoint = IntranetManager.opts.API()  + 'content';

            Entities.AdPost = Backbone.Model.extend({

                url: apiEndPoint + '/posts'
            });

            //Entities.configureStorage(Entities.Contact);

            Entities.AdsCollecton = Backbone.Collection.extend({

                url:  apiEndPoint + '/posts',

                model: Entities.AdPost

            });

            Entities.AdsSearchResults = Entities.AdsCollecton.extend({

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
                    var item = new Entities.AdPost();
                    if(id){
                        item.id = id;
                    }
                    item.url = apiEndPoint + endpoint + id;
                    console.log('call single news item');
                    return this.getDAOdeferred(item);
                },

                query: function(criteria){
                    var url = apiEndPoint + criteria;
                    return this.getDAOCollection(url);
                },

                getEndpointEntity: function (endpoint) {
                    console.group('API : Ads: getEndpointEntity');
                    var item = new Entities.AdPost();
                  item.url = endpoint;
                    console.info(endpoint);
                    console.groupEnd();

                    return this.getDAOdeferred(item);
                },

                getDAOCollection: function(endpoint){

                    console.group('getDAOCollection: Ads  Posts ');

                    var collection = new Entities.AdsCollecton();

                    collection.url =  endpoint;

                    console.log(collection.url);
                    console.groupEnd();
                    return this.getDAOdeferred(collection);
                },

                find: function(options){

                    console.group('API: Ads : find');
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

                    var queryEndpoint = options.endPoint + IntranetManager.buildQuery(apiQuery)

                    //var url = apiEndPoint + '/search' +  criteria;

                    return this.getSearchResults(queryEndpoint);
                },


                getSearchResults: function(endpoint){

                    console.group('API - Ads : getSearchResults ');

                    var collection = new Entities.AdsSearchResults();

                    collection.url =  endpoint;

                    console.log(collection.url);
                    console.groupEnd();
                    return this.getDAOdeferred(collection);
                },


                getDAOdeferred: function(queryObject){

                    console.log(queryObject);
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


        IntranetManager.reqres.setHandler("ads:posts:random", function (options) {

            console.group('Handler ads:posts:random');
/*            {
                zone: 'adzone1',
                feature: 'sites',
                alias: 'specifi site where the ad occurs'
            }*/

            var endPointTemplate = API.getEndPoint() + '/random?zone={{zone}}&feature={{feature}}';

            var endPoint  =  S(endPointTemplate).template(options).s;

            console.log(endPoint);
            console.groupEnd();

            return API.getEndpointEntity(endPoint);

        });



    });

    return;
});
