define([
    "app",
    "apps/classifieds/public/entities/posts/new/views",
    "Q",
    "moment",
    "jquery-plugins"
], function ( IntranetManager, NewViews, Q ) {

    IntranetManager.module("ClassifiedsManager.Public.Posts.New",
        function ( Show, ClassifiedsManager, Backbone, Marionette, $, _ ) {

            Show.Controller = {

                getPostNewForm: function ( post ) {

                    return new NewViews.PostNewFormView({
                        model: post
                    });

                },

                displayPostNewForm: function ( ) {


                    var that = this;

                    require(['entities/applications', 'entities/classifieds', 'entities/attachment'], function () {

                        console.group('@@ Classifieds - displayPostNewForm');

                        var options = {
                            parent_feature: ClassifiedsManager.feature.id
                        };

                        IntranetManager.trigger('dom:title', 'New Classified Ad Form');
                        IntranetManager.trigger('classifieds:public:action:menu');

                        var newRecord = IntranetManager.request("classifieds:posts:new");

                        fetchingApps= IntranetManager.request('applications:search:feature', 'classifieds');


                        fetchingApps.then(function(apps){
                          //  console.log(apps);

                            return apps;

                        }).then(function(apps){

                            newRecord.set('categories', apps);

                            newRecord.set('title', 'New Classified Ad Form');

                            var view = that.getPostNewForm(newRecord);

                            console.group('@@ New record from Request');
                            console.log(newRecord);
                            console.groupEnd();

                            // Backbone.Validation.bind(view);

                            view.on('form:cancel', function () {
                                IntranetManager.trigger('sites:default');
                            });

                            view.on("form:submit", function ( data ) {

                                //remove the categories field before saving
                                newRecord.unset('categories', 'silent');

                                data = _.omit(data, 'attachments');

                                console.group('@@ Data collected for submission');
                                console.log(data);
                                console.groupEnd();

                                var saveRecord = IntranetManager.request("classifieds:app:posts:new", {parent_application: data.parent_application});

                                saveRecord.save(data)
                                    .then(function(model){

                                        console.group('Saved Classified');
                                        console.log(newRecord);
                                        console.groupEnd();

                                        var newImage = IntranetManager.request("attachment:entity:new");

                                        var imgData = {
                                            attachments:  $("#ad_attachments")[0].files[0]
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
                                                    saveRecord.set('attachments', model.attachments);

                                                    return model;
                                                });
                                        }else{
                                            return model;
                                        }

                                    }).then(function(model){

                                        console.group('Saved Ad + Attachments');
                                        console.log(saveRecord);

                                        saveRecord.save();
                                        var success = new NewViews.NotificationView({ type: 'success', text: 'Ad saved successfully' });
                                        console.groupEnd();

                                        var resetRecord= IntranetManager.request("classifieds:posts:new");
                                        resetRecord.set('categories', apps);

                                        var viewReset = that.getPostNewForm(resetRecord);

                                        viewReset.triggerMethod('form:reset');

                                        IntranetManager.layoutContent.reset();
                                        IntranetManager.layoutContent.show(viewReset);
                                    })

                            });

                             view.on('show', function(){
                                 IntranetManager.layoutHeader.reset();
                                 IntranetManager.layoutSearch.reset();
                                 IntranetManager.layoutZone3.reset();
                             });



                            IntranetManager.layoutContent.reset();
                            IntranetManager.layoutContent.show(view);

                        })







                    });

                }

            }
        });

    return IntranetManager.ClassifiedsManager.Public.Posts.New.Controller;
});

