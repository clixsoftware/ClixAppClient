/*
 * Application: News Manager
 * Views: NewsManager Posts List Views
 * Module: NewsManager.Posts.List.Views
 *
 * */

define(["app",
    "common/views",
    "tpl!apps/feature/entities/features/list/templates/list.tpl",
    "tpl!apps/feature/entities/features/list/templates/list_item.tpl",
    "tpl!apps/feature/entities/features/list/templates/categories.tpl",
    "tpl!apps/feature/entities/features/list/templates/blank.tpl",
    "tpl!apps/feature/entities/features/list/templates/blank_help.tpl"
],
    function ( IntranetManager, GlobalViews,  listTpl, listItemTpl, categoriesTpl, blankTpl, blankhelpTpl ) {
        IntranetManager.module("FeatureManager.Features.List.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {


                Views.HeaderView = GlobalViews.ListHeaderView.extend({

                    onRender: function () {

                        console.log('<< HeaderView : LOADED >>');

                        this.$(".js-submit").text("Update contact");

                    }
                });

                Views.NoRecordsView = GlobalViews.ListNoRecordsView.extend({

                    onRender: function () {
                        this.$(".js-submit").text("Update contact");

                        console.log('<< NoRecordsView : LOADED >>');

                    }
                });


                Views.BlankHelpView = Marionette.ItemView.extend({

                    className: "ui segment basic blank help widget",

                    template: blankhelpTpl,

                    onRender: function () {
                        console.log('<< BlankHelpView : LOADED >>');
                    }

                });


                Views.BlankView = Marionette.ItemView.extend({

                    className: "ui center aligned basic segment blank record widget",

                    triggers: {
                        'click .js-add-feature': 'new:feature'
                    },

                    template: blankTpl,

                    onRender: function () {

                        console.log('<< BlankView : LOADED >>');
                    }
                });


                Views.CategoriesView = Marionette.ItemView.extend({
                    className: "widget",
                    template: categoriesTpl,

                    onRender: function () {

                        console.log('<< CategoriesView : LOADED >>');

                    }
                });

                Views.FeatureItemListView =  Marionette.ItemView.extend({
                    tagName: "tr",

                    className: "item",

                    template: listItemTpl,

                    onRender: function(){

                        console.log('<< FeatureItemListView : LOADED >>');
                    }

                }) ;


                Views.FeatureListView = Marionette.CompositeView.extend({

                    tagName: "table",

                    className: "ui feature listing view table",

                    template: listTpl,

                    itemView: Views.FeatureItemListView,

                    itemViewContainer: "tbody",

                    onRender: function(){

                        console.log('<< FeatureListView : LOADED >>');
                    }

                });


            });

        return IntranetManager.FeatureManager.Features.List.Views;
    });
