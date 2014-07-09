/*
 * Application: Workspace
 * Views: Workspace List Views
 * Module: WorkspaceManager.List.Controller
 * */


define([
    "app",
    "apps/taxonomy/list/views",
    "apps/taxonomy/common/views",
    "common/views"
],
    function ( IntranetManager, ListViews, CommonViews, GlobalViews ) {
        IntranetManager.module("TaxonomyManager.List",
            function ( List, TaxonomyManager, Backbone, Marionette, $, _ ) {
                List.Controller = {

                    getHeaderView: function () {

                        var view = new CommonViews.ListHeaderView();

                        view.on('button:command:new', function () {
                            IntranetManager.trigger('taxonomy:new:form');
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


                    getListView: function ( collection ) {
                        var view =  new ListViews.ListView({
                            collection: collection
                        });

                        view.on('itemview:list:model:edit', function(title){
                           console.log('ID of the model', title);

                        });

                        return view;
                    },

                    getBlankView: function () {

                        var view = new CommonViews.BlankView();

                        view.on('new:feature', function () {

                            IntranetManager.trigger('featuremanager:feature:create');
                        });

                        return view;
                    },

                    getBlankHelpView: function () {
                        return new CommonViews.BlankHelpView();
                    },


                    getNoRecordsView: function(){

                        var view  = new GlobalViews.ListNoRecordsView() ;

                        view.on('list:command:all', function(){
                            IntranetManager.trigger('taxonomy:home:show');
                        });

                        return view;
                    },

                    listSearch: function(criterion){

                        var that = this;
                        var fetchingRecords = IntranetManager.request('taxonomy:search', '?title=' + criterion);

                        $.when(fetchingRecords).done(function(fetchedRecords){

                            //  alert('search for features');
                            //  console.log(fetchedRecords);
                            if(fetchedRecords != undefined){


                                var listView = that.getListView(fetchedRecords);
                                IntranetManager.layoutContent.show(listView);
                            }else{
                                IntranetManager.layoutContent.show(that.getNoRecordsView());

                            }

                        });


                    },

                    listRecords: function () {

                        var that = this;

                        var cb = function () {

                            require(["entities/taxonomy"],
                                function () {

                                    //fetch posts
                                    var fetchingRecords = IntranetManager.request('taxonomy:entities');

                                    $.when(fetchingRecords).done(function ( fetchedRecords ) {

                                        console.log('fetching records completed');

                                        var listView = List.Controller.getListView(fetchedRecords);

                                        if (fetchedRecords.length) {

                                            IntranetManager.layoutHeader.show(List.Controller.getHeaderView());

                                            IntranetManager.layoutContent.show(listView);

                                            IntranetManager.layoutSearch.show(List.Controller.getListSearchView());

                                            IntranetManager.layoutZone1.reset();

                                            IntranetManager.layoutZone2.reset();


                                        } else {



                                            IntranetManager.layoutZone1.show(that.getBlankHelpView());
                                            IntranetManager.layoutContent.show(that.getBlankView());
                                            IntranetManager.layoutSearch.reset();
                                            IntranetManager.layoutHeader.reset();
                                        }

                                    });


                                }
                            );
                        };

                        IntranetManager.trigger("appmanager:init", cb);


                    }
                }

            });

        return IntranetManager.TaxonomyManager.List.Controller;
    });

