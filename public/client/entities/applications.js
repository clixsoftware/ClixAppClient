/*
 * Application: Workspace
 * Model: Workspace Model
 * Module: WorkspaceManager.Entities
 * */


define([
    "app",
    'Q',
    'backbone.nested'
], function ( IntranetManager, Q ) {

    IntranetManager.module("Entities",
        function ( Entities, IntranetManager, Backbone, Marionette, $, _ ) {


            var apiEndPoint = IntranetManager.opts.API()  +'applications';

            Entities.Application = Backbone.NestedModel.extend({

                url: apiEndPoint/*,

                validation: {
                    title: {
                        required: true,
                        minLength: 8

                    },
                    alias: {
                            required: true,
                            minLength: 2
                        }

                }*/

            });


            Entities.ApplicationCollection = Backbone.Collection.extend({
                url: apiEndPoint,
                model: Entities.Application,
                comparator: "title"
            });

            Entities.ApplicationSearchResults = Entities.ApplicationCollection.extend({

                initialize: function () {
                    /*                    _.bindAll(this, 'parse', 'url', 'pageInfo', 'nextPage', 'previousPage');
                     typeof(options) != 'undefined' || (options = {});
                     this.page = 1;
                     typeof(this.perPage) != 'undefined' || (this.perPage = 10);*/
                },

                parse: function (resp) {
                    this.page = resp.page;
                    this.limit = resp.limit;
                    this.total = resp.total;

                    console.log('Total models = ' + this.total);
                    return resp.models;

                },

                url: function () {
                    var thisurl = this.baseUrl + '&' + $.param({page: this.page, limit: this.limit});
                    console.log('paginated url ' + thisurl);
                    return thisurl;
                },

                nextPage: function () {
                    if (!this.pageInfo().next) {
                        return false;
                    }
                    this.page = this.page + 1;
                    return this.fetch();
                },
                previousPage: function () {
                    if (!this.pageInfo().prev) {
                        return false;
                    }
                    this.page = this.page - 1;
                    return this.fetch();
                }

            });

            var API = {

                getEndPoint: function(){
                    return apiEndPoint;
                },

                getEntities: function () {

                    return this.getDAOCollection(apiEndPoint);
                },

                getEntity: function (id, endpoint) {

                    var item = new Entities.Application();
                    if(id){
                        item.id = id;
                    }
                    item.url = endpoint;
                    return this.getDAOdeferred(item);
                },


                search: function(criteria){
                    var url = apiEndPoint  +  criteria;
                    return this.getSearchResults(url);
                },


                getSearchResults: function(endpoint){

                    console.group('getSearchResults: News Posts ');

                    var collection = new Entities.ApplicationSearchResults();

                    collection.url =  endpoint;

                    console.log(collection.url);
                    console.groupEnd();
                    return this.getDAOdeferred(collection);
                },

                 getDAOCollection: function(endpoint){

                    console.log('<< getDAOCollection: -> ' +  endpoint + '  >>');

                    var collection = new Entities.ApplicationCollection();

                    collection.url = API.getEndPoint() + endpoint;

                    return this.getDAOdeferred(collection);
                },

                getDAOdeferred: function(queryObject){

                    return Q(queryObject.fetch())
                        .then(function(data){

                            //console.log(data);
                            return queryObject;

                        },  function(xhr){

                            console.log('err occurred during fetch');
                            return undefined;
                        }
                    );


                }


            };

            IntranetManager.reqres.setHandler("applications:entities", function () {
                return API.getEntities();
            });

            IntranetManager.reqres.setHandler("applications:search", function ( query ) {
                return API.search(query);
            });

            IntranetManager.reqres.setHandler("applications:entity", function ( id ) {
                var endpoint = API.getEndPoint()+ '/' + id;
                return API.getEntity(id, endpoint);
            });

            IntranetManager.reqres.setHandler("applications:feature:alias", function (options ) {
                var endpoint = API.getEndPoint()+ '/app/' + options.parent_feature + '/' +  options.alias;
                return API.getEntity(null, endpoint);
            });

            IntranetManager.reqres.setHandler("applications:search:feature", function ( feature_alias ) {

                return API.search('?app_alias=' + feature_alias);
            });


            IntranetManager.reqres.setHandler("applications:entity:new", function () {
                return new Entities.Application();
            });

            /*        IntranetManager.reqres.setHandler("workspace:entity:byalias", function (alias) {
             return API.getWorkspaceEntity(alias);
             });*/


        });

    return;
});
