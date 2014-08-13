/*
 * Application: Support Manager
 * */

define(
    [
        "app",
        "S"
    ],
    function (IntranetManager, S) {
        IntranetManager.module("SupportManager", function (SupportManager, IntranetManager, Backbone, Marionette, $, _) {

            SupportManager.title = "Support Manager";


            SupportManager.code = "SupportManager";

            SupportManager.startWithParent = false;

            SupportManager.on('start', function () {
                console.info('<<< Start SupportManager Application >>>');
                // API.init();
            });

            SupportManager.onStop = function () {
                console.warn('<<< Stop SupportManager Application >>>');
            };

            var API = {

                init: function () {
                    require([
                        "apps/supports/common/controller"
                    ], function (CommonController) {
                        CommonController.setupAppLayout();
                    });

                }
            };


        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.SupportManager", function (SupportManagerRouter, IntranetManager, Backbone, Marionette, $, _) {

            SupportManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {

                    "support/:alias": 'loadHomePage',
                    "support/:alias/posts-by-category/*slug?*args" : 'loadHomePage',
                    "support/:alias/posts-by-tag/*tag(?*args)" : 'loadPostByTag',
                    "support/:alias/*info/:action": 'loadServiceRequestForm',
                    "support/:alias/*info": 'loadPostDetailsPage'
                }

            });

            var executeAction = function (action, arg) {
                IntranetManager.startSubApp("SupportManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                //PUBLIC FUNCTIONS
                //initialize public interface and load the layout

                //initPublic, initiates the application, loads settings
                initPublic: function (cb) {

                    require([
                        "apps/support/public/common/controller"
                    ], function (CommonController) {
                        //alert('init layout');
                        executeAction(CommonController.setupContentLayout, cb);
                    });

                },

                loadServiceRequestForm: function ( alias, info, action) {

                    console.group("Supports : App :: loadServiceRequestForm");

                    var t = info.split('-');

                    var postId = t[0];
                    var slug = t[1];

                    var opts = {
                        post_id: postId,
                        feature: "supports",
                        alias: alias,
                        slug: slug
                    };

                    console.info(opts);
                    console.groupEnd();


                    var cb = function () {
                        require([
                            "apps/support/public/entities/services/posts/show/controller"
                        ], function (ShowController) {
                            ShowController.showServiceRequest(opts);
                        });
                    };

                    IntranetManager.trigger("support:public:init", cb);

                },

                /*
                 loadPostDetailsPage, loads details for the current post
                 e.g.     /supports/default/supports/9-sample-support/index.html
                 */
                loadPostDetailsPage: function ( alias, info) {

                    console.group("Supports : App :: loadPostDetailsPage");

                    var t = info.split('-');

                    var postId = t[0];
                    var slug = t[1];

                    var opts = {
                        post_id: postId,
                        feature: "supports",
                        alias: alias,
                        slug: slug
                    };

                    console.info(opts);
                    console.groupEnd();


                    var cb = function () {
                        require([
                            "apps/support/public/entities/services/posts/show/controller"
                        ], function (ShowController) {
                            ShowController.showPostDetails(opts);
                        });
                    };

                    IntranetManager.trigger("support:public:init", cb);

                },

                /*
                 loadPostByTag, loads posts matching the current tags
                 e.g.     /supports/default/posts-by-tag/travel
                 */
                loadPostByTag: function (alias, tag, args) {

                    console.group('Supports : App :: loadPostByTag');

                    var options = {
                        feature: "supports",
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
                            "apps/support/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostsList(options);

                        });
                    };

                    IntranetManager.trigger("supports:public:init", cb);

                },

                /*
                 loadHomePage, loads posts matching the current tags
                 e.g.     /supports/default
                 */
                loadHomePage: function ( alias, slug, args) {

                    console.group('Support : App:: loadHomePage');

                    var options = {
                        feature: 'support',
                        alias: alias,
                        path: Backbone.history.location.pathname
                    };

                    if(args){
                    if(S(args).contains('page=')){
                        var q = args.split('&');
                        options.page = q[1].split('=')[1];
                        options.uuid = q[0].split('=')[1];
                    }else{
                        options.uuid=  args.split('=')[1]
                    }

                    options.path = Backbone.history.location.pathname + '?uuid=' + options.uuid;
                    }
                    console.info(options);
                    console.groupEnd();

                    var cb = function () {
                        require([
                            "apps/support/public/entities/services/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostsList(options);

                        });
                    };

                    IntranetManager.trigger("support:public:init", cb);

                },

                /*
                 loadRecentPostsWidget, recent posts for this support
                 */
                loadRecentPostsWidget: function (options) {
                    require([
                        "apps/support/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showRecentPosts(options);
                    });
                },

                /*
                 loadPopularPostsWidget, most viewed posts for supports
                 */
                loadPopularPostsWidget: function(options){
                    require([
                        "apps/support/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showPopularPosts(options);
                    });
                },

                /* Loading  Service Forms */
                loadServiceForm: function (alias, slug) {

                    //alert(slug);

                    // var id = slug.indexOf('-');
                    var info = slug.split('-');

                    var id = info[0];

                    var opts = {
                        id: id,
                        feature: 'support',
                        alias: alias
                    };

                    var cb = function () {
                        require([
                            "apps/support/public/entities/services/posts/show/controller"
                        ], function (ShowController) {
                            ShowController.showServiceForm(opts);
                        });
                    };

                    IntranetManager.trigger("support:public:init", cb);

                },

                loadContactUpdateForm: function(service){
                    require([
                        "apps/support/public/entities/tickets/posts/new/controller"
                    ], function (NewController) {
                        NewController.showContactUpdateForm(service);
                    });

                },

                loadIncidentReportForm: function(service){
                    require([
                        "apps/support/public/entities/tickets/posts/new/incident_report_controller"
                    ], function (NewController) {
                        NewController.showServiceForm(service);
                    });
                },

                loadNewsItemForm: function(service){
                    require([
                        "apps/support/public/entities/tickets/posts/new/news_story_controller"
                    ], function (NewController) {
                        NewController.showServiceForm(service);
                    });
                },

                loadEventItemForm: function(service){
                    require([
                        "apps/support/public/entities/tickets/posts/new/event_item_controller"
                    ], function (NewController) {
                        NewController.showServiceForm(service);
                    });
                },

                loadJobLetterForm: function(service){
                    require([
                        "apps/support/public/entities/tickets/posts/new/job_letter_controller"
                    ], function (NewController) {
                        NewController.showServiceForm(service);
                    });
                },

                loadFeedbackForm:function (alias) {

                    var cb = function () {
                        require([
                            "apps/support/public/entities/tickets/posts/new/controller"
                        ], function (ListController) {
                            ListController.showFeedbackForm(alias);

                        });
                    };
                    IntranetManager.trigger("support:public:init", cb);
                }
            };

           //PUBLIC TRIGGERS

            IntranetManager.on('support:public:init', function (cb) {
                API.initPublic(cb);
            });

            //Show Recent supports
            IntranetManager.on('support:posts:recent', function (options) {
                console.group('support App::  support:posts:recent');
                console.info(options);
                console.groupEnd();

                API.loadRecentPostsWidget(options);
            });

            IntranetManager.on('supports:category:posts', function (options) {
                console.group('supports App::  support:category:posts');
                console.info(options);
                console.groupEnd();

                IntranetManager.navigate(options.url, true);
            });

            IntranetManager.on('support:popular:posts', function (options) {
                console.group('supports App::  support:popular:posts');
                console.info(options);
                console.groupEnd();

                API.loadPopularPostsWidget(options);
            });

            /* Service Forms triggers */
            IntranetManager.on('service:contact_update:new', function (service) {
                API.loadContactUpdateForm(service);
            });

            IntranetManager.on('incident:report_form.new', function (service) {
                API.loadIncidentReportForm(service);
            });
            IntranetManager.on('service:report_form:new', function (service) {
                API.loadIncidentReportForm(service);
            });


            IntranetManager.on('service:salary_advance:new', function (service) {
                API.loadContactUpdateForm(service);
            });

            IntranetManager.on('service:job_letter:new', function (service) {
                API.loadJobLetterForm(service);
            });

            IntranetManager.on('service:time_off:new', function (service) {
                API.loadContactUpdateForm(service);
            });
            IntranetManager.on('service:patient_med_request:new', function (service) {
                API.loadContactUpdateForm(service);
            });
            IntranetManager.on('service:news_submission:new', function (service) {
                API.loadNewsItemForm(service);
            });
            IntranetManager.on('service:submit_event_item:new', function (service) {
                API.loadEventItemForm(service);
            });

            IntranetManager.addInitializer(function () {
                new SupportManagerRouter.Router({
                    controller: API
                });
            });


        });

        return IntranetManager.SupportManagerRouter;
    });

