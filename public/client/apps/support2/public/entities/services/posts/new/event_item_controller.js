define([
    "../../../../../../../app",
    "apps/support/public/entities/services/new/views",
    "Q",
    "moment",
    "jquery-plugins"
], function ( IntranetManager, NewViews, Q ) {

    IntranetManager.module("SupportManager.Public.Services.New",
        function ( Show, SupportManager, Backbone, Marionette, $, _ ) {

            Show.Controller = {

                getServiceForm: function ( post ) {

                    return new NewViews.EventItemForm({
                        model: post
                    });

                },

                showServiceForm: function ( service ) {
                    console.group('@@ Service');
                    console.log(service);
                    console.groupEnd();

                    var that = this;

                    require(['../../../../../../../entities/applications', 'entities/support', 'entities/attachment'], function () {

                        var options = {
                            alias: service.get('parent_application_alias'),
                            parent_feature: SupportManager.feature.id
                        };


                        console.group('@@ Fetching Current Application using: options');
                        console.log(options);
                        console.groupEnd();
                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);


                        fetchingApp.then(function ( app ) {

                            IntranetManager.trigger('dom:title', service.get('title'));

                            var newRecord = IntranetManager.request("support:ticket:new", service);

                            //newRecord.set('title', 'Your Incident Subject');

                            var view = that.getServiceForm(newRecord);

                            console.group('@@ New record from Request');
                            console.log(newRecord);
                            console.groupEnd();

                           // Backbone.Validation.bind(view);

                            view.on('form:cancel', function () {
                                IntranetManager.trigger('featuremanager:home:show');
                            });

                            view.on("form:submit", function ( data ) {

                                console.group('@@ Data collected for submission');
                                console.log(data);
                                console.groupEnd();

                                newRecord.save(data)
                                    .then(function(model){

                                        console.group('Saved Ticket');
                                        console.log(newRecord);
                                        console.groupEnd();

                                        var newImage = IntranetManager.request("attachment:entity:new");


                                        var imgData = {
                                            attachments:  $("#support_attachments")[0].files[0]
                                        };

                                        if(!_.isEmpty(imgData.attachments)){

                                      imgData.parent_object = model.uuid;

                                        console.group('File Attachments');
                                        console.log(imgData);
                                        console.groupEnd();

                                        return newImage.save(imgData)
                                            .then(function(imageModel){

                                                console.group('Saved Attachments');
                                                console.log(imageModel);
                                                var attachments = imageModel.attachments;
                                                console.groupEnd();

                                                var files = [];
                                                files.push({
                                                    title: attachments[0].title,
                                                    uuid: attachments[0].uuid,
                                                    path: attachments[0].path
                                                });

                                                model.attachments = {
                                                    files: files
                                                };
                                                newRecord.set('attachments', model.attachments);

                                                return model;
                                            });
                                        }else{
                                            return model;
                                        }

                                    }).then(function(model){
                                        console.group('Saved Ticket + Attachments');
                                        console.log(newRecord);
                                        newRecord.save();
                                        var success = new NewViews.NotificationView({ type: 'success', text: 'Ticket saved successfully' });
                                        console.groupEnd();

                                        var resetRecord= IntranetManager.request("support:ticket:new", service);

                                        var viewReset = that.getServiceForm(resetRecord);
                                        viewReset.triggerMethod('form:reset');

                                        IntranetManager.layoutContent.reset();
                                        IntranetManager.layoutContent.show(viewReset);
                                    })

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

