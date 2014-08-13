define(
    [
        "app"
    ],
    function (IntranetManager) {
        IntranetManager.module("CalendarManager", function (CalendarManager, IntranetManager, Backbone, Marionette, $, _) {

            CalendarManager.title = "CalendarManager Manager";


            CalendarManager.code = "calendar";

            CalendarManager.startWithParent = false;

            CalendarManager.on('start', function () {
                console.log('<<< Started CalendarManager Application >>>');
                // API.init();
            });

            CalendarManager.onStop = function () {
                console.log('<<< Stopped CalendarManager Application >>>');
            };

        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.CalendarManager", function (CalendarManagerRouter, IntranetManager,
                                                                    Backbone, Marionette, $, _) {

            CalendarManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {
                    ":feature/:alias/calendar": 'loadPostList',
                    ":feature/:alias/calendar/index.html": 'loadPostList',
                    //":feature/:alias/calendar/:id/*slug": 'loadPostDetails',
                    ":feature/:alias/calendar/*info": 'loadPostDetails'
                }

            });

            var executeAction = function (action, arg) {
                IntranetManager.startSubApp("CalendarManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                //PUBLIC FUNCTIONS

                //initialize public interface and load the layout
                initPublic: function (cb) {

                    require([
                        "apps/calendar/public/common/controller"
                    ], function (CommonController) {
                        //alert('init layout');
                        executeAction(CommonController.initAppEngine, cb);
                    });

                },

                loadPostDetails: function (feature, alias, info) {

                    var itemInfo = info.split('-');

                    var postId = itemInfo[0];
                    var slug = itemInfo[1];

                    var opts = {
                        post_id: postId,
                        feature: feature,
                        alias: alias,
                        slug: slug
                    };

                    var cb = function () {
                        require([
                            "apps/calendar/public/entities/posts/show/controller"
                        ], function (ShowController) {
                            ShowController.showPostDetailsPage(opts);
                        });
                    };

                    IntranetManager.trigger("calendar:public:init", cb);

                },


                loadPostList:function (feature, alias) {

                    var options = {
                        feature: feature,
                        alias: alias
                    };
                    var cb = function () {
                        require([
                            "apps/calendar/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostListPage(options);

                        });
                    };
                    IntranetManager.trigger("calendar:public:init", cb);
                }

            };

           //PUBLIC TRIGGERS

            IntranetManager.on('calendar:public:init', function (cb) {
                API.initPublic(cb);
            });

            IntranetManager.addInitializer(function () {
                new CalendarManagerRouter.Router({
                    controller: API
                });
            });


        });
        console.info('--- Calendar App loaded ---');
        return IntranetManager.CalendarManagerRouter;
    });

