/*
 * Application: News Manager
 * Controller: News Manager Post New Controller
 * Module: NewsManager.Posts.New.Controller
 * */


define([
    "app",
    "apps/feature/entities/features/new/views",
    "apps/feature/common/views"
], function ( IntranetManager, NewViews, CommonViews ) {

    IntranetManager.module("FeatureManager.Features.New",
        function ( New, IntranetManager, Backbone, Marionette, $, _ ) {

            New.Controller = {

                getHeaderView: function () {

                    var view = new CommonViews.ListHeaderView();

                    view.on('button:command:new', function () {
                        IntranetManager.trigger('featureManager:feature:new:form');
                    });

                    return view;

                },

                loadForm: function () {

                    console.group('<< FeatureManager: loadForm >>');

                    var cb = function () {

                        require([
                            "entities/feature"
                        ], function () {

                            var newRecord = IntranetManager.request("feature:entity:new");

                            var view = new NewViews.FormView({
                                model: newRecord
                            });

                            Backbone.Validation.bind(view);

                            //console.log(newRecord.isValid());


                            view.on('form:cancel', function () {
                                IntranetManager.trigger('feature:admin:home');
                            });

                            view.on("form:submit", function ( data ) {

                                console.log(data);

                                if (newRecord.save(data)) {

                                      IntranetManager.trigger('feature:admin:home');

                                } else {

                                    view.triggerMethod('form:data:invalid');
                                }
                            });

                            IntranetManager.layoutHeader.show(new NewViews.HeaderView());
                            IntranetManager.layoutContent.show(view);

                            IntranetManager.layoutZone1.reset();
                            IntranetManager.layoutSearch.reset();


                            $('.js-form-tab.menu .item').tab({
                                history: false
                            });

                            $('.ui.checkbox').checkbox();


                        });

                    };
                    console.groupEnd();

                    IntranetManager.trigger("feature:admin:init", cb);


                }
            };
        });

    return IntranetManager.FeatureManager.Features.New.Controller;
});
