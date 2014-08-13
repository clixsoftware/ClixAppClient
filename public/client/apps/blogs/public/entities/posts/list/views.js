/*
 * Application: Workspace
 * Views: Workspace List Views
 * Module: WorkspaceManager.List.Views
 *
 * */

define(["app",
    "common/views",
    "tpl!apps/blogs/public/entities/posts/list/templates/layout.tpl",
    "tpl!apps/blogs/public/entities/posts/list/templates/home.tpl",
    "tpl!apps/blogs/public/entities/posts/list/templates/list_item.tpl",
    "tpl!apps/blogs/public/entities/posts/list/templates/list_item_large.tpl",
    "tpl!apps/blogs/public/entities/posts/list/templates/no_records.tpl",
    "tpl!apps/blogs/public/entities/posts/list/templates/paginator.tpl",
    "tpl!apps/blogs/public/entities/posts/list/templates/search_form.tpl",
        "tpl!apps/blogs/public/entities/posts/list/templates/header.tpl"
],
    function ( IntranetManager, GlobalViews,  layoutTpl,homeTpl, listItemTpl, listItemLargeTpl,
        noRecordsTpl, paginatorTpl, searchFormTpl, headerTpl) {
        IntranetManager.module("BlogsManager.Public.Posts.List.Views",
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

                Views.ListItemView = Marionette.ItemView.extend({

                    initialize: function(options){
                        console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },

                    onBeforeRender: function(){
                        if(this.model.get('index') === 1){
                            this.template = listItemLargeTpl;
                        }
                    },

                    ui: {
                        media : '.js-media',
                        media_image: '.js-media-image'
                    },

                    onRender: function(){

                        var attachments = this.model.get('attachments');

                        console.group('Render -> blogs : Lists: Views : NewsListItemView');
                        console.info('attachments');
                        console.log(attachments);


                        if(_.isEmpty(this.model.get('attachments'))){

                                   console.warn('No attachments found - hide the media div');
                                   this.ui.media.hide();

                            }else{

                                var images = attachments.images;

                                console.group('images');
                                console.log(images);
                                console.groupEnd();

                                console.log(images.lead);

                                $(this.ui.media_image).attr('src', images.lead.source_url);

                        }

                        $(this.$el).addClass('item item-' + this.model.get('index'));
                        console.groupEnd();


                    },

                 template: listItemTpl

                });

                Views.HomeView = Marionette.CollectionView.extend({

                    template: homeTpl,

                    itemView: this.PublicNewsListCategoryView,

                    onBeforeRender: function () {
                        // set up final bits just before rendering the view's `el`
                        $('body').addClass('public blogs home').removeClass('app');

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

                Views.ListView = Marionette.CompositeView.extend({

                    className: "widget",

                    template: homeTpl,

                    childView: Views.ListItemView,

                    childViewContainer: 'div#post-listing',

                    childViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    triggers: {
                        'click .js-new-category': 'command:new:category'
                    },

                    onRender: function () {
                        $('body').addClass('page-template-page-blogs-php');
                        console.info('Rendered : blogs: List: ListViews');
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
                        console.group('blogs: List: Views: Paginator');
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

            });

        return IntranetManager.BlogsManager.Public.Posts.List.Views;
    });
