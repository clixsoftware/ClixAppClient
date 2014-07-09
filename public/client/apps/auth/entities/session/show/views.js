/*
 * Application: Auth Manager
 * Views: AuthManager Show Views
 * Module: AuthManager.Show.Views
 *
 * */


define([
    "app",
    "common/views",
    "tpl!apps/auth/entities/session/show/templates/signup.tpl",
    "tpl!apps/auth/entities/session/show/templates/login.tpl",
    "tpl!apps/auth/entities/session/show/templates/success_message.tpl",
    "semantic"
],
    function ( IntranetManager, CommonViews, signupTpl, loginTpl, successMessageTpl ) {

        IntranetManager.module("AuthManager.Session.Show.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {


                Views.SignupFormView = CommonViews.BaseFormView.extend({

                    template: signupTpl,

                    keyId: '#signup_',

                    ui: {
                        'email': '#signup_email'
                    },

                    onFormSubmitFailure: function(response){
                        var that  = this;
                        var $view = this.$el;

                        var $form = $view.find("form");
                        $form.addClass('error');
                        $("<div id='form-error-message' class='ui error message'><div class='header'>" + response.item.message + "</p></div>").insertBefore($form);


                    }

                });


                Views.LoginFormView = Marionette.ItemView.extend({
                    template: loginTpl,

                    initialize: function () {
                        $('#session_email').blur(function () {
                            if (!$(this).val()) {
                                alert('www');
                                $(this).parents('p').addClass('warning');
                            }
                        });
                    },

                    events: {
                        'click .js-submit': 'doLogin',
                        'blur #session_email': 'validateEmail',
                        'blur #session_password': 'validatePassword'
                    },

                    ui: {
                        email: '#session_email',
                        password: '#session_password'
                    },

                    errors: [],

                    raiseError: function ( eid, el, text ) {

                        var found = _.find(this.errors, function ( id ) {

                            return id === eid;

                        });

                        if (!found) {
                            this.errors.push(eid);

                            var $controlGroup = $(el).parent();
                            var $errorEl = $("<div>", { class: "ui red pointing above ui label  js-error " + eid, text: text });
                            $controlGroup.append($errorEl).addClass("error " + eid);

                        }

                    },

                    clearFieldError: function ( eid ) {
                        $('.js-error.' + eid).remove();
                        $('.error.' + eid).removeClass("error");

                        this.errors = _.reject(this.errors, function ( id ) {
                            return id === eid;
                        });

                    },

                    validateEmail: function () {

                        if (this.ui.email.val().length < 1) {
                            this.raiseError('email', this.ui.email, 'Field cannot be blank');
                            return;
                        }

                        this.clearFieldError('email');

                    },

                    validatePassword: function () {

                        if (this.ui.password.val().length < 1) {
                            this.raiseError('password', this.ui.password, 'Field cannot be blank');
                            return;
                        }

                        this.clearFieldError('password');

                    },


                    doLogin: function () {
                        this.validatePassword();
                        this.validateEmail();
                        this.credentials.email = this.ui.email.val();
                        this.credentials.password = this.ui.password.val();
                        if (this.errors.length === 0) {
                            this.trigger("form:submit", this.credentials);
                        }

                    },

                    credentials: {}


                });


                Views.SuccessMessageView = Marionette.ItemView.extend({
                    template: successMessageTpl

                });
            });

        return IntranetManager.AuthManager.Session.Show.Views;
    });
