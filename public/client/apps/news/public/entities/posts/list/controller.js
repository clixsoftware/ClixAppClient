console.log('in newsmanager.posts.list.controller');
/*
 * Application: News Manager
  * Module: News Manager.Sites.List.Controller
 * */


define([
    "app",
    "apps/news/public/entities/posts/list/views",
    "apps/news/public/common/views",
    "common/views",
    "backbone.virtual-collection",
    "backbone.grouped-collection",
    "moment"

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

                            require(['entities/applications', 'entities/news'], function(){

                               var fetchingApp = IntranetManager.request('applications:entity', appId);

                                fetchingApp.then(function(app){

                                    var fetchingNews = IntranetManager.request('news:app:posts', appId);

                                    return ([app, fetchingNews]);

                                })
                                    .spread(function(app, fetchedNews){
                                        var listView = List.Controller.getListView(fetchedNews);
                                        IntranetManager.layoutHeader.show(List.Controller.getHeaderView(app));

                                        IntranetManager.layoutContent.show(listView);

                                        IntranetManager.layoutSearch.show(List.Controller.getListSearchView());

                                       // IntranetManager.trigger('newsmanager:app:categories', appId);

                                       // IntranetManager.layoutZone2.reset();
                                        console.log('fetched app and news')
                                    });

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

                            var fetchingPosts = IntranetManager.request('news:app:posts', app.get('id'));

                            var posts = fetchingPosts.then(function(posts){
                                return posts;
                            });

                            var fetchParentApp = IntranetManager.request('applications:entity', app.get('parent_application'));

                            return [app, posts, fetchParentApp]

                        })
                        .spread(function(app, posts, parentApp){

                                IntranetManager.layoutContent.reset();
                                IntranetManager.layoutContent.show(new that.getNewsHomeView(posts));

                                var taxoptions = {
                                    parentFeature: app.get('parent_application_feature'),
                                    appFeature: 'news',
                                    appAlias: app.get('parent_application_alias'),
                                    parentId: app.get('parent_application'),
                                    objectId: app.get('uuid'),
                                    categories: app.get('categories'),
                                    tags: app.get('tags'),
                                    url: app.get('path')
                                };

                                console.group("app");
                                console.log(app);
                                console.groupEnd();

                                console.group("taxoptions");
                                console.log(taxoptions);
                                console.groupEnd();
                               // IntranetManager.trigger('news:public:category:list', parentApp.get('uuid'));
                                IntranetManager.trigger('core:object:categories', taxoptions );

                        })
                            .fail(function(error){
                                console.log('Error ' + error);
                            });




                    });

                    }
                }

            });

        return IntranetManager.NewsManager.Posts.List.Controller;
    });

