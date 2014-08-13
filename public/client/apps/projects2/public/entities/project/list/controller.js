define([
    "app",
    "apps/projects/public/entities/project/list/views",
    "apps/projects/public/common/views",
    "common/views",
    "backbone.virtual-collection",
    "backbone.grouped-collection",
    "moment"

],
    function ( IntranetManager, ListViews, CommonViews, GlobalViews ) {
        IntranetManager.module("ProjectsManager.Public.Posts.List",
            function ( List, ProjectsManager, Backbone, Marionette, $, _ ) {
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

                    showProjectListPage: function (options) {

                        console.group('<<ProjectsManager  showProjectListPage>>');

                        var that = this;

                        require(['entities/applications', 'entities/projects'], function () {

                       options.parent_feature =  ProjectsManager.feature.id;

                        console.log('@@ Fetching Current Application using = ' + JSON.stringify(options));

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);

                        fetchingApp.then(function(app){

                            var settings = {
                                applicationId: app.get('id')
                            };

                            IntranetManager.layoutHeader.reset();
                            IntranetManager.layoutHeader.show(that.getHeaderView());

                            var fetchingProjects = IntranetManager.request('projects:app:projects', settings);

                            var projects = fetchingProjects.then(function(projects){
                                return projects;
                            });

                            var searchFormView = that.getSearchFormView();
                            IntranetManager.layoutSearch.reset();
                            IntranetManager.layoutSearch.show(searchFormView);

                            return [app, projects, searchFormView, settings]
                        })
                        .spread(function(app, projects, searchFormView, settings){

                                searchFormView.on("projects:search", function ( filterCriterion ) {

                                    console.log("projects:search event , criterion = " + filterCriterion);
                                    // alert('searching');
                                    settings.criterion =  filterCriterion;

                                    var search = IntranetManager.request("projects:app:projects:search", settings);
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

        return IntranetManager.ProjectsManager.Public.Posts.List.Controller;
    });

