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


            var apiEndPoint =  IntranetManager.opts.API()  + 'news';

            Entities.NewsPost = Backbone.Model.extend({

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

            //Entities.configureStorage(Entities.Contact);

            Entities.NewsPostCollection = Backbone.Collection.extend({

                initialize: function (options) {
                   // console.log(options);
                    this.on("error", this.error, this)
                },

                url: apiEndPoint,

                model: Entities.NewsPost,

/*                parse: function ( resp, options ) {

                    alert('News custom parsing');
                    this.page = resp.page;
                    this.limit = resp.limit;
                    this.total = resp.total;
                    return resp.models;
                },*/

                error: function (model, response, options) {
                console.log(model);
                console.log(response);
                console.log(options);
                    }

            });

            Entities.NewsPostSearch = Entities.NewsPostCollection.extend({

                url: apiEndPoint + '/posts/search',

                model: Entities.NewsPost,

                parse: function ( resp, options ) {

                // alert('News custom parsing');
                 this.page = resp.page;
                 this.limit = resp.limit;
                 this.total = resp.total;
                 return resp.models;
                 },

                error: function (model, response, options) {
                    console.log(model);
                    console.log(response);
                    console.log(options);
                }

            });

            //Entities.configureStorage(Entities.ContactCollection);


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
                    var item = new Entities.NewsPost();
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

                    console.group('getDAOCollection: News Posts ');

                    var collection = new Entities.NewsPostCollection();

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

                    console.group('getSearchResults: News Posts ');

                    var collection = new Entities.NewsPostSearch();

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

            IntranetManager.reqres.setHandler("news:posts:entities", function () {
                return API.getEntities(null);
            });

            IntranetManager.reqres.setHandler("news:posts:search", function (query) {
                return API.search(query);
            });

            IntranetManager.reqres.setHandler("news:posts:entity", function (id) {
                return API.getEntity( id, '/posts/');
            });

          IntranetManager.reqres.setHandler("news:posts:feature:alias", function (options ) {
                var query = '{"featured": false , "parent_application_alias":"' + options.alias +'"}';
                var criteria = '/posts?where=' + query;
                return API.query(criteria);
            });

            IntranetManager.reqres.setHandler("news:apps:posts:recent", function (options ) {
                console.log(options);

                var query = '{"featured": false, "feature_alias" : "news"}';
                var criteria = '?where=' + query+  '&limit=5';
                return API.search(criteria);
            });

            IntranetManager.reqres.setHandler("news:apps:posts:featured", function (options) {
               //var criteria = '/posts?where={"tags":{"contains":"featured"}}'  ;
                //var query = '{"featured": false  }';
                //var criteria = '/posts?where={"featured": 1}'  ;
                var query = '{"featured": true, "feature_alias" : "news"}';
                var criteria = '/posts?where=' + query +  '&limit=2&sort=updatedAt desc';
               return API.query(criteria);
            });

        });

    return;
});
