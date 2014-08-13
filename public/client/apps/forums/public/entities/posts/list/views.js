/*
 * Application: Workspace
 * Views: Workspace List Views
 * Module: WorkspaceManager.List.Views
 *
 * */

define(["app",
    "common/views",
    "tpl!apps/forums/public/entities/posts/list/templates/layout.tpl",
    "tpl!apps/forums/public/entities/posts/list/templates/home.tpl",
    "tpl!apps/forums/public/entities/posts/list/templates/list_item.tpl",
    "tpl!apps/forums/public/entities/posts/list/templates/list_item_large.tpl",
    "tpl!apps/forums/public/entities/posts/list/templates/no_records.tpl",
    "tpl!apps/forums/public/entities/posts/list/templates/paginator.tpl",
    "tpl!apps/forums/public/entities/posts/list/templates/search_form.tpl",
        "tpl!apps/forums/public/entities/posts/list/templates/header.tpl",
        "tpl!apps/forums/public/entities/posts/list/templates/list_category.tpl"
],
    function ( IntranetManager, GlobalViews,  layoutTpl,homeTpl, listItemTpl, listItemLargeTpl,
        noRecordsTpl, paginatorTpl, searchFormTpl, headerTpl, listCategoryTpl) {
        IntranetManager.module("ForumsManager.Public.Posts.List.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.SearchFormView = Marionette.ItemView.extend({
                    template: searchFormTpl,

                    triggers: {
                        //"click button.js-new": "contact:new"
                    },

                    events: {
                        //"submit #filter-form": "filterContacts"
                        "click #search-submit": "filterContacts"
                    },

                    className:  'well well-sm',

                    ui: {
                        criterion: "input.js-filter-criterion"
                    },

                    filterContacts: function (e) {
                        e.preventDefault();
                        //  alert('submit for filter was clicked');
                        var criterion = this.$(".js-filter-criterion").val();
                        this.trigger("posts:search", criterion);
                    },

                    onSetFilterCriterion: function (criterion) {
                        this.ui.criterion.val(criterion);
                    },
                    onRender: function () {
                        console.log('Rendering the SearchFormView');
                    }

                });



                Views.HomeView = Marionette.CollectionView.extend({

                    template: homeTpl,

                    itemView: this.PublicNewsListCategoryView,

                    onBeforeRender: function () {
                        // set up final bits just before rendering the view's `el`
                        $('body').addClass('public forums home').removeClass('app');

                        console.log('<< Views.HomeView: Loaded ***COMPLETED*** >>');
                    }

                });

                Views.BlankView = GlobalViews.BlankView.extend({

                    onRender: function(){
                        this.$("h1.ui.header").text("No postings");
                        this.$(".ui.warning .header").text("New App");
                        this.$("span.message").text('Click the button below to create your first Posting.');
                        this.$(".js-add-record").text('Create Posting');
                        this.$('.js-icon').addClass('wrench');

                   }
                });

                Views.PaginatedView = Marionette.ItemView.extend({

                    template: paginatorTpl,

                    initialize: function () {
                        console.log(this.$el);

                    },

                    events: {
                        'click a.prev': 'previous',
                        'click a.next': 'next'
                    },

                    onRender: function () {
                        // $(this.$el).html(this.collection.pageInfo());
                        console.group('forums: List: Views: Paginator');
                        var that = this;
                        console.log(this.model);

                        $(this.$el).pagination({
                            items: this.model.get('items'),
                            itemsOnPage: this.model.get('itemsOnPage'),
                            cssStyle: '',
                            hrefTextPrefix: this.model.get('path') + '&page=',
                            onPageClick: function (pageNumber, event) {
                                // Callback triggered when a page is clicked
                                // Page number is given as an optional parameter
                                // alert('page click ' + pageNumber);
                                that.trigger('change:page', pageNumber);
                            }
                        });

                       console.groupEnd();
                    },

                    previous: function () {

                    },

                    next: function () {

                    }

                });

                Views.LayoutView = Marionette.LayoutView.extend({
                    template: layoutTpl,

                    className: 'layout-wrapper'
                });

                Views.HeaderView = Marionette.ItemView.extend({
                    template: headerTpl,

                    className: 'row'
                });

                Views.ListItemView = Marionette.ItemView.extend({

                    initialize: function(options){
                        console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },

                    tagName: 'li',

                    className: 'bbp-body',

                    onBeforeRender: function(){
                    },


                    onRender: function(){
                        console.info('Rendered : forums: List: ListItemView');
                    },

                    template: listItemTpl

                });

                Views.ListCategoryView = Marionette.CompositeView.extend({

                    initialize: function(options){
                        console.group('ListCategoryView - options');


                        this.collection = this.model.get('forum_categories');
                        console.log(options);
                        console.log(this.collection);
                        console.groupEnd();
                    },

                    className: "widget",

                    template: listCategoryTpl,

                    /*               template: homeTpl,*/

                    childView: Views.ListItemView,

                    childViewContainer: 'ul.bbp-forums',

                    childViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    triggers: {
                        'click .js-new-category': 'command:new:category'
                    },

                    onRender: function () {
                        $('body').addClass('page-template-page-forums-php');
                        console.info('Rendered : forums: List: ListViews');
                    }
                });

                Views.ListForumView = Marionette.CollectionView.extend({

                    id: 'bbpress-forums',

                    childView: Views.ListCategoryView
                });


            });

        return IntranetManager.ForumsManager.Public.Posts.List.Views;
    });
