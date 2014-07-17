/*
 * Application: Auth Manager
 * Controller: Common Controller
 * Module: AuthManager.Common
 * */


define([
        "app",
        "apps/auth/common/views"
    ],
    function (IntranetManager, CommonViews) {
        IntranetManager.module("AuthManager.Common",
            function (Common, AuthManager, Backbone, Marionette, $, _) {

                Common.Controller = {

                    getLayoutView: function () {
                        return new CommonViews.LayoutView();
                    },

                    setupAppLayout: function (next) {
                        var that = this;

                        console.group('AuthManager: SetupAppLayout')


                        if (AuthManager.started === false || AuthManager.started === undefined) {

                            require(["entities/feature"],
                                function () {

                                    //fetch workspaces
                                    var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'auth');
                                    fetchFeature.then(function (feature) {

                                        if (!feature) {
                                            throw new Error('AuthManager is not installed');
                                        }


                                        AuthManager.feature = {
                                            id: feature.get('id')
                                        };

                                        AuthManager.started = true;

                                        IntranetManager.appLayout = Common.Controller.getLayoutView();

                                        IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                                        //Call the next function, Setup app layout must be run before..
                                        if (next) {
                                            console.log(next);
                                            next();
                                        }

                                    }).fail(function (error) {
                                        alert(error);
                                        console.log('Go to 404 page');
                                        /*//TODO: navigate to 404 pages*/
                                    });
                                    ;

                                }
                            );


                        } else {

                            if (next) {
                                next();
                            }

                        }

                        console.groupEnd();
                    },

                    /*                    setupAppLayout: function(){
                     IntranetManager.siteHeader.show(new CommonViews.HeaderView);
                     IntranetManager.trigger('body:css:update', 'app session');

                     IntranetManager.siteFooterBar.show(new CommonViews.FooterView);
                     this.initLayout();
                     },*/

                    initLayout: function () {

                        IntranetManager.appLayout = this.getLayoutView();

                        IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                        IntranetManager.on("applayout:show:formregion", function (view) {
                            IntranetManager.appLayout.formRegion.show(view);
                            console.log('Trigger Form Region Change');
                        });


                    }

                };


            });


        return IntranetManager.AuthManager.Common.Controller;
    });

