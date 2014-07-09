define([
    "app",
    "apps/support/public/entities/posts/new/views",
    "moment"
], function (IntranetManager, NewViews) {

    IntranetManager.module("SupportManager.Public.Posts.New",
        function (Show, SupportManager, Backbone, Marionette, $, _) {

            Show.Controller = {

                getFeedbackFormView: function (post) {

                    return new NewViews.FeedbackFormView({
                        model: post
                    });

                },

                showFeedbackForm: function (alias) {

                    var that = this;

                    require(['entities/applications', 'entities/support'], function () {

                        var options = {
                            alias: alias,
                            parent_feature: SupportManager.feature.id
                        };


                        console.group('@@ Fetching Current Application using: options');
                        console.log(options);
                        console.groupEnd();
                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);


                        fetchingApp.then(function (app) {

                            //console.log(app);

                            //IntranetManager.appLayout = Show.Controller.getPostLayoutView();
                            //IntranetManager.siteMainContent.show(IntranetManager.appLayout);
                            //IntranetManager.trigger('home:news:posts', alias);
                           IntranetManager.trigger('dom:title', app.get('title'));
                           var newRecord = IntranetManager.request("support:entity:new");

                            var view = that.getFeedbackFormView(newRecord);

                            console.log(newRecord);

                            Backbone.Validation.bind(view);

                            //console.log(newRecord.isValid());


                            view.on('form:cancel', function () {
                                IntranetManager.trigger('featuremanager:home:show');
                            });

                            view.on("form:submit", function ( data ) {

                                console.log(newRecord);

                                //     alert('form submit handled');
                                //    console.log(data);

                                if (newRecord.save(data)) {

                                    //IntranetManager.trigger('featuremanager:home:show');
                                    //view.$('.js-toggle').trigger('click');
                                    alert('record saved');

                                } else {
                                    alert('data invalid');
                                    view.model.bind('validated:invalid', function(model, errors) {

                                        console.log('errors '  + JSON.stringify(errors));
                                    });

                                    view.triggerMethod('form:data:invalid');
                                }
                            });
                            IntranetManager.layoutContent.reset();
                            IntranetManager.layoutContent.show(view);

                        }).fail(function (err) {
                                //alert(' an error occurred ' + err);
                                console.log('an error occurred ' + err);
                            });

                    });

                },



            }
        });

    return IntranetManager.SupportManager.Public.Posts.New.Controller;
});

