define([
    "app",
    "apps/core/public/views",
    "moment",

], function (IntranetManager, CorePublicViews) {

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

                    if(options.categories){
                        options.collection = options.categories.trim().replace(/"/g, '').trim().split(',');

                        options.view = 'categories';

                        require([
                            'entities/taxonomy'
                        ], function(){

                            var tagCollection = IntranetManager.request('taxonomy:collection:set:categories', options);
                            IntranetManager.layoutZone2.reset();
                            IntranetManager.layoutZone2.show(that.getCategoriesView(tagCollection));
                        });

                    }


                },


                getTagsView:function(tags){
                    return new CorePublicViews.TagsView({
                        collection: tags
                    })

                },

                showTagsWidget: function(options){
                    var that = this;
                    console.group('<< showCategoriesWidget>>');
                    console.log(options);
                    console.groupEnd();

                    if(options.tags){
                        options.collection = options.tags.trim().replace(/"/g, '').trim().split(',');

                        options.view = 'tags';

                        require([
                            'entities/taxonomy'
                        ], function(){

                            var tagCollection = IntranetManager.request('taxonomy:collection:set:tags', options);
                            IntranetManager.layoutZone3.reset();
                            IntranetManager.layoutZone3.show(that.getTagsView(tagCollection));
                        });

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

