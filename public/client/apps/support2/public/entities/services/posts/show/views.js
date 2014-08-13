define([
    "../../../../../../../app",
    "tpl!apps/support/public/entities/services/show/templates/details_view.tpl"
],
    function ( IntranetManager, detailsTpl) {

        IntranetManager.module("SupportManager.Public.Services.Show.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.DetailsView = Marionette.ItemView.extend({
                    template: detailsTpl,

                    onBeforeRender: function () {
                        // set up final bits just before rendering the view's `el`
                       // $('body').addClass('single single-news');

                        //console.log('<< Views.PublicView: Loaded ***COMPLETED*** >>');
                    }
                });


            });

        return IntranetManager.SupportManager.Public.Services.Show.Views;
    });
