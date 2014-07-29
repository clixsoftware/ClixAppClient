/*
 * Application: Workspace
 * Model: Workspace Model
 * Module: WorkspaceManager.Entities
 * */


define([
    "app",
    "Q",
    "backbone.validation",
    "moment"
    ], function ( IntranetManager, Q ) {

        IntranetManager.module("Entities",
        function ( Entities, IntranetManager, Backbone, Marionette, $, _ ) {


        var apiEndPoint = IntranetManager.opts.API() + 'attachments';

        Entities.Attachment = Backbone.Model.extend({

            url: apiEndPoint,

            sync: function (method, model, options) {
                var opts = {

                    url:  IntranetManager.opts.API + apiEndPoint + '/upload',

                    success: function (data) {
                        console.log(data);
                        if (options.success) {
                            options.success(data);
                        }
                    }
                };

                switch (method) {
                    case "create":
                        opts.type = "POST";
                        opts.data = new FormData();
                        opts.data.append("attachments", model.get('attachments'));
                        opts.data.append("parent_object", model.get('parent_object'));
                        //opts.data.append("caption", model.get('caption'));
                        opts.processData = false;
                        opts.contentType = false;

                        break;
                    default:
                        opts.type = "GET";
                }

                return $.ajax(opts);
            }
        });

        //Entities.configureStorage(Entities.Contact);

        Entities.AttachmentCollection = Backbone.Collection.extend({

            url: apiEndPoint,

            model: Entities.Attachment,

            comparator: "title"

        });

        //Entities.configureStorage(Entities.ContactCollection);


        var API = {

            getEndPoint: function(){
                return  apiEndPoint;
            },

            getEntities: function (endpoint) {

                if(endpoint){
                    return this.getDAOCollection(endpoint);
                }

                return this.getDAOCollection(apiEndPoint);
            },

            getEntity: function (id, endpoint) {


                var item = new Entities.Image();
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

                var collection = new Entities.AttachmentCollection();

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

       IntranetManager.reqres.setHandler("attachment:entity:new", function () {
           var attachment = new Entities.Attachment();
           attachment.url = API.getEndPoint() + '/upload';

           console.log(attachment.url);

           return  attachment;
        });


    });

    return;
});
