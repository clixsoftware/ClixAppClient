define([
    "app",
    "common/views",
    "tpl!apps/blogs/public/widgets/templates/list.tpl",
    "tpl!apps/blogs/public/widgets/templates/list_item.tpl",
    "tpl!apps/blogs/public/widgets/templates/user_profile.tpl"

],
    function ( IntranetManager, GlobalViews, listTpl, listItemTpl,  userProfileTpl) {

        IntranetManager.module("BlogsManager.Public.Widgets.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                  Views.UserProfileView = Marionette.ItemView.extend({

                    initialize: function(options){
                        //  console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },

                    template: userProfileTpl,

                    tagName: 'div',

                    className: 'media',

                    onRender: function(){
                        console.log('<< Views.RecentItemView - Loaded***DONE ***  >>');
                    }
                });


                Views.ListItemView =  Marionette.ItemView.extend({
                    template: listItemTpl,

                    initialize: function(options){
                        //  console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },

                    onRender: function(){
                        console.log('<< Views.ListItemView - Loaded***DONE ***  >>');
                    }
                }) ;

                Views.ListView = Marionette.CompositeView.extend({
                    template: listTpl,

                    itemView: Views.ListItemView,

                    emptyView: GlobalViews.NoRecordsView,

                    itemViewContainer: 'div.ui.list',

                    className: 'widget-box nobottom',

                    itemViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    onRender: function(){
                        console.log('<< Views.RecommendedView - Loaded***DONE ***  >>');
                    }


                });




            });

        return IntranetManager.BlogsManager.Public.Widgets.Views;
    });

