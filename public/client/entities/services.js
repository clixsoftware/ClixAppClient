define([
    "app",
    "Q"
], function (IntranetManager, Q) {

    IntranetManager.module("Entities",
        function (Entities, IntranetManager, Backbone, Marionette, $, _) {


            var apiEndPoint = 'support';
            var apiEntityEndPoint = 'support';

            Entities.Service = Backbone.Model.extend({
                url: IntranetManager.opts.API + apiEntityEndPoint
            });


            Entities.ServiceCollection = Backbone.Collection.extend({

                url: IntranetManager.opts.API + apiEntityEndPoint,

                model: Entities.Service,
                comparator: "title"
            });

            var API = {

                getEndPoint: function () {
                    return IntranetManager.opts.API + apiEndPoint;
                },

                getEntityEndPoint: function () {
                    return IntranetManager.opts.API + apiEntityEndPoint;
                },

                getEntities: function (endpoint) {
                    if (endpoint) {
                        return this.getDAOCollection(endpoint);
                    }
                    return this.getDAOCollection(apiEntityEndPoint);
                },

                getEntity: function (id, endpoint) {

                    var item = new Entities.Service();
                    if (id) {
                        item.id = id;
                    }
                    item.url = endpoint;
                    return this.getDAOdeferred(item);
                },

                query: function (query) {
                    var url = '?' + query;
                    return this.getDAOCollection(url);
                },

                search: function (query) {
                    var url = '/search?' + query;
                    return this.getDAOCollection(url);
                },



                getDAOCollection: function (endpoint) {

                    console.log('<< getDAOCollection: Services -> ' + endpoint + '  >>');


                    //var url = this.getEntityEndPoint() + endpoint;

                    var collection = new Entities.ServiceCollection();
                    collection.url = endpoint;

                    console.log('%c!Fetching api endpoint - > ' + endpoint, "color: blue;");

                    return this.getDAOdeferred(collection);
                },

                getDAOdeferred: function (queryObject) {

                    return Q(queryObject.fetch())
                        .then(function (data) {

                            console.log(data);
                            return queryObject;

                        }, function (xhr) {

                            console.log('err occurred during fetch');
                            return undefined;
                        }
                    );

                }

            };

            IntranetManager.reqres.setHandler("support:services", function () {
                return API.getEntities(null);
            });

            IntranetManager.reqres.setHandler("support:services:search", function (query) {
                return API.search(query);
            });

            IntranetManager.reqres.setHandler("support:service", function (id) {
                  var endpoint = API.getEntityEndPoint()+ '/services/' + id;
                return API.getEntity(id, endpoint);
            });

            IntranetManager.reqres.setHandler("support:service:new", function () {
                return new Entities.YPPost();
            });

            IntranetManager.reqres.setHandler("support:app:services", function (options) {
                var query;

               // alert('support:app:services');
                var endpoint = API.getEndPoint() + '/apps/' + options.applicationId + '/services';
                //alert(endpoint);
                return API.getEntities(endpoint);
/*
                query = 'parent_application=' + options.applicationId;
                if (options.criterion)   query = query + '&criterion=' + options.criterion;
*/


            });

            IntranetManager.reqres.setHandler("support:app:services:search", function (options) {
                var query;
                query = 'parent_application=' + options.applicationId;
                if (options.criterion)   query = query + '&criterion=' + options.criterion;

                return API.search(query);
            });


        });

    return;
});
