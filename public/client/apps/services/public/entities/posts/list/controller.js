define([
    "app",
    "apps/services/public/entities/posts/list/views",
    "apps/services/public/common/views",
    "common/views",
    "backbone.virtual-collection",
    "backbone.grouped-collection",
    "moment"

],
    function ( IntranetManager, ListViews, CommonViews, GlobalViews ) {
        IntranetManager.module("ServicesManager.Public.Posts.List",
            function ( List, ServicesManager, Backbone, Marionette, $, _ ) {
                List.Controller = {


                   getListView: function ( projects ) {
                        return   new ListViews.ListView({
                            collection: projects
                        });
                    },

                    getSearchFormView: function () {
                        return new ListViews.SearchFormView();
                    },

                    getHeaderView: function () {
                        return new ListViews.HeaderView();
                    },

                    showServiceListPage: function (options) {

                        console.group('<<ServicesManager  showServiceListPage>>');

                        var that = this;

                        require(['entities/applications', 'entities/services'], function () {

                       options.parent_feature =  ServicesManager.feature.id;

                        console.log('@@ Fetching Current Application using = ' + JSON.stringify(options));

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);

                        fetchingApp.then(function(app){

                            var settings = {
                                applicationId: app.get('id')
                            };

                            IntranetManager.layoutHeader.reset();
                            IntranetManager.layoutHeader.show(that.getHeaderView());

                            var fetchingProjects = IntranetManager.request('services:app:services', settings);

                            var projects = fetchingProjects.then(function(projects){
                                return projects;
                            });

                            var searchFormView = that.getSearchFormView();
                            IntranetManager.layoutSearch.reset();
                            IntranetManager.layoutSearch.show(searchFormView);

                            return [app, projects, searchFormView, settings]
                        })
                        .spread(function(app, projects, searchFormView, settings){

                                searchFormView.on("services:search", function ( filterCriterion ) {

                                    console.log("services:search event , criterion = " + filterCriterion);
                                    // alert('searching');
                                    settings.criterion =  filterCriterion;

                                    var search = IntranetManager.request("services:app:services:search", settings);
                                    search.then(function ( results ) {
                                        console.log(results);
                                        IntranetManager.layoutContent.reset();
                                        IntranetManager.layoutContent.show(that.getListView(results));
                                    });

                                });


                              IntranetManager.layoutContent.reset();
                              IntranetManager.layoutContent.show(new that.getListView(projects));


                        })
                            .fail(function(error){
                                console.log('Error ' + error);
                            });
                    });

                    }

                }

            });

        return IntranetManager.ServicesManager.Public.Posts.List.Controller;
    });

