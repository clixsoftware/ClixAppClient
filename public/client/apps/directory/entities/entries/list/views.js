/*
 * Application: Workspace
 * Views: Workspace List Views
 * Module: WorkspaceManager.List.Views
 *
 * */

define(["app",
    "common/views",
    "tpl!apps/directory/entities/entries/list/templates/blank_help.tpl",
    "tpl!apps/directory/entities/entries/list/templates/list.tpl",
    "tpl!apps/directory/entities/entries/list/templates/list_item.tpl",
    "tpl!apps/directory/entities/entries/list/templates/categories.tpl",
    "tpl!apps/directory/entities/entries/list/templates/public_home.tpl",
    "tpl!apps/directory/entities/entries/list/templates/public_list_item.tpl",
    "tpl!apps/directory/entities/entries/list/templates/public_list_category.tpl",
    "tpl!apps/directory/entities/entries/list/templates/category_item.tpl",
    "tpl!apps/directory/entities/entries/list/templates/sidebar.tpl",
    "tpl!apps/directory/entities/entries/list/templates/public_layout.tpl",
    "tpl!apps/directory/entities/entries/list/templates/search_form.tpl",
    "tpl!apps/directory/entities/entries/list/templates/atoz_navigation.tpl",
    "tpl!apps/directory/entities/entries/list/templates/sort_filter.tpl",
    "tpl!apps/directory/entities/entries/list/templates/admin_list.tpl",
    "tpl!apps/directory/entities/entries/list/templates/admin_list_item.tpl",
    "tpl!apps/directory/entities/entries/list/templates/paginator.tpl",
        "tpl!apps/directory/entities/entries/list/templates/header.tpl"
],
    function ( IntranetManager, GlobalViews,  blankHelpTpl,  listTpl, listItemTpl, categoriesTpl, publicHomeTpl, publicListItem, publicListCategoryTpl, categoryListItemTpl , sidebarTpl, publicLayoutTpl, searchFormTpl, atozTpl, sortFilterTpl, adminListTpl, adminListItemTpl, paginatorTpl, headerTpl) {
        IntranetManager.module("DirectoryManager.Entries.List.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.SidebarView = Marionette.ItemView.extend({
                    template: sidebarTpl,
                    onRender: function () {
                        console.log('Rendering the SidebarView');
                    }

                });
                Views.HeaderView = Marionette.ItemView.extend({
                    template: headerTpl,
                    onRender: function () {
                        console.log('Rendering the HeaderView');
                    }

                });

                Views.SearchFormView = Marionette.ItemView.extend({
                    template: searchFormTpl,

                    triggers: {
                        //"click button.js-new": "contact:new"

                    },

                    events: {
                        //"submit #filter-form": "filterContacts"
                        "click #search-submit": "filterContacts"
                    },

                    ui: {
                        criterion: "input.js-filter-criterion"
                    },

                    filterContacts: function (e) {
                        e.preventDefault();
                      //  alert('submit for filter was clicked');
                        var criterion = this.$(".js-filter-criterion").val();
                        this.trigger("people:search", criterion);
                    },

                    onSetFilterCriterion: function (criterion) {
                        this.ui.criterion.val(criterion);
                    },
                    onRender: function () {
                        console.log('Rendering the SearchFormView');
                    }

                });

                Views.SortFilterView = Marionette.ItemView.extend({
                    template: sortFilterTpl,
                    onRender: function () {
                        console.log('Rendering the SortFilterView');
                    }

                });

                Views.AtoZView = Marionette.ItemView.extend({
                    template: atozTpl,

                    className: 'col-lg-12 col-md-12 col-sm-12',

                    onRender: function () {
                        console.log('Rendering the AtoZView');
                    }

                });

                Views.PublicNewsListItemView = Marionette.ItemView.extend({

                    initialize: function(options){
                         console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },

                    onBeforeRender: function(){

                    },

                    onRender: function(){
                      $(this.$el).addClass('item item-' + this.model.get('index'));
                    },

                   template: publicListItem

                });

                Views.PublicNewsListCategoryView = Marionette.CompositeView.extend({
                    onBeforeRender: function(){
                        //console.log(JSON.stringify(this.model));
                    },

                    initialize: function(){
                        // this.collection.groupBy('category');
                        //this.collection = this.model.vc;
                        this.collection = this.model.get('vc');
                        //console.log(JSON.stringify(this.collection.vc));
                    },

                    itemViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) + 1
                        }
                    },

                    className: "widget",

                    template: publicListCategoryTpl,

                    itemView: Views.PublicNewsListItemView,

                    itemViewContainer: 'div.ui.divided.list'

                });

                Views.PublicNewsHomeView = Marionette.CollectionView.extend({

                    template: publicHomeTpl,

                    itemView: this.PublicNewsListCategoryView,

                    onBeforeRender: function () {
                        // set up final bits just before rendering the view's `el`
                        $('body').addClass('public news home').removeClass('app');

                        console.log('<< Views.PublicNewsHomeView: Loaded ***COMPLETED*** >>');
                    }

                });

                Views.BlankHelpView = GlobalViews.BlankHelpView.extend({
                    template: blankHelpTpl,

                    onRender: function(){

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

                Views.ListItemView = Marionette.ItemView.extend({
                   template: listItemTpl,
                    onRender: function () {
                        console.log('Rendering the ListItemView view');
                    }

                });

                Views.ListView = Marionette.CompositeView.extend({

                    className: 'col-lg-4 col-md-4 col-sm-6',

                    template: listTpl,

                    itemView: Views.ListItemView,

                    itemViewContainer: 'div#entries_listing',

                    onRender: function () {
                       console.log('Rendering the ListView view');
                    }
                });

                Views.PublicLayoutView = GlobalViews.AppLayoutView.extend({

                    template: publicLayoutTpl,

                    className: 'row',

                    onBeforeRender: function () {
                        // set up final bits just before rendering the view's `el`
                        $('body').addClass('public news').removeClass('app');
                    },

                    onRender: function(){
                        $('body').removeClass('app');
                    }
                });

                Views.AdminListItemView =  GlobalViews.ListItemView.extend({
                    template: adminListItemTpl
                }) ;

                Views.AdminListView = GlobalViews.ListView.extend({
                    template: adminListTpl,
                    itemView: this.AdminListItemView


                });

                Views.PaginatedView = Marionette.ItemView.extend({

                    template: paginatorTpl,

                    events: {
                        'click a.prev': 'previous',
                        'click a.next': 'next'
                    },
                  onRender: function() {
                        // $(this.$el).html(this.collection.pageInfo());

                    },

                    previous: function() {
                        return false;
                    },

                    next: function() {
                        return false;
                    },

                    onRender: function () {
                        alert('rendering the paginator view');
                        console.log('Rendering the PaginatedView view');
                    }


                });

            });

        return IntranetManager.DirectoryManager.Entries.List.Views;
    });
