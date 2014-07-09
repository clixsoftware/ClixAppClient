define([
    "../../../../../../app",
    "tpl!apps/site/entities/sites/show/templates/view.tpl",
    "tpl!apps/site/entities/sites/show/templates/sidebar.tpl",
    "tpl!apps/site/entities/sites/show/templates/header.tpl",
    "tpl!apps/site/entities/sites/show/templates/stats.tpl",
    "semantic"
],
    function ( IntranetManager, viewTpl, sidebarTpl, headerTpl, statsTpl) {

        IntranetManager.module("SiteManager.Sites.Show.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.DisplayPageView = Marionette.ItemView.extend({
                    template: viewTpl,

                    onFeatureChangeCompleted: function(){
                        alert('featurechange completed');
                    }
                });

                Views.SidebarView = Marionette.ItemView.extend({
                    template: sidebarTpl
                });

                Views.HeaderView = Marionette.ItemView.extend({
                    template: headerTpl,

                    triggers: {
                        'click .js-show-edit': 'form:show:edit',
                        'click .js-show-delete': 'form:show:delete'
                    }
                });

                Views.StatsView = Marionette.ItemView.extend({
                    template: statsTpl,

                    className: 'more-info widget'
                });


            });

        return IntranetManager.SiteManager.Sites.Show.Views;
    });
