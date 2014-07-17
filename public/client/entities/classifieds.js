define([
    "app",
    "Q"
], function (IntranetManager, Q) {

    IntranetManager.module("Entities",
        function (Entities, IntranetManager, Backbone, Marionette, $, _) {


            var apiEndPoint = 'classifieds';

            Entities.Classified = Backbone.Model.extend({

                url: IntranetManager.opts.API + apiEndPoint,

                tester: this.test(),

                test: function () {
                    return 'wayne';
                }

                /*          validation: {
                 title: {
                 required: true,
                 minLength: 8

                 },
                 description: {
                 required: true
                 }

                 }*/

            });

            //Entities.configureStorage(Entities.Contact);

            Entities.ClassifiedCollection = Backbone.Collection.extend({

                url: IntranetManager.opts.API + apiEndPoint,

                model: Entities.Classified

            });

            Entities.ClassifiedSearchResults = Entities.ClassifiedCollection.extend({

                initialize: function () {
                    /*                    _.bindAll(this, 'parse', 'url', 'pageInfo', 'nextPage', 'previousPage');
                     typeof(options) != 'undefined' || (options = {});
                     this.page = 1;
                     typeof(this.perPage) != 'undefined' || (this.perPage = 10);*/
                },
                /*

                 fetch: function ( options ) {
                 typeof(options) != 'undefined' || (options = {});
                 this.trigger("fetching");
                 var self = this;
                 var success = options.success;
                 options.success = function ( resp ) {
                 self.trigger("fetched");
                 if (success) {
                 success(self, resp);
                 }
                 };
                 return Backbone.Collection.prototype.fetch.call(this, options);
                 },
                 */

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

            //Entities.configureStorage(Entities.ContactCollection);


            var API = {

                getEndPoint: function () {
                    return IntranetManager.opts.API + apiEndPoint;
                },

                getEntities: function (endpoint) {

                    if (endpoint) {
                        return this.getDAOCollection(endpoint);
                    }

                    return this.getDAOCollection(apiEndPoint);
                },

                getEntity: function (id, endpoint) {


                    var item = new Entities.Profile();
                    if (id) {
                        item.id = id;
                    }
                    item.url = endpoint;
                    return this.getDAOdeferred(item);
                },

                search: function (query) {
                    //  var url = '?' + query;
                    // var url = '/search' + query;
                    return this.getSearchCollection(query);

                },

                getSearchCollection: function (endpoint) {

                    console.group('<< getSearchCollection: Classified Posts -> ')

                    console.log(endpoint);

                    var url = this.getEndPoint() + endpoint;
                    console.log('collection url - ' + url);
                    console.groupEnd();

                    var collection = new Entities.ClassifiedSearchResults();

                    collection.url = url;
                    return this.getDAOdeferred(collection);
                },

                getEndpointEntities: function (query, endpoint) {

                    var url = apiEndPoint + '/' + endpoint + '?' + query;

                    return this.getDAOCollection(url);
                },

                getDAOCollection: function (endpoint) {

                    console.group('<< getDAOCollection: Classified Posts -> ')
                    console.log(endpoint);

                    var url = this.getEndPoint() + endpoint;
                    console.log('collection url - ' + url);
                    console.groupEnd();

                    var collection = new Entities.ProfileCollection();
                    collection.url = url;

                    return this.getDAOdeferred(collection);
                },

                getDAOdeferred: function (queryObject) {

                    return Q(queryObject.fetch())
                        .then(function (data) {
                            console.group('Classifieds - getDAOdeferred');
                            console.log(data);
                            console.groupEnd();

                            return queryObject;

                        }, function (xhr) {

                            console.log('err occurred during fetch');
                            return undefined;
                        }
                    );

                }

            };

            IntranetManager.reqres.setHandler("classifieds:posts:new", function () {
                var post = new Entities.Classified();
                //post.url = IntranetManager.opts.API + 'c/applications/' + applicationId + '/posts';
                //console.log(post.url);
                return post;
            });

            IntranetManager.reqres.setHandler("classifieds:posts:all", function () {
                return API.getEntities(null);
            });

            IntranetManager.reqres.setHandler("classifieds:posts:search", function (options) {
                console.group('Handler classifieds:posts:search');
                var query = '?limit=10&page=' + options.page + '&parent_application=' + options.parent_application;
                console.log(query);
                console.groupEnd();

                return API.search(query);
            });

            IntranetManager.reqres.setHandler("classifieds:posts:entity", function (id) {
                var endpoint = API.getEndPoint() + '/' + id;
                return API.getEntity(id, endpoint);
            });

            /*
             IntranetManager.reqres.setHandler("classifieds:earch", function ( options ) {
             var endPoint = '/search?page=' + options.page + '&parent_application=' + options.parent_application + '&query=' + options.criterion;
             return API.search(endPoint);
             });*/

            IntranetManager.reqres.setHandler("classifieds:posts:recent", function (options) {
                //return API.search('?parent_application=' + applicationId);
            });

        });

    return;
});
