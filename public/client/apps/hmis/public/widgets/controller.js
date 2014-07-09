define([
    "app",
    "apps/hmis/public/widgets/views",
    "moment"
], function ( IntranetManager, WidgetsShow) {

    IntranetManager.module("HospitalManager.Public.Widgets.Show",
        function ( Show,
                   IntranetManager,
                   Backbone,
                   Marionette,
                   $, _ ) {

            Show.Controller = {

                getMainMenuView: function () {

                    return new WidgetsShow.MainMenuView();
                },

                showMainMenu: function(){

                    console.log('<< INIT: showMainMenu >>');

                    var that = this;

                    IntranetManager.layoutTopNavBar.reset();
                    IntranetManager.layoutTopNavBar.show(this.getMainMenuView());

                }





            }
        });

    return IntranetManager.HospitalManager.Public.Widgets.Show.Controller;
});

