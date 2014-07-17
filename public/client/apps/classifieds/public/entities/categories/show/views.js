define([
        "app",
        "tpl!apps/news/public/entities/categories/show/templates/layout.tpl",
        "tpl!apps/news/public/entities/categories/show/templates/header.tpl",
        "tpl!apps/news/public/entities/categories/show/templates/search.tpl",
        "tpl!apps/news/public/entities/categories/show/templates/list.tpl",
        "tpl!apps/news/public/entities/categories/show/templates/list_item.tpl"
    ],
    function (IntranetManager, layoutTpl, headerTpl, searchTpl, listTpl, listItemTpl) {

        IntranetManager.module("NewsManager.Category.Show.Views",
            function (Views, IntranetManager, Backbone, Marionette, $, _) {

                Views.LayoutView = Marionette.Layout.extend({

                    template: layoutTpl,

                    onBeforeRender: function () {
                        // set up final bits just before rendering the view's `el`
                        $('body').addClass('post layout view');
                    },

                    regions: {
                        postTitle: "#post-title",
                        postMeta: "#post-meta",
                        postMedia: "#post-media",
                        postContent: "#post-content",
                        postRelated: "#post-related",
                        postRecommended: "#post-recommended",
                        postGallery: "#post-gallery"
                    },

                    onRender: function () {
                        console.log('<< Views.LayoutView - Loaded ***DONE ***  >>');
                    }

                });

                Views.CategoryHeaderView = Marionette.ItemView.extend({
                    template: headerTpl

                });

                Views.SearchFormView = Marionette.ItemView.extend({
                    template: searchTpl,

                    triggers: {
                        //"click button.js-new": "contact:new"

                    },

                    events: {
                        //"submit #filter-form": "filterContacts"
                        "click #news-search-submit": "searchPosts"
                    },

                    ui: {
                        criterion: "input.js-filter-criterion"
                    },

                    searchPosts: function (e) {
                        e.preventDefault();
                        //  alert('submit for filter was clicked');
                        var criterion = this.$(".js-filter-criterion").val();
                        this.trigger("news:category:search", criterion);
                    },

                    onSetFilterCriterion: function (criterion) {
                        this.ui.criterion.val(criterion);
                    },
                    onRender: function () {
                        console.log('Rendering the SearchFormView');
                    }
                });

                Views.ListItemView = Marionette.ItemView.extend({
                    template: listItemTpl,
                    onRender: function () {
                        console.log('Rendering the ListItemView view');
                    }

                });

                Views.ListView = Marionette.CollectionView.extend({

                    className: '',

                    //template: listTpl,

                    itemView: Views.ListItemView,

                    //itemViewContainer: 'div#entries_listing',

                    onRender: function () {
                        console.log('Rendering the ListView view');
                    }
                });


            });


        return IntranetManager.NewsManager.Category.Show.Views;
    });
