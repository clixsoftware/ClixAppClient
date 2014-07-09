define([
    "app",
    "tpl!apps/howdoi/public/entities/home/show/templates/layout.tpl",
    "tpl!apps/howdoi/public/entities/home/show/templates/header.tpl",
    "tpl!apps/howdoi/public/entities/home/show/templates/search.tpl",
    "tpl!apps/howdoi/public/entities/home/show/templates/list.tpl",
    "tpl!apps/howdoi/public/entities/home/show/templates/list_item.tpl",
    "tpl!apps/howdoi/public/entities/home/show/templates/search_layout.tpl",
    "tpl!apps/howdoi/public/entities/home/show/templates/search_results_header.tpl",
        "tpl!apps/howdoi/public/entities/home/show/templates/search_list.tpl",
        "tpl!apps/howdoi/public/entities/home/show/templates/search_list_item.tpl"

],
    function ( IntranetManager, layoutTpl, headerTpl, searchTpl, listTpl, listItemTpl,
        searchLayoutTpl, searchResultsHeaderTpl, searchListTpl, searchListItemTpl) {

        IntranetManager.module("HowDoIManager.Public.Home.Show.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

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

                    onRender: function(){
                        console.log('<< Views.LayoutView - Loaded ***DONE ***  >>');
                    }

                });


                Views.SearchLayoutView = Marionette.Layout.extend({

                    template: searchLayoutTpl,

                    onBeforeRender: function () {
                        // set up final bits just before rendering the view's `el`
                        $('body').addClass('post layout view');
                    },

                   /* regions: {
                        postTitle: "#post-title",
                        postMeta: "#post-meta",
                        postMedia: "#post-media",
                        postContent: "#post-content",
                        postRelated: "#post-related",
                        postRecommended: "#post-recommended",
                        postGallery: "#post-gallery"
                    },*/

                    onRender: function(){
                        console.log('<< Views.SearchLayoutView - Loaded ***DONE ***  >>');
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
                        "click #how-search-submit": "searchPosts"
                    },

                    ui: {
                        criterion: "input#js-filter-criterion"
                    },

                    searchPosts: function (e) {
                        e.preventDefault();

                        var criterion = this.$(".js-filter-criterion").val();
                        //alert('submit for filter was clicked ' + criterion);
                        this.trigger("howdoi:search", criterion);
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

                Views.SearchResultsHeaderView = Marionette.ItemView.extend({
                    template: searchResultsHeaderTpl

                });

                Views.SearchListItemView = Marionette.ItemView.extend({
                    template: searchListItemTpl,

                    className: 'media',

                    onRender: function(){
                        console.log('Rendering the SearchListItemView view');
                        //$(this.$el).addClass('t' + this.model.get('id'));
                    }


                });

                Views.SearchListView = Marionette.CompositeView.extend({

                    className: 'widget-box',

                    template: searchListTpl,

                    itemView: Views.SearchListItemView,


                    itemViewContainer: 'div.listing',

                    onRender: function () {
                        console.log('Rendering the SearchListView view');
                    }
                });


              });



        return IntranetManager.HowDoIManager.Public.Home.Show.Views;
    });
