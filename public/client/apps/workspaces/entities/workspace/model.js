/*
 * Application: Workspace
 * Model: Workspace Model
 * Module: WorkspaceManager.Entities
 * */


define([
    "app"
    ], function ( IntranetManager ) {

        IntranetManager.module("WorkspaceManager.Entities",
        function ( Entities, IntranetManager, Backbone, Marionette, $, _ ) {

        Entities.settings = {
            urlRoot: "http://localhost:3100/workspaces"
        };

        Entities.Workspace = Backbone.Model.extend({

            urlRoot: "http://localhost:3100/workspaces",

            defaults: {
                title: "New Workspace",
                alias: "",
                description: "",
                ownerEmail: ""
            },

            validate: function ( attrs, options ) {

                alert('the id ' + this.get('id') + ' or the alias ' + this.get('alias'));
                 var errors = {}
                 if (! attrs.title) {
                    errors.title = "can't be blank";
                 }
                 if (! attrs.alias) {
                     errors.alias = "can't be blank";
                    }
                 else{
                    if (attrs.alias.length < 2) {
                         errors.alias = "is too short";
                     }
                 }
                 if( ! _.isEmpty(errors)){
                     return errors;
                 }



                //alert('errors found ' + errors.length);
            }/*,

            parse :function(resp, options) {
                console.log("overriding parse response _id " + resp._id);
            if (_.isObject(resp._id))  {
                resp.id = resp._id;
                delete resp._id;
            }
            return resp;
            },

            toJSON : function() {
                var attrs = _.omit(this.attributes, 'id');
                console.log("overriding toJSON id = " + this.id);
                if (!_.isUndefined(this.id))  {

                    attrs._id = this.id ;
                }
                return attrs;
            }*/
        });

        //Entities.configureStorage(Entities.Contact);

        Entities.WorkspaceCollection = Backbone.Collection.extend({
            url: "http://localhost:3100/workspaces",
            model: Entities.Workspace,
            comparator: "title"
        });

        //Entities.configureStorage(Entities.ContactCollection);


        var API = {

            getWorkspaceEntities: function () {
                var workspaces = new Entities.WorkspaceCollection();
                var defer = $.Deferred();
                workspaces.fetch({
                    success: function ( data ) {
                        defer.resolve(data);
                    }
                });

                var promise = defer.promise();
                $.when(promise).done(function ( workspaces ) {
                    if (workspaces.length === 0) {
                        // if we don't have any contacts yet, create some for convenience
                        //var models = initializeContacts();
                        //contacts.reset(models);
                    }
                });
                return promise;
            },

            getWorkspaceEntity: function ( id ) {
                var test = Entities.Workspace.extend({
                    urlRoot: "/api/workspaces/byalias",
                    idAttribute: "alias"

                });

                var workspace = new test({
                     alias: id
                });


                console.log('fetching workspace entity using alias ' + id );
                var defer = $.Deferred();

                workspace.fetch({
                    success: function ( data ) {
                        defer.resolve(data);
                    },
                    error: function ( data ) {
                        defer.resolve(undefined);
                    }
                });
                return defer.promise();
            },

            searchWorkspaceEntities: function (query) {
                console.log('Get contact search query ' + query);
                var workspaces = new Entities.WorkspaceCollection();
                workspaces.url ="/api/contacts/search/" + query;
                var defer = $.Deferred();
                workspaces.fetch({
                    success: function ( data ) {
                        defer.resolve(data);
                    }
                });
                var promise = defer.promise();
                $.when(promise).done(function ( workspaces ) {
                    if (workspaces.length === 0) {
                        // if we don't have any contacts yet, create some for convenience
                        //var models = initializeContacts();
                        //contacts.reset(models);
                    }
                });
                return promise;
            }

        };

        IntranetManager.reqres.setHandler("workspaces:workspace:entities", function () {
            return API.getWorkspaceEntities();
        });

        IntranetManager.reqres.setHandler("workspace:search", function (search) {
            return API.searchWorkspaceEntities(search);
        });

        IntranetManager.reqres.setHandler("workspace:entity", function (id) {
            return API.getWorkspaceEntity(id);
        });

        IntranetManager.reqres.setHandler("workspace:entity:new", function () {
            return new Entities.Workspace();
        });

/*        IntranetManager.reqres.setHandler("workspace:entity:byalias", function (alias) {
            return API.getWorkspaceEntity(alias);
        });*/


    });

    return IntranetManager.WorkspaceManager.Entities;
});
