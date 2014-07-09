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
/*                    "directorymanager": "loadOverview",
                    "directorymanager/applications/:appId": "loadAppEntries",
                    "directorymanager/applications/:id/posts/new": "loadPostNewForm",
                    "directorymanager/applications/:id/posts/:contact_id/edit": "loadPostEditForm",*/
                    "directory/:alias/index.html": 'loadPublicDirectoryHome',
                    "directory/:alias": 'loadPublicDirectoryHome',
                    "directory/:alias/:user_alias/index.html": 'loadPublicProfile',
                    "directory/:alias/q/:query": 'loadDirectoryEntrySearch'
                }

            });

            var executeAction = function ( action, arg ) {
                IntranetManager.startSubApp("DirectoryManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                init: function ( cb ) {

                    require([
                        "apps/directory/common/controller"
                    ], function ( CommonController ) {
                        //alert('init layout');
                        executeAction(CommonController.setupAppLayout, cb);
                    });

                },

                initPublic: function ( cb ) {

                    require([
                        "apps/directory/common/controller"
                    ], function ( CommonController ) {
                        //alert('init layout');
                        executeAction(CommonController.setupContentLayout, cb);
                    });

                },

                loadPublicDirectoryHome: function ( alias ) {

                    //  alert('public directory ' + alias);
                    var cb = function () {
                        require([
                            "apps/directory/entities/entries/list/controller"
                        ], function ( ListController ) {
                            ListController.showPublicDirectoryHome(alias);

                        });
                    };

                    IntranetManager.trigger("directory:public:init", cb);
                },

                loadDirectoryEntrySearch: function () {

                },

                loadDirectoryEntrySearch: function ( criterion ) {
                    alert('searchh for ' + criterion);
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

                loadAppCategories: function ( appId ) {
                    require([
                        "apps/news/entities/posts/list/controller"
                    ], function ( ListController ) {
                        ListController.loadCategories(appId);
                    });

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
                            "apps/directory/entities/entries/show/controller"
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

