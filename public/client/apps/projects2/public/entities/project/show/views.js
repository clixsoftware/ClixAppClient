define([
    "app",
    "tpl!apps/projects/public/entities/project/show/templates/details_view.tpl"
],
    function ( IntranetManager, detailsTpl) {

        IntranetManager.module("ProjectsManager.Public.Project.Show.Views",
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

        return IntranetManager.ProjectsManager.Public.Project.Show.Views;
    });
