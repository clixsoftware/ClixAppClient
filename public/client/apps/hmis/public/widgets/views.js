define([
    "app",
    "common/views",
    "tpl!apps/hmis/public/widgets/templates/main_menu.tpl",

],
    function ( IntranetManager, GlobalViews, mainMenuTpl) {

        IntranetManager.module("HospitalManager.Public.Widgets.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.MainMenuView = Marionette.ItemView.extend({

                    template: mainMenuTpl
                });
                
            });

        return IntranetManager.HospitalManager.Public.Widgets.Views;
    });

