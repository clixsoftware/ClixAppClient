define([
    "app",
    "common/views",
    "tpl!apps/howdoi/public/widgets/templates/item_headline.tpl",
    "tpl!apps/howdoi/public/widgets/templates/headline_summary.tpl",
    "tpl!apps/howdoi/public/widgets/templates/list_view.tpl"
],
    function ( IntranetManager, GlobalViews, itemHeadlineTpl,
               headlineSummaryTpl, listViewTpl) {

        IntranetManager.module("HowDoIManager.Public.Widgets.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.ItemHeadlineView = Marionette.ItemView.extend({

                    initialize: function(options){
                     //  console.log('index of model ' + options.index);
                      this.model.set('index', options.index);
                    },
                    tagName: 'li',
                    template: itemHeadlineTpl,

                    onRender: function(){
                        console.log('<< Views.ItemHeadlineView - Loaded***DONE ***  >>');
                    }
                });

                Views.HeadlineSummaryView = Views.ItemHeadlineView.extend({

                    initialize: function(options){
                        //  console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },

                    tagName: 'li',

                    template: headlineSummaryTpl,

                    onRender: function(){
                        console.log('<< Views.HeadlineSummaryView - Loaded***DONE ***  >>');
                    }
                });

                Views.ListView = Marionette.CompositeView.extend({

                    initialize: function(options){
                            this.collection = options.collection;
                    },

                    template: listViewTpl,

                    childView: Views.ItemHeadlineView,

                    emptyView: GlobalViews.NoRecordsView,

                    childViewContainer: '.list-inner',

                    className: 'category-block list-widget',

                    childViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    onRender: function(){
                        console.log('<< Views.ListView - Loaded***DONE ***  >>');
                    }
                });


            });

        return IntranetManager.HowDoIManager.Public.Widgets.Views;
    });

