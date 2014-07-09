define(
    [
        "app"
    ],
    function ( IntranetManager ) {
        IntranetManager.module("DirectoryManager", function ( DirectoryManager, IntranetManager, Backbone, Marionette, $, _ ) {

            DirectoryManager.title = "Directory Manager";

            DirectoryManager.code = "directorymanager";

            DirectoryManager.startWithParent = false;

            DirectoryManager.on('start', function () {
                console.log('Starting DirectoryManager Application - on start');
                // API.init();
            });

            DirectoryManager.onStop = function () {
            };

            var API = {

                init: function () {
                    require([
                        "apps/directory/common/controller"
                    ], function ( CommonController ) {
                        CommonController.setupAppLayout();
                    });

                }
            };


        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.DirectoryManager", function ( DirectoryManagerRouter, IntranetManager, Backbone, Marionette, $, _ ) {

            DirectoryManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {
                    "directory": 'loadAppsPage',
                    "directory/:alias/index.html": 'loadHomePage',
                    "directory/:alias": 'loadHomePage',
                    "directory/:alias/:user_alias/index.html": 'loadPublicProfile',
                    "directory/:alias/page/:page": 'loadListPaging'/*,                    /*,
                    "directory/:alias/q/:query": 'loadDirectoryEntrySearch'*/
                }

            });

            var executeAction = function ( action, arg ) {
                IntranetManager.startSubApp("DirectoryManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                //BACKEND API FUNCTIONS
                init: function ( cb ) {

                    require([
                        "apps/directory/common/controller"
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
                            "apps/directory/entities/apps/list/controller"
                        ], function ( ListController ) {
                            ListController.listRecords();
                        });
                    };

                    IntranetManager.trigger("directory:admin:init", cb);

                },

                loadPostDisplayPage: function ( appId, postId ) {
                    var opts = {
                        appId: appId,
                        postId: postId
                    };

                    var cb = function () {
                        require([
                            "apps/news/entities/posts/show/controller"
                        ], function ( ShowController ) {
                            ShowController.loadDisplayPage(opts);
                        });
                    };

                    IntranetManager.trigger("news:admin:init", cb);

                },

                loadPostEditForm: function ( appId, postId ) {
                    require([
                        "apps/directory/entities/entries/edit/controller"
                    ], function ( EditController ) {
                        EditController.loadForm(postId);
                    });

                },


                loadAppEntries: function ( appId ) {

                    var cb = function () {
                        require([
                            "apps/directory/entities/entries/list/controller"
                        ], function ( ListController ) {
                            ListController.listRecords(appId);
                        });
                    };

                    IntranetManager.trigger("directory:admin:init", cb);
                },

                loadPostNewForm: function ( id ) {
                    require([
                        "apps/directory/entities/entries/new/controller"
                    ], function ( PostsNewController ) {
                        PostsNewController.loadForm(id);
                    });

                },

                loadEditForm: function ( id ) {
                    require([
                        "apps/site/entities/sites/edit/controller"
                    ], function ( EditController ) {
                        EditController.loadForm(id);
                    });

                },

                //PUBLIC API FUNCTIONS

                initPublic: function ( cb ) {

                    require([
                        "apps/directory/public/common/controller"
                    ], function ( CommonController ) {
                        //alert('init layout');
                        executeAction(CommonController.initAppEngine, cb);
                    });

                },

                loadAppsPage: function () {

                   var cb = function () {
                        require([
                            "apps/directory/public/entities/apps/list/controller"
                        ], function ( ListController ) {
                            ListController.loadAppsHome();
                        });
                    };

                    //alert('load apps');
                    IntranetManager.trigger("directory:public:init", cb);

                },
                loadHomePage: function ( alias ) {

                    //  alert('public directory ' + alias);
                    var options = {
                        alias: alias
                    };
                    var cb = function () {
                        require([
                            "apps/directory/public/entities/entries/list/controller"
                        ], function ( ListController ) {
                            ListController.showHomePage(options);

                        });
                    };

                    IntranetManager.trigger("directory:public:init", cb);
                },
                loadListPaging: function (alias, page ) {

                    //  alert('public directory ' + alias);
                    var options = {
                        alias: alias,
                        page: page
                    };
                    var cb = function () {
                        require([
                            "apps/directory/public/entities/entries/list/controller"
                        ], function ( ListController ) {
                            ListController.showHomePage(options);

                        });
                    };

                    IntranetManager.trigger("directory:public:init", cb);
                },


                loadPublicProfile: function ( appAlias, user_alias ) {
                    var opts = {
                        user_alias: user_alias,
                        appAlias: appAlias
                    };

                    console.log(opts);

                    //  alert('loading public profile');

                    var cb = function () {
                        require([
                            "apps/directory/public/entities/entries/show/controller"
                        ], function ( ShowController ) {
                            ShowController.showPublicProfile(opts);
                        });
                    };

                    IntranetManager.trigger("directory:public:init", cb);
                }

             };

            IntranetManager.on('directory:public:init', function ( cb ) {
                API.initPublic(cb);
            });

            IntranetManager.on("directory:entries:search", function ( criterion ) {
                alert(criterion);
                if (criterion) {
                    IntranetManager.navigate("/directory/people/q/" + criterion);
                    API.loadDirectoryEntrySearch(criterion);
                }
                else {
                    IntranetManager.navigate("/directory/people");
                }
            });

            IntranetManager.on('directory:admin:init', function ( cb ) {
                console.log('|| Trigger: directory:admin:init ||');
                API.init(cb);
            });

            IntranetManager.on('directory:admin:contact:new', function ( id ) {
                IntranetManager.navigate("directorymanager/applications/" + id + "/posts/new", true);
                API.loadPostNewForm(id);
            });


            IntranetManager.on('directory:admin:application:contacts', function ( appId ) {
                IntranetManager.navigate("directorymanager/applications/" + appId);
                API.loadAppEntries(appId);

            });

            IntranetManager.addInitializer(function () {
                new DirectoryManagerRouter.Router({
                    controller: API
                });
            });


        });

        return IntranetManager.DirectoryManagerRouter;
    });

