define([
    "app",
    "apps/calendar/public/entities/posts/show/views",
    "moment"
], function (IntranetManager, CalendarShowViews) {

    IntranetManager.module("CalendarManager.Public.Posts.Show",
        function (Show, CalendarManager, Backbone, Marionette, $, _) {

            Show.Controller = {

                getDetailsView: function (post) {

                    return new CalendarShowViews.DetailsView({
                        model: post
                    });

                },

                showPostDetailsPage: function (opts) {

                    var that = this;

                    require(['entities/applications', 'entities/calendar'], function () {

                        console.group('showPostDetailsPage - Events');


                        var options = {
                            alias: opts.alias,
                            parent_feature: CalendarManager.feature.id
                        };

                        console.log(opts);
                        console.log(options);

                        console.groupEnd();

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);


                        fetchingApp.then(function (app) {


                           console.group('Event Application');
                            console.info(app);
                           console.groupEnd();

                            return app;


                        }).then(function (app) {

                             var fetchingPost = IntranetManager.request('calendar:posts:entity', opts.post_id);

                            return  fetchingPost.then(function (post) {

                                    IntranetManager.layoutContent.reset();
                                    IntranetManager.layoutContent.show(that.getDetailsView(post));

                                    IntranetManager.trigger('dom:title', post.get('title'));

                                    return post;

                                });

                            }).then(function (post) {


                            var options = {
                              objectId: post.get('uuid'),
                              tags: post.get('tags'),
                              zone: 'layoutZone2'

                            };

                            var options_categories = {
                                objectId: post.get('uuid'),
                                categories: post.get('categories'),
                                zone: 'layoutZone2'

                            };

                            //IntranetManager.trigger('news:public:posts:categories', post.get('uuid'));
                            IntranetManager.trigger('core:object:categories', options_categories);

                            IntranetManager.trigger('core:object:tags', options);
                            var media = post.get('media');
                            IntranetManager.trigger('core:display:object:attachments', media.attachment);

                             var options = {};
                             IntranetManager.trigger('core:display:object:image:gallery', options);

                            }).fail(function (err) {
                                //alert(' an error occurred ' + err);
                                console.log('an error occurred ' + err);
                            });

                    });

                },



            }
        });

    return IntranetManager.CalendarManager.Public.Posts.Show.Controller;
});

