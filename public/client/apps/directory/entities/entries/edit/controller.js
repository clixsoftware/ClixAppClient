/*
 * Application: News Manager
 * Controller: News Manager Post New Controller
 * Module: NewsManager.Posts.New.Controller
 * */


define([
    "app",
    "apps/directory/entities/entries/edit/views",
    "apps/directory/entities/entries/common/views"
], function ( IntranetManager, EditViews, PostsViews ) {

    IntranetManager.module("DirectoryManager.Posts.Edit",
        function ( Edit, IntranetManager, Backbone, Marionette, $, _ ) {

            Edit.Controller = {

                loadForm: function ( id ) {

                    console.group('DirectoryManager: Posts: Edit: loadForm');

                    var cb = function () {

                        require([
                            "entities/dir_entry"
                        ], function () {

                            var fetchingRecord = IntranetManager.request('directory:contact:single', id);

                            fetchingRecord.then(function(post){

                                console.info('Fetched record found!');

                                var view = new EditViews.FormView({
                                    model: post
                                });


                                view.on('form:cancel', function () {
                                    // alert('fomrm cancelled');
                                    IntranetManager.trigger('directory:admin:application:contacts', post.get('parent_application'));
                                });

                                view.on("form:submit", function ( data ) {

                                   // post.set('updatedby_user_id', IntranetManager.Auth.userId);

                                   // var postData = _.omit(data, 'start_date', 'expiry_date');

                                    var title = data.first_name + ' ' + data.last_name;
                                    post.set('title', title);
                                    console.log('data to be updated ' + data);
                                    if (post.save(data, {


                                        success: function ( model, response ) {
                                            //var successView = Show.Controller.getSuccessMessageView();
                                            IntranetManager.trigger('directory:admin:application:contacts', post.get('parent_application'));
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

                    IntranetManager.trigger("directory:admin:init", cb);
                    console.groupEnd();

                }
            };
        });

    return IntranetManager.DirectoryManager.Posts.Edit.Controller;
});
