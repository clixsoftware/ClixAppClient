define([
    "app",
    "common/views",
    "tpl!apps/auth/common/templates/layout.tpl",
    "tpl!apps/auth/common/templates/header.tpl",
    "tpl!apps/auth/common/templates/footer.tpl",
    "tpl!apps/auth/common/templates/message.tpl",
    "semantic"
],
    function ( IntranetManager, CommonViews, layoutTpl, headerTpl,  footerTpl, messageTpl) {

        IntranetManager.module("AuthManager.Common.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.LayoutView = Marionette.LayoutView.extend({

                    template: layoutTpl,

                    regions: {
                        videoRegion: "#session-video-zone",
                        formRegion: "#session-form-zone"
                    }

                });

                Views.MessageView = Marionette.ItemView.extend({
                    template: messageTpl

                });

                Views.FooterView = Marionette.ItemView.extend({
                    template: footerTpl

                });


                Views.HeaderView = Marionette.ItemView.extend({
                    template: headerTpl

                });



            });

        return IntranetManager.AuthManager.Common.Views;
    });
