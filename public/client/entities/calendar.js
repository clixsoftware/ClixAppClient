define([
    "app",
    "Q"
], function (IntranetManager, Q) {

    IntranetManager.module("Entities",
        function (Entities, IntranetManager, Backbone, Marionette, $, _) {


            var apiEndPoint = 'calendar';
            var apiEntityEndPoint = 'events';

            Entities.EventItem = Backbone.Model.extend({
                url: IntranetManager.opts.API + apiEntityEndPoint
            });


            Entities.EventItemCollection = Backbone.Collection.extend({

                url: IntranetManager.opts.API + apiEntityEndPoint,

                model: Entities.EventItem,
                comparator: "start_date"
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

                    var item = new Entities.EventItem();
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

                queryEndPoint: function(endpoint){
                    //console.log(endpoint);
                    return this.getDAOCollection(endpoint);
                },

                search: function (query) {
                    var url = this.getEntityEndPoint() +  '/search?' + query;
                    return this.getDAOCollection(url);
                },

                getDAOCollection: function (endpoint) {

                    console.log('<< getDAOCollection: Project -> ' + endpoint + '  >>');
                   // var url = this.getEntityEndPoint() + endpoint;

                    var collection = new Entities.EventItemCollection();
                    collection.url = endpoint;

                    console.log('%c!Fetching api endpoint - > ' + endpoint, "color: blue;");
                    return this.getDAOdeferred(collection);
                },

                getDAOdeferred: function (queryObject) {

                   // alert('in dao de');
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

            IntranetManager.reqres.setHandler("calendar:events", function () {
                return API.getEntities(null);
            });

            IntranetManager.reqres.setHandler("calendar:events:search", function (query) {
                return API.search(query);
            });

            IntranetManager.reqres.setHandler("calendar:event", function (id) {
                  var endpoint = API.getEntityEndPoint()+ '/' + id;
                //alert(endpoint);
                return API.getEntity(id, endpoint);
            });

            IntranetManager.reqres.setHandler("calendar:event:new", function () {
                return new Entities.EventItem();
            });

            IntranetManager.reqres.setHandler("calendar:app:events", function (options) {
                var endpoint =  API.getEndPoint() + '/' + options.applicationId + '/entries';

                //query = 'parent_application=' + options.applicationId;
                //if (options.criterion)   query = query + '&criterion=' + options.criterion;

                return API.queryEndPoint(endpoint);
            });

            IntranetManager.reqres.setHandler("calendar:events:feature:alias", function (options ) {
                var endpoint =API.getEntityEndPoint() + '/parent/' +   options.feature_alias+ '/' +options.alias ;
                console.log(endpoint);
                return API.getEntities(endpoint);
            });

            IntranetManager.reqres.setHandler("calendar:app:events:search", function (options) {
                var query;
                query = 'parent_application=' + options.applicationId;
                if (options.criterion)   query = query + '&criterion=' + options.criterion;

                return API.search(query);
            });


        });

    return;
});
