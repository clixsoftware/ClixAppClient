/*
 * Application: AppManager
 * Controller: AppManager New Controller
 * Module: AppManager.New.Controller
 * */


define([
    "app",
    "apps/taxonomy/new/views"
], function ( IntranetManager, NewViews ) {

    IntranetManager.module("TaxonomyManager.New",
        function ( New, IntranetManager, Backbone, Marionette, $, _ ) {

            New.Controller = {

                getNewForm: function ( model ) {

                    return new NewViews.NewFormView({
                        model: model
                    })

                },

                loadForm: function (options) {

                    var that = this;

                    require([
                        "entities/taxonomy"
                    ], function () {

                        var newEntity = IntranetManager.request("taxonomy:entity:new");

                        var userId  = IntranetManager.Auth.userId;

                        newEntity.set('parent_app', options.appId);
                        newEntity.set('createdby_user_id', userId);
                        newEntity.set('updatedby_user_id', userId);


                        var newFormView = New.Controller.getNewForm(newEntity);

                        Backbone.Validation.bind(newFormView);


                        newFormView.on("form:submit", function ( data ) {

                            console.log('handling form submit in new controller');
                            if (newEntity.save(data, {

                                    success: function ( model, response ) {
                                        //var successView = Show.Controller.getSuccessMessageView();
                                        //IntranetManager.trigger("applayout:show:formregion", successView);
                                        //console.log('Id of the new model ' + newEntity.id);
                                        console.log(JSON.stringify(response));
                                        IntranetManager.trigger(options.trigger, options.appId);
                                    },

                                    error: function ( model, response ) {
                                        //alert('there was an error');
                                        //console.log(response);
                                        //  console.log(response.responseJSON.item.message);
                                        newFormView.triggerMethod('form:submit:failure', response.responseJSON);
                                    }
                                }))     {

                                console.log('everything ok ');
                                //IntranetManager.trigger("workspace:home:show", newWorkspace.get('alias'));
                                console.log('success ');

                            } else {
                                console.log('form data invalid, trigger form invalid');
                                newFormView.triggerMethod("form:data:invalid");
                            }



                        });

                        //var view = NewView.CreateForm();

                        IntranetManager.siteDialog.show(newFormView);
                        //$('.demo.menu .item').tab({
                        //    history: false
                       // });

                    });
                }
            };
        });

    return IntranetManager.TaxonomyManager.New.Controller;
});
