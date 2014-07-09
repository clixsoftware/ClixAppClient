define([
    "app",
    "tpl!apps/feature/entities/features/show/templates/view.tpl",
    "tpl!apps/feature/entities/features/show/templates/sidebar.tpl",
    "tpl!apps/feature/entities/features/show/templates/header.tpl",
    "tpl!apps/feature/entities/features/show/templates/stats.tpl",
    "semantic"
],
    function ( IntranetManager, viewTpl, sidebarTpl, headerTpl, statsTpl) {

        IntranetManager.module("AppManager.Apps.Show.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.DisplayPageView = Marionette.ItemView.extend({
                    template: viewTpl
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

        return IntranetManager.AppManager.Apps.Show.Views;
    });
