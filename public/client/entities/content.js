/*
 * Application: Workspace
 * Model: Workspace Model
 * Module: WorkspaceManager.Entities
 * */


define([
    "app",
    "Q"
], function ( IntranetManager, Q ) {

    IntranetManager.module("Entities",
        function ( Entities, IntranetManager, Backbone, Marionette, $, _ ) {


            var apiEndPoint =  IntranetManager.opts.API()  + 'content';

            Entities.ContentItem = Backbone.Model.extend({

                url: apiEndPoint
            });

            Entities.ContentItemCollection = Backbone.Collection.extend({

                url: apiEndPoint,

                model: Entities.ContentItem

            });

            Entities.ContentSearchResults = Entities.ContentItemCollection.extend({

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

                getEndPoint: function(){
                    return apiEndPoint;
                },

                getEntity: function (id, endpoint) {
                    var item = new Entities.NewsPost();
                    if(id){
                        item.id = id;
                    }
                    item.url = apiEndPoint + endpoint + id;
                    return this.getDAOdeferred(item);
                },

                query: function(criteria){

                    var url = apiEndPoint + criteria;
                    return this.getDAOCollection(url);
                },

                getDAOCollection: function(endpoint){

                    console.group('getDAOCollection: Content Items ');

                    var collection = new Entities.ContentItemCollection();

                    collection.url =  endpoint;

                    console.log(collection.url);
                    console.groupEnd();
                    return this.getDAOdeferred(collection);
                },

               search: function(criteria){
                    var url = apiEndPoint + '/search' +  criteria;
                    return this.getSearchResults(url);
                },


                getSearchResults: function(endpoint){

                    console.group('getSearchResults: Content ');

                    var collection = new Entities.ContentSearchResults();

                    collection.url =  endpoint;

                    console.log(collection.url);
                    console.groupEnd();
                    return this.getDAOdeferred(collection);
                },

                getDAOdeferred: function(queryObject){

                  //  console.log(queryObject);

                    return Q(queryObject.fetch())
                        .then(function(data){

                            console.log(data);
                            return queryObject;

                        },  function(xhr){

                            alert('an error');
                            return undefined;
                        }
                    );

                }


            };

             IntranetManager.reqres.setHandler("content:posts:popular", function (options) {
                //var criteria = '?where={"featured": 1}'  ;
                var criteria = '?limit=7&sort=views desc';
                return API.query(criteria);
            });

/*            IntranetManager.reqres.setHandler("content:posts:recent", function (options) {
                //var criteria = '?where={"featured": 1}'  ;
                var criteria = '?limit=7&sort=updatedAt asc';
                return API.query(criteria);
            });*/

            IntranetManager.reqres.setHandler("content:posts:new", function () {
                var post = new Entities.ContentItem();
                post.set('title', 'New Item');
                return post;

            });

            IntranetManager.reqres.setHandler("content:posts", function () {
                return API.getEntities(null);
            });

            IntranetManager.reqres.setHandler("content:posts:recent", function (options) {

                console.log(options);
                var apiQuery = {
                    sort: "createdAt desc",
                    limit:  (options.limit) ? options.limit : 5,
                    skip: (options.page) ? options.page : 0
                };

                if(options.criterion){
                    apiQuery.where.title =  {
                        "contains": options.criterion
                    };
                }

                if(options.parent_application){
                    apiQuery.where.parent_application =  options.parent_application;
                }

                console.groupEnd();
                return API.query(IntranetManager.buildQuery(apiQuery));

            });

            IntranetManager.reqres.setHandler("content:posts:search", function (options) {

                // var query;
                // var skip;
                console.group('Handler content:posts:search');

                console.log(options);
                var apiQuery = {
                    where: {
                        // "parent_application": options.parent_application
                    },
                    sort: "createdAt desc",
                    limit: 10,
                    skip: (options.page) ? options.page : 0
                };

                if(options.criterion){
                    apiQuery.where.title =  {
                        "contains": options.criterion
                    };
                }

                if(options.parent_application){
                    apiQuery.where.parent_application =  options.parent_application;
                }

                console.groupEnd();
                return API.search(IntranetManager.buildQuery(apiQuery));

            });

            IntranetManager.reqres.setHandler("content:posts:entity", function (id) {
                var endpoint =  '';
                return API.getEntity(id, endpoint);
            });

        });

    return;
});
