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


        var apiEndPoint = 'howdois';

        Entities.YPPost = Backbone.Model.extend({

            url: IntranetManager.opts.API + apiEndPoint/*,

            validation: {
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

        Entities.YPPostCollection = Backbone.Collection.extend({

            url: IntranetManager.opts.API + apiEndPoint,

            model: Entities.YPPost/*,

            comparator: "title"*/

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


                var item = new Entities.YPPost();
                if(id){
                    item.id = id;
                }
                item.url = endpoint;
                return this.getDAOdeferred(item);
            },

            search: function(query){

                var url = '?' + query;
                console.log('yp posts search ' + url);
                return this.getDAOCollection(url);

            },

            getTrending: function(options){

                var url = apiEndPoint + '/gettrending?' + 'reach=' + options.reach + '&limit=' + options.limit ;
                return this.getDAOCollection(url);
            },

            getPostsHomeFeatured: function(){

                var url =   apiEndPoint + '/featured';
                return this.getDAOCollection(url);
            },

            getEndpointEntities: function(query, endpoint){

                var url =  '/' + endpoint + '?'  + query;

                return this.getDAOCollection(url);
            },

            getDAOCollection: function(endpoint){

                console.log('<< getDAOCollection: YP Posts -> ' +  endpoint + '  >>');


                var url = this.getEndPoint() + endpoint;
                console.log('colletion url - ' + url);

                var collection = new Entities.YPPostCollection();

                collection.url = url;


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

        IntranetManager.reqres.setHandler("yp:posts:entities", function () {
            return API.getEntities(null);
        });

       IntranetManager.reqres.setHandler("yp:posts:search", function (query) {
            return API.search(query);
        });



          IntranetManager.reqres.setHandler("yp:posts:entity", function (id) {
            console.log('<<Trigger :  news:posts:entity >>');
            var endpoint = API.getEndPoint()+ '/' + id;
            return API.getEntity(id, endpoint);
        });

        IntranetManager.reqres.setHandler("yp:posts:entity:id", function (id) {
            console.log('<<Trigger :  yp:posts:entity:id >>');
            var endpoint = API.getEndPoint()+  '/' + id;
            return API.getEntity(id, endpoint);
        });

        IntranetManager.reqres.setHandler("yp:posts:search:app", function (id) {
            return API.search('parent_application=' +  id);
        });

        IntranetManager.reqres.setHandler("yp:posts:search:uuid", function (id) {
            return API.search('uuid=' +  id);
        });

        IntranetManager.reqres.setHandler("yp:posts:search:recent", function (applicationId) {
            return API.search('parent_application=' +  applicationId);
        });

        IntranetManager.reqres.setHandler("yp:posts:entity:new", function () {
            return new Entities.YPPost();
        });

        IntranetManager.reqres.setHandler("yp:posts:entity:new:endpoint", function (applicationId) {
            var post = new Entities.YPPost();

            post.url = IntranetManager.opts.API+ 'yp/applications/' + applicationId +  '/posts';
            console.log(post.url);

            return post;
        });

        IntranetManager.reqres.setHandler("yp:posts:home:featured", function () {
            return API.getPostsHomeFeatured();
        });

        IntranetManager.reqres.setHandler("yp:posts:feature:alias", function (options ) {
            var endpoint = 'newspost?parent_application_alias=' + options.alias + '&parent_application_feature=' +  options.feature_alias;
            console.log(endpoint);
            return API.getEntities(endpoint);
        });

        IntranetManager.reqres.setHandler("yp:posts:trending", function (options) {
            //option properties
            //option.reach = 'local | global'
            //option.limit = '5' //total records to return
            //option.appId = 4
            return API.getTrending(options);
        });


        IntranetManager.reqres.setHandler("yp:posts:related", function (applicationId) {
            return API.getEntities('?parent_application=' + applicationId);
        });

        IntranetManager.reqres.setHandler("yp:posts:recommended", function (query) {
            return API.getEndpointEntities(query, 'getrecommended');
        });

        IntranetManager.reqres.setHandler("yp:posts:latest", function (query) {
            return API.getEndpointEntities(query, 'getlatest');
        });


        IntranetManager.reqres.setHandler("yp:posts:get:feature:app", function (options) {
            return API.search('parent_application_alias=default&limit=5&sort=updatedAt desc');        });

        IntranetManager.reqres.setHandler("howdoi:posts:mostactive", function () {
            return API.search('parent_application_alias=default&limit=5&sort=views_count desc');

        });

        IntranetManager.reqres.setHandler("yp:posts:search:category", function (options) {
            //alert('search yp posts by category');
            console.log('search ' + JSON.stringify(options));
            var query;
            query = 'parent_application_alias=' + options.feature;
            if(options.criterion){
                query = query + '&criterion=' + options.criterion;
            }

            return API.getEndpointEntities(query, 'search');
        });

    });

    return;
});
