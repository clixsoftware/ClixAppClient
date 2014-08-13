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

            var featureAlias = "support";
            var apiEndPoint =  IntranetManager.opts.API()  + 'support';
            var apiServicesEndPoint =  IntranetManager.opts.API()  + 'services';

            Entities.ServicePost = Backbone.Model.extend({

                url: apiServicesEndPoint,

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

            Entities.TicketItem = Backbone.Model.extend({

                url: apiServicesEndPoint,

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


            Entities.ServicePostCollection = Backbone.Collection.extend({

                initialize: function (options) {
                   // console.log(options);
                    this.on("error", this.error, this)
                },

                url: apiServicesEndPoint,

                model: Entities.ServicePost,

                error: function (model, response, options) {
                        console.group('Entity: ServicePostCollection - Error');
                        console.log(model);
                        console.log(response);
                        console.log(options);
                        console.groupEnd();
                    }

            });

            Entities.ServicesPostSearchResults = Entities.ServicePostCollection.extend({

                url: apiServicesEndPoint + '/posts/search',

                model: Entities.ServicePost,

                parse: function ( resp, options ) {
                     this.page = resp.page;
                     this.limit = resp.limit;
                     this.total = resp.total;
                     return resp.models;
                 },

                error: function (model, response, options) {
                    console.group('Entity: ServicesPostSearchResults - Error');
                    console.log(model);
                    console.log(response);
                    console.log(options);
                    console.groupEnd();
                }


            });

            //API Definition
            var API = {

                getFeatureAlias: function(){
                    return featureAlias;
                },

                getEndPoint: function(){
                    return apiEndPoint;
                },


                getServicesEndPoint: function(){
                    return apiServicesEndPoint;
                },

                getEntities: function (endpoint, model) {

                    if(endpoint){
                        return this.getDAOCollection(endpoint, model);
                    }

                    return this.getDAOCollection(apiEndPoint, model);
                },

                getEntity: function (options) {

                    console.group('API: Support: ' + options.model  +' ::  getEntity');

                    console.info(options);
                    console.info('ID : ' + options.id);

                    var item = new Entities.ServicePost();
                    if(options.id){
                        item.id = options.id;
                    }
                    item.url = options.endPoint;

                    console.log(item.url);
                    console.groupEnd();

                    return this.getDAOdeferred(item);
                },

                query: function(criteria, model){

                    console.group('API:  Support :: query');
                    var url = IntranetManager.opts.API() + '/' + model + criteria;

                    console.log(url);
                    console.groupEnd();

                    return this.getDAOCollection(url, model);
                },


                getDAOCollection: function(endpoint, model){

                    console.group('API: Support :: getDAOCollection');

                    console.log(model);

                    var collection;

                    switch (model){
                        case 'services':
                            collection =  new Entities.ServicePostCollection();
                            break;
                    }

                    collection.url =  endpoint;

                    console.log(collection.url);

                    console.groupEnd();
                    return this.getDAOdeferred(collection);
                },


                find: function(options){

                    console.group('API: Support :: find');
                    console.log(options);
                    var apiQuery = {
                        where: {
                            // "parent_application": options.parent_application
                        },
                        sort: (options.sort) ? options.sort : "title asc",
                        limit: (options.limit) ? options.limit : 10
                    };

                    var page = (options.page) ? options.page : 0;

                    if(page > 0){
                        apiQuery.skip = page - 1;
                    }

                    if(options.criterion){
                        apiQuery.where.title =  {
                            "contains": options.criterion
                        };
                    }

                    if(options.categories){
                        apiQuery.where.categories =  {
                            "contains": options.categories
                        };
                    }
                    if(options.tag){
                        apiQuery.where.tags =  {
                            "contains": options.tag
                        };
                    }
                    var queryEndpoint = options.endPoint + IntranetManager.buildQuery(apiQuery)

                    console.info(queryEndpoint);

                    console.groupEnd();


                    return this.getEntities(queryEndpoint, options.model);
                },

                search: function(options){

                    console.group('API: Support :: search');

                    var apiQuery = {
                        where: {
                            // "parent_application": options.parent_application
                        },
                        sort: (options.sort) ? options.sort : "title asc",
                        limit: (options.limit) ? options.limit : 10
                    };

                    var page = (options.page) ? options.page : 0;

                    if(page > 0){
                        apiQuery.skip = page - 1;
                    }

                    if(options.criterion){
                        apiQuery.where.title =  {
                            "contains": options.criterion
                        };
                    }

                    if(options.categories){
                        apiQuery.where.categories =  {
                            "contains": options.categories
                        };
                    }

                    if(options.tag){
                        apiQuery.where.tags =  {
                            "contains": options.tag
                        };
                    }
                    var queryEndpoint = options.endPoint + IntranetManager.buildQuery(apiQuery)

                    console.info(queryEndpoint);
                    console.groupEnd();

                    return this.getSearchResults(queryEndpoint, options.model);
                },


                getSearchResults: function(endpoint, model){

                    console.group('API : Support :: getSearchResults ');

                    console.log(model);
                    var collection ;

                    switch (model){
                        case 'services':
                            collection =  new Entities.ServicesPostSearchResults();
                            break;
                    }

                    collection.url =  endpoint;

                    console.log(collection.url);
                    console.groupEnd();
                    return this.getDAOdeferred(collection);
                },

                getDAOdeferred: function(queryObject){

                    console.group('API : Support :: getDAOdeferred ');
                    console.log(queryObject);
                    console.groupEnd();

                    return Q(queryObject.fetch())
                        .then(function(data){
                            return queryObject;
                        })
                        .fail(function(xhr){

                            console.log(xhr);
                            return undefined;
                        });
                }

            };

            IntranetManager.reqres.setHandler("support:ticket:entity:new", function () {
                return new Entities.TicketItem();
            });

            IntranetManager.reqres.setHandler("support:ticket:new", function (service) {
                console.group('Support Handler :: support:ticket:new');
                var ticket = new Entities.TicketItem();

                ticket.set('title', service.get('title'));
                ticket.set('description', service.get('description'));
                ticket.set('parent_application', service.get('parent_application'));
                ticket.set('parent_application_alias', service.get('parent_application_alias'));
                ticket.set('parent_application_feature', service.get('parent_application_feature'));
                ticket.set('service', service.get('id'));
                ticket.set('content_type', service.get('content_type'));

                var dueDate = moment().add('days', service.get('sla')).format('DD MMM YYYY');
                ticket.set('due_date', dueDate);
                ticket.set('content', 'Request for ' + service.get('title'));
                ticket.set('support_queue', service.get('support_queue'));

                console.log('@@ New Ticket to be returned');

                console.log(ticket);
                console.groupEnd();

                return ticket;
            });

            IntranetManager.reqres.setHandler("support:posts:entities", function () {

                console.group('Support Handler :: support:posts:entities');
                console.groupEnd();
                return API.getEntities(null);
            });

           IntranetManager.reqres.setHandler("support:app:posts:entity", function (options) {

               console.group('Support Handler :: support:app:posts:entity');

               var endPointTemplate = API.getEndPoint()+ '/{{parent_application}}/{{model}}/{{id}}';
               options.endPoint  =  S(endPointTemplate).template(options).s;

               console.log(options);
               console.groupEnd();

                return API.getEntity(options);
            });

            IntranetManager.reqres.setHandler("support:app:posts:find", function (options ) {

                console.group('Support Handler :: support:app:posts:find');

                //var endPointTemplate = API.getEndPoint() + '/{{parent_application}}/posts';
                var endPointTemplate = API.getEndPoint()+ '/{{parent_application}}/{{model}}';
                options.endPoint  =  S(endPointTemplate).template(options).s;
                console.info(options);

                console.groupEnd();

                return API.find(options);
            });

            IntranetManager.reqres.setHandler("support:app:posts:search", function (options) {

/*               options = {
                    page: page # (defaults 0),
                    parent_application: application id (required),
                    categories: uuid of the category (optional only when searching by category
                    criterion: filterCriterion (optional) searching for text in title,
                };*/
                console.group('Support Handler ::  support:app:posts:search');

                var endPointTemplate = API.getEndPoint()+ '/{{parent_application}}/{{model}}/search';
                options.endPoint  =  S(endPointTemplate).template(options).s;

                console.log(options);
                console.groupEnd();

                return API.search(options);

            });
        });

    return;
});
