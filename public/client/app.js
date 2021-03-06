define([
    "marionette",
    "jquery",
    "apps/config/marionette/regions/dialog",
    "apps/config/marionette/regions/sidebar",
    "cookie"
], function (Marionette, $) {

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

        siteTopNavBar: "#topnavbar",

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

        adZone1: "#ad-zone-1",

        adZone2: "#ad-zone-2",
        adZone3: "#ad-zone-3",
        adZone4: "#ad-zone-4",
        adZone5: "#ad-zone-5",
        adZone6: "#ad-zone-6",


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

    IntranetManager.buildQuery = function(q){

        var queryString ="";
        var counter=0;
        _.each(_.pairs(q), function(item){
            // console.log(item);

            if(counter ==0){
                queryString = '?';
            }

            var value = _.isObject(item[0,1]) ? JSON.stringify(item[0,1]): item[0,1];
            //console.log(value);
            if(counter >= 1){
                queryString =   queryString +  '&' + item[0, 0] + '=' + value
            }else{
                queryString = queryString + item[0, 0] + '=' + value
            }
            counter++;
        });
        console.group('** Build Query ***')
        console.log(q);
        console.info(queryString);
        console.groupEnd();

        return queryString;
    }

    IntranetManager.showAlert = function () {
        alert('showing alert');
    };

    IntranetManager.opts = {
        root: "/",                     // The root path to run the application through.
        URL: "/",                      // Base application URL
         API:  function(){
             return IntranetManager.appSettings.get('api_server_url');
         },
        homeAction: function(){
            return IntranetManager.appSettings.get('home_action');
        },
        defaultSite: function(){
            return IntranetManager.appSettings.get('default_site');
        }

    };

    IntranetManager.navigate = function (route, options) {
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    IntranetManager.getCurrentRoute = function () {
        return Backbone.history.fragment;
    };

    IntranetManager.startSubApp = function (appName, args) {

        console.group('Start Sub Application: ' + appName);

            console.group('Auth Cookie - user |  ')
                console.log($.cookie('hospitalnet-user'))
                console.log($.cookie('hospitalnet-auth'));
            console.groupEnd();

        if ($.cookie('hospitalnet-auth') != undefined) {
            IntranetManager.Auth.isAuthenticated = true;
            IntranetManager.Auth.userId = 1;
            IntranetManager.Auth.user = $.cookie('hospitalnet-user');

        } else {
            // alert('user not authenticated')
        }

        var currentApp = appName ? IntranetManager.module(appName) : null;
        if (IntranetManager.currentApp === currentApp) {
            console.warn('App ' + appName + ' is already running!!');
            console.groupEnd();
            return;
        }

        if (IntranetManager.currentApp) {
            console.info('App ' + appName + ' will be stopped');
            console.groupEnd();
            IntranetManager.currentApp.stop();
        }

        IntranetManager.currentApp = currentApp;
        if (currentApp) {
            //console.log('App ' + appName + ' starting with args ' + args);
            console.info('** IS USER AUTHENTICATED ** ' + IntranetManager.Auth.isAuthenticated);

            console.warn('Attempting to start : ' + appName);

            console.groupEnd();
            console.log(args);
            currentApp.start(args);
        }


    };

    IntranetManager.on('body:css:update', function (css) {
        $('body').addClass(css);
    });

    IntranetManager.on('dom:title', function (title) {
        $(document).attr('title', 'UHWI Intranet - ' + title);
    });

    IntranetManager.on('before:start', function(options){
        console.info('before:start TODO: Load additional setup for application');
    });

    IntranetManager.on("start", function () {

        console.warn('IntranetManager on:start');


        if (Backbone.history) {


            require([
                "apps/feature/app",
                "apps/core/app",
                "apps/taxonomy/app",
                //"apps/appmanager/app", //application Manager
                // "apps/contacts/contacts_app", //Contacts Manager
                "apps/news/app",    //News Manager
                "apps/vacancy/app",
                "apps/howdoi/app",    //Yellow Pages Manager
                "apps/directory/app",    //Directory Manager
                //"apps/workspaces/app", //Workspace Manager
                "apps/pages/app", //HomePage Manager
                "apps/classifieds/app", //HomePage Manager
                "apps/auth/app",
                "apps/forums/app",
                "apps/sites/app",
                "apps/projects/app",
                "apps/blogs/app",
                "apps/calendar/app",
                "apps/support/app",
                "apps/search/app"/*,
                "apps/services/app"*/
                //"apps/hmis/app",
                //"apps/patients/app"
            ], function () {

                console.group('Setting up IntranetManager Application');

                Backbone.history.start({
                    pushState: true
                });

                console.log('Start Backbone history.')

                IntranetManager.Auth = {
                    isAuthenticated: false,
                    userId: '',
                    user: {}
                };

                //IntranetManager.session = IntranetManager.request('session:new:entity');

                //Captures all click event on  links except those with data-bypass attribute
                $(document).on('click', 'a:not([data-bypass])', function (evt) {

                    //console.log('global click event');

                    var href = $(this).attr('href');
                    var protocol = this.protocol + '//';

                    if (href !== undefined) {
                        if (href.slice(protocol.length) !== protocol) {
                          //  alert('global clikc');
                            evt.preventDefault();
                            IntranetManager.navigate(href.replace('store', ''), true);
                        }
                    }
                });

                console.log('Setup global hyperlink checking.')
                console.groupEnd();

                if (IntranetManager.getCurrentRoute() === "") {
                      IntranetManager.trigger(IntranetManager.opts.defaultSite());
                    //console.log('Is authenticated ' + IntranetManager.Auth.isAuthenticated);
                }

            });
        }
    });

    return IntranetManager;
});

