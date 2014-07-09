/*
 * Application: Home
 * Model: Home Page Model
 * Module: HomePage.Entities
 * */


define([
    "app",
    "Q"
], function ( IntranetManager , Q) {

    IntranetManager.module("Entities",
        function ( Entities, IntranetManager, Backbone, Marionette, $, _ ) {


            var apiEndPoint = 'homepage/home';

            Entities.Home = Backbone.Model.extend({

                url: IntranetManager.opts.API + apiEndPoint

            });


            var API = {


               getEntity: function () {

                    var item = new Entities.Home();
                    item.url = IntranetManager.opts.API + apiEndPoint;
                    return this.getDAOdeferred(item);
                },

                getDAOdeferred: function(queryObject){

/*                    var defer = $.Deferred();

                    queryObject.fetch({
                        success: function ( data ) {
                            defer.resolve(data);
                        },
                        error: function ( data ) {
                            defer.resolve(undefined);
                        }
                    });

                    return  defer.promise();*/

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


            IntranetManager.reqres.setHandler("home:get:default", function (  ) {
                return API.getEntity();
            });

        });

    return;
});
