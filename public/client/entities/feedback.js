/*
 * Application: Workspace
 * Model: Workspace Model
 * Module: WorkspaceManager.Entities
 * */


define([
    "app",
    "Q",
    "backbone.validation"
    ], function ( IntranetManager, Q ) {

        IntranetManager.module("Entities",
        function ( Entities, IntranetManager, Backbone, Marionette, $, _ ) {


        var apiEndPoint = 'feedback';

        Entities.FeedbackPost = Backbone.Model.extend({

            url: IntranetManager.opts.API + apiEndPoint,

            validation: {
                email: {
                    required: true,
                    pattern: 'email',
                    msg: 'Please enter a valid email'
                },
                description: {
                    required: true
                }

            }

        });

        //Entities.configureStorage(Entities.Contact);

        Entities.FeedbackPostCollection = Backbone.Collection.extend({

            url: IntranetManager.opts.API + apiEndPoint,

            model: Entities.FeedbackPost,

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

       IntranetManager.reqres.setHandler("feedback:entity:new", function () {
            return new Entities.FeedbackPost();
        });


    });

    return;
});
