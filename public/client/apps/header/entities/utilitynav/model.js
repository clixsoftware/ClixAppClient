
/*
 * Application: Header
 * Model: Navigation Items Model
 * Module: HeaderManager.Entities
 * */


define([
    "app",
    "backbone.picky"
], function ( IntranetManager ) {

    IntranetManager.module("HeaderManager.Entities",
        function ( Entities, IntranetManager, Backbone, Marionette, $, _ ) {

            Entities.UtilityNav = Backbone.Model.extend({
               initialize: function(){

                   var selectable = new Backbone.Picky.Selectable(this);
                   _.extend(this, selectable);

               }
            });

            Entities.UtilityNavCollection = Backbone.Collection.extend({

                model: Entities.UtilityNav,

                initialize: function(){
                    var singleSelect = new Backbone.Picky.SingleSelect(this);
                    _.extend(this, singleSelect);
                }

            });

            var initializeHeaders = function(){

                Entities.utilityNavItems = new Entities.UtilityNavCollection([
                   // {name: 'A to Z', url:'/yp/default', navigationTrigger: 'home:show', icon: 'home'},
                    //{name: 'Document Finder', url:'/home/main/library', navigationTrigger: 'home:show', icon: 'home'},
                    {name: 'Calendar', url:IntranetManager.appSettings.get('default_site') + '/calendar', navigationTrigger: 'home:show', icon: 'home'},
                    {name: 'Projects', url:'/projects/default', navigationTrigger: 'home:show', icon: 'home'},
                    {name: 'Support', url:'/support/helpdesk', navigationTrigger: 'home:show', icon: 'home'}

                ]);
            };

            var API = {

                getHeaders: function(){
                    if(Entities.utilityNavItems === undefined){
                        initializeHeaders();
                    }

                    return Entities.utilityNavItems;
                }


            };

            IntranetManager.reqres.setHandler("utilitynav:entities", function(){
                return API.getHeaders();
            })

        });

    return;
});
