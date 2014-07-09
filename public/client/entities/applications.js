/*
 * Application: Workspace
 * Model: Workspace Model
 * Module: WorkspaceManager.Entities
 * */


define([
    "app",
    'Q',
    'backbone.nested'
], function ( IntranetManager, Q ) {

    IntranetManager.module("Entities",
        function ( Entities, IntranetManager, Backbone, Marionette, $, _ ) {


            var apiEndPoint = 'applications';

            Entities.Application = Backbone.NestedModel.extend({

                url: IntranetManager.opts.API + apiEndPoint/*,

                validation: {
                    title: {
                        required: true,
                        minLength: 8

                    },
                    alias: {
                            required: true,
                            minLength: 2
                        }

                }*/

            });


            Entities.ApplicationCollection = Backbone.Collection.extend({
                url: IntranetManager.opts.API + apiEndPoint,
                model: Entities.Application,
                comparator: "title"
            });



            var API = {

                getEndPoint: function(){
                    return IntranetManager.opts.API + apiEndPoint;
                },

                getEntities: function () {

                    return this.getDAOCollection(apiEndPoint);
                },

                getEntity: function (id, endpoint) {

                    var item = new Entities.Application();
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

                 getDAOCollection: function(endpoint){

                    console.log('<< getDAOCollection: -> ' +  endpoint + '  >>');

                    var collection = new Entities.ApplicationCollection();

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

            IntranetManager.reqres.setHandler("applications:entities", function () {
                return API.getEntities();
            });

            IntranetManager.reqres.setHandler("applications:search", function ( query ) {
                return API.search(query);
            });

            IntranetManager.reqres.setHandler("applications:entity", function ( id ) {
                var endpoint = API.getEndPoint()+ '/' + id;
                return API.getEntity(id, endpoint);
            });

            IntranetManager.reqres.setHandler("applications:feature:alias", function (options ) {
                var endpoint = API.getEndPoint()+ '/app/' + options.parent_feature + '/' +  options.alias;
                return API.getEntity(null, endpoint);
            });

            IntranetManager.reqres.setHandler("applications:search:feature", function ( feature_alias ) {
                return API.search('app_alias=' + feature_alias);
            });


            IntranetManager.reqres.setHandler("applications:entity:new", function () {
                return new Entities.Application();
            });

            /*        IntranetManager.reqres.setHandler("workspace:entity:byalias", function (alias) {
             return API.getWorkspaceEntity(alias);
             });*/


        });

    return;
});
