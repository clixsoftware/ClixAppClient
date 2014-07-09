define([
    "marionette",
    "jquery",
    "apps/config/marionette/regions/dialog",
    "apps/config/marionette/regions/sidebar",
    "cookie"
], function ( Marionette, $ ) {

        var IntranetManager = new Marionette.Application();


    //add applications
        IntranetManager.appEnums = {
            calendar: 1,
            newsmanager: 2,
            blog: 4,
            pages: 8,
            content: 16,
            tasks: 32,
            profiles: 64,
            image: 128,
            documents: 256,
            messages: 512,
            notes: 1024,
            comments: 2048,
            links: 4096,
            milestones: 8192,
            people: 16384,
            risks: 32768,
            announcements: 65536,
            workspace: 131072
        };

        IntranetManager.addRegions({

            siteTopBar: Marionette.Region.Sidebar.extend({
                el: "#site-top-sidebar"
            }),

            siteHeader: "#topstrip",

            siteFooter: '#footer',

            siteFooterZone1: '#footer-zone-1',

            siteFooterZone2: '#footer-zone-2',

            siteFooterZone3: '#footer-zone-3',

            siteTopNavBar: "#site-top-navbar",

            siteMobileNav: ".navbar-header",

            utilityNavBar: "#utilities",

            siteBrand: "#crownlogo",

            siteSearch: "#site-search",

            siteUserActions: "#site-user-menu",

            siteActionBar: "#site-action-bar .page.container",

            siteNavigationBar: "#mainnav",

            siteSubNavigationBar: "#site-sub-navigation-bar .page.container",

            siteMainContent: "#content-wrapper",

            layoutTopNavBar: "#layout-top-navbar",

            layoutHeader: "#layout-header",

            layoutSearch: "#layout-search",

            layoutLeftSideBar: "#layout-left-aside",

            layoutRightSideBar: "#layout-right-aside",

            layoutContent: "#layout-content",

            layoutZone1: "#layout-zone-1",

            layoutZone2: "#layout-zone-2",

            layoutZone3: "#layout-zone-3",

            layoutZone4: "#layout-zone-4",

            layoutZone5: "#layout-zone-5",

            layoutZone6: "#layout-zone-6",

            layoutZone7: "#layout-zone-7",

            layoutZone8: "#layout-zone-8",

            layoutZone9: "#layout-zone-9",

            layoutFooter: "#layout-footer",

            siteDialog: Marionette.Region.Dialog.extend({
                el: "#site-dialog"
            }),

            siteLeftBar: Marionette.Region.Sidebar.extend({
                el: "#site-left-sidebar"
            }),

            siteRightBar: Marionette.Region.Sidebar.extend({
                el: "#site-right-sidebar"
            }),

            siteFooterBar: "#site-footer-sidebar"

        });


        IntranetManager.showAlert = function(){
            alert('showing alert');
        };

        IntranetManager.opts = {
            root : "/",                     // The root path to run the application through.
            URL : "/",                      // Base application URL
           API : "http://192.168.0.200:3100/api/v1/"                   // Production Intranet API
          //API : "http://localhost:3100/api/v1/"                   // Local Development API
          //API : "http://192.168.2.148:3100/api/v1/"                   // Clix Development Server API


        };

        IntranetManager.navigate = function ( route, options ) {
            options || (options = {});
            Backbone.history.navigate(route, options);
        };

        IntranetManager.getCurrentRoute = function () {
            return Backbone.history.fragment;
        };

        IntranetManager.startSubApp = function ( appName, args ) {
            console.log('auth-cookie - ' + $.cookie('hospitalnet-auth'));
            console.log('auth-user-cookie - ' + $.cookie('hospitalnet-user'));

            if($.cookie('hospitalnet-auth') != undefined){
                IntranetManager.Auth.isAuthenticated = true;
                IntranetManager.Auth.userId = 1;
                IntranetManager.Auth.user = $.cookie('hospitalnet-user');

            }else{
               // alert('user not authenticated')
            }

            var currentApp = appName ? IntranetManager.module(appName) : null;
            if (IntranetManager.currentApp === currentApp) {
                console.log('App ' + appName + ' is already running!!');
                return;
            }

            if (IntranetManager.currentApp) {
                console.log('App ' + appName + ' will be stopped');
                IntranetManager.currentApp.stop();
            }

            IntranetManager.currentApp = currentApp;
            if (currentApp) {
                //console.log('App ' + appName + ' starting with args ' + args);
                console.log('** IS USER AUTHENTICATED ** ' + IntranetManager.Auth.isAuthenticated);
                currentApp.start(args);
            }
        };


        IntranetManager.on('body:css:update', function(css){
            $('body').addClass(css);
        });

        IntranetManager.on('dom:title', function(title){
            $(document).attr('title', 'UHWI Intranet - ' + title);
        });

        IntranetManager.on("initialize:after", function () {

            if (Backbone.history) {


                require([
                    "apps/feature/app",
                    "apps/core/app",
                    "apps/taxonomy/app",
                    "apps/appmanager/app", //application Manager
                   // "apps/contacts/contacts_app", //Contacts Manager
                    "apps/news/app",    //News Manager
                    "apps/howdoi/app",    //Yellow Pages Manager
                    "apps/directory/app",    //Directory Manager
                    "apps/workspaces/app", //Workspace Manager
                    "apps/pages/app", //HomePage Manager
                    "apps/auth/app",
                    "apps/tasks/app",
                    "apps/sites/app",
                    "apps/projects/app",
                    "apps/blogs/app",
                    "apps/calendar/app",
                    "apps/support/app",
                    "apps/search/app",
                    "apps/services/app",
                    "apps/hmis/app",
                    "apps/patients/app"
                ], function () {
                    console.log('Starting backbone history');
                    console.log('Setup authentication vars');
                    console.log('Setup document on click');


                    Backbone.history.start({
                        pushState: true
                    });

                    IntranetManager.Auth = {
                        isAuthenticated: false,
                        userId: '',
                        user: {}
                    };

                    //IntranetManager.session = IntranetManager.request('session:new:entity');

                    $(document).on('click', 'a:not([data-bypass])', function ( evt ) {

                        var href = $(this).attr('href');
                        var protocol = this.protocol + '//';

                        if(href !== undefined){
                            if (href.slice(protocol.length) !== protocol) {
                                evt.preventDefault();
                                IntranetManager.navigate(href.replace('store', ''), true);
                            }
                        }
                    });

                    if (IntranetManager.getCurrentRoute() === "") {
                        console.log('Current route blank, trigger homepage:show');
                        IntranetManager.trigger("sites:default:show");
                        console.log('Is authenticated ' + IntranetManager.Auth.isAuthenticated);
                    }

                });
            }
        });

        return IntranetManager;
    });

