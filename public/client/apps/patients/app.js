/*
 * Application: News Manager
 * */

define(
    [
        "app"
    ],
    function (IntranetManager) {
        IntranetManager.module("PatientManager", function (PatientManager, IntranetManager, Backbone, Marionette, $, _) {

            PatientManager.title = "PatientManager Manager";


            PatientManager.code = "newsmanager";

            PatientManager.startWithParent = false;

            PatientManager.on('start', function () {
                console.log('<<< Started PatientManager Application >>>');
                // API.init();
            });

            PatientManager.onStop = function () {
                console.log('<<< Stopped PatientManager Application >>>');
            };

        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.PatientManager", function (PatientManagerRouter, IntranetManager, Backbone, Marionette, $, _) {

            PatientManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {
                    "hmis/:alias/patients": 'loadApplicationHome',
                    "hmis/:alias/patients/:patientId/*slug": 'loadPatientDetailsPage'

                }

            });

            var executeAction = function (action, arg) {
                IntranetManager.startSubApp("PatientManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                //PUBLIC FUNCTIONS

                //initialize public interface and load the layout
                initPublic: function (cb) {

                    require([
                        "apps/patients/public/common/controller"
                    ], function (CommonController) {
                        //alert('init layout');
                        executeAction(CommonController.initAppEngine, cb);
                    });

                },


                loadApplicationHome: function(alias){

                    console.log('Showing the patients home alias ' + alias);

                    var options = {
                        feature: 'hmis',
                        alias: alias
                    };

                    var cb = function () {
                        require([
                            "apps/patients/public/entities/patient/list/controller"
                        ], function (ListController) {
                            ListController.showPatientsList(options);

                        });
                    };

                    IntranetManager.trigger("patients:public:init", cb);
                },

                loadPatientDetailsPage: function (alias, patientId, slug) {
                    var opts = {
                        patientId: patientId,
                        feature: 'hmis',
                        alias: alias,
                        slug: slug
                    };

                    console.log(opts.slug);

                   var cb = function () {
                        require([
                            "apps/patients/public/entities/patient/show/controller"
                        ], function (ShowController) {
                            ShowController.showDetailsPage(opts);
                        });
                    };

                    IntranetManager.trigger("patients:public:init", null);

                }

            };

          //PUBLIC TRIGGERS

            IntranetManager.on('patients:public:init', function (cb) {
                //IntranetManager.navigate("workspace");
                API.initPublic(cb);
            });


            IntranetManager.addInitializer(function () {
                new PatientManagerRouter.Router({
                    controller: API
                });
            });


        });

        return IntranetManager.PatientManagerRouter;
    });

