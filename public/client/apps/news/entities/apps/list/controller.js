/*
 * Application: Site Manager
  * Module: SiteManager.Sites.List.Controller
 * */


define([
    "app",
    "apps/news/entities/apps/list/views",
    "apps/news/common/views",
    "common/views"
],
    function ( IntranetManager, ListViews, CommonViews, GlobalViews ) {
        IntranetManager.module("NewsManager.Apps.List",
            function ( List, NewsManager, Backbone, Marionette, $, _ ) {
                List.Controller = {

                    getHeaderView: function () {
                        var that = this;
                        var view = new ListViews.ListHeaderView();

                        view.on('button:command:new', function () {
                            that.createNewSite();
                            //IntranetManager.trigger('appManager:app:new:form');
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

                    createNewSite: function(){
                        require(['entities/app'],
                            function(){

                                var appModel = IntranetManager.request('appmodel:entity:new');
                                appModel.set('title', 'New Site Application');
                                appModel.set('description', 'Description of the new site application');
                                appModel.set('edit_url', '/appmanager/');
                                appModel.set('admin_url', '/sitemanager/apps/');
                                appModel.set('url', '/sites/alias');
                                appModel.set('path', '/sites/alias/');
                                appModel.set('ownedby_user_id', IntranetManager.Auth.userId);
                                appModel.set('createdby_user_id', IntranetManager.Auth.userId);
                                appModel.set('updatedby_user_id', IntranetManager.Auth.userId);
                                appModel.set('parent_feature', IntranetManager.feature.id);




                                // alert(appModel.get('title'));
                                IntranetManager.trigger('appmanager:app:new:form', appModel);

                            });


                    },


                    getBlankView: function () {

                        var view = new ListViews.BlankView();

                        view.on('command:form:new', function () {
                           // alert('create new site');
                            require(['entities/app'],
                            function(){

                                var appModel = IntranetManager.request('appmodel:entity:new');
                                appModel.set('title', 'New Site Application');
                                appModel.set('description', 'Description of the new site application');
                                appModel.set('edit_url', '/appmanager/');
                                appModel.set('admin_url', '/sitemanager/apps/');
                                appModel.set('url', '/sites/alias');
                                appModel.set('path', '/sites/alias/');
                                appModel.set('ownedby_user_id', IntranetManager.Auth.userId);
                                appModel.set('createdby_user_id', IntranetManager.Auth.userId);
                                appModel.set('updatedby_user_id', IntranetManager.Auth.userId);
                                appModel.set('parent_feature', IntranetManager.feature.id);




                               // alert(appModel.get('title'));
                                IntranetManager.trigger('appmanager:app:new:form', appModel);

                            });

                        });

                        return view;
                    },

                    getBlankHelpView: function () {
                        return new ListViews.BlankHelpView();
                    },


                    getNoRecordsView: function(){

                        var view  = new GlobalViews.ListNoRecordsView() ;

                        view.on('list:command:all', function(){
                            IntranetManager.trigger('sitemanager:home:show');
                        });

                        return view;
                    },

                    listSearch: function(criterion){

                        var that = this;
                        var fetchingRecords = IntranetManager.request('site:search', 'title=' + criterion);

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

                    listRecords: function (appId) {

                        console.group('NewsManager: Apps: listRecords');

                        var that = this;

                        var cb = function () {

                            require(["entities/applications"],
                                function () {

                                    var fetchingRecords = IntranetManager.request('applications:search:feature', 'news');

                                    fetchingRecords.then(function(apps){

                                        if(apps){
                                        var listView = List.Controller.getListView(apps);



                                        IntranetManager.layoutHeader.show(List.Controller.getHeaderView());

                                        IntranetManager.layoutContent.show(listView);

                                        IntranetManager.layoutSearch.show(List.Controller.getListSearchView());

                                        IntranetManager.layoutZone1.reset();

                                        IntranetManager.layoutZone2.reset();
                                        }else{
                                            IntranetManager.layoutZone1.show(that.getBlankHelpView());
                                            IntranetManager.layoutContent.show(that.getBlankView());
                                            IntranetManager.layoutSearch.reset();
                                            IntranetManager.layoutHeader.reset();
                                        }
                                    });

                                }
                            );
                        };


                        IntranetManager.trigger("news:admin:init", cb);
                        console.groupEnd();

                    }
                }

            });

        return IntranetManager.NewsManager.Apps.List.Controller;
    });

