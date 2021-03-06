
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

            Entities.SiteNav = Backbone.Model.extend({
               initialize: function(){

                   var selectable = new Backbone.Picky.Selectable(this);
                   _.extend(this, selectable);

               }
            });

            Entities.SiteNavCollection = Backbone.Collection.extend({

                model: Entities.SiteNav,

                initialize: function(){
                    var singleSelect = new Backbone.Picky.SingleSelect(this);
                    _.extend(this, singleSelect);
                }

            });

            var initializeHeaders = function(){

                Entities.siteNavItems = new Entities.SiteNavCollection([
                    {name: 'Home', url:'/home/main', navigationTrigger: 'home:show', icon: 'home'},
                    {name: 'About UHWI', url:'/home/main/pages/about/index.html', navigationTrigger: 'home:show', icon: 'home'},
                    {name: 'How Do I?', url:'/yp/default', navigationTrigger: 'home:show', icon: 'home'},
                    {name: 'News', url:'/home/main/news', navigationTrigger: 'home:show', icon: 'home'}

                ]);
            };

            var API = {

                getHeaders: function(){
                    if(Entities.siteNavItems === undefined){
                        initializeHeaders();
                    }

                    return Entities.siteNavItems;
                }


            };

            IntranetManager.reqres.setHandler("sitenav:entities", function(){
                return API.getHeaders();
            })

        });

    return;
});
