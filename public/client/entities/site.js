/*
 * Application: Site Model
 * */


define([
    "app",
    "backbone.validation"
    ], function ( IntranetManager ) {

        IntranetManager.module("Entities",
        function ( Entities, IntranetManager, Backbone, Marionette, $, _ ) {

       Entities.Site = Backbone.Model.extend({

            url: IntranetManager.opts.API + 'site',

            validation: {
                title: {
                    required: true,
                    minLength: 8
                },

                alias: {
                    required: true
                }

            }

        });

        //Entities.configureStorage(Entities.Contact);

        Entities.SiteCollection = Backbone.Collection.extend({
            url: IntranetManager.opts.API + 'site',

            model: Entities.Site,

            comparator: "title"
        });

        //Entities.configureStorage(Entities.ContactCollection);


        var API = {

            getEntities: function () {
                var items = new Entities.SiteCollection();
                items.url = IntranetManager.opts.API + 'site/findall';
                var defer = $.Deferred();
                items.fetch({
                    success: function ( data ) {
                        defer.resolve(data);
                    },
                    error: function ( data ) {
                        defer.resolve(undefined);
                    }
                });

                var promise = defer.promise();

                return promise;
            },

            getEntity: function (id) {

                var item = new Entities.Site();

                item.url = IntranetManager.opts.API + 'site/' + id;

                var defer = $.Deferred();

                item.fetch({
                    success: function ( data ) {
                        defer.resolve(data);
                    },
                    error: function ( data ) {
                        defer.resolve(undefined);
                    }
                });
                return defer.promise();
            },

            searchEntities: function (query) {

                var items = new Entities.FeatureCollection();

                items.url =IntranetManager.opts.API + 'site/findall?' + query;

                var defer = $.Deferred();
                items.fetch({
                    success: function ( data ) {
                        defer.resolve(data);
                    },
                    error: function ( data ) {
                        defer.resolve(undefined);
                    }
                });

                var promise = defer.promise();

                return promise;
            }

        };

        IntranetManager.reqres.setHandler("site:entities", function () {
            return API.getEntities();
        });

        IntranetManager.reqres.setHandler("site:search", function (query) {
            return API.searchEntities(query);
        });

        IntranetManager.reqres.setHandler("site:entity", function (id) {
            return API.getEntity(id);
        });

        IntranetManager.reqres.setHandler("site:entity:new", function () {
            return new Entities.Site();
        });


    });

    return;
});
