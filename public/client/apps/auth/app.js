/*
 * Application: Auth Manager
 * File: Application Manager
 * */


define(
    [
     "app"
     ],
    function ( IntranetManager ) {
    IntranetManager.module("AuthManager", function (
        AuthManager,
        IntranetManager,
        Backbone,
        Marionette,
        $, _ ) {

        AuthManager.startWithParent = false;

        AuthManager.on("start", function () {
           console.log('Starting AuthManager Manager');
        });

        AuthManager.onStop = function () {
            console.log("stopping AuthManager");
        };

        var API = {};

    });

    //WorkspaceManager Routers
    IntranetManager.module("Routers.AuthManager", function (
        AuthManagerRouter,
        IntranetManager,
        Backbone,
        Marionette, $, _ ) {

        AuthManagerRouter.Router = Marionette.AppRouter.extend({

            appRoutes: {
                "auth/login": "showLogin",
                "auth/signup": "showSignupForm"
            }

        });

        var executeAction = function ( action, arg ) {
            IntranetManager.startSubApp("AuthManager");
            action(arg);
           // IntranetManager.once(API.showMenu());
            //IntranetManager.execute("set:active:header", "contacts");
        };

        var API = {
            init: function(){

                require([
                    'apps/auth/common/controller'
                ], function(CommonController){
                    console.log('initializing AuthManager Layout');
                    CommonController.setupAppLayout();

                });
            },

            showLogin: function() {
                API.init();

                require([
                    "apps/auth/entities/session/show/controller"
                ], function (ShowController) {
                    console.log('calling showLogin Screen');
                    executeAction(ShowController.loadLogin);
                });
            },

            showSignupForm: function() {
                API.init();
                require([
                    "apps/auth/entities/session/show/controller"
                ], function (ShowController) {
                      console.log('Called Signup Screen');
                      executeAction(ShowController.loadSignup);
                });
            }

        };


        IntranetManager.on('auth:login:show', function(){
            IntranetManager.navigate("/auth/login");
            API.showLogin();
        });

        IntranetManager.addInitializer(function () {
            new AuthManagerRouter.Router({
                controller: API
            });
        });


    });

    return IntranetManager.AuthManagerRouter;
});

