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
    "fancybox"

],

    function ( IntranetManager, GlobalViews, categoryListTpl, categoryListItemTpl, tagListTpl,
               tagListItemTpl, attachmentListTpl, attachmentListItemTpl, fileListTpl, fileListItemTpl) {

        IntranetManager.module("CoreManager.Public.Widgets.Show.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.CategoriesItemView = Marionette.ItemView.extend({

                    initialize: function(options){
                        //  console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },

                    template: categoryListItemTpl,

                    tagName: 'span',

                    className: 'wptag',

                    onRender: function(){

                       this.$el.addClass('t' + this.model.get('id'));
                       this.$el.css("","");

                        $( "<p>Test</p>" ).insertAfter(this.$el);
                        console.log('<< Views.CategoriesItemView - Loaded***DONE ***  >>');
                    }
                });

                Views.CategoriesView = Marionette.CompositeView.extend({
                    template: categoryListTpl,

                    childView: Views.CategoriesItemView,

                    emptyView: GlobalViews.NoRecordsView,

                    childViewContainer: 'div.ui.list',

                    className: 'widget-box',

                    itemViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    onRender: function(){
                        console.log('<< Views.CategoriesView - Loaded***DONE ***  >>');
                    }
                });

                Views.TagItemView = Marionette.ItemView.extend({

                    initialize: function(options){
                        //  console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },

                    template: tagListItemTpl,

                    tagName: 'span',

                    className: '',

                    onRender: function(){
                        this.$el.addClass('t' + this.model.get('id'));
                        $( "<p>Test</p>" ).insertAfter(this.$el);
                        console.log('<< Views.TagItemView - Loaded***DONE ***  >>');
                    }
                });

                Views.TagsView = Marionette.CompositeView.extend({
                    template: tagListTpl,

                    childView: Views.TagItemView,

                    emptyView: GlobalViews.NoRecordsView,

                    childViewContainer: 'p.ui.list',

                    className: 'widget-box',

                    itemViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
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

            });

        return IntranetManager.CoreManager.Public.Widgets.Show.Views;
    });
