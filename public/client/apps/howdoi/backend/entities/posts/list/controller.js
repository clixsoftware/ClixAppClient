console.log('in ypmanager.posts.list.controller');
/*
 * Application: News Manager
  * Module: News Manager.Sites.List.Controller
 * */


define([
    "../../../../../../app",
    "apps/yp/entities/posts/list/views",
    "apps/yp/common/views",
    "common/views",
    "backbone.virtual-collection",
    "backbone.grouped-collection"

],
    function ( IntranetManager, ListViews, CommonViews, GlobalViews ) {
        IntranetManager.module("YPManager.Posts.List",
            function ( List, YPManager, Backbone, Marionette, $, _ ) {
                List.Controller = {

                    getPublicLayoutView: function () {

                        console.log('<< getAppLayoutView: Return Layout >>');

                        return new ListViews.PublicLayoutView();

                    },

                    getPublicListView: function(collection){

                        return new ListViews.PublicListView({
                            collection: collection
                        });
                    },

                    getCategoriesView: function (collection, appId) {

                        var view = new ListViews.CategoriesView({
                            collection: collection
                        });

                        var options = {
                            trigger: 'ypmanager:app:categories',
                            appId: appId
                        };

                        view.on('command:new:category', function () {
                           IntranetManager.trigger('taxonomy:new:form', options);
                        });

                        return view;
                    },

                    getPublicNewsHomeView: function (collection) {

                        return  new ListViews.PublicNewsHomeView({
                            collection: collection
                        });


                    },

                    getNewsHomeView: function(collection){

                      return new ListViews.NewsHomeView({
                            collection: collection
                      })

                    },

                    getHeaderView: function (app) {
                        var that = this;

                        app.set('_page_header_', 'News Application : ' + app.get('alias'));
                        app.set('_page_description_', 'News Postings for the application');
                        app.set('_page_command_button_', 'Add Posting');
                        app.set('_page_command_button_show', true);

                        var view = new CommonViews.ListHeaderView({
                            model: app
                        });

                        view.on('button:command:new', function () {
                            IntranetManager.trigger('yp:admin:post:new', app.get('id'));
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

                    getBlankView: function (appId) {

                        var view = new ListViews.BlankView();

                        view.on('command:form:new', function () {
                           IntranetManager.trigger('ypmanager:posts:new:form', appId);

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

                    loadCategories: function(appId){

                        require(['../../../../../../entities/taxonomy'], function(){

                            var fetchingCatgories = IntranetManager.request('taxonomy:entities:search', 'parent_app=' + appId);

                            $.when(fetchingCatgories).done(function(fetchedCategories){

                                if(fetchedCategories){

                                    IntranetManager.layoutZone1.show(List.Controller.getCategoriesView(fetchedCategories, appId));

                                }else{

                                    console.log('no categoires found');
                                }
                            });

                        });

                    },

                    listRecords: function (appId) {
                        console.group('YPManager: Posts: listRecords');

                        var that = this;

                        var cb = function () {

                            require(['../../../../../../entities/applications', 'entities/yp_post'], function(){

                               var fetchingApp = IntranetManager.request('applications:entity', appId);

                                fetchingApp.then(function(app){

                                    var fetchingNews = IntranetManager.request('yp:posts:search:app', appId);
//                                    var news = fetchingNews.then(function(success){
//                                        return success;
//                                    });
//
//                                    alert(news);

                                   return [app, fetchingNews];

                                })
                                    .spread(function(app, fetchedNews){

                                        console.log(app);

                                        if(fetchedNews){
                                            var listView = List.Controller.getListView(fetchedNews);
                                            IntranetManager.layoutContent.show(listView);

                                        }

                                        IntranetManager.layoutHeader.show(List.Controller.getHeaderView(app));

                                        IntranetManager.layoutSearch.show(List.Controller.getListSearchView());

                                       // IntranetManager.trigger('ypmanager:app:categories', appId);

                                        IntranetManager.layoutZone2.reset();
                                        console.log('fetched app and yp')
                                    })
                                    .fail(function(error){

                                        console.log(error);
                                    });



                            });


                        };

                       IntranetManager.trigger("yp:admin:init", cb);
                        console.groupEnd();

                    },

                    showPublicPostsHome: function (options) {

                        console.group('<< showPublicPostsHome : INIT >>');

                        var that = this;

                        var layout = this.getPublicLayoutView();


                        require(['../../../../../../entities/applications', 'entities/yp_post'], function () {

                            var settings = {
                            alias: options.alias,
                            parent_feature: YPManager.feature.id
                        };


                        console.log('@@ Fetching Current Application using = ' + JSON.stringify(settings));

                        var fetchingApp = IntranetManager.request('applications:feature:alias', settings);

                        fetchingApp.then(function(app){
                          //  return app;

                            var fetchingPosts = IntranetManager.request('yp:posts:search:app', app.get('id'));

                            var posts = fetchingPosts.then(function(posts){
                                return posts;
                            })

                            return [app, posts]
                        })
                        .spread(function(app, posts){

                                layout.on('show', function(){

                                    layout.contentRegion.show(that.getPublicListView(posts));
                                    //getPublicListView
                                });

                                IntranetManager.appLayout = layout;
                                IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                                //IntranetManager.layoutZone2.show(new that.getNewsHomeView(posts));
                                    //console.log('posts found');

                        })
                            .fail(function(error){
                                console.log('Error ' + error);
                            });




                    });


                    }
                }

            });

        return IntranetManager.YPManager.Posts.List.Controller;
    });

