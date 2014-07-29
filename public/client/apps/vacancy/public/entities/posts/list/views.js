define(["app",
        "common/views",
        "tpl!apps/vacancy/public/entities/posts/list/templates/list.tpl",
        "tpl!apps/vacancy/public/entities/posts/list/templates/list_item.tpl",
        "tpl!apps/vacancy/public/entities/posts/list/templates/layout.tpl",
        "tpl!apps/vacancy/public/entities/posts/list/templates/search_form.tpl",
        "tpl!apps/vacancy/public/entities/posts/list/templates/atoz_navigation.tpl",
        "tpl!apps/vacancy/public/entities/posts/list/templates/sort_filter.tpl",
        "tpl!apps/vacancy/public/entities/posts/list/templates/paginator.tpl",
        "tpl!apps/vacancy/public/entities/posts/list/templates/header.tpl",
        "tpl!apps/vacancy/public/entities/posts/list/templates/categories.tpl"
    ],
    function (IntranetManager, GlobalViews, listTpl, listItemTpl, layoutTpl, searchFormTpl, atozTpl, sortFilterTpl, paginatorTpl, headerTpl, categoriesTpl) {
        IntranetManager.module("VacancyManager.Public.Posts.List.Views",
            function (Views, IntranetManager, Backbone, Marionette, $, _) {

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
                        this.trigger("posts:search", criterion);
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

                Views.ListItemView = Marionette.ItemView.extend({
                    template: listItemTpl,

                    className: "media",


                    onRender: function () {
                        console.log('Rendering the ListItemView view');
                    }

                });

                Views.ListView = Marionette.CompositeView.extend({
                    onBeforeRender: function () {
                        //console.log(JSON.stringify(this.model));

                    },

                    initialize: function () {
                        // this.collection.groupBy('category');
                        //this.collection = this.model.vc;
                        // this.collection = this.model.get('vc');
                        //console.log(JSON.stringify(this.collection.vc));

                    },

                    childViewOptions: function (model) {
                        return {
                            index: this.collection.indexOf(model) + 1
                        }
                    },

                    ui: {
                        pagi: '#pag'
                    },

                    className: 'col-lg-12 col-md-12 col-sm-12',

                    template: listTpl,

                    childView: Views.ListItemView,

                    childViewContainer: 'div'

                    /*                    onRender: function() {
                     // $(this.$el).html(this.collection.pageInfo());

                     var that = this;

                     $(this.ui.pagi).pagination({
                     items: this.model.get('items'),
                     itemsOnPage: this.model.get('itemsOnPage'),
                     cssStyle: '',
                     hrefTextPrefix: '/directory/people/page/',
                     onPageClick: function(pageNumber, event) {
                     // Callback triggered when a page is clicked
                     // Page number is given as an optional parameter
                     that.trigger('change:page', pageNumber);
                     }
                     });


                     //  console.log(this.model);
                     }*/

                });

                /*                Views.ListView = Marionette.CollectionView.extend({
                 itemView: Views.ListCategoryView
                 });*/

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

                        var that = this;

                        $(this.$el).pagination({
                            items: this.model.get('items'),
                            itemsOnPage: this.model.get('itemsOnPage'),
                            cssStyle: '',
                            hrefTextPrefix: this.model.get('path') + '/page/',
                            onPageClick: function (pageNumber, event) {
                                // Callback triggered when a page is clicked
                                // Page number is given as an optional parameter
                               // alert('page click ' + pageNumber);
                                that.trigger('change:page', pageNumber);
                            }
                        });


                        //  console.log(this.model);
                    },

                    previous: function () {

                    },

                    next: function () {

                    }

                });

                Views.LayoutView = Marionette.LayoutView.extend({
                    template: layoutTpl
                });

                Views.HeaderView = Marionette.ItemView.extend({
                    template: headerTpl

                });

                Views.CategoryView = Marionette.ItemView.extend({
                    template: categoriesTpl
                });

            });

        return IntranetManager.VacancyManager.Public.Posts.List.Views;
    });
