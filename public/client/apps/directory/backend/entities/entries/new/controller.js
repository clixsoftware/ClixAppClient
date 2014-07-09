/*
 * Application: News Manager
 * Controller: News Manager Post New Controller
 * Module: YPManager.Posts.New.Controller
 * */


define([
    "app",
    "apps/directory/entities/entries/new/views",
    "apps/directory/common/views",
    "apps/directory/entities/entries/common/views"
], function(IntranetManager, NewViews, CommonViews, PostsCommonViews){

    IntranetManager.module("DirectoryManager.Posts.New",
        function(New,
                 IntranetManager,
                 Backbone,
                 Marionette,
                 $, _){

    New.Controller = {

        loadForm: function(id){



            var cb = function(){
                console.group('DirectoryManager: New: Contact: loadForm');

                console.log('App id '  +  id);

                require([
                    "entities/dir_entry",
                    "entities/applications"
                ], function(){


                    var fetchApp = IntranetManager.request('applications:entity', id);
                    console.log('the returned ' + JSON.stringify(fetchApp));

                    fetchApp.then(function(app){
                        var endpoint = '';
                        var newPost = IntranetManager.request("directory:service:application:contact:new", id);

                        //newPost.set('edit_url', app.get('edit_url'));
                        //newPost.set('createdby_user_id', app.get('createdby_user_id'));
                        //newPost.set('updatedby_user_id', app.get('updatedby_user_id'));
                        newPost.set('parent_application', id);
                       // newPost.set('path', appmodel.get('path'));
                        //newPost.set('url', appmodel.get('url'));


                        //alert('new workspace received' + newWorkspace.get('title'));

                        var view = new PostsCommonViews.FormView({
                            model: newPost
                        });

                        Backbone.Validation.bind(view);

                        view.on('form:cancel', function(){
                            IntranetManager.trigger('directory:admin:application:contacts', id);
                        });

                        view.on("form:submit", function ( data ) {
                            var title = data.first_name + ' ' + data.last_name;
                            newPost.set('title', title);

                            if (newPost.save(data)) {
                                //newPost.set('edit_url', app.get('edit_url'));
                                //newPost.set('createdby_user_id', app.get('createdby_user_id'));



                                console.log('saving the post data' + data);
                                IntranetManager.trigger('directory:admin:application:contacts', id);

                            } else {
                                view.triggerMethod("form:data:invalid", newPost.validationError);
                            }
                        });
                        IntranetManager.layoutZone1.show(new NewViews.MenuView());
                        //IntranetManager.layoutHeader.show( new NewViews.HeaderView());
                        IntranetManager.layoutContent.show(view );

                        IntranetManager.layoutSearch.reset();

/*
                        $('.js-form-tab.menu .item').tab({
                            history: false
                        });
                        $('.ui.checkbox').checkbox();*/

                    });


                });

            };

            IntranetManager.trigger("yp:admin:init", cb);
            console.groupEnd();

      }
    };
  });

  return IntranetManager.DirectoryManager.Posts.New.Controller;
});
