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

        Entities.Directory = Backbone.Model.extend({
            url : IntranetManager.opts.API + 'directory'
        })  ;

        Entities.Profile = Backbone.Model.extend({

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

        Entities.ProfileCollection = Backbone.Collection.extend({

            url: IntranetManager.opts.API + apiEndPoint,

            model: Entities.Profile,

            comparator: "title"

        });

        //Entities.configureStorage(Entities.ContactCollection);


        var API = {


            getDirectory: function () {

                var item = new Entities.Directory();
                return this.getDAOdeferred(item);
            },

            getEntities: function () {

                return this.getDAOCollection(apiEndPoint);
            },

            getEntity: function (id) {

                var item = new Entities.Profile();
                item.url = IntranetManager.opts.API + apiEndPoint + '/' + id;
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

                var collection = new Entities.ProfileCollection();

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


/*                var defer = $.Deferred();

                queryObject.fetch({
                    success: function ( data ) {
                        defer.resolve(data);
                    },
                    error: function ( data ) {
                        defer.resolve(undefined);
                    }
                });

                return  defer.promise();*/

            }




        };

        IntranetManager.reqres.setHandler("directory:feature", function () {
            return API.getDirectory();
        });


    });

    return;
});
