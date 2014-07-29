/*
 * Application: Site Model
 * */


define([
    "app",
    "backbone.validation"
    ], function ( IntranetManager ) {

        IntranetManager.module("Entities",
        function ( Entities, IntranetManager, Backbone, Marionette, $, _ ) {

       var apiEndPoint =  IntranetManager.opts.API()  + 'site';

       Entities.Site = Backbone.Model.extend({

            url: apiEndPoint,

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
            url: apiEndPoint,

            model: Entities.Site,

            comparator: "title"
        });

        //Entities.configureStorage(Entities.ContactCollection);


        var API = {

            getEndPoint: function () {
                return apiEndPoint;
            },

            getEntities: function () {
                var items = new Entities.SiteCollection();
                items.url = API.getEndPoint() + 'findall';
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

                item.url = API.getEndPoint() + '/' + id;

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

                items.url =API.getEndPoint()  + '/findall?' + query;

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
