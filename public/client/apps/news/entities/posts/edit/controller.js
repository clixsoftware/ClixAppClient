/*
 * Application: News Manager
 * Controller: News Manager Post New Controller
 * Module: NewsManager.Posts.New.Controller
 * */


define([
    "app",
    "apps/news/entities/posts/edit/views",
    "apps/news/entities/posts/common/views"
], function ( IntranetManager, EditViews, PostsViews ) {

    IntranetManager.module("NewsManager.Posts.Edit",
        function ( Edit, IntranetManager, Backbone, Marionette, $, _ ) {

            Edit.Controller = {

                loadForm: function ( id ) {

                    console.group('NewsManager: Posts: Edit: loadForm');

                    var cb = function () {

                        require([
                            "entities/news_post"
                        ], function () {

                            var fetchingRecord = IntranetManager.request('news:posts:entity', id);


                            $.when(fetchingRecord).done(function ( fetchedRecord ) {

                                console.warn('Fetched record completed!');

                                if (fetchedRecord != undefined) {

                                    console.info('Fetched record found!');

                                    var view = new EditViews.FormView({
                                        model: fetchedRecord
                                    });


                                    view.on('form:cancel', function () {
                                        // alert('fomrm cancelled');
                                        IntranetManager.trigger('news:admin:app:posts', fetchedRecord.get('parent_app'));
                                    });

                                    view.on("form:submit", function ( data ) {

                                        fetchedRecord.set('updatedby_user_id', IntranetManager.Auth.userId);

                                        var postData = _.omit(data, 'start_date', 'expiry_date');

                                        if (fetchedRecord.save(postData, {

                                            success: function ( model, response ) {
                                                //var successView = Show.Controller.getSuccessMessageView();
                                                IntranetManager.trigger('news:admin:app:posts', fetchedRecord.get('parent_app'));
                                            },

                                            error: function ( model, response ) {
                                                alert('there was an error');
                                                //console.log(response);
                                                //  console.log(response.responseJSON.item.message);
                                                //signupFormView.triggerMethod('form:submit:failure', response.responseJSON);
                                            }
                                        })) {

                                            IntranetManager.trigger('news:admin:app:posts', fetchedRecord.get('parent_app'));

                                        } else {
                                            view.triggerMethod("form:data:invalid", fetchedRecord.validationError);
                                        }

                                    });


                                    IntranetManager.layoutHeader.show(new EditViews.HeaderView());
                                    IntranetManager.layoutContent.show(view);

                                    IntranetManager.layoutZone1.show(new PostsViews.MenuView());
                                    IntranetManager.layoutSearch.reset();
                                    IntranetManager.layoutZone2.reset()


                                    $('.js-form-tab.menu .item').tab({
                                        history: false
                                    });
                                    $('.ui.checkbox').checkbox();

                                }


                            });

                        });

                    };

                    IntranetManager.trigger("news:admin:init", cb);
                    console.groupEnd();

                }
            };
        });

    return IntranetManager.NewsManager.Posts.Edit.Controller;
});
