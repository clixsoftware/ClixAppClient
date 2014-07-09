define(
    ['app', 'backbone.picky'], function(IntranetManager){

        IntranetManager.module('AuthManager.Entities', function(Entities, IntranetManager, Backbone, Marionette, $, _){

            Entities.Nav = Backbone.Model.extend({
               initialize: function(){
                   var selectable = new Backbone.Picky.Selectable(this);
                   _.extend(this, selectable);
               }
            });

            Entities.NavCollection = Backbone.Collection.extend({
               model: Entities.Nav,

               initialize: function(){
                   var singleSelect = new Backbone.Picky.SingleSelect(this);
                   _.extend(this, singleSelect);
               }
            });

            var initializeNavLinks = function(){
                Entities.navLinks = new Entities.NavCollection([
                    {name:'About', url: '/auth/about', navigationTrigger: 'auth:about:show'},
                    {name:'About', url: '/auth/about', navigationTrigger: 'auth:about:show'}
                ]);
            };

            var API = {
                getNavLinks: function(){
                    if(Entities.navLinks === undefined){
                        initializeNavLinks();
                    }

                    return Entities.navLinks;
                }
            }

            IntranetManager.reqres.setHandler("session:nav:entities", function(){
                return API.getNavLinks();
            })

        });

        return ;

    });
