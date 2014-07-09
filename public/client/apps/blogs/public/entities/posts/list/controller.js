define([
    "app",
    "apps/blogs/public/entities/posts/list/views",
    "apps/blogs/public/common/views",
    "common/views",
    "backbone.virtual-collection",
    "backbone.grouped-collection",
    "moment"

],
    function ( IntranetManager, ListViews, CommonViews, GlobalViews ) {
        IntranetManager.module("BlogsManager.Public.Posts.List",
            function ( List, BlogsManager, Backbone, Marionette, $, _ ) {
                List.Controller = {


                   getListView: function ( projects ) {
                        return   new ListViews.ListView({
                            collection: projects
                        });
                    },

                    getSearchFormView: function () {
                        return new ListViews.SearchFormView();
                    },

                    getHeaderView: function (app) {
                        return new ListViews.HeaderView({
                            model: app
                        });
                    },

                    showPostListPage: function (options) {

                        console.group('<<BlogsManager  showProjectListPage>>');

                        var that = this;

                        require(['entities/applications', 'entities/blogs'], function () {

                       options.parent_feature =  BlogsManager.feature.id;

                        console.log('@@ Fetching Current Application using = ' + JSON.stringify(options));

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);

                        fetchingApp.then(function(app){

                            var settings = {
                                applicationId: app.get('id')
                            };

                            IntranetManager.layoutHeader.reset();
                            IntranetManager.layoutHeader.show(that.getHeaderView(app));

                            var fetchingPosts = IntranetManager.request('blogs:blog:posts', settings);

                            var posts = fetchingPosts.then(function(posts){
                                return posts;
                            });

                            var searchFormView = that.getSearchFormView();
                            //IntranetManager.layoutSearch.reset();
                            //IntranetManager.layoutSearch.show(searchFormView);

                            return [app, posts, settings]
                        })
                        .spread(function(app, posts, settings){


                              IntranetManager.layoutContent.reset();
                              IntranetManager.layoutContent.show(new that.getListView(posts));


                        })
                            .fail(function(error){
                                console.log('Error ' + error);
                            });
                    });

                    }

                }

            });

        return IntranetManager.BlogsManager.Public.Posts.List.Controller;
    });

