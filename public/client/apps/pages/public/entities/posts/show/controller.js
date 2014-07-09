define([
    "app",
    "apps/pages/public/entities/posts/show/views",
    "moment"
], function (IntranetManager, ShowViews) {

    IntranetManager.module("PageManager.Public.Posts.Show",
        function (Show, PageManager, Backbone, Marionette, $, _) {

            Show.Controller = {

                getDetailsView: function (post) {

                    return new ShowViews.DetailsView({
                        model: post
                    });

                },

                showPostDetailsPage: function (opts) {

                    var that = this;

                    require(['entities/applications', 'entities/pages'], function () {

                        var options = {
                            alias: opts.alias,
                            parent_feature: PageManager.feature.id
                        };

                        console.log('@@ Fetching Current Application using = ' + options);

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);


                        fetchingApp.then(function (app) {

                            //console.log(app);

                            //IntranetManager.appLayout = Show.Controller.getPostLayoutView();
                            //IntranetManager.siteMainContent.show(IntranetManager.appLayout);
                            //IntranetManager.trigger('home:news:posts', alias);
                            //IntranetManager.trigger('dom:title', app.get('title'));
                           // console.log(' Options - ' +  JSON.stringify(opts));
                            return app;

                        }).then(function (app) {

                                var fetchingPost = IntranetManager.request('pages:post', opts.id);

                                return  fetchingPost.then(function (post) {

                                   // alert('post fetched');
                                   // console.log(post);

                                    IntranetManager.layoutContent.reset();
                                    IntranetManager.layoutContent.show(that.getDetailsView(post));

                                    IntranetManager.trigger('dom:title', post.get('title'));

                                    return post;

                                });

                            }).then(function (post) {


/*                            var options = {
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
                            IntranetManager.trigger('core:display:object:attachments', media.attachment);*/

                            }).fail(function (err) {
                                //alert(' an error occurred ' + err);
                                console.log('an error occurred ' + err);
                            });

                    });

                },



            }
        });

    return IntranetManager.PageManager.Public.Posts.Show.Controller;
});

