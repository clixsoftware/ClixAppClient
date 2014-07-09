/*
 * Application: News Manager
 * Controller: News Manager Post New Controller
 * Module: NewsManager.Posts.New.Controller
 * */


define([
    "app",
    "apps/feature/entities/features/edit/views",
    "apps/feature/common/views"
], function ( IntranetManager, EditViews, CommonViews ) {

    IntranetManager.module("FeatureManager.Features.Edit",
        function ( Edit, IntranetManager, Backbone, Marionette, $, _ ) {

            Edit.Controller = {

                loadForm: function ( id ) {


                    var cb = function () {

                        require([
                            "entities/feature"
                        ], function () {

                            var fetchingRecord = IntranetManager.request('feature:entity', id);


                            $.when(fetchingRecord).done(function ( fetchedRecord ) {

                                if (fetchedRecord != undefined) {

                                    var view = new EditViews.FormView({
                                        model: fetchedRecord
                                    });

                                    view.on('form:cancel', function () {
                                        IntranetManager.trigger('feature:admin:home');
                                    });

                                    view.on("form:submit", function ( data ) {

                                        if (fetchedRecord.save(data)) {
                                            console.log('saved ok');
                                            console.log(data);
                                        } else {
                                            view.triggerMethod("form:data:invalid");
                                        }
                                    });


                                    IntranetManager.layoutHeader.show(new EditViews.HeaderView());
                                    IntranetManager.layoutContent.show(view);

                                    IntranetManager.layoutZone1.reset();
                                    IntranetManager.layoutSearch.reset();
                                    IntranetManager.layoutZone2.reset();


                                }


                            });

                        });

                    };

                    IntranetManager.trigger("feature:admin:init", cb);


                }
            };
        });

    return IntranetManager.FeatureManager.Features.Edit.Controller;
});
