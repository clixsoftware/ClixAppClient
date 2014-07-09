/*
 * Application: Workspace
 * Model: Workspace Model
 * Module: WorkspaceManager.Entities
 * */


define([
    "app",
    'Q',
    "backbone.validation"

    ], function ( IntranetManager, Q ) {

        IntranetManager.module("Entities",
        function ( Entities, IntranetManager, Backbone, Marionette, $, _ ) {

       var apiEndPoint = 'features';

       Entities.Feature = Backbone.Model.extend({

            url: IntranetManager.opts.API + apiEndPoint,

            validation: {
                title: {
                    required: true,
                    minLength: 8
                },

                app_alias: {
                    required: true,
                    minLength: 2
                },

                admin_url: {
                    required: true
                },

                code: {
                    required: true
                }


            }

        });

        //Entities.configureStorage(Entities.Contact);

        Entities.FeatureCollection = Backbone.Collection.extend({
            url: IntranetManager.opts.API + apiEndPoint,

            model: Entities.Feature,

            comparator: "title"
        });

        //Entities.configureStorage(Entities.ContactCollection);


        var API = {

            getEndPoint: function(){
              return IntranetManager.opts.API + apiEndPoint;
            },

            getEntities: function () {
                return this.getDAOCollection(apiEndPoint);

            },

            getEntity: function (id, endpoint) {


                var item = new Entities.Feature();
                if(id){
                    item.id = id;
                }
                item.url = endpoint;
                return this.getDAOdeferred(item);
            },

            search: function (query) {

                var url = apiEndPoint + '?' + query;
                return this.getDAOCollection(url);
            },

            getDAOCollection: function(endpoint){

                console.info('<< getDAOCollection: Collection -> ' +  endpoint + '  >>');

                var collection = new Entities.FeatureCollection();

                collection.url = IntranetManager.opts.API + endpoint;

                return this.getDAOdeferred(collection);
            },

            getDAOdeferred: function(queryObject){

                return Q(queryObject.fetch())
                    .then(function(data){

                        //console.log(data);
                        return queryObject;

                    },  function(xhr){

                        console.log('err occurred during fetch');
                        return undefined;
                    }
                );


            }
        };

        IntranetManager.reqres.setHandler("feature:entities", function () {
            console.info('<< Trigger: feature:entities >>');
            return API.getEntities();
        });

        IntranetManager.reqres.setHandler("feature:entity:search", function (query) {
            return API.search(query);
        });

        IntranetManager.reqres.setHandler("feature:entity", function (id) {
            var endpoint = API.getEndPoint()+ '/' + id;
            return API.getEntity(id, endpoint);
        });

        IntranetManager.reqres.setHandler("feature:entity:search:alias", function (alias) {
            var endpoint = API.getEndPoint() + '/alias/' + alias ;
            return API.getEntity(null, endpoint);
        });

        IntranetManager.reqres.setHandler("feature:entity:new", function () {
            console.info('<< Trigger: feature:entity:new >>');
            return new Entities.Feature();
        });


    });

    return;
});
