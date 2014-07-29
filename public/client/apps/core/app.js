define(
    [
        "app"
    ],
    function (IntranetManager) {
        IntranetManager.module("CoreManager", function (CoreManager, IntranetManager, Backbone, Marionette, $, _) {

            CoreManager.title = "CoreManager";


            CoreManager.code = "core";

            CoreManager.startWithParent = false;

            CoreManager.on('start', function () {
                console.log('<<< Started CoreManager Application >>>');
                // API.init();
            });

            CoreManager.onStop = function () {
                console.log('<<< Stopped CoreManager Application >>>');
            };

        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.CoreManager", function (CoreManagerRouter, IntranetManager,
                                                                    Backbone, Marionette, $, _) {

            CoreManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {}

            });

            var executeAction = function (action, arg) {
                IntranetManager.startSubApp("CoreManager");
                action(arg);
            };

            var API = {

                displayCategoryWidget: function (options) {
                    require([
                        "apps/core/public/controller"
                    ], function (CoreController) {
                        CoreController.showCategoriesWidget(options);
                    });
                },

                displayTagWidget: function (options) {
                    require([
                        "apps/core/public/controller"
                    ], function (CoreController) {
                        CoreController.showTagsWidget(options);
                    });
                },

                displayAttachmentWidget: function (attachments) {
                    require([
                        "apps/core/public/controller"
                    ], function (CoreController) {
                        CoreController.showAttachmentWidget(attachments);
                    });
                },

                displayImageGallery: function (attachments) {

                    if(attachments != null){

                        if(attachments["images"]){
                            require([
                                "apps/core/public/controller"
                            ], function (CoreController) {
                                CoreController.showImageGalleryWidget(attachments.image_gallery[0]);
                            });

                            //this.template = homePostItemSmallMediaTpl;
                            //this.model.set('media_image', attachments.images[0]);
                        }

                    }
                }

            };

           //PUBLIC TRIGGERS

            IntranetManager.on('core:object:categories', function (options) {
                API.displayCategoryWidget(options);
            });

            IntranetManager.on('core:object:tags', function (options) {
                API.displayTagWidget(options);
            });

            IntranetManager.on('core:object:attachments', function (attachments) {
                API.displayAttachmentWidget(attachments);
            });

            IntranetManager.on('core:object:image:gallery', function (attachments) {
                API.displayImageGallery(attachments);
            });

            IntranetManager.on('core:error:action', function (error) {
                //API.displayImageGallery(attachments);
                alert('An application error has occurred, Please contact the administrator');
                console.group('Global Error Log');
                console.error(error);
                console.groupEnd();
            });

            IntranetManager.addInitializer(function () {
                new CoreManagerRouter.Router({
                    controller: API
                });
            });


        });

        console.info('--- Core App loaded ---');
        return IntranetManager.CoreManagerRouter;
    });

