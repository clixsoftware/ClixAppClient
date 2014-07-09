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


        var apiEndPoint = 'newspost';

        Entities.NewsPost = Backbone.Model.extend({

            url: IntranetManager.opts.API + apiEndPoint,

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

            url: IntranetManager.opts.API + apiEndPoint,

            model: Entities.NewsPost,

            comparator: "title"

        });

        //Entities.configureStorage(Entities.ContactCollection);


        var API = {

            getEndPoint: function(){
                return IntranetManager.opts.API + apiEndPoint;
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
                item.url = endpoint;
                return this.getDAOdeferred(item);
            },

            search: function(query){

                var url = apiEndPoint + '?' + query;
                return this.getDAOCollection(url);

            },

            getTrending: function(options){

                var url = apiEndPoint + '/gettrending?' + 'reach=' + options.reach + '&limit=' + options.limit ;
                return this.getDAOCollection(url);
            },

            getPostsFeatured: function(options){

                console.log(options);
                var url =   apiEndPoint + '/featured/' +options.feature_alias + '/' +options.alias ;
                return this.getDAOCollection(url);
            },

            getEndpointEntities: function(query, endpoint){

                var url = apiEndPoint + '/' + endpoint + '?'  + query;

                return this.getDAOCollection(url);
            },

            getDAOCollection: function(endpoint){

                console.log('<< getDAOCollection: News Posts -> ' +  endpoint + '  >>');

                var collection = new Entities.NewsPostCollection();

                collection.url = IntranetManager.opts.API + endpoint;

                return this.getDAOdeferred(collection);
            },

            getDAOdeferred: function(queryObject){

                return Q(queryObject.fetch())
                    .then(function(data){

                        console.log(data);
                        return queryObject;

                    },  function(xhr){

                        console.log('err occurred during fetch');
                        return undefined;
                    }
                );

            }




        };

        IntranetManager.reqres.setHandler("news:posts:entities", function () {
            return API.getEntities(null);
        });

       IntranetManager.reqres.setHandler("news:posts:search", function (query) {
            return API.search(query);
        });

        IntranetManager.reqres.setHandler("news:posts:entity", function (id) {
            console.log('<<Trigger :  news:posts:entity >>');
            var endpoint = API.getEndPoint()+ '/tracker/' + id;
            //alert(endpoint);
            return API.getEntity(id, endpoint);
        });

        IntranetManager.reqres.setHandler("news:posts:search:app", function (id) {
            return API.search('parent_application=' +  id);
        });

        IntranetManager.reqres.setHandler("news:posts:search:uuid", function (id) {
            return API.search('uuid=' +  id);
        });


        //Recent news posts for Application : parent_application/limit
        IntranetManager.reqres.setHandler("news:posts:search:recent", function (options) {
            return API.search('parent_application=' +  options.parent_application + '&limit=' + options.limit);
        });

        IntranetManager.reqres.setHandler("news:posts:entity:new", function () {
            return new Entities.NewsPost();
        });

        IntranetManager.reqres.setHandler("news:posts:featured", function (options) {
            return API.getPostsFeatured(options);
        });

        IntranetManager.reqres.setHandler("news:posts:feature:alias", function (options ) {
            var endpoint = 'newspost?parent_application_alias=' + options.alias + '&parent_application_feature=' +  options.feature_alias;
            console.log(endpoint);
            return API.getEntities(endpoint);
        });

        IntranetManager.reqres.setHandler("news:posts:trending", function (options) {
            //option properties
            //option.reach = 'local | global'
            //option.limit = '5' //total records to return
            //option.appId = 4
            return API.getTrending(options);
        });


        IntranetManager.reqres.setHandler("news:posts:related", function (query) {
            return API.getEndpointEntities(query, 'getrelated');
        });

        IntranetManager.reqres.setHandler("news:posts:recommended", function (query) {
            return API.getEndpointEntities(query, 'getrecommended');
        });

        IntranetManager.reqres.setHandler("news:posts:latest", function (query) {
            return API.getEndpointEntities(query, 'getlatest');
        });


    });

    return;
});
