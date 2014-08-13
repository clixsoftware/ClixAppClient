define([
    "app",
    "apps/support/public/entities/services/posts/show/views",
    "moment"
], function (IntranetManager, PostShowViews) {

    IntranetManager.module("SupportManager.Public.Services.Posts.Show",
        function (Show, SupportManager, Backbone, Marionette, $, _) {

            Show.Controller = {

                getPostLayoutView: function () {
                    return new PostShowViews.PostLayoutView();

                },

                getPublicView: function (post) {
                    return new PostShowViews.PublicView({
                        model: post
                    });
                },

                showPostDetails: function (opts) {

                    console.group('<< Support:: Service: List: showPostDetails  >>');

                    console.group('supports Options');
                    console.log(opts);
                    console.groupEnd();

                    var that = this;

                    require(['entities/applications', 'entities/support'], function () {

                        var options = {
                            alias: opts.alias,
                            parent_feature: SupportManager.feature.id
                        };

                        console.group('@@ Fetching supports Application ' );
                        console.log(options);
                        console.groupEnd();

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);

                        fetchingApp.then(function (app) {
                            console.group('supports App');
                            console.log(app);
                            console.groupEnd();

                            var fetchingPost = IntranetManager.request("support:app:posts:entity", {
                                id: opts.post_id,
                                parent_application: app.id,
                                model: "services"
                            });

                            return fetchingPost.then(function (post) {

                                var layout = that.getPostLayoutView();

                                IntranetManager.layoutContent.reset();
                                IntranetManager.layoutContent.show(that.getPublicView(post));

                                IntranetManager.trigger('dom:title', post.get('title'));

                                return [post, app];

                            }).spread(function (post, app) {

                                var appUrls = app.get('urls');

                                IntranetManager.trigger('core:object:categories', {
                                    collection: post.get('taxonomy'),
                                    url:  app.get('path') + '/posts-by-category/{{slug}}?uuid={{uuid}}',
                                    urlTrigger: "support:category:posts"
                                });

                                IntranetManager.trigger('core:object:tags', {
                                    collection: post.get('taxonomy'),
                                    url: app.get('path') + '/posts-by-tag/{{slug}}'
                                });

                                IntranetManager.trigger('support:posts:recent', {parent_application: app.id});

                                IntranetManager.trigger('support:popular:posts', {parent_application: app.id});

                                IntranetManager.trigger('core:object:breadcrumbs', {
                                    crumbs: [
                                        {title: app.get('title'), url:appUrls.friendly.href},
                                        {title: post.get('short_title'), url:''}
                                    ]
                                });

                            }).fail(function (err) {
                                IntranetManager.trigger('core:error:action', err);

                            });

                        });

                    });


                },

                showServiceRequest: function (opts) {

                    console.group('<< Support:: Service: List: showServiceRequest  >>');

                    console.group('Service  Options');
                    console.log(opts);
                    console.groupEnd();

                    var that = this;

                    require(['entities/applications', 'entities/support'], function () {

                        var options = {
                            alias: opts.alias,
                            parent_feature: SupportManager.feature.id
                        };

                        console.group('@@ Fetching Support Application ' );
                        console.log(options);
                        console.groupEnd();

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);

                        fetchingApp.then(function (app) {
                            console.group('support App');
                            console.log(app);
                            console.groupEnd();

                            var fetchingPost = IntranetManager.request("support:app:posts:entity", {
                                id: opts.post_id,
                                parent_application: app.id,
                                model: "services"
                            });

                            return fetchingPost.then(function (post) {

                                var triggers = post.get('form_triggers');

                                console.log(triggers);
                                IntranetManager.trigger(triggers.create, post);

                                //IntranetManager.layoutContent.reset();
                                //IntranetManager.layoutContent.show(that.getDetailsView(post));

                                IntranetManager.trigger('dom:title', post.get('title'));

                                return [post, app];

                            }).spread(function (post, app) {

/*                                var appUrls = app.get('urls');

                                IntranetManager.trigger('core:object:categories', {
                                    collection: post.get('taxonomy'),
                                    url:  app.get('path') + '/posts-by-category/{{slug}}?uuid={{uuid}}',
                                    urlTrigger: "support:category:posts"
                                });

                                IntranetManager.trigger('core:object:tags', {
                                    collection: post.get('taxonomy'),
                                    url: app.get('path') + '/posts-by-tag/{{slug}}'
                                });

                                IntranetManager.trigger('support:posts:recent', {parent_application: app.id});

                                IntranetManager.trigger('support:popular:posts', {parent_application: app.id});

                                IntranetManager.trigger('core:object:breadcrumbs', {
                                    crumbs: [
                                        {title: app.get('title'), url:appUrls.friendly.href},
                                        {title: post.get('short_title'), url:''}
                                    ]
                                });*/

                            }).fail(function (err) {
                                IntranetManager.trigger('core:error:action', err);

                            });

                        });

                    });


                }
            }

        });

    return IntranetManager.SupportManager.Public.Services.Posts.Show.Controller;
});

