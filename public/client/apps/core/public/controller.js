define([
    "app",
    "apps/core/public/views",
    "S",
    "moment"
], function (IntranetManager, CorePublicViews, S) {

    IntranetManager.module("CoreManager.Public.Widgets.Show",
        function (Show, CoreManager, Backbone, Marionette, $, _) {

            Show.Controller = {

                getCategoriesView: function(categories){
                    return new CorePublicViews.CategoriesView({
                        collection: categories
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

                            term.slug = S(term.title).slugify().s;
                            term.show_url = S(options.url).template(term).s;
                            console.log(term);
                        })

                        var termsCollection = new TermModelCollection(options.collection.categories);

                        options.view = 'categories';

                        IntranetManager.layoutZone2.reset();
                        IntranetManager.layoutZone2.show(that.getCategoriesView(termsCollection));


                    }


                },


                getTagsView:function(tags){
                    return new CorePublicViews.TagsView({
                        collection: tags
                    })

                },

                showTagsWidget: function(options){
                    var that = this;
                    console.group('<< showTagsWidget>>');
                    console.log(options);
                    console.groupEnd();

                    if(options.collection.tags){

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

                         IntranetManager.layoutZone3.reset();
                        IntranetManager.layoutZone3.show(that.getTagsView(tags));


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

                }


            }
        });

    return IntranetManager.CoreManager.Public.Widgets.Show.Controller;
});

