/*
 * Application: Workspace
 * Views: Workspace List Views
 * Module: WorkspaceManager.List.Views
 *
 * */

define(["../../../../../../../app",
    "common/views",
    "tpl!apps/support/public/entities/services/list/templates/list.tpl",
    "tpl!apps/support/public/entities/services/list/templates/list_item.tpl",
    "tpl!apps/support/public/entities/services/list/templates/search_form.tpl",
    "tpl!apps/support/public/entities/services/list/templates/header.tpl"
],
    function ( IntranetManager, GlobalViews,  listTpl, listItemTpl, searchFormTpl,
        headerTpl) {
        IntranetManager.module("SupportManager.Public.Services.List.Views",

            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.ListItemView =  Marionette.ItemView.extend({
                    template: listItemTpl
                }) ;

                Views.ListView = Marionette.CollectionView.extend({

                    template: listTpl,
                    itemView: this.ListItemView

                });

                Views.SearchFormView = Marionette.ItemView.extend({
                    template: searchFormTpl,

                    triggers: {
                        //"click button.js-new": "contact:new"

                    },

                    className: 'well well-sm',

                    events: {
                        //"submit #filter-form": "filterContacts"
                        "click #project-search-submit": "searchPosts"
                    },

                    ui: {
                        criterion: "input.js-filter-criterion"
                    },

                    searchPosts: function (e) {
                        e.preventDefault();
                        //alert('submit for filter was clicked');
                        var criterion = this.$(".js-filter-criterion").val();
                        this.trigger("projects:search", criterion);
                    },

                    onSetFilterCriterion: function (criterion) {
                        this.ui.criterion.val(criterion);
                    },
                    onRender: function () {
                        console.log('Rendering the SearchFormView');
                    }
                });

                Views.HeaderView =  Marionette.ItemView.extend({
                    template: headerTpl,

                    onRender: function () {
                       // alert('header view');
                        console.log('Rendering the SearchFormView');
                    }
                }) ;


            });

        return IntranetManager.SupportManager.Public.Services.List.Views;
    });
