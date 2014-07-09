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

            var apiEndPoint = 'mediamaps';
            var apiFilesEndPoint = 'files';

            Entities.Media = Backbone.Model.extend({

                url: IntranetManager.opts.API + apiEndPoint

            });

            Entities.File = Backbone.Model.extend({

                url: IntranetManager.opts.API + apiFilesEndPoint

            });

            Entities.FileCollection = Backbone.Collection.extend({
                url: IntranetManager.opts.API + apiFilesEndPoint,
                model: Entities.File/*,
                comparator: "title"*/
            });

            Entities.MediaCollection = Backbone.Collection.extend({
                url: IntranetManager.opts.API + apiEndPoint,
                model: Entities.Media,
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


                    var item = new Entities.Media();
                    if(id){
                        item.id = id;
                    }
                    item.url = endpoint;
                    return this.getDAOdeferred(item);
                },


                searchEntities: function(query){

                    var url = '?' + query;
                    return this.getDAOCollection(url);

                },

                getEndpointEntities: function(endpoint)
                {
                    var collection = new Entities.MediaCollection();

                    collection.url = endpoint;


                    return this.getDAOdeferred(collection);
                },

                getImageGalleryByPath: function(options){
                        var url = IntranetManager.opts.API + apiFilesEndPoint + '/dir/' + options.path;

                        console.log(url);
                        var collection = new Entities.FileCollection();

                        collection.url = url;
                        return this.getDAOdeferred(collection);
                }  ,

                getDAOCollection: function(endpoint){

                    console.log('<< getDAOCollection: YP Posts -> ' +  endpoint + '  >>');


                    var url = this.getEndPoint() + endpoint;
                    console.log('colletion url - ' + url);

                    var collection = new Entities.MediaCollection();

                    collection.url = url;


                    return this.getDAOdeferred(collection);
                },

                getDAOdeferred: function(queryObject){


                    return Q(queryObject.fetch())
                        .then(function(data){

                            //console.log(data);
                            return queryObject;

                        },  function(xhr){

                            //console.log('err occurred during fetch');
                            return undefined;
                        }
                    );

                }


            };

          IntranetManager.reqres.setHandler('media:collection:set', function(models){
                return new Entities.MediaCollection(models);
          });

            IntranetManager.reqres.setHandler('media:collection:image:gallery', function(options){
                return API.getImageGalleryByPath(options);
            });



        });

    return;
});
