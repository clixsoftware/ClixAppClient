/*
 * Application: Workspace
 * Views: Workspace List Views
 * Module: WorkspaceManager.List.Controller
 * */


define([
    "app",
    "apps/feature/entities/features/list/views",
    "apps/feature/common/views",
    "common/views"
],
    function ( IntranetManager, FeaturesListViews, CommonViews,  GlobalViews ) {
        IntranetManager.module("FeatureManager.Features.List",
            function ( List, NewsManager, Backbone, Marionette, $, _ ) {

                List.Controller = {

                    getHeaderView: function () {

                        var view = new CommonViews.ListHeaderView();


                        view.on('button:command:new', function () {

                            IntranetManager.trigger('feature:admin:feature:new');
                        });

                        return view;

                    },

                    getListSearchView: function () {

                        var that = this;
                        var view = new GlobalViews.SearchView();

                        view.on('list:search', function (criterion) {
                            that.listSearch(criterion);
                        });

                        return view;

                    },


                    getFeatureListView: function ( features ) {

                        return new FeaturesListViews.FeatureListView({
                            collection: features
                        })

                    },

                    getNoRecordsView: function(){

                        var view  = new FeaturesListViews.NoRecordsView() ;

                        view.on('list:command:all', function(){
                            IntranetManager.trigger('featuremanager:home:show');
                        });

                        return view;
                    },

                    listSearch: function(criterion){

                        //alert('list search ' + criterion);

                        var that = this;
                        var fetchingRecords = IntranetManager.request('feature:search', 'title=' + criterion);

                        $.when(fetchingRecords).done(function(fetchedRecords){

                          //  alert('search for features');
                          //  console.log(fetchedRecords);
                            if(fetchedRecords != undefined){


                                var listView = that.getFeatureListView(fetchedRecords);
                                IntranetManager.layoutContent.show(listView);
                            }else{
                                IntranetManager.layoutContent.show(that.getNoRecordsView());

                            }

                        });


                    },

                    listFeatures: function () {

                        console.group('<< FeatureManager: listFeatures >>');

                        var that = this;

                        var cb = function () {

                            require(["entities/feature"],
                                function () {

                                    //fetch posts
                                    var fetchingFeatures = IntranetManager.request('feature:entities');

                                    $.when(fetchingFeatures).done(function ( fetchedRecords ) {

                                        console.info('<< listFeatures:  feature fetch completed >>');

                                        var listView = that.getFeatureListView(fetchedRecords);

                                        if (fetchedRecords.length) {

                                            console.info('<< listFeatures:  features found >>');


                                            IntranetManager.layoutHeader.show(that.getHeaderView());

                                            IntranetManager.layoutContent.show(listView);

                                            IntranetManager.layoutSearch.show(that.getListSearchView());

                                            IntranetManager.layoutZone1.reset();

                                            IntranetManager.layoutZone2.reset();


                                        } else {

                                            var blankView = new FeaturesListViews.BlankView();

                                            blankView.on('new:feature', function () {

                                                IntranetManager.trigger('featuremanager:feature:create');
                                            });

                                            IntranetManager.layoutZone1.show(new FeaturesListViews.BlankHelpView());
                                            IntranetManager.layoutContent.show(blankView);
                                            IntranetManager.layoutSearch.reset();
                                            IntranetManager.layoutHeader.reset();
                                        }

                                    });


                                }
                            );
                        };

                        console.groupEnd();

                        IntranetManager.trigger("feature:admin:init", cb);


                    }
                }
            });

        return IntranetManager.FeatureManager.Features.List.Controller;
    });

