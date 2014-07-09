define([
    "app",
    "cookie"
], function ( IntranetManager ) {

    IntranetManager.module("AuthManager.Entities",
        function ( Entities, IntranetManager, Backbone, Marionette, $, _ ) {

            Entities.SessionModel = Backbone.Model.extend({
                url : '/api/session',

                initialize : function(){
                    //Ajax Request Configuration
                    //To Set The CSRF Token To Request Header
                    $.ajaxSetup({
                        headers : {
                           // 'X-CSRF-Token' : csrf
                        }
                    });

                },
                validate: function ( attrs, options ) {

                    var errors = {};
                    if (! attrs.email) {
                        errors.title = "can't be blank";
                    }
                    if (! attrs.password) {
                        errors.alias = "can't be blank";
                    }
                    else{
                        if (attrs.email.length < 2) {
                            errors.alias = "is too short";
                        }
                    }
                    if( ! _.isEmpty(errors)){
                        return errors;
                    }

                    alert(attrs.email);

                   //alert('errors found ' + errors.length);
                },
                login : function(credentials){
                    //console.log(JSON.stringify(credentials));

                    //alert(this.isValid);
                    var that = this;
                    var login = $.ajax({
                        url :  'http://localhost:3100/api/v1/auth/login', //this.url + '/session',
                        data : credentials,
                        type : 'POST',
                        statusCode: {
                            404: function(err){
                               // alert('invalid username or password');
                                console.log(JSON.stringify(err));
                                alert(err.responseJSON.item.message);
                            }
                        }

                    });
                    login.done(function(response, err){
                        alert(err);
                        console.log(JSON.stringify(response));
                        if(response.success){
                            that.set('authenticated', response.authenticated);
                            that.set('user', response.user);
                            $.cookie('hospitalnet-auth', response.authenticated, { expires: 7, path: '/' });
                            $.cookie('hospitalnet-user', response.user, { expires: 7, path: '/' });

                            IntranetManager.Auth.user = response.user;
                            IntranetManager.Auth.isAuthenticated = true;
                            IntranetManager.Auth.userId = response.user.username;
                            IntranetManager.trigger('homepage:show');
                            IntranetManager.trigger('user:logged:in');
                        }else{
                            alert('Could not log in the user');

                            console.log('login failed ' + response.item.message)
                        }

                    });
                }

            });

            Entities.SignupModel = Backbone.Model.extend({

                urlRoot: "http://localhost:3100/api/v1/auth/signup",

                defaults: {
                   // first_name: "New Workspace"
                },

                validate: function ( attrs, options ) {

                    var errors = {};
                    if (! attrs.email) {
                        errors.email = "can't be blank";
                    }

                    if (! attrs.password) {
                        errors.password = "can't be blank";
                    }

                    if (! attrs.confirm_password) {
                        errors.confirm_password = "can't be blank";
                    }

                    if (attrs.confirm_password != attrs.password) {
                        errors.confirm_password = "passwords do not match";
                        errors.password = "passwords do not match";
                    }

                    if( ! _.isEmpty(errors)){
                        return errors;
                    }

                }
            });


            var API = {};

            IntranetManager.reqres.setHandler("auth:signup:entity:new", function () {
                return new Entities.SignupModel();
            });

            IntranetManager.reqres.setHandler("auth:session:entity:new", function () {
                return new Entities.SessionModel();
            });

            IntranetManager.reqres.setHandler("auth:login", function (credentials) {
                var sess = new Entities.SessionModel();
                sess.login(credentials);
                return sess;
            });

        });

    return;
});
