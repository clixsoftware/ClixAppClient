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


            var apiEndPoint = 'profiles';

            Entities.Profile = Backbone.Model.extend({

                url: IntranetManager.opts.API + apiEndPoint

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

            Entities.ProfileCollection = Backbone.Collection.extend({

                url: IntranetManager.opts.API + apiEndPoint,

                model: Entities.Profile

            });

            Entities.ProfileSearchResults = Entities.ProfileCollection.extend({

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

                parse: function ( resp ) {
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

                getEntities: function ( endpoint ) {

                    if (endpoint) {
                        return this.getDAOCollection(endpoint);
                    }

                    return this.getDAOCollection(apiEndPoint);
                },

                getEntity: function ( id, endpoint ) {


                    var item = new Entities.Profile();
                    if (id) {
                        item.id = id;
                    }
                    item.url = endpoint;
                    return this.getDAOdeferred(item);
                },

                search: function ( query ) {
                    //  var url = '?' + query;
                    var url = '/search' + query;
                    return this.getSearchCollection(url);

                },


                getSearchCollection: function ( endpoint ) {

                    console.log('<< getDAOCollection: YP Posts -> ' + endpoint + '  >>');


                    var url = this.getEndPoint() + endpoint;
                    console.log('colletion url - ' + url);

                    var collection = new Entities.ProfileSearchResults();

                    collection.url = url;


                    return this.getDAOdeferred(collection);
                },

                getEndpointEntities: function ( query, endpoint ) {

                    var url = apiEndPoint + '/' + endpoint + '?' + query;

                    return this.getDAOCollection(url);
                },

                getDAOCollection: function ( endpoint ) {

                    console.log('<< getDAOCollection: YP Posts -> ' + endpoint + '  >>');


                    var url = this.getEndPoint() + endpoint;
                    console.log('colletion url - ' + url);

                    var collection = new Entities.ProfileCollection();

                    collection.url = url;


                    return this.getDAOdeferred(collection);
                },

                getDAOdeferred: function ( queryObject ) {

                    return Q(queryObject.fetch())
                        .then(function ( data ) {

                            console.log(data);
                            return queryObject;

                        }, function ( xhr ) {

                            console.log('err occurred during fetch');
                            return undefined;
                        }
                    );

                }

            };

            IntranetManager.reqres.setHandler("directory:contact:new", function () {
                return new Entities.Profile();
            });

            IntranetManager.reqres.setHandler("directory:contact:all", function () {
                return API.getEntities(null);
            });

            IntranetManager.reqres.setHandler("directory:contact:search", function ( query ) {

                return API.search(query);
            });

            IntranetManager.reqres.setHandler("directory:contact:single", function ( id ) {
                console.log('<<Trigger :  directory:contact:single >>');
                var endpoint = API.getEndPoint() + '/' + id;
                return API.getEntity(id, endpoint);
            });

            IntranetManager.reqres.setHandler("directory:contact:single:alias", function ( alias ) {
                console.log('<<Trigger :  directory:contact:single >>');
                var endpoint = API.getEndPoint() + '/findbyalias?alias=' + alias;
                return API.getEntity(null, endpoint);

                //return API.search('/findbyalias?alias=' + alias);
            });

            IntranetManager.reqres.setHandler("directory:contact:single:uuid", function ( id ) {
                return API.search('?uuid=' + id);
            });

            IntranetManager.reqres.setHandler("directory:contact:single:id", function ( id ) {
                console.log('<<Trigger :  directory:contact:single:id >>');
                var endpoint = API.getEndPoint() + '/findbyid/' + id;
                return API.getEntity(id, endpoint);
            });

            IntranetManager.reqres.setHandler("directory:application:contacts", function ( opt ) {
                return API.search('?page=' + opt.page +  '&parent_application=' + opt.app);
            });

            IntranetManager.reqres.setHandler("directory:application:contacts:search", function ( options ) {
                var endPoint = '/search?page=' + options.page + '&parent_application=' + options.parent_application + '&query=' + options.criterion;
                return API.search(endPoint);
            });

            IntranetManager.reqres.setHandler("directory:application:contacts:recent", function ( applicationId ) {
                return API.search('?parent_application=' + applicationId);
            });

            IntranetManager.reqres.setHandler("directory:application:contacts:alias", function ( options ) {
                var endpoint = 'profiles?parent_application_alias=' + options.alias + '&parent_application_feature=' + options.feature_alias;
                console.log(endpoint);
                return API.getEntities(endpoint);
            });

            IntranetManager.reqres.setHandler("directory:service:application:contact:new", function ( applicationId ) {
                var post = new Entities.Profile();

                post.url = IntranetManager.opts.API + 'directory/applications/' + applicationId + '/posts';
                console.log(post.url);

                return post;
            });

        });

    return;
});
