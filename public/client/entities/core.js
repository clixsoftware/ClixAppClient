/*
 * Application: Workspace
 * Model: Workspace Model
 * Module: WorkspaceManager.Entities
 * */


define([
    "app",
    "Q",
    "S"
], function ( IntranetManager, Q, S ) {

    IntranetManager.module("Entities",
        function ( Entities, IntranetManager, Backbone, Marionette, $, _ ) {

            var featureAlias = "core";
            var apiEndPoint =  IntranetManager.opts.API()  + 'core';

            Entities.EmptyModel = Backbone.Model.extend({

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

            Entities.EmptyModelCollection = Backbone.Collection.extend({

                initialize: function (options) {
                   // console.log(options);
                    this.on("error", this.error, this)
                },

                url: apiEndPoint,

                model: Entities.EmptyModel,

/*                parse: function ( resp, options ) {

                    alert('News custom parsing');
                    this.page = resp.page;
                    this.limit = resp.limit;
                    this.total = resp.total;
                    return resp.models;
                },*/

                error: function (model, response, options) {
                console.log(model);
                console.log(response);
                console.log(options);
                    }

            });


            IntranetManager.reqres.setHandler("core:new:entity", function (options) {
                options.id = 1;
                return new Entities.EmptyModel(options);
            });

         });

    return;
});
