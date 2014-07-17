/*
 * Application: Auth Manager
 * Controller: Session Show Views
 * Module: AuthManager.Session.Show.Views
 * */

define([
    "app",
    "apps/auth/entities/session/show/views"
], function (IntranetManager, ShowViews) {

    IntranetManager.module("AuthManager.Session.Show",
        function (Show, IntranetManager, Backbone, Marionette, $, _) {

            Show.Controller = {

                getSignupFormView: function (model) {
                    return new ShowViews.SignupFormView({
                        model: model
                    });
                },

                getLoginFormView: function () {
                    return new ShowViews.LoginFormView();
                },

                getSuccessMessageView: function () {
                    return new ShowViews.SuccessMessageView();
                },

                loadSignup: function () {

                    require([
                        "apps/auth/entities/session/model"
                    ], function () {

                        var newSignupModel = IntranetManager.request("auth:signup:entity:new");


                        var signupFormView = Show.Controller.getSignupFormView(newSignupModel);

                        signupFormView.on('form:submit', function (data) {

                            if (newSignupModel.save(data, {

                                success: function (model, response) {
                                    var successView = Show.Controller.getSuccessMessageView();
                                    IntranetManager.trigger("applayout:show:formregion", successView);
                                },

                                error: function (model, response) {
                                    //alert('there was an error');
                                    //console.log(response);
                                    //  console.log(response.responseJSON.item.message);
                                    signupFormView.triggerMethod('form:submit:failure', response.responseJSON);

                                }
                            })) {
                                console.log('doing sign up');
                                //IntranetManager.trigger("workspace:home:show", newWorkspace.get('alias'));
                                console.log('success ');

                            } else {
                                console.log('form data invalid, trigger form invalid');
                                signupFormView.triggerMethod("form:data:invalid", newSignupModel.validationError);
                            }
                        });

                        IntranetManager.trigger("applayout:show:formregion", signupFormView);

                    });

                },

                loadLogin: function () {

                    require([
                        "apps/auth/entities/session/model"
                    ], function () {

                        var loginView = Show.Controller.getLoginFormView();

                        loginView.on('form:submit', function () {
                            console.log("attempting to login");
                            IntranetManager.request("auth:login", loginView.credentials);

                        });

                        IntranetManager.siteHeader.reset();
                        IntranetManager.siteFooter.reset();
                        IntranetManager.siteMainContent.reset();
                        IntranetManager.siteMainContent.show(loginView);

                        IntranetManager.trigger('dom:title', 'Login');

                        //  IntranetManager.trigger("applayout:show:formregion", loginView);


                        // IntranetManager.mainRegion.show(layoutView);

                    });


                }


            }
        });

    return IntranetManager.AuthManager.Session.Show.Controller;
});
