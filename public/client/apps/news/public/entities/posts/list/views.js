/*
 * Application: Workspace
 * Views: Workspace List Views
 * Module: WorkspaceManager.List.Views
 *
 * */

define(["app",
    "common/views",
    "tpl!apps/news/public/entities/posts/list/templates/blank_help.tpl",
    "tpl!apps/news/public/entities/posts/list/templates/list.tpl",
    "tpl!apps/news/public/entities/posts/list/templates/list_item.tpl",
    "tpl!apps/news/public/entities/posts/list/templates/categories.tpl",
    "tpl!apps/news/public/entities/posts/list/templates/public_home.tpl",
    "tpl!apps/news/public/entities/posts/list/templates/public_list_item.tpl",
    "tpl!apps/news/public/entities/posts/list/templates/public_list_category.tpl",
    "tpl!apps/news/public/entities/posts/list/templates/category_item.tpl",
    "tpl!apps/news/public/entities/posts/list/templates/news_home.tpl",
    "tpl!apps/news/public/entities/posts/list/templates/news_list_item.tpl",
    "tpl!apps/news/public/entities/posts/list/templates/news_list_item_large.tpl"
],
    function ( IntranetManager, GlobalViews,  blankHelpTpl,  listTpl, listItemTpl, categoriesTpl, publicHomeTpl, publicListItem, publicListCategoryTpl, categoryListItemTpl, newsHomeTpl, newsListItem, newsListItemLargeTpl ) {
        IntranetManager.module("NewsManager.Posts.List.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {


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

                Views.NewsListItemView = Marionette.ItemView.extend({

                    initialize: function(options){
                        console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },

                    onBeforeRender: function(){
                        if(this.model.get('index') === 1){
                            this.template = newsListItemLargeTpl;
                        }

                    },


                    ui: {
                        media : '.js-media',
                        media_image: '.js-media-image'
                    },

                    onRender: function(){

                        //alert(_.isEmpty(this.model.get('media')));

                    if(_.isEmpty(this.model.get('media'))){

                            this.ui.media.hide();
                        }else{
                        //alert('Media is available');
                        var media_image = this.model.get('media');
                        $(this.ui.media_image).attr('src', media_image.source_url);
                        //      this.ui.media_image.src = media_image.source_url;
                    }
                        console.log('<< Views.NewsListItemView - Loaded ***DONE ***  >>');
                        $(this.$el).addClass('item item-' + this.model.get('index'));
                    },


/*
                    onRender: function(){
                        $(this.$el).addClass('item item-' + this.model.get('index'));
                    },
*/

                    template: newsListItem

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

                Views.CategoryItemView = Marionette.ItemView.extend({
                   template: categoryListItemTpl

                });

                Views.CategoriesView = Marionette.CompositeView.extend({

                    className: "widget",

                    template: categoriesTpl,

                    itemView: Views.CategoryItemView,

                    itemViewContainer: 'div.ui.menu',

                    triggers: {
                        'click .js-new-category': 'command:new:category'
                    },

                    onRender: function () {
                        console.log('Rendering the Categories view');
                    }
                });

                Views.ListItemView =  GlobalViews.ListItemView.extend({
                    template: listItemTpl
                }) ;

                Views.ListView = GlobalViews.ListView.extend({
                    template: listTpl,
                     itemView: this.ListItemView


                });

                Views.NewsHomeView = Marionette.CompositeView.extend({

                    className: "widget",

                    template: newsHomeTpl,

                    itemView: Views.NewsListItemView,

                    itemViewContainer: 'div#post-listing',

                    itemViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    triggers: {
                        'click .js-new-category': 'command:new:category'
                    },

                    onRender: function () {
                        $('body').addClass('page-template-page-news-php');
                        console.log('Rendering the NewsHomeView view');
                    }
                });

            });

        return IntranetManager.NewsManager.Posts.List.Views;
    });
