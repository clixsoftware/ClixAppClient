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

                    var cb = function () {

                        console.log('Loaded new form for Feature');

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
                                IntranetManager.trigger('featuremanager:home:show');
                            });

                            view.on("form:submit", function ( data ) {

                                console.log(data);

                                if (newRecord.save(data)) {

                                      IntranetManager.trigger('featuremanager:home:show');

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

                    IntranetManager.trigger("newsmanager:init", cb);


                }
            };
        });

    return IntranetManager.FeatureManager.Features.New.Controller;
});
