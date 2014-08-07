/*
 * Application: Workspace
 * Model: Workspace Model
 * Module: WorkspaceManager.Entities
 * */


define([
    "app",
    "Q"
], function ( IntranetManager, Q ) {

    IntranetManager.module("Entities",
        function ( Entities, IntranetManager, Backbone, Marionette, $, _ ) {

            var apiEndPoint = IntranetManager.opts.API() + 'taxonomy';

            var taxonomyEndPoint = 'taxonomy';

            Entities.Taxonomy = Backbone.Model.extend({

                url: apiEndPoint/*,

                validation: {
                    title: {
                        required: true
                    }

                }*/

            });

            //Entities.configureStorage(Entities.Contact);

            Entities.TaxonomyCollection = Backbone.Collection.extend({
                url: apiEndPoint,
                model: Entities.Taxonomy,
                comparator: "title"
            });

            //Entities.configureStorage(Entities.ContactCollection);


            var API = {

                getEndPoint: function(){
                    return apiEndPoint;
                },

                getEntities: function () {

                    return this.getDAOCollection(apiEndPoint);
                },

                getEntity: function (id, endpoint) {


                    var item = new Entities.Taxonomy();
                    if(id){
                        item.id = id;
                    }
                    item.url = endpoint;
                    return this.getDAOdeferred(item);
                },


                searchEntities: function(query){

                    var url = '?' + query;
                    return this.getDAOCollection(url);

                },

                getEndpointEntities: function(endpoint)
                {
                    var collection = new Entities.TaxonomyCollection();

                    collection.url = endpoint;


                    return this.getDAOdeferred(collection);
                },

                getDAOCollection: function(endpoint){

                    console.log('<< getDAOCollection: YP Posts -> ' +  endpoint + '  >>');


                    var url = this.getEndPoint() + endpoint;
                    console.log('colletion url - ' + url);

                    var collection = new Entities.TaxonomyCollection();

                    collection.url = url;


                    return this.getDAOdeferred(collection);
                },

                getDAOdeferred: function(queryObject){


                    return Q(queryObject.fetch())
                        .then(function(data){

                            //console.log(data);
                            return queryObject;

                        },  function(xhr){

                            //console.log('err occurred during fetch');
                            return undefined;
                        }
                    );

                }


            };

            IntranetManager.reqres.setHandler("taxonomy:entities", function () {
                return API.getEntities();
            });

            IntranetManager.reqres.setHandler("taxonomy:object:terms", function (objectid) {
                var endPoint = API.getTaxonomyEndPoint() + '/object/' + objectid;
                return API.getEndpointEntities(endPoint);
                //return API.searchEntities("object_id=" + objectid);
            });

            IntranetManager.reqres.setHandler("taxonomy:object:tags", function (objectid) {
                var endPoint = API.getEndPoint() + '/object/' + objectid + '?tags=true';
                return API.getEndpointEntities(endPoint);
            });

            IntranetManager.reqres.setHandler("taxonomy:app:tags", function (objectid) {
                var endPoint = API.getEndPoint() + '/app/' + objectid + '?tags=true';
                return API.getEndpointEntities(endPoint);
            });

            IntranetManager.reqres.setHandler("taxonomy:entity", function (id) {
                return API.getEntity(id);
            });

            IntranetManager.reqres.setHandler("taxonomy:entity:by:code", function (code) {
                var endPoint = API.getEndPoint() + '?code=' + code;
                return API.getEndpointEntities(endPoint);
            });

            IntranetManager.reqres.setHandler("taxonomy:entity:feature:alias:code", function (options) {
/*                console.log('<<Trigger :  taxonomy:entity:feature:alias:code >>');
                var endpoint = API.getCategoryEndPoint() + '?parent_application_feature=' + options.feature + '&parent_application_alias=' + options.alias + '&code=' + options.category ;

                return API.getEndpointEntities(endpoint);*/
                //return API.getEntity(null, endpoint);

            });

            IntranetManager.reqres.setHandler("taxonomy:search:app", function (options) {
/*                console.log('<<Trigger :  taxonomy:search:app >>');
                var endpoint = API.getCategoryEndPoint() + '?parent_application_feature=' + options.feature + '&parent_application_alias=' + options.alias  ;

                return API.getEndpointEntities(endpoint);*/

            });

            IntranetManager.reqres.setHandler("taxonomy:entity:new", function () {
                return new Entities.Taxonomy();
            });

            IntranetManager.reqres.setHandler('taxonomy:collection:set:new', function(coll){
                return new Entities.TaxonomyCollection(coll);
            });

            IntranetManager.reqres.setHandler('taxonomy:term:children', function(termId){
                var url = API.getEndPoint() + "/" + termId + "/terms";
                console.log(url);
               return new Entities.TaxonomyCollection();
            });

            IntranetManager.reqres.setHandler('taxonomy:collection:set:categories', function(options){

               // alert('in categories');
                console.group('Widget [Categories ]');
                console.log(options);
                console.groupEnd();

                var col = new Entities.TaxonomyCollection();

                        _.each(options.collection, function(tag){

                            var token = tag.split(';#');
                            console.log(token);
                            var id = token[0].trim();
                            var info = token[1].split('|');
                            var title = info[0];
                            var uuid = info[1];
                            var url = id + '-' + title.replace(/ /g, '-');

                            var b = new Entities.Taxonomy({
                                id: id,
                                title: title,
                                uuid: uuid,
                               // show_url: '/'  + options.parentFeature + '/' + options.appAlias + '/' +  options.appFeature + '/' + options.view +'/' + url + '/index.html'
                                show_url: options.url + '/categories/'  + url + '/index.html'
                            });

                            //console.log('b = ' + b.get('show_url'));
                            //console.log(b);
                            col.add(b);

                        });

                console.log(col);
                return col;

                //return new Entities.TaxonomyCollection(models);
            });
            IntranetManager.reqres.setHandler('taxonomy:collection:set:tags', function(options){

                console.group('Widget [Tags ]');
                console.log(options);
                console.groupEnd();

                var col = new Entities.TaxonomyCollection();

                var id = 0;
                _.each(options.collection, function(tag){
                        id = id + 1;

                           var url = $.trim(tag).replace(/ /g, '-');

                        var b = new Entities.Taxonomy({
                            id: id,
                            title: tag,
                            show_url: '/'  + options.url + '/tags/'  + url
                        });
                        col.add(b);
                });

               console.log(col);
               return col;

            });
        });

    return;
});
