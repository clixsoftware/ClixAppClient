/*
 * Application: Workspace
 * Views: Workspace List Views
 * Module: WorkspaceManager.New.Views
 *
 * */

define([
    "app",
    "common/views",
    "tpl!apps/workspaces/entities/workspace/new/templates/form.html",
    "jquery-address",
    "semantic"
], function (IntranetManager, AppCommonViews, formTpl) {

    IntranetManager.module("WorkspaceManager.New.Views",
        function (Views, WorkspaceManager, Backbone, Marionette, $, _) {

            Views.CreateForm = AppCommonViews.Form.extend({

                initialize: function () {
                    //alert('init workspace form');
                },

                template: formTpl,

                onRender: function () {
                    this.$('.demo.menu .item').tab({
                        history: false
                    });
                    this.$('.dropdown').dropdown();
                }

            });
        });

    return IntranetManager.WorkspaceManager.New.Views;
});
