/*
 * Application: Workspace
 * Model: Workspace Model
 * Module: WorkspaceManager.Entities
 * */


define([
    "app"
], function ( IntranetManager ) {

    IntranetManager.module("Entities",
        function ( Entities, IntranetManager, Backbone, Marionette, $, _ ) {


            var apiEndPoint = 'app';

            Entities.App = Backbone.Model.extend({

                url: IntranetManager.opts.API + apiEndPoint,

                validation: {
                    title: {
                        required: true,
                        minLength: 8

                    },
                    alias: {
                            required: true,
                            minLength: 2
                        }

                }

            });

            //Entities.configureStorage(Entities.Contact);

            Entities.AppCollection = Backbone.Collection.extend({
                url: IntranetManager.opts.API + apiEndPoint,
                model: Entities.App,
                comparator: "title"
            });

            //Entities.configureStorage(Entities.ContactCollection);


            var API = {


                getEntities: function () {

                    return this.getDAOCollection(apiEndPoint);
                },

                getEntity: function (id) {

                    var item = new Entities.App();
                    item.url = IntranetManager.opts.API + apiEndPoint + '/' + id;
                    return this.getDAOdeferred(item);
                },


                search: function(query){

                    var url = apiEndPoint + '?' + query;
                    return this.getDAOCollection(url);

                },

                 getDAOCollection: function(endpoint){

                    console.log('<< getDAOCollection: -> ' +  endpoint + '  >>');

                    var collection = new Entities.AppCollection();

                    collection.url = IntranetManager.opts.API + endpoint;

                    return this.getDAOdeferred(collection);
                },

                getDAOdeferred: function(queryObject){

                    var defer = $.Deferred();

                    queryObject.fetch({
                        success: function ( data ) {
                            defer.resolve(data);
                        },
                        error: function ( data ) {
                            defer.resolve(undefined);
                        }
                    });

                    return  defer.promise();

                }


            };

            IntranetManager.reqres.setHandler("appmodel:entities", function () {
                return API.getEntities();
            });

            IntranetManager.reqres.setHandler("appmodel:search", function ( query ) {
                return API.search(query);
            });

            IntranetManager.reqres.setHandler("appmodel:entity", function ( id ) {
                return API.getEntity(id);
            });

            IntranetManager.reqres.setHandler("appmodel:search:feature", function ( featureId ) {
                return API.search('parent_feature=' + featureId);
            });

            IntranetManager.reqres.setHandler("appmodel:entity:new", function () {
                return new Entities.App();
            });

            /*        IntranetManager.reqres.setHandler("workspace:entity:byalias", function (alias) {
             return API.getWorkspaceEntity(alias);
             });*/


        });

    return;
});
