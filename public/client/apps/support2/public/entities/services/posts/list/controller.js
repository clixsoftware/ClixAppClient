define([
    "app",
    "apps/support/public/entities/services/list/views",
    "apps/support/public/common/views",
    "common/views",
    "backbone.virtual-collection",
    "backbone.grouped-collection",
    "moment"

],
    function ( IntranetManager, ListViews, CommonViews, GlobalViews ) {
        IntranetManager.module("SupportManager.Public.Services.List",
            function ( List, SupportManager, Backbone, Marionette, $, _ ) {
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

                        console.group('<<SupportManager  showServiceListPage>>');

                        var that = this;

                        require(['../../../../../../../entities/applications', 'entities/services'], function () {

                        options.parent_feature =  SupportManager.feature.id;

                        console.log('@@ Fetching Current Application using = ' + JSON.stringify(options));

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);

                        fetchingApp.then(function(app){

                            var settings = {
                                applicationId: app.get('id')
                            };

                            IntranetManager.layoutHeader.reset();
                            IntranetManager.layoutHeader.show(that.getHeaderView());

                            var fetchingServices = IntranetManager.request('services:app:posts:search', settings);

                            var services = fetchingServices.then(function(services){
                                return services;
                            });

                            var searchFormView = that.getSearchFormView();
                            IntranetManager.layoutSearch.reset();
                            IntranetManager.layoutSearch.show(searchFormView);

                            return [app, services, searchFormView, settings]
                        })
                        .spread(function(app, services, searchFormView, settings){

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
                              IntranetManager.layoutContent.show(new that.getListView(services));


                        })
                            .fail(function(error){
                                console.log('Error ' + error);
                            });
                    });

                    }

                }

            });

        return IntranetManager.SupportManager.Public.Services.List.Controller;
    });

