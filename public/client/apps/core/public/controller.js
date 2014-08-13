define([
    "app",
    "apps/core/public/views",
    "S",
    "moment"
], function (IntranetManager, CorePublicViews, S) {

    IntranetManager.module("CoreManager.Public.Widgets.Show",
        function (Show, CoreManager, Backbone, Marionette, $, _) {

            Show.Controller = {

                getCategoriesView: function(options){
                    return new CorePublicViews.CategoriesView({
                        collection: options.collection,
                        useview: options.useview
                    })

                },

                  showCategoriesWidget: function(options){
                    var that = this;
                    console.group('<< showCategoriesWidget>>');
                    console.log(options);
                    console.groupEnd();


                    if(options.collection.categories && options.collection.categories.length > 0){

                        var TermModel = Backbone.Model.extend({});

                        var TermModelCollection = Backbone.Collection.extend({
                            model: TermModel
                        }) ;

                       _.each(options.collection.categories, function(term){
                            var title = S(term.title).replaceAll(' ', '&nbsp;');
                            term.publicTitle = title + ' ';
                            term.urlTrigger = options.urlTrigger;
                            term.slug = S(term.title).slugify().s;
                            term.view = options.view;
                            term.show_url = S(options.url).template(term).s;
                           // console.log(term);
                        })

                        console.log(options.view);

                        var termsCollection = new TermModelCollection(options.collection.categories);

                        //options.view = 'categories';
                        var categoryView = that.getCategoriesView({collection: termsCollection, useview: options.view});

                        categoryView.on('childview:category:navigate', function (args){

                           IntranetManager.trigger(args.model.get('urlTrigger'), {
                                slug: args.model.get('slug'),
                                uuid: args.model.get('uuid'),
                                url: args.model.get('show_url')
                            });

                        });

                        IntranetManager.layoutZone2.reset();
                        IntranetManager.layoutZone2.show(categoryView);


                    }


                },


                getTagsView:function(options){
                    return new CorePublicViews.TagsView({
                        collection: options.collection,
                        useview: options.useview
                    })                    ;

                },

                showTagsWidget: function(options){
                    var that = this;
                    console.group('<< showTagsWidget>>');
                    console.log(options);
                    console.groupEnd();

                    if(options.collection.tags && options.collection.tags.length > 0){
                    //if(options.collection.tags){

                        var Tag = Backbone.Model.extend({});

                        var TagCollection = Backbone.Collection.extend({
                            model: Tag
                        }) ;

                        var tags = new TagCollection();

                        var id = 0;
                        _.each(options.collection.tags, function(tag){
                            id = id + 1;
                            var item  = new Tag({
                                id: id,
                                title: tag,
                                 slug : S(tag).slugify().s,

                                 show_url: S(options.url).template({slug: S(tag).slugify().s}).s
                            });


                            tags.add(item);
                        });

                        console.log(tags);

                         IntranetManager.layoutZone3.reset();
                        IntranetManager.layoutZone3.show(that.getTagsView({
                            collection: tags}));


                    }

                },

                getAttachmentView:function(media){
                    return new CorePublicViews.AttachmentView({
                        collection: media
                    })

                },

                showAttachmentWidget: function(media){
                    var that = this;

                    //alert('showAttachmentWidget');

                    console.log(media);

                    if(!_.isEmpty(media)){
                    if(media.length > 0){

                        require([
                            'entities/media'
                        ], function(){

                            var mediaCollection = IntranetManager.request('media:collection:set', media);
                            IntranetManager.layoutZone1.reset();
                            IntranetManager.layoutZone1.show(that.getAttachmentView(mediaCollection));
                        });


                    }
                }

                },

                getImageGalleryView:function(images){
                    return new CorePublicViews.FileListView({
                        collection: images
                    })

                },

                showImageGalleryWidget: function(gallery){
                    var that = this;

                    //alert('showAttachmentWidget');

                    console.group('@@ Gallery Information');
                    console.log(gallery);
                    console.groupEnd();

                    var options = {
                        path:  gallery.source_url
                    };


                    require([
                        'entities/media'
                    ], function(){

                        var fetchingImages = IntranetManager.request('media:collection:image:gallery', options);

                        fetchingImages.then(function(images){

                            images.each(function(model, index, list){
                                model.set('base_url', gallery.base_url);
                            });
                            IntranetManager.layoutZone3.reset();
                            IntranetManager.layoutZone3.show(that.getImageGalleryView(images));


                        }).fail(function(err){
                                console.log('showImageGalleryWidget: Error occurred  ' + err);
                            })


                    });

                },

                getAdView:function(ad){
                    return new CorePublicViews.AdView({
                        model: ad
                    })

                },

                showRandomAdWidget: function(options){
                    var that = this;

                    //alert('showAttachmentWidget');

                    console.group('Core: Widget : showRandomAdWidget');
                    console.log(options);
                    console.groupEnd();


                    require([
                        'entities/ads'
                    ], function(){

                        var fetchingAds = IntranetManager.request('ads:posts:random', options);

                        fetchingAds.then(function(ad){

                            if(ad){

                                var custom_fields = ad.get('custom_fields');
                                console.log(custom_fields);

                                IntranetManager[custom_fields.adwords.zone].reset();
                                IntranetManager[custom_fields.adwords.zone].show(that.getAdView(ad));
                            }

                        }).fail(function(err){
                            IntranetManager.trigger('core:error:action', err);

                        })


                    });

                },

                getBreadCrumbsView:function(collection){
                    return new CorePublicViews.BreadCrumbView({
                        collection: collection
                    });

                },

                showBreadcrumbWidget: function(options){
                    var that = this;

                    console.group('Core: Widget : showBreadcrumbWidget');
                    console.log(options);
                    console.groupEnd();

                    if(options.crumbs && options.crumbs.length > 0){

                        var Crumb = Backbone.Model.extend({});

                        var CrumbCollection = Backbone.Collection.extend({
                            model: Crumb
                        }) ;

                        var crumbs = new CrumbCollection();

                        var id = 0;
                        _.each(options.crumbs, function(crumb){
                            id = id + 1;
                            var item  = new Crumb({
                                id: id,
                                title: crumb.title,
                                show_url: crumb.url
                            });
                            crumbs.add(item);
                        });

//                        console.log(crumbs);

                        IntranetManager.siteTopNavBar.reset();
                        IntranetManager.siteTopNavBar.show(that.getBreadCrumbsView(crumbs));

                    }

                }

            }
        });

    return IntranetManager.CoreManager.Public.Widgets.Show.Controller;
});

