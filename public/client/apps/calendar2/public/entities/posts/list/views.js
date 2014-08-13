/*
 * Application: Workspace
 * Views: Workspace List Views
 * Module: WorkspaceManager.List.Views
 *
 * */

define(["app",
    "common/views",
    "tpl!apps/calendar/public/entities/posts/list/templates/list.tpl",
    "tpl!apps/calendar/public/entities/posts/list/templates/list_item.tpl",
    "tpl!apps/calendar/public/entities/posts/list/templates/list_item_large.tpl",
    "tpl!apps/calendar/public/entities/posts/list/templates/search_form.tpl",
    "tpl!apps/calendar/public/entities/posts/list/templates/header.tpl"
],
    function ( IntranetManager, GlobalViews,  listTpl, listItemTpl, listItemLargeTpl, searchFormTpl,
        headerTpl) {
        IntranetManager.module("CalendarManager.Public.Posts.List.Views",

            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.SearchFormView = Marionette.ItemView.extend({
                    template: searchFormTpl,

                    triggers: {
                        //"click button.js-new": "contact:new"

                    },

                    className: 'well well-sm',

                    events: {
                        //"submit #filter-form": "filterContacts"
                        "click #project-search-submit": "searchPosts"
                    },

                    ui: {
                        criterion: "input.js-filter-criterion"
                    },

                    searchPosts: function (e) {
                        e.preventDefault();
                      //  alert('submit for filter was clicked');
                        var criterion = this.$(".js-filter-criterion").val();
                        this.trigger("events:search", criterion);
                    },

                    onSetFilterCriterion: function (criterion) {
                        this.ui.criterion.val(criterion);
                    },
                    onRender: function () {
                        console.log('Rendering the SearchFormView');
                    }
                });

                Views.HeaderView =  Marionette.ItemView.extend({
                    template: headerTpl,

                    onRender: function () {
                       // alert('header view');
                        console.log('Rendering the SearchFormView');
                    }
                }) ;

                Views.NoRecordsView =  GlobalViews.NoItemFoundView.extend({

                    onRender: function () {
                        // alert('header view');
                        console.log('Rendering the NoRecordsView');
                    }
                }) ;

                Views.ListItemView = Marionette.ItemView.extend({

                    initialize: function(options){
                        console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },

/*                    onBeforeRender: function(){
                        if(this.model.get('index') === 1){
                          //  alert('switching to large tempalte');
                            this.template = listItemLargeTpl;
                        }

                    },*/


                    ui: {
                        media : '.js-media'
                    },

                    onRender: function(){

                        //alert(this.model.get('media'));

/*                        if(_.isEmpty(this.model.get('media'))){
                            this.ui.media.hide();
                        }else{
                            if(this.model.get('media')){

                                //alert('media available');
                            }else{
                                this.ui.media.hide();
                            }

                        }*/
                        console.log('<< Views.ListItemView - Loaded ***DONE ***  >>');
                        $(this.$el).addClass('item item-' + this.model.get('index'));
                    },


                    template: listItemTpl

                });

                Views.ListView = Marionette.CompositeView.extend({

                    className: "widget",

                    template: listTpl,

                   childView: Views.ListItemView,

                    childViewContainer: 'div#post-listing',

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
                        console.log('Rendering the ListView');
                    }
                });




            });

        return IntranetManager.CalendarManager.Public.Posts.List.Views;
    });
