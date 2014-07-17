define([
    "app",
    "apps/patients/public/entities/patient/show/views",
    "moment"
], function (IntranetManager, PostShowViews) {

    IntranetManager.module("PatientManager.Public.Patients.Show",
        function (Show, PatientManager, Backbone, Marionette, $, _) {

            Show.Controller = {

                getPublicView: function (post) {
                    return new PostShowViews.PublicView({
                        model: post
                    });
                },

                showDetailsPage: function (opts) {
                    // alert('showing a public news post' + opts.slug);
                    var that = this;

                    require(['entities/applications', 'entities/patients'], function () {


                        var options = {
                            alias: opts.alias,
                            parent_feature: PatientManager.feature.id
                        };

                        console.log('@@ Fetching Current Application using = ' + options);

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);


                        fetchingApp.then(function (app) {
                            console.log(app);
                            return app;

                        }).then(function (app) {
                            console.log('Fetching patient details');

                            var fetchingPatient = IntranetManager.request("patients:find:entity:patient_i", opts.patientId);

                            return fetchingPatient.then(function (patient) {
                                // console.log(post);

                                var that_patient = patient;

                                var layout = that.getPostLayoutView();

                                layout.on('show', function () {
                                    layout.postContent.show(that.getPublicView(that_patient));
                                    layout.postRelated.show(that.getSidebarView(that_patient));
                                    layout.postMedia.show(that.getImageView(that_patient));
                                    layout.postTitle.show(that.getTitleView(that_patient));
                                });

                                IntranetManager.appLayout = layout;


                                IntranetManager.layoutContent.reset();
                                IntranetManager.layoutContent.show(IntranetManager.appLayout)
                                )
                                ;

                                IntranetManager.trigger('dom:title', that_patient.get('title'));

                                return that_patient;

                            });

                        }).then(function (patient) {

                            // alert(newspost);
                            // alert('post fetched and returned');
                            /*                            IntranetManager.trigger('news:public:posts:categories', patient.get('uuid'));
                             IntranetManager.trigger('news:post:related:tags', patient.get('uuid'));

                             IntranetManager.trigger('news:public:posts:recent', newspost.get('parent_application'));*/

                        }).fail(function (err) {
                            //alert(' an error occurred ' + err);
                            console.log('an error occurred ' + err);
                        });

                    });

                }
            }
        });

    return IntranetManager.PatientManager.Public.Patients.Show.Controller;
});

