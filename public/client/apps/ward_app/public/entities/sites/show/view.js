define([
    "app",
    "tpl!apps/sites/show/templates/view.tpl",
    "tpl!apps/sites/show/templates/header.tpl"
],
    function ( IntranetManager, viewTpl, headerTpl ) {

        IntranetManager.module("SiteManager.Show.View",
            function ( View, IntranetManager, Backbone, Marionette, $, _ ) {


                View.HomePage = Marionette.ItemView.extend({
                    template: viewTpl
                });


                View.HeaderView = Marionette.ItemView.extend({
                    template: headerTpl
                });


            });

        return IntranetManager.SiteManager.Show.View;
    });
