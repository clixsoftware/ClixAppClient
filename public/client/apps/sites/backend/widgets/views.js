define([
    "app",
    "common/views",
    "tpl!apps/sites/backend/widgets/templates/list_header.tpl"
],
    function ( IntranetManager, GlobalViews, listHeaderTpl) {

        IntranetManager.module("SitesManager.Backend.Widgets.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.ListHeaderView = Marionette.ItemView.extend({
                    template: listHeaderTpl
                });

            });

        return IntranetManager.SitesManager.Backend.Widgets.Views;
    });

