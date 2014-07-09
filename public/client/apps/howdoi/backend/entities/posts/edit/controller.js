/*
 * Application: News Manager
 * Controller: News Manager Post New Controller
 * Module: NewsManager.Posts.New.Controller
 * */


define([
    "../../../../../../app",
    "apps/yp/entities/posts/edit/views",
    "apps/yp/entities/posts/common/views"
], function ( IntranetManager, EditViews, PostsViews ) {

    IntranetManager.module("YPManager.Posts.Edit",
        function ( Edit, IntranetManager, Backbone, Marionette, $, _ ) {

            Edit.Controller = {

                loadForm: function ( id ) {

                    console.group('YPManager: Posts: Edit: loadForm');

                    var cb = function () {

                        require([
                            "../../../../../../entities/yp_post"
                        ], function () {

                            var fetchingRecord = IntranetManager.request('yp:posts:entity', id);

                            fetchingRecord.then(function(post){

                                console.info('Fetched record found!');

                                var view = new EditViews.FormView({
                                    model: post
                                });


                                view.on('form:cancel', function () {
                                    // alert('fomrm cancelled');
                                    IntranetManager.trigger('yp:admin:app:posts', post.get('parent_application'));
                                });

                                view.on("form:submit", function ( data ) {

                                   // post.set('updatedby_user_id', IntranetManager.Auth.userId);

                                   // var postData = _.omit(data, 'start_date', 'expiry_date');

                                    console.log('data to be updated ' + data);
                                    if (post.save(data, {


                                        success: function ( model, response ) {
                                            //var successView = Show.Controller.getSuccessMessageView();
                                            IntranetManager.trigger('yp:admin:app:posts', post.get('parent_application'));
                                        },

                                        error: function ( model, response ) {
                                            alert('there was an error');
                                            //console.log(response);
                                            //  console.log(response.responseJSON.item.message);
                                            //signupFormView.triggerMethod('form:submit:failure', response.responseJSON);
                                        }
                                    })) {

                                        //IntranetManager.trigger('yp:admin:app:posts', post.get('parent_application'));

                                    } else {
                                        view.triggerMethod("form:data:invalid", post.validationError);
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

                            });

                        });

                    };

                    IntranetManager.trigger("news:admin:init", cb);
                    console.groupEnd();

                }
            };
        });

    return IntranetManager.YPManager.Posts.Edit.Controller;
});
