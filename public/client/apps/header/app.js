/*
 * Application: Header Manager
 * File: Header Manager
 * */


define([
    "app",
    "apps/header/common/controller"
], function (IntranetManager, CommonController) {
    IntranetManager.module("HeaderManager", function (HeaderManager, IntranetManager, Backbone, Marionette, $, _) {

        var API = {
            loadLayout: function () {
                CommonController.setupLayout();
            },

            loadNavigation: function () {
                CommonController.setupNavigation();
            }
        };

        HeaderManager.on("start", function () {
            API.loadLayout();
            //API.loadNavigation();
        });

        IntranetManager.commands.setHandler('set:active:siteheader', function (name) {
            CommonController.setActiveHeader(name);
        });

        IntranetManager.on("headermanager:start", function () {
            API.loadLayout();

            //API.loadNavigation();
        });


    });

    return IntranetManager.HeaderManager;
});
