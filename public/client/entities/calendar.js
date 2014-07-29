define([
    "app",
    "Q"
], function (IntranetManager, Q) {

    IntranetManager.module("Entities",
        function (Entities, IntranetManager, Backbone, Marionette, $, _) {


            var apiEndPoint = IntranetManager.opts.API()  +  'calendar';

            Entities.EventItem = Backbone.Model.extend({
                url: apiEndPoint
            });


            Entities.EventItemCollection = Backbone.Collection.extend({

                url: apiEndPoint,

                model: Entities.EventItem,

                comparator: "start_date",
                parse: function ( resp ) {
                    this.page = resp.page;
                    this.limit = resp.limit;
                    this.total = resp.total;

                    //  console.log('Total models = ' + this.total);
                    return resp.models;


                }
            });

            var API = {

                getEndPoint: function(){
                    return apiEndPoint;
                },

                getEntities: function (endpoint) {

                    if(endpoint){
                        return this.getDAOCollection(apiEndPoint + endpoint);
                    }

                    return this.getDAOCollection(apiEndPoint);
                },

                getEntity: function (id, endpoint) {
                    var item = new Entities.EventItem();
                    if(id){
                        item.id = id;
                    }
                    item.url = apiEndPoint + endpoint + id;
                    return this.getDAOdeferred(item);
                },

                query: function(criteria){

                    var url = apiEndPoint + criteria;
                    return this.getDAOCollection(url);
                },

                getDAOCollection: function(endpoint){

                    console.group('getDAOCollection: Event Item ');

                    var collection = new Entities.EventItemCollection();

                    collection.url =  endpoint;

                    console.log(collection.url);
                    console.groupEnd();
                    return this.getDAOdeferred(collection);
                },

                getDAOdeferred: function(queryObject){

                    //  console.log(queryObject);

                    return Q(queryObject.fetch())
                        .then(function(data){

                            console.log(data);
                            return queryObject;

                        },  function(xhr){

                            alert('an error');
                            return undefined;
                        }
                    );

                }

            };

            IntranetManager.reqres.setHandler("calendar:posts", function () {
                return API.getEntities('/posts');
            });

            IntranetManager.reqres.setHandler("calendar:posts:search", function (query) {
                return API.query(query);
            });

            IntranetManager.reqres.setHandler("calendar:posts:entity", function (id) {
                return API.getEntity(id, '/posts/');
            });

            IntranetManager.reqres.setHandler("calendar:posts:new", function () {
                return new Entities.EventItem();
            });

            IntranetManager.reqres.setHandler("calendar:apps:posts:upcoming", function (options) {
                var endpoint =   '/posts?feature_alias=calendar';
                return API.query(endpoint);
            });

            IntranetManager.reqres.setHandler("calendar:apps:posts:search", function (options) {
                var query;
                query = 'parent_application=' + options.applicationId;
                if (options.criterion)   query = query + '&criterion=' + options.criterion;

                return API.search(query);
            });


        });

    return;
});
