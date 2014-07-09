/*
 * Application: News Manager
 * */

define(
    [
        "app"
    ],
    function ( IntranetManager ) {
        IntranetManager.module("HowDoIManager", function ( HowDoIManager, IntranetManager, Backbone, Marionette, $, _ ) {

            HowDoIManager.title = "HowDoI Manager";


            HowDoIManager.code = "how-do-i";

            HowDoIManager.startWithParent = false;

            HowDoIManager.on('start', function () {
                console.log('<<< Started HowDoIManager Application >>>');
               // API.init();
            });

            HowDoIManager.onStop = function () {
                console.log('<<< Stopped HowDoIManager Application >>>');
            };

 /*           var API = {

                init: function () {
                    require([
                        "apps/yp/common/controller"
                    ], function ( CommonController ) {
                        CommonController.setupAppLayout();
                    });

                }
            };
*/

        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.HowDoIManager", function ( HowDoIManagerRouter, IntranetManager, Backbone, Marionette, $, _ ) {

            HowDoIManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {
                    "how-do-i/:alias": 'loadHomePage',
                    "how-do-i/:alias(/filter/criterion::criterion)": "loadSearchResultsPage",
                    "how-do-i/:alias/categories/:code/*slug": 'loadPostsByCategory',
                    "how-do-i/:alias/:postId/*slug": 'loadPostDetails'

                }

            });

            var executeAction = function ( action, arg ) {
                IntranetManager.startSubApp("HowDoIManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {
                init: function ( cb ) {

                    require([
                        "apps/yp/common/controller"
                    ], function ( CommonController ) {
                        //alert('init layout');
                        executeAction(CommonController.setupAppLayout, cb);
                    });

                },



                loadOverview: function () {

                    this.loadAppsList();

                },

                loadAppsList: function () {

                    var cb = function () {
                        require([
                            "apps/yp/entities/apps/list/controller"
                        ], function ( ListController ) {
                            ListController.listRecords();
                        });
                    };

                    IntranetManager.trigger("yp:admin:init", cb);

                },

                loadPostDisplayPage: function ( appId, postId ) {
                    var opts = {
                        appId: appId,
                        postId: postId
                    };

                    var cb = function () {
                        require([
                            "apps/yp/public/entities/posts/show/controller"
                        ], function ( ShowController ) {
                            ShowController.loadDisplayPage(opts);
                        });
                    };

                    IntranetManager.trigger("yp:admin:init", cb);

                },

                loadPostEditForm: function ( appId, postId ) {
                    require([
                        "apps/yp/entities/posts/edit/controller"
                    ], function ( EditController ) {
                        EditController.loadForm(postId);
                    });

                },


                loadAppPostings: function ( appId ) {

                    var cb = function () {
                        require([
                            "apps/yp/entities/posts/list/controller"
                        ], function ( ListController ) {
                            ListController.listRecords(appId);
                        });
                    };

                    IntranetManager.trigger("yp:admin:init", cb);

                },


                loadPostNewForm: function ( id ) {
                    require([
                        "apps/yp/entities/posts/new/controller"
                    ], function ( PostsNewController ) {
                        PostsNewController.loadForm(id);
                    });

                },


                loadEditForm: function ( id ) {
                    require([
                        "apps/yp/entities/posts/edit/controller"
                    ], function ( EditController ) {
                        EditController.loadForm(id);
                    });

                },

                loadAppCategories: function(appId){
                    require([
                        "apps/yp/entities/posts/list/controller"
                    ], function ( ListController ) {
                        ListController.loadCategories(appId);
                    });

                },



                initPublic: function ( cb ) {

                    require([
                        "apps/howdoi/public/common/controller"
                    ], function ( CommonController ) {
                        //alert('init layout');
                        executeAction(CommonController.setupContentLayout, cb);
                    });

                },

                //load the details page of the posting
                loadPostDetails: function (alias, postId, slug ) {
                    var opts = {
                        post_id: postId,
                        alias: alias,
                        slug: slug.replace('/index.html', '')
                    };

                    //console.log(opts.slug);

                    var cb = function () {
                        require([
                            "apps/howdoi/public/entities/posts/show/controller"
                        ], function ( ShowController ) {
                            ShowController.showPostDetailsPage(opts);
                        });
                    };

                    IntranetManager.trigger("howdoi:public:init", cb);
                },

                loadHomePage: function (alias ) {

                    console.log('Showing the How DO I home alias ' +  alias);

                    var cb = function () {
                        require([
                            "apps/howdoi/public/entities/home/show/controller"
                        ], function ( ShowController ) {
                            ShowController.showHomePage(alias);

                        });
                    };

                    IntranetManager.trigger("howdoi:public:init", cb);

                },

                loadSearchResultsPage:function(alias, criterion){

                    //alert(criterion);
                    var options = {
                        alias: alias,
                        criterion: criterion
                     };

                    var cb = function () {
                        require([
                            "apps/howdoi/public/entities/home/show/controller"
                        ], function ( ShowController ) {
                            ShowController.showSearchResultsPage(options);

                        });
                    };

                    IntranetManager.trigger("howdoi:public:init", cb);

                },

                loadPostRelatedCategories: function (objectId) {
                    require([
                        "apps/howdoi/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showPostRelatedCategoriesWidget(objectId);
                    });

                },

                loadAppRelatedCategories: function (objectId) {
                    require([
                        "apps/howdoi/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showAppRelatedCategoriesWidget(objectId);
                    });

                },



                loadPostRelatedTags: function (objectId) {
                    require([
                        "apps/howdoi/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showPostRelatedTagsWidget(objectId);
                    });

                },


                loadPostsByCategory: function(alias, category, slug){
                    var options = {
                        alias: alias,
                        category: category
                    };


                    var cb = function () {
                        require([
                            "apps/howdoi/public/entities/categories/show/controller"
                        ], function (ShowController) {
                            ShowController.showCategoryPostsPage(options);
                        });
                    };

                    IntranetManager.trigger("howdoi:public:init", cb);
                },

                loadTrendingPosts: function (options) {
                    require([
                        "apps/yp/public/widgets/controller"
                    ], function ( WidgetsController ) {
                        WidgetsController.showTrendingPosts(options);
                    });
                },

                loadRecommendedPosts: function (options) {
                    require([
                        "apps/yp/public/widgets/controller"
                    ], function ( WidgetsController ) {
                        WidgetsController.showRecommendedPosts(options);
                    });
                },

                loadRelatedPosts: function (applicationId) {
                    require([
                        "apps/yp/public/widgets/controller"
                    ], function ( WidgetsController ) {
                        WidgetsController.showRelatedPosts(applicationId);
                    });
                },

                loadPublicAppCategories: function (app) {


                    require([
                        "apps/yp/public/widgets/controller"
                    ], function ( WidgetsController ) {
                        WidgetsController.showPublicAppCategories(app);
                    });

                },

                loadRecentPosts: function (options) {


                    require([
                        "apps/yp/public/widgets/controller"
                    ], function ( WidgetsController ) {
                        WidgetsController.showRecentPosts(options);
                    });

                },

                loadMostActivePosts: function (options) {

                    require([
                        "apps/yp/public/widgets/controller"
                    ], function ( WidgetsController ) {
                        WidgetsController.showMostActivePosts(options);
                    });

                },

                loadAppCategoryList: function(objectId){
                    require([
                        "apps/howdoi/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showAppCategoryListWidget(objectId);
                    });

                },

                loadAppTagsList: function(objectId){
                    require([
                        "apps/howdoi/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showAppTagsListWidget(objectId);
                    });

                }


            };

            IntranetManager.on('yp:admin:init', function ( cb ) {
                console.log('|| Trigger: yp:admin:init ||');
                API.init(cb);
            });

            IntranetManager.on('yp:admin:home', function () {
                IntranetManager.navigate("ypmanager", true);
                API.loadOverview();
            });

            IntranetManager.on('yp:admin:apps:list', function () {
                IntranetManager.navigate("ypmanager", true);
                API.loadOverview();
            });

            IntranetManager.on('yp:admin:app:overview', function () {
                IntranetManager.navigate("ypmanager", true);
                API.loadOverview();
            });

            IntranetManager.on('yp:admin:app:categories:list', function (appId) {
                API.loadAppCategories(appId);
            });

            IntranetManager.on('yp:admin:post:new', function ( id ) {
                IntranetManager.navigate("ypmanager/applications/" + id + "/posts/new", true);
                API.loadPostNewForm(id);
            });

            IntranetManager.on('yp:admin:post:edit', function ( id ) {
                IntranetManager.navigate("ypmanager/" + id + "/edit", true);
            });

            IntranetManager.on('yp:admin:app:posts', function ( appId ) {
                IntranetManager.navigate("ypmanager/applications/" + appId + '/posts');
                API.loadAppPostings(appId);

            });

            IntranetManager.on('howdoi:public:init', function ( cb ) {
                //IntranetManager.navigate("workspace");
                API.initPublic(cb);
            });

            IntranetManager.on('howdoi:post:related:categories', function (objectId) {
                API.loadPostRelatedCategories(objectId);
            });

            IntranetManager.on('howdoi:post:related:tags', function (objectId) {
                API.loadPostRelatedTags(objectId);
            });

            IntranetManager.on('howdoi:app:category:list', function (objectId) {
                API.loadAppCategoryList(objectId);
            });

            IntranetManager.on('howdoi:app:related:categories', function (objectId) {
                API.loadAppRelatedCategories(objectId);
            });


            IntranetManager.on('howdoi:search', function (criterion) {
                 IntranetManager.navigate("how-do-i/default/filter/criterion:" + criterion);
                API.loadSearchResultsPage('default', criterion);
            });

            IntranetManager.on('howdoi:app:tags:list', function (objectId) {
                API.loadAppTagsList(objectId);
            });

            IntranetManager.on('yp:public:posts:trending', function (options) {
                console.log('|| Trigger: yp:show:public:posts:trending ||');
                API.loadTrendingPosts(options);
            });

            IntranetManager.on('yp:public:posts:recommended', function (options) {
                console.log('|| Trigger: yp:show:public:posts:recommended ||');
                API.loadRecommendedPosts(options);
            });

            IntranetManager.on('yp:public:posts:related', function (options) {
                console.log('|| Trigger: yp:show:public:posts:related ||');
                API.loadRelatedPosts(options);
            });

            IntranetManager.on('yp:public:posts:recent', function (options) {
                console.log('|| Trigger: yp:public:posts:recent ||');
                API.loadRecentPosts(options);
            });

            IntranetManager.on('yp:public:posts:mostactive', function (options) {
                console.log('|| Trigger: yp:public:posts:mostactive ||');
                API.loadMostActivePosts(options);
            });

            IntranetManager.on('yp:public:app:channels:list', function (app) {
                console.log('<< Trigger: yp:public:app:channels:list>>');
                API.loadPublicAppCategories(app);
            });



            IntranetManager.addInitializer(function () {
                new HowDoIManagerRouter.Router({
                    controller: API
                });
            });


        });

        return IntranetManager.HowDoIManagerRouter;
    });

