
/*
 * Application: Auth Manager
 * Controller: Common Controller
 * Module: AuthManager.Common
 * */


define([
    "app",
    "apps/auth/common/views"
],
    function ( IntranetManager, CommonViews ) {
        IntranetManager.module("AuthManager.Common",
            function ( Common, AuthManager, Backbone, Marionette, $, _ ) {

                Common.Controller = {

                    getLayoutView: function(){
                        return new CommonViews.LayoutView();
                    },


                    setupAppLayout: function(){
                        IntranetManager.siteHeader.show(new CommonViews.HeaderView);
                        IntranetManager.trigger('body:css:update', 'app session');

                        IntranetManager.siteFooterBar.show(new CommonViews.FooterView);
                        this.initLayout();
                    },

                    initLayout: function(){

                        IntranetManager.appLayout = this.getLayoutView();

                        IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                        IntranetManager.on("applayout:show:formregion", function(view){
                            IntranetManager.appLayout.formRegion.show(view);
                            console.log('Trigger Form Region Change');
                        });



                    }

                };


            });


        return IntranetManager.AuthManager.Common.Controller;
    });

