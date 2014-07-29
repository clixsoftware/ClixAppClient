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


        var apiEndPoint = IntranetManager.opts.API()  +'news';

        Entities.News = Backbone.Model.extend({
            url : apiEndPoint
        })  ;

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

            url: apiEndPoint,

            model: Entities.NewsPost,

            comparator: "title"

        });

        //Entities.configureStorage(Entities.ContactCollection);


        var API = {

            getEndPoint: function(){
                return apiEndPoint;
            },


            getNewsEndPoint: function(){
                return  apiNewsEndPoint;
            },

            getNews: function () {

                var item = new Entities.News();
                return this.getDAOdeferred(item);
            },

            getEntities: function () {

                return this.getDAOCollection(apiEndPoint);
            },
/*
            getEntity: function (id) {

                var item = new Entities.NewsPost();
                item.url = IntranetManager.opts.API + apiEndPoint + '/' + id;
                return this.getDAOdeferred(item);
            },*/

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

            getPostsHomeFeatured: function(){

                var url =   apiEndPoint; //+ '/featured';
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

        IntranetManager.reqres.setHandler("news:feature", function () {
            return API.getNews();
        });

        IntranetManager.reqres.setHandler("news:posts:entities", function () {
            return API.getEntities();
        });

       IntranetManager.reqres.setHandler("news:posts:search", function (query) {
            return API.search(query);
        });

        IntranetManager.reqres.setHandler("news:posts:entity", function (id) {
            console.log('<<Trigger :  news:posts:entity >>');
            var endpoint = API.getEndPoint()+ '/tracker/' + id;
           // alert(endpoint);
            return API.getEntity(id, endpoint);
            //return API.getEntity(id);
        });


        IntranetManager.reqres.setHandler("news:app:posts", function (appId) {
            var endpoint = API.getNewsEndPoint()+ '/' + appId + '/posts';
            // alert(endpoint);
            return API.getDAOCollection(endpoint);
            //return API.getEntity(id);
        });

        IntranetManager.reqres.setHandler("news:posts:search:app:featured", function (options) {
            return API.search('parent_application_feature=' +  options.feature + '&parent_application_alias=' + options.app + '&is_featured=1' );
        });

        IntranetManager.reqres.setHandler("news:posts:search:app", function (id) {
            return API.search('parent_application=' +  id);
        });

        IntranetManager.reqres.setHandler("news:posts:search:alias", function (options) {
            return API.search('parent_application_feature=' +  options.feature + '&parent_application_alias=' + options.app );
        });

        IntranetManager.reqres.setHandler("news:posts:search:uuid", function (id) {
            return API.search('uuid=' +  id);
        });

        IntranetManager.reqres.setHandler("news:posts:entity:new", function () {
            return new Entities.NewsPost();
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

        IntranetManager.reqres.setHandler("news:posts:search:category", function (options) {
            console.log('search ' + JSON.stringify(options));
            var query;
            query = 'parent_application_alias=sites';
            if(options.criterion){
                query = query + '&criterion=' + options.criterion;
            }

            return API.getEndpointEntities(query, 'search');
        });

        IntranetManager.reqres.setHandler("news:posts:latest", function (query) {
            return API.getEndpointEntities(query, 'getlatest');
        });


    });

    return;
});
