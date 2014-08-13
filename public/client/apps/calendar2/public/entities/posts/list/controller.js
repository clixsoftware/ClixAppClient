define([
    "app",
    "apps/calendar/public/entities/posts/list/views",
    "apps/calendar/public/common/views",
    "common/views",
    "backbone.virtual-collection",
    "backbone.grouped-collection",
    "moment"

],
    function ( IntranetManager, ListViews, CommonViews, GlobalViews ) {
        IntranetManager.module("CalendarManager.Public.Posts.List",
            function ( List, CalendarManager, Backbone, Marionette, $, _ ) {
                List.Controller = {


                   getListView: function ( projects ) {
                        return   new ListViews.ListView({
                            collection: projects
                        });
                    },

                    getSearchFormView: function () {
                        return new ListViews.SearchFormView();
                    },

                    getNoRecordsView: function () {
                        return new ListViews.NoRecordsView();
                    },

                    getHeaderView: function (app) {
                        return new ListViews.HeaderView({
                            model: app
                        });
                    },

                    showPostListPage: function (options) {

                        console.group('<<CalendarManager  showPostsListPage>>');

                        var that = this;

                        require(['entities/applications', 'entities/calendar'], function () {

                       options.parent_feature =  CalendarManager.feature.id;

                        console.log('@@ Fetching Current Application using = ' + JSON.stringify(options));

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);

                        fetchingApp.then(function(app){

                            var settings = {
                                applicationId: app.get('id')
                            };

                            IntranetManager.layoutHeader.reset();
                            IntranetManager.layoutHeader.show(that.getHeaderView(app));

                            var fetchingPosts = IntranetManager.request('calendar:posts', settings);

                            var fetchedPosts = fetchingPosts.then(function(posts){
                                return posts;
                            });

                            var searchFormView = that.getSearchFormView();
                            IntranetManager.layoutSearch.reset();
                            IntranetManager.layoutSearch.show(searchFormView);

                            return [app, fetchedPosts, settings, searchFormView]
                        })
                        .spread(function(app, posts, settings, searchFormView){

                                var showResults = function(results){

                                    if(results.length === 0 ){
                                        //alert('no item found');
                                        IntranetManager.layoutContent.reset();
                                        IntranetManager.layoutContent.show(new GlobalViews.NoItemFoundView());
                                    }else{
                                        IntranetManager.layoutContent.reset();
                                        IntranetManager.layoutContent.show(that.getListView(results));
                                    }

                                };

                                searchFormView.on("events:search", function ( filterCriterion ) {

                                    settings.criterion =  filterCriterion;
                                    var search = IntranetManager.request("calendar:app:events:search", settings);
                                    search.then(function ( results ) {
                                        console.log(results);
                                        showResults(results);
                                    });

                                });

                                showResults(posts);

                        })
                            .fail(function(error){
                                console.log('Error ' + error);
                            });
                    });

                    }

                }

            });

        return IntranetManager.CalendarManager.Public.Posts.List.Controller;
    });

