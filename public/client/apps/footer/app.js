/*
 * Application: Header Manager
 * File: Header Manager
 * */


define([
    "app",
    "apps/footer/common/controller"
], function (IntranetManager, CommonController) {
    IntranetManager.module("FooterManager", function (FooterManager, IntranetManager, Backbone, Marionette, $, _) {

        var API = {
            loadLayout: function () {
                CommonController.setupLayout();
            },

            loadNavigation: function () {
                CommonController.setupNavigation();
            },

            loadFeedbackForm: function () {
                CommonController.showFeedbackForm();
            }
        };

        FooterManager.on("start", function () {
            API.loadLayout();
            //API.loadNavigation();
        });


        IntranetManager.on("footer:start", function () {
            API.loadLayout();
            //API.loadNavigation();
        });

        IntranetManager.on("footer:show:feedback", function () {
            API.loadFeedbackForm();
        });


    });

    return IntranetManager.FooterManager;
});
