define([
    "app",
    "apps/sites/backend/widgets/views"
], function ( IntranetManager, WidgetViews) {

    IntranetManager.module("SitesManager.Backend.Widgets.Show",
        function ( Show,
                   IntranetManager,
                   Backbone,
                   Marionette,
                   $, _ ) {

            Show.Controller = {

                //List Header

                getListHeaderView: function(model){

                    return new WidgetViews.ListHeaderView({
                        model: model
                    });
                },

                displayListHeader: function(model){

                    IntranetManager.layoutHeader.show(new this.getListHeaderView(model));
                }



            }
        });

    return IntranetManager.SitesManager.Backend.Widgets.Show.Controller;
});

