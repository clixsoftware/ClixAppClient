define([
    "app",
    "apps/support/public/entities/services/new/views",
    "moment"
], function ( IntranetManager, NewViews ) {

    IntranetManager.module("SupportManager.Public.Services.New",
        function ( Show, SupportManager, Backbone, Marionette, $, _ ) {

            Show.Controller = {

                getContactUpdateForm: function ( post ) {

                    return new NewViews.ContactUpdateFormView({
                        model: post
                    });

                },

                showContactUpdateForm: function ( service ) {
                    console.group('@@ Service');
                    console.log(service);
                    console.groupEnd();

                    var that = this;

                    require(['entities/applications', 'entities/support'], function () {

                        var options = {
                            alias: service.get('parent_application_alias'),
                            parent_feature: SupportManager.feature.id
                        };


                        console.group('@@ Fetching Current Application using: options');
                        console.log(options);
                        console.groupEnd();
                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);


                        fetchingApp.then(function ( app ) {

                            //console.log(app);

                            //IntranetManager.appLayout = Show.Controller.getPostLayoutView();
                            //IntranetManager.siteMainContent.show(IntranetManager.appLayout);
                            //IntranetManager.trigger('home:news:posts', alias);
                            IntranetManager.trigger('dom:title', service.get('title'));
                            var newRecord = IntranetManager.request("support:ticket:new", service);

/*                            newRecord.validation["custom_fields.contact_name"] = {
                             required: true,
                             pattern: 'email',
                             msg: 'Your contact name is required'
                             };*/


                            var view = that.getContactUpdateForm(newRecord);

                            console.group('@@ New record from Request');
                            console.log(newRecord);
                            console.groupEnd();


                           // Backbone.Validation.bind(view);

                            //console.log(newRecord.isValid());


                            view.on('form:cancel', function () {
                                IntranetManager.trigger('featuremanager:home:show');
                            });

                            view.on("form:submit", function ( data ) {

                                console.group('@@ Data collected for submission');
                                console.log(data);
                                console.groupEnd();



                                var savedData = {
                                    title: data.title,
                                    service: data.service,
                                    parent_application_alias: data.parent_application_alias,
                                    parent_application_feature: data.parent_application_feature,
                                    requestor_email: data.requestor_email,
                                    requestor_name: data.requestor_name,
                                    custom_fields: _.omit(data, 'title', 'parent_application', 'service', 'parent_application_alias', 'parent_application_feature', 'requestor_name', 'requestor_email')
                                  };

                                 console.group('@@ Data passed to model');
                                 console.log(savedData);
                                 console.groupEnd();

                                 newRecord.save(savedData, {
                                    success: function ( model, response, options ) {
                                        //var successView = Show.Controller.getSuccessMessageView();
                                        //IntranetManager.trigger("applayout:show:formregion", successView);
                                        alert('save successful');
                                        var success = new NewViews.NotificationView({ type: 'success', text: 'Book saved successfully' });

                                        console.log(model);
                                        console.log(response);
                                        console.log(response.id);
                                    },

                                    error: function ( model, response, options ) {
                                        //alert('there was an error');
                                        //console.log(response);
                                        //  console.log(response.responseJSON.item.message);
                                       // signupFormView.triggerMethod('form:submit:failure', response.responseJSON);

                                        console.log(response.responseJSON);

                                    }
                                });



/*                               if (newRecord.save(savedData)) {

                                   alert(newRecord.id);

                                   console.group('@@ Saved Record');
                                   console.log(newRecord);
                                   console.groupEnd();


                                    view.triggerMethod('form:data:ok');

                                } else {

                                    view.model.bind('validated:invalid', function ( model, errors ) {
                                        console.group('@@ Form Errors');
                                        console.log(errors);
                                        console.groupEnd()

                                    });

                                    view.triggerMethod('form:data:invalid');
                                }*/


                            });

                            IntranetManager.layoutContent.reset();
                            IntranetManager.layoutContent.show(view);

                        }).fail(function ( err ) {
                            //alert(' an error occurred ' + err);
                            console.log('an error occurred ' + err);
                        });

                    });

                },

                getFeedbackFormView: function ( post ) {

                    return new NewViews.FeedbackFormView({
                        model: post
                    });

                },


                showFeedbackForm: function ( service ) {

                    console.log(service);

                    var that = this;

                    require(['entities/applications', 'entities/support'], function () {

                        var options = {
                            alias: service.get('parent_application_alias'),
                            parent_feature: SupportManager.feature.id
                        };


                        console.group('@@ Fetching Current Application using: options');
                        console.log(options);
                        console.groupEnd();
                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);


                        fetchingApp.then(function ( app ) {

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
                                    view.model.bind('validated:invalid', function ( model, errors ) {

                                        console.log('errors ' + JSON.stringify(errors));
                                    });

                                    view.triggerMethod('form:data:invalid');
                                }
                            });
                            IntranetManager.layoutContent.reset();
                            IntranetManager.layoutContent.show(view);

                        }).fail(function ( err ) {
                            //alert(' an error occurred ' + err);
                            console.log('an error occurred ' + err);
                        });

                    });

                }

            }
        });

    return IntranetManager.SupportManager.Public.Services.New.Controller;
});

