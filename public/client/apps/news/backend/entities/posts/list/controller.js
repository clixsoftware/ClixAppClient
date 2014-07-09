console.log('in newsmanager.posts.list.controller');
/*
 * Application: News Manager
  * Module: News Manager.Sites.List.Controller
 * */


define([
    "app",
    "apps/news/entities/posts/list/views",
    "apps/news/common/views",
    "common/views",
    "backbone.virtual-collection",
    "backbone.grouped-collection"

],
    function ( IntranetManager, ListViews, CommonViews, GlobalViews ) {
        IntranetManager.module("NewsManager.Posts.List",
            function ( List, NewsManager, Backbone, Marionette, $, _ ) {
                List.Controller = {


                    getCategoriesView: function (collection, appId) {

                        var view = new ListViews.CategoriesView({
                            collection: collection
                        });

                        var options = {
                            trigger: 'newsmanager:app:categories',
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
                            IntranetManager.trigger('news:admin:post:new', app.get('id'));
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
                           IntranetManager.trigger('newsmanager:posts:new:form', appId);

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

                        require(['entities/taxonomy'], function(){

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
                        console.group('NewsManager: Posts: listRecords');

                        var that = this;

                        var cb = function () {

                            require(['entities/applications', 'entities/news_post'], function(){

                               var fetchingApp = IntranetManager.request('applications:entity', appId);

                                fetchingApp.then(function(app){

                                    var fetchingNews = IntranetManager.request('news:posts:search:app', appId);

                                    return ([app, fetchingNews]);

                                })
                                    .spread(function(app, fetchedNews){
                                        var listView = List.Controller.getListView(fetchedNews);
                                        IntranetManager.layoutHeader.show(List.Controller.getHeaderView(app));

                                        IntranetManager.layoutContent.show(listView);

                                        IntranetManager.layoutSearch.show(List.Controller.getListSearchView());

                                       // IntranetManager.trigger('newsmanager:app:categories', appId);

                                        IntranetManager.layoutZone2.reset();
                                        console.log('fetched app and news')
                                    })


                               /* $.when(fetchingApp).done(function(fetchedApp){

                                    if(fetchedApp){
                                        console.log('Application exist continue ');


                                        require(["entities/news_post"],
                                            function () {
                                                console.log('List news app post records');
                                                //fetch posts
                                                var fetchingRecords = IntranetManager.request('news:posts:search', 'parent_app=' + appId);

                                                $.when(fetchingRecords).done(function ( fetchedRecords ) {

                                                    // alert(fetchedRecords);

                                                    var listView = List.Controller.getListView(fetchedRecords);
                                                    //console.log(JSON.stringify(fetchedRecords));

                                                    if (fetchedRecords != undefined) {

                                                        IntranetManager.layoutHeader.show(List.Controller.getHeaderView(fetchedApp));

                                                        IntranetManager.layoutContent.show(listView);

                                                        IntranetManager.layoutSearch.show(List.Controller.getListSearchView());

                                                        IntranetManager.trigger('newsmanager:app:categories', appId);

                                                        IntranetManager.layoutZone2.reset();


                                                    } else {
                                                        console.log('no records found');


                                                        IntranetManager.layoutZone1.show(that.getBlankHelpView());
                                                        IntranetManager.layoutContent.show(that.getBlankView(appId));
                                                        IntranetManager.layoutSearch.reset();
                                                        IntranetManager.layoutHeader.reset();
                                                    }

                                                });


                                            }
                                        );

                                    }else{
                                        console.log('application record found');
                                    }
                                });*/

                            });


                        };

                       IntranetManager.trigger("news:admin:init", cb);
                        console.groupEnd();

                    },


                    showPublicNewsHome: function (options) {

                        console.group('<< showPublicNewsHome : INIT >>');

                        var that = this;

                        require(['entities/applications', 'entities/news'], function () {

                            var settings = {
                            alias: options.alias,
                            parent_feature: NewsManager.feature.id
                        };


                        console.log('@@ Fetching Current Application using = ' + JSON.stringify(settings));

                        var fetchingApp = IntranetManager.request('applications:feature:alias', settings);

                        fetchingApp.then(function(app){
                          //  return app;

                            var fetchingPosts = IntranetManager.request('news:posts:search:app', app.get('id'));

                            var posts = fetchingPosts.then(function(posts){
                                return posts;
                            })

                            return [app, posts]
                        })
                        .spread(function(app, posts){
                                IntranetManager.layoutZone2.show(new that.getNewsHomeView(posts));
                                    //console.log('posts found');

                        })
                            .fail(function(error){
                                console.log('Error ' + error);
                            });




                    });

                        /*                        var cb = function () {

                                                    require(['entities/app'], function(){

                                                        var query = 'alias=' + alias + '&parent_feature=' + NewsManager.feature.id;

                                                        var fetchingApp = IntranetManager.request('appmodel:search', query);

                                                        $.when(fetchingApp).done(function(fetchedApp){

                                                            console.log('<< showPublicNewsHome: fetch app completed  >>');

                                                            if(fetchedApp){

                                                                console.log('<< showPublicNewsHome: fetch app success >>');

                                                                IntranetManager.trigger('news:public:app:channels:list', fetchedApp);

                                                               // IntranetManager.trigger('newsmanager:public:popular:posts:global');

                                                                //get the parent application
                                                                var query2 = fetchedApp.at(0).get('parent_app');

                                                                var fetchingParentApp = IntranetManager.request('appmodel:entity',  query2);

                                                                console.log('@@ Fetching Application App using = ' + query2);

                                                                $.when(fetchingParentApp).done(function(fetchedParentApp){

                                                                    console.log('++ Fetching App Completed');

                                                                    if(fetchedParentApp){

                                                                        console.log('++ Fetching App Success');

                                                                        console.log('*** Parent App Name ' + fetchedParentApp.get('title'));

                                                                        IntranetManager.trigger('app:show:navigation', fetchedParentApp);

                                                                    }

                                                                });

                                                                require(["entities/news_post"],
                                                                    function () {

                                                                        var appId = fetchedApp.at(0).get('id');

                                                                        console.log('Get News Postings for News App ID = ' + appId  );

                                                                        //fetch posts
                                                                        var fetchingRecords = IntranetManager.request('news:posts:search:app', appId);

                                                                        $.when(fetchingRecords).done(function ( fetchedRecords ) {


                                                                            if (fetchedRecords != undefined) {

                                                                                console.log(fetchedRecords.at(1).get('title'));
                                                                                var grouped = new Backbone.buildGroupedCollection({
                                                                                    collection: fetchedRecords,
                                                                                     groupBy: function (post) {
                                                                                    return post.get('category');
                                                                                }
                                                                                });
                                                                                //var listView = new Marionette.CollectionView();

                                                                               grouped.each(function(group, index, list){
                                                                                  console.log(group.id);
                                                                                   //listView.appendHtml(List.Controller.getPublicNewsHomeView(group.vc));
                                                                                   //IntranetManager.layoutContent.show(listView);
                                                                               });

                                                                                console.log(grouped.at(1).get('id'));

                                                                                var listView = List.Controller.getPublicNewsHomeView(grouped);
                                                                                IntranetManager.layoutContent.show(listView);



                                                                            } else {

                                                                                console.log('XXX No News Post Found , rendering Blank,');
                                                                                console.log('TODO: change public blank view,');
                                                                                //TODO: change public blank view

                                                                                IntranetManager.layoutZone1.show(that.getBlankHelpView());
                                                                                IntranetManager.layoutContent.show(that.getBlankView(appId));
                                                                                IntranetManager.layoutSearch.reset();
                                                                                IntranetManager.layoutHeader.reset();
                                                                            }

                                                                        });


                                                                    }
                                                                );

                                                            }else{
                                                                console.log('application record found');
                                                            }
                                                        });

                                                    });


                                                };

                                                IntranetManager.trigger("news:public:init", cb);
                                                console.groupEnd();*/

                    }
                }

            });

        return IntranetManager.NewsManager.Posts.List.Controller;
    });

