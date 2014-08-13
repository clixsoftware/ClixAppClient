/*
 * Application: News Manager
 * */

define(
    [
        "app",
        "S"
    ],
    function ( IntranetManager, S) {
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
        IntranetManager.module("Routers.HowDoIManager", function ( HowDoIManagerRouter, IntranetManager, Backbone, Marionette, $, _) {

            HowDoIManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {
                    "howdois/:alias": 'loadHomePage',
                    "howdois/:alias(/filter/criterion::criterion)": "loadSearchResultsPage",
                    "howdois/:alias/posts-by-category/*slug?*args" : 'loadPostsByCategory',
                    "howdois/:alias/posts-by-tag/*tag(?*args)" : 'loadPostByTag',
                    "howdois/:alias/*slug": 'loadPostDetails'

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
                loadPostDetails: function (alias,  options ) {

                    var info = options.split('-');

                    var opts = {
                        postId: info[0],
                        feature: 'how-do-i',
                        alias: alias,
                        slug: info[1]
                    };

                    console.log(info);

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

                loadPostByTag: function (alias, tag, args) {

                    console.group('How Do I: App: loadPostByTag');

                    var options = {
                        feature: "howdois",
                        alias: alias,
                        path: Backbone.history.location.pathname,
                        tag: tag
                    };

                    if(args){

                        if(S(args).contains('page=')){
                            var q = args.split('&');
                            options.page = q[0].split('=')[1];
                        }

                        options.path = Backbone.history.location.pathname;
                    }
                    console.info(options);
                    console.groupEnd();

                    var cb = function () {
                        require([
                            "apps/howdoi/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostsList(options);

                        });
                    };

                    IntranetManager.trigger("howdoi:public:init", cb);

                },

                loadPostsByCategory: function(alias, slug, args){
                    //alert('loading the posts by category function');

                    console.group('How Do I: App: loadPostsByCategory');

                  var options = {
                      alias: alias,
                      category: slug
                  }

                  if(S(args).contains('page=')){
                    var q = args.split('&');
                     options.page = q[1].split('=')[1];
                      options.uuid = q[0].split('=')[1];
                  }else{
                      options.uuid=  args.split('=')[1]
                  }

                    options.path = Backbone.history.location.pathname + '?uuid=' + options.uuid;

                    console.info(options);
                    console.groupEnd();

                    var cb = function () {
                        require([
                            "apps/howdoi/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostsList(options);
                        });
                    };

                    IntranetManager.trigger("howdoi:public:init", cb);
                },

                loadPopularPostsWidget: function(options){
                    require([
                        "apps/howdoi/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showPopularPosts(options);
                    });
                }


            };

            IntranetManager.on('howdoi:admin:init', function ( cb ) {
                console.log('|| Trigger: yp:admin:init ||');
                API.init(cb);
            });

            IntranetManager.on('howdoi:public:init', function ( cb ) {
                //IntranetManager.navigate("workspace");
                API.initPublic(cb);
            });

            IntranetManager.on('howdoi:search', function (criterion) {
                 IntranetManager.navigate("how-do-i/default/filter/criterion:" + criterion);
                API.loadSearchResultsPage('default', criterion);
            });

            IntranetManager.on('howdoi:category:posts', function (options) {
                IntranetManager.navigate(options.url, true);
                //API.loadSearchResultsPage('default', criterion);
            });

            IntranetManager.on('howdoi:popular:posts', function (options) {
                API.loadPopularPostsWidget(options);
            });


            IntranetManager.addInitializer(function () {
                new HowDoIManagerRouter.Router({
                    controller: API
                });
            });


        } );
        console.info('--- How Do I App loaded ---');
        return IntranetManager.HowDoIManagerRouter;
    });

