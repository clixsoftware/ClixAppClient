define([
    "app",
    "common/views",
    "tpl!apps/core/public/templates/category_list.tpl",
    "tpl!apps/core/public/templates/category_list_item.tpl",
    "tpl!apps/core/public/templates/tag_list.tpl",
    "tpl!apps/core/public/templates/tag_list_item.tpl",
    "tpl!apps/core/public/templates/attachment_list.tpl",
    "tpl!apps/core/public/templates/attachment_list_item.tpl",
    "tpl!apps/core/public/templates/file_list.tpl",
    "tpl!apps/core/public/templates/file_list_item.tpl",
    "tpl!apps/core/public/templates/ad_item.tpl",
    "tpl!apps/core/public/templates/breadcrumb_item.tpl",
    "tpl!apps/core/public/templates/breadcrumbs.tpl",

    "fancybox"

],
    function ( IntranetManager, GlobalViews, categoryListTpl, categoryListItemTpl, tagListTpl,
               tagListItemTpl, attachmentListTpl, attachmentListItemTpl, fileListTpl, fileListItemTpl, adItemTpl,
        breadCrumbItemTpl, breadCrumbsTpl) {

        IntranetManager.module("CoreManager.Public.Widgets.Show.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.CategoriesItemView = Marionette.ItemView.extend({

                    initialize: function(options){
                        //  console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },

                    triggers: {
                        'click a.category-item':'category:navigate'
                    },

                    template: categoryListItemTpl,

                    tagName: 'span',

                    className: 'wptag',

/*
                    getTemplate: function(){
                        if(this.model.get('view') === '2col'){
                                    return categoryListItemTpl;
                                }
                                    return categoryListItemTpl;
                         },
*/

                    onRender: function(){
                       this.$el.addClass('t' + this.model.get('id'));
                       this.$el.css("","");

                        $( "<p>Test</p>" ).insertAfter(this.$el);
                        console.log('<< Views.CategoriesItemView - Loaded***DONE ***  >>');
                    }
                });

                Views.CategoriesItemLiView = Marionette.ItemView.extend({

                    initialize: function(options){
                        //  console.log('index of model ' + options.index);

                        this.model.set('index', options.index);
                    },

                    triggers: {
                        'click a.category-item':'category:navigate'
                    },

                    template: categoryListItemTpl,

                    tagName: 'li',

                    className: 'howdoi',

                    onRender: function(){
                        console.log(this.$el);
                        this.$el.prepend("<span class='brd" + this.model.get('index') + "'>&nbsp;</span>&nbsp;")
                      //  this.$el.addClass('t' + this.model.get('id'));
                      //  this.$el.css("","");

                       // $( "<p>Test</p>" ).insertAfter(th is.$el);
                      //  console.log('<< Views.CategoriesItemView - Loaded***DONE ***  >>');
                    }
                });

                Views.CategoriesView = Marionette.CompositeView.extend({

                    initialize: function(options){
                        console.group('Core:  Views:  CategoriesView - options');
                        console.log(options);
                        console.groupEnd();

                        if(options.useview === '2col'){
                            this.useview = options.useview;
                            this.childViewContainer = 'ul.howdoi';
                           this.childView = Views.CategoriesItemLiView;
                        }
                    },

                    template: categoryListTpl,

                    childView: Views.CategoriesItemView,

                    emptyView: GlobalViews.NoRecordsView,

                    childViewContainer: 'p.taglisting.page',

                    className: 'widget-box',

                    childViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1,
                            useview: this.useview
                        }
                    },

                    onRender: function(){
                        console.log('<< Views.CategoriesView - Loaded***DONE ***  >>');
                    }
                });

                Views.TagItemView = Marionette.ItemView.extend({

                    initialize: function(options){
                        console.group('Core:  Views:  TagItemView - options');
                        console.log(options);
                        console.groupEnd();
                         this.useview = options.useview;
                        if(options.useview === 'tagcloud'){
                            this.className ="tag";
                        }else{
                            this.className = 'wptag';
                        }

                        this.model.set('index', options.index);
                    },

                    template: tagListItemTpl,

                    tagName: 'span',

                  className: 'wptag',

                    onRender: function(){
                        if(this.useview != 'tagcloud') {
                            this.$el.addClass('t' + this.model.get('id'));
                            $( "<p>Test</p>" ).insertAfter(this.$el);
                        }

                        console.log('<< Views.TagItemView - Loaded***DONE ***  >>');
                    }
                });

                 Views.TagsView = Marionette.CompositeView.extend({

                     initialize: function(options){
                         console.group('Core:  Views:  TagsView - options');
                         console.log(options);
                         console.groupEnd();

                         if(options.useview === 'tagcloud'){
                             this.useview = options.useview;
                             this.childViewContainer = 'div.tagscloud';
                             //this.childView = Views.CategoriesItemLiView;
                         }

                     },

                    template: tagListTpl,

                    childView: Views.TagItemView,

                    emptyView: GlobalViews.NoRecordsView,

                    childViewContainer: 'p.ui.list',

                    className: 'widget-box',

                     childViewOptions: function(model){
                         return {
                             index: this.collection.indexOf(model) +1,
                             useview: this.useview
                         }
                     },

                    onRender: function(){
                        //alert('PostRelatedTagsView');
                        console.log('<< Views.TagsView - Loaded***DONE ***  >>');
                    }
                });

                Views.AttachmentItemView = Marionette.ItemView.extend({

                    initialize: function(options){
                        //  console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },

                    events: {
                       'click a.attachment': 'downloadAttach'
                    },

                    template: attachmentListItemTpl,

                //    tagName: 'span',

                    className: 'attachment',

                    downloadAttach: function(e){
                        e.preventDefault();
                        //alert(e.currentTarget.href);
                        console.log(e);
                        window.open(e.currentTarget.href,'width=400,height=200');
                        return false;
                    },

                    onRender: function(){
                      //  this.$el.addClass('t' + this.model.get('id'));
                        console.log('<< Views.AttachmentItemView - Loaded***DONE ***  >>');
                    }
                });

                Views.AttachmentView = Marionette.CompositeView.extend({
                    template: attachmentListTpl,

                    childView: Views.AttachmentItemView,

                    emptyView: GlobalViews.NoRecordsView,

                    childViewContainer: 'div.ui.list',

                    className: 'widget-box',

                    itemViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    onRender: function(){
                        //alert('PostRelatedTagsView');
                        console.log('<< Views.AttachmentView - Loaded***DONE ***  >>');
                    }
                });

                Views.FileItemView = Marionette.ItemView.extend({

                    initialize: function(options){
                        //  console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },

                    events: {
                        'click a.attachment': 'downloadAttach'
                    },

                    template: fileListItemTpl,

                    tagName: 'span',

                    className: 'attachment',

                    downloadAttach: function(e){
                        e.preventDefault();
                        //alert(e.currentTarget.href);
                       // console.log(e);
                        //window.open(e.currentTarget.href,'width=400,height=200');
                        return false;
                    },

                    onRender: function(){
                        console.log(this.model.get('base_url'));
                        //  this.$el.addClass('t' + this.model.get('id'));
                        console.log('<< Views.FileItemView - Loaded***DONE ***  >>');
                    }
                });

                Views.FileListView = Marionette.CompositeView.extend({

                    template: fileListTpl,

                    childView: Views.FileItemView,

                    emptyView: GlobalViews.NoRecordsView,

                    childViewContainer: 'div.ui.list',

                    className: 'widget-box',

                    itemViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    onRender: function(){
                        //alert('PostRelatedTagsView');
                        $(".fancybox").fancybox({
                            openEffect: "none",
                            closeEffect: "none"
                        });
                        console.log('<< Views.FileListView - Loaded***DONE ***  >>');
                    }
                });

                Views.AdView = Marionette.ItemView.extend({

                    events: {
                        /*'click a.attachment': 'downloadAttach'*/
                    },

                    template: adItemTpl,

                    className: 'ads',

                    onRender: function(){
                       console.log('<< Views.AdView - Loaded***DONE ***  >>');
                    }
                });

                Views.BreadCrumbItemView = Marionette.ItemView.extend({

                    template: breadCrumbItemTpl,

                    tagName: 'span'

                });

                Views.BreadCrumbView = Marionette.CompositeView.extend({

                    template: breadCrumbsTpl,

                    childView: Views.BreadCrumbItemView,

                    childViewContainer: '.breadcrumbs',

                    childViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    onRender: function(){ }
                });

            });

        return IntranetManager.CoreManager.Public.Widgets.Show.Views;
    });
