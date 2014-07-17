/*
 * Application: Workspace
 * Views: Workspace List Views
 * Module: WorkspaceManager.List.Views
 *
 * */

define(["app",
        "common/views",
        "tpl!apps/news/entities/apps/list/templates/blank.tpl",
        "tpl!apps/news/entities/apps/list/templates/blank_help.tpl",
        "tpl!apps/news/entities/apps/list/templates/list.tpl",
        "tpl!apps/news/entities/apps/list/templates/list_item.tpl",
        "tpl!apps/news/entities/apps/list/templates/categories.tpl"
    ],
    function (IntranetManager, GlobalViews, blankTpl, blankHelpTpl, listTpl, listItemTpl, categoriesTpl) {
        IntranetManager.module("NewsManager.Posts.List.Views",
            function (Views, IntranetManager, Backbone, Marionette, $, _) {

                Views.BlankHelpView = GlobalViews.BlankHelpView.extend({
                    template: blankHelpTpl
                });

                Views.BlankView = GlobalViews.BlankView.extend({
                    template: blankTpl,

                    triggers: {
                        'click .js-add-site': 'command:form:new'
                    }
                });


                Views.CategoriesView = Marionette.ItemView.extend({
                    className: "widget",
                    template: categoriesTpl,
                    onRender: function () {
                        console.log('Rendering the Categories view');
                    }
                });

                Views.ListItemView = GlobalViews.ListItemView.extend({
                    template: listItemTpl
                });

                Views.ListView = GlobalViews.ListView.extend({
                    template: listTpl,
                    itemView: this.ListItemView


                });

                Views.ListHeaderView = GlobalViews.ListHeaderView.extend({

                    className: "ui grid",

                    triggers: {
                        "click .js-command-new": "button:command:new"
                    },

                    onRender: function () {
                        this.$(".ui.view.header").text("News Applications");
                        this.$(".list.command.button").remove();
                        this.$(".js-command-new").remove();
                    }

                });

            });

        return IntranetManager.NewsManager.Posts.List.Views;
    });
