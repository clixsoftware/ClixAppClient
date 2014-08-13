/*
 * Application: Workspace
 * Views: Workspace List Views
 * Module: WorkspaceManager.List.Views
 *
 * */

define(["app",
    "common/views",
    "tpl!apps/blogs/public/entities/posts/list/templates/list.tpl",
    "tpl!apps/blogs/public/entities/posts/list/templates/list_item.tpl",
    "tpl!apps/blogs/public/entities/posts/list/templates/search_form.tpl",
    "tpl!apps/blogs/public/entities/posts/list/templates/header.tpl"
],
    function ( IntranetManager, GlobalViews,  listTpl, listItemTpl, searchFormTpl,
        headerTpl) {
        IntranetManager.module("BlogsManager.Public.Posts.List.Views",

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
                        alert('submit for filter was clicked');
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
                    template: headerTpl
                }) ;


            });

        return IntranetManager.BlogsManager.Public.Posts.List.Views;
    });
