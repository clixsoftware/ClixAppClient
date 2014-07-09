/*
 * Application: AppManager
 * Views: AppManager List Views
 * Module: AppManager.New.Views
 *
 * */

define([
    "app",
    "common/views",
    "tpl!apps/taxonomy/new/templates/form.tpl",
    "jquery-address",
    "semantic"
], function (IntranetManager, GlobalViews, formTpl) {

    IntranetManager.module("TaxonomyManager.New.Views",
        function (Views, TaxonomyManager, Backbone, Marionette, $, _) {

            Views.NewFormView = GlobalViews.BaseFormView.extend({

               template: formTpl

            });
        });

    return IntranetManager.TaxonomyManager.New.Views;
});
