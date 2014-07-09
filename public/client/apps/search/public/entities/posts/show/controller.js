define([
    "app",
    "apps/search/public/entities/posts/show/views",
    "moment"
], function (IntranetManager, ShowViews) {

    IntranetManager.module("SearchManager.Public.Posts.Show",
        function (Show, SearchManager, Backbone, Marionette, $, _) {

            Show.Controller = {

                getDefaultPage: function () {

                    return new ShowViews.DefaultPageView();

                },

                showDefaultPage: function (alias) {

                    //alert(alias);
                    var that = this;

                    require(['entities/applications', 'entities/support'], function () {

                        var options = {
                            alias: alias,
                            parent_feature: SearchManager.feature.id
                        };

                        console.log('@@ Fetching Current Application using = ' + options);

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);


                        fetchingApp.then(function (app) {

                           IntranetManager.trigger('dom:title', app.get('title'));

                            var view = that.getDefaultPage();

                             IntranetManager.layoutContent.reset();
                            IntranetManager.layoutContent.show(view);

                        }).fail(function (err) {
                                //alert(' an error occurred ' + err);
                                console.log('an error occurred ' + err);
                            });

                    });

                },



            }
        });

    return IntranetManager.SearchManager.Public.Posts.Show.Controller;
});

