/*
 * Application: News Manager
 * Module: News Manager.Sites.List.Controller
 * */


define([
        "app",
        "apps/patients/public/entities/patient/list/views",
        "apps/patients/public/common/views",
        "common/views",
        "backbone.virtual-collection",
        "backbone.grouped-collection",
        "moment"

    ],
    function ( IntranetManager, ListViews, CommonViews, GlobalViews ) {
        IntranetManager.module("PatientManager.Public.Patients.List",
            function ( List, PatientManager, Backbone, Marionette, $, _ ) {
                List.Controller = {


                    getLayoutView: function () {
                        return new ListViews.LayoutView();
                    },

                    getListView: function ( collection ) {
                        var view = new ListViews.ListView({
                            collection: collection
                        });

                        return view;
                    },


                    getHeaderView: function ( app ) {

                        return new ListViews.HeaderView({
                            model: app
                        });
                    },

                    getSearchFormView: function () {
                        return new ListViews.SearchFormView();
                    },

                    getPaginatorView: function ( results ) {
                        return new ListViews.PaginatedView({
                            model: results
                        });
                    },


                    showPatientsList: function ( options ) {

                         console.group('<< showPatientsList : INIT >>');

                        var that = this;
                        var layout = this.getLayoutView();

                        require(['entities/applications', 'entities/patients'], function () {

                            var settings = {
                                alias: options.alias,
                                parent_feature: PatientManager.feature.id
                            };


                            console.log('@@ Fetching Current Application using = ' + JSON.stringify(settings));

                            var fetchingApp = IntranetManager.request('applications:feature:alias', settings);
                            fetchingApp.then(function ( app ) {
                                console.log('Patient Application ' + JSON.stringify(app));


                                var options = {
                                    app: app.id,
                                    page: 1
                                };

                                var fetchingRecords = IntranetManager.request('patients:application:entities', options);
                                return [app, fetchingRecords, layout, options];

                            })
                                .spread(function ( app, fetchedContacts, layout, triggerOptions ) {

                                    var searchFormView = that.getSearchFormView();


                                    var doGrouping = function ( models ) {

                                        //alert('doing grouping');
                                        models.each(function ( model, index, list ) {

                                            var gid = parseInt(index / 3);
                                            model.set('gid', gid);
                                            console.log('gid ' + gid);


                                        });

                                        return new Backbone.buildGroupedCollection({
                                            collection: models,
                                            groupBy: function ( post ) {

                                                return post.get('gid');
                                            }
                                        });
                                    };

                                    var buildPaginate = function ( collection, trigger, settings ) {
                                        var PaginateModel = Backbone.Model.extend();

                                        var paginator = new PaginateModel({
                                            items: collection.total,
                                            itemsOnPage: collection.limit,
                                            path: app.get('path')
                                        });
                                        var groupedCollection = doGrouping(collection);
                                        //
                                        console.log(JSON.stringify(groupedCollection.vc));
                                        var paginatedView = that.getPaginatorView(paginator);

                                        paginatedView.on('change:page', function ( pageNumber ) {

                                            settings.page = pageNumber;

                                            var records = IntranetManager.request(trigger, settings);

                                            records.then(function ( success ) {

                                                layout.peopleNav.show(that.getListView(doGrouping(success)));

                                            });


                                        });

                                        layout.peopleNav.show(that.getListView(groupedCollection));
                                        //console.log(JSON.stringify(paginator));
                                        layout.paginator.show(paginatedView);

                                        //return paginatedView;
                                    };

                                    layout.addRegion("peopleNav", "#peoplenav");
                                    layout.addRegion("paginator", "#paginator");
                                    //setup the search

                                    searchFormView.on("people:search", function ( filterCriterion ) {

                                        console.log("people:search event , criterion = " + filterCriterion);
                                        // alert('searching');
                                        var search_options = {
                                            criterion: filterCriterion,
                                            parent_application: app.id
                                        };

                                        var search = IntranetManager.request("directory:application:contacts:search", search_options);

                                        search.then(function ( results ) {
                                            //console.log('Search results ' +results.models.length);

                                            buildPaginate(results, 'directory:application:contacts:search', search_options);

                                        });

                                    });

                                    layout.on('show', function () {
                                        //alert(app.get('title'));

                                        IntranetManager.layoutHeader.reset();
                                        IntranetManager.layoutHeader.show(that.getHeaderView(app));

                                        IntranetManager.layoutSearch.reset();
                                        IntranetManager.layoutSearch.show(searchFormView);


                                        console.log('first showing');

                                        buildPaginate(fetchedContacts, 'directory:application:contacts', triggerOptions);
                                    });


                                    IntranetManager.appLayout = layout;

                                    IntranetManager.layoutContent.show(IntranetManager.appLayout);


                                })
                                .fail(function ( error ) {

                                    console.log(error);
                                });

                        });


                    }
                }

            });

        return IntranetManager.PatientManager.Public.Patients.List.Controller;
    });

