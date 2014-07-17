/*
 * Application: Header Manager
 * Controller: Common Controller
 * Module: HeaderManager.Common
 * */

define([
    "app",
    "apps/footer/common/views",
    "backbone.validation"
], function (IntranetManager, CommonViews) {

    IntranetManager.module("FooterManager.Common",
        function (Common, IntranetManager, Backbone, Marionette, $, _) {

            Common.Controller = {

                getLayoutView: function () {
                    return new CommonViews.LayoutView();
                },


                getFeedbackFormView: function (model) {

                    return new CommonViews.FeedbackFormView({
                        model: model
                    });

                },

                getMainMenuView: function () {

                    return new CommonViews.MainMenuView();
                },

                getAltMenuView: function () {

                    return new CommonViews.AltMenuView();
                },

                setupLayout: function () {
                    var that = this;

                    IntranetManager.footerLayout = this.getLayoutView();

                    IntranetManager.footerLayout.on("show", function () {

                        IntranetManager.trigger('footer:show:feedback');
                        // IntranetManager.trigger('footer:show:menu');
                        // IntranetManager.trigger('footer:show:altmenu');
                        IntranetManager.siteFooterZone2.reset();
                        IntranetManager.siteFooterZone3.reset();

                        IntranetManager.siteFooterZone2.show(that.getMainMenuView());
                        IntranetManager.siteFooterZone3.show(that.getAltMenuView());

                    });
                    IntranetManager.siteFooter.reset();
                    IntranetManager.siteFooter.show(IntranetManager.footerLayout);
                },

                showFeedbackForm: function () {

                    var that = this;

                    require([
                        "entities/support"
                    ], function () {

                        var newRecord = IntranetManager.request("support:entity:new");

                        var view = that.getFeedbackFormView(newRecord);

                        console.log(newRecord);

                        Backbone.Validation.bind(view);

                        //console.log(newRecord.isValid());


                        view.on('form:cancel', function () {
                            IntranetManager.trigger('featuremanager:home:show');
                        });

                        view.on("form:submit", function (data) {

                            console.log(newRecord);

                            //     alert('form submit handled');
                            //    console.log(data);

                            if (newRecord.save(data)) {

                                //IntranetManager.trigger('featuremanager:home:show');
                                view.$('.js-toggle').trigger('click');

                            } else {
                                alert('data invalid');
                                view.model.bind('validated:invalid', function (model, errors) {

                                    console.log('errors ' + JSON.stringify(errors));
                                });

                                view.triggerMethod('form:data:invalid');
                            }
                        });

                        IntranetManager.siteFooterZone1.show(view);


                    });


                }

            }
        });

    return IntranetManager.FooterManager.Common.Controller;
});

