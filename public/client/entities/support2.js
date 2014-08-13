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


        var apiEndPoint = 'support';

        Entities.SupportPost = Backbone.Model.extend({

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

        Entities.Ticket = Backbone.Model.extend({

            url: IntranetManager.opts.API + apiEndPoint + '/tickets',

            validation: {
                requestor_email: {
                    required: true,
                    pattern: 'email',
                    msg: 'Please enter a valid email'
                },
                requestor_name: {
                    required: true,
                    msg: 'Your name is required'
                }                /*,
                description: {
                    required: true
                }*/

            }

        });

        //Entities.configureStorage(Entities.Contact);

        Entities.SupportPostCollection = Backbone.Collection.extend({

            url: IntranetManager.opts.API + apiEndPoint,

            model: Entities.SupportPost,

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


                var item = new Entities.SupportPost();
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

                var collection = new Entities.SupportPostCollection();

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

       IntranetManager.reqres.setHandler("support:entity:new", function () {
            return new Entities.SupportPost();
        });

        IntranetManager.reqres.setHandler("support:ticket:new", function (service) {

            var ticket = new Entities.Ticket();

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
            console.group('@@ New Ticket to be returned');
            console.log(ticket);
            console.groupEnd();

            return ticket;
        });

        IntranetManager.reqres.setHandler("support:app:services", function (options) {
            var query;
            query = 'parent_application=' + options.applicationId;
            if (options.criterion)   query = query + '&criterion=' + options.criterion;

            return API.query(query);
        })

    });

    return;
});
