define([
    "app",
    "Q"
], function (IntranetManager, Q) {

    IntranetManager.module("Entities",
        function (Entities, IntranetManager, Backbone, Marionette, $, _) {


            var apiEndPoint = IntranetManager.opts.API() + 'classifieds';

            Entities.ClassifiedPost = Backbone.Model.extend({

                url: apiEndPoint + '/posts'
            });

            //Entities.configureStorage(Entities.Contact);

            Entities.ClassifiedCollection = Backbone.Collection.extend({

                url:  apiEndPoint + '/posts',

                model: Entities.ClassifiedPost

            });

            Entities.ClassifiedSearchResults = Entities.ClassifiedCollection.extend({

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

                getEntities: function (endpoint) {

                    if(endpoint){
                        return this.getDAOCollection(endpoint);
                    }

                    return this.getDAOCollection(apiEndPoint);
                },

                getEntity: function (id, endpoint) {
                    var item = new Entities.ClassifiedPost();
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


                getDAOCollection: function(endpoint){

                    console.group('getDAOCollection: Classifieds Posts ');

                    var collection = new Entities.ClassifiedCollection();

                    collection.url =  endpoint;

                    console.log(collection.url);
                    console.groupEnd();
                    return this.getDAOdeferred(collection);
                },


                search: function(criteria){
                    var url = apiEndPoint + '/posts/search' +  criteria;
                    return this.getSearchResults(url);
                },


                getSearchResults: function(endpoint){

                    console.group('getSearchResults: Classifieds ');

                    var collection = new Entities.ClassifiedSearchResults();

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

            IntranetManager.reqres.setHandler("classifieds:posts:new", function () {


                var post = new Entities.ClassifiedPost();
                post.set('title', 'New Classified Ad Form');
                return post;

            });

            IntranetManager.reqres.setHandler("classifieds:posts", function () {
                return API.getEntities(null);
            });

            IntranetManager.reqres.setHandler("classifieds:posts:recent", function (options) {

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
                return API.search(IntranetManager.buildQuery(apiQuery));

            });

            IntranetManager.reqres.setHandler("classifieds:posts:search", function (options) {

               // var query;
               // var skip;
                console.group('Handler classifieds:posts:search');

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

            IntranetManager.reqres.setHandler("classifieds:posts:entity", function (id) {
                var endpoint =  '/posts/';
                return API.getEntity(id, endpoint);
            });

        });

    return;
});
