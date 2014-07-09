define([
    "app",
    "common/views",
    "tpl!apps/support/public/entities/services/new/templates/feedback_form.tpl",
    "tpl!apps/support/public/entities/services/new/templates/contact_update_form.tpl",
],
    function ( IntranetManager, GlobalViews, feedbackFormTpl, contactUpdateFormTpl) {

        IntranetManager.module("SupportManager.Public.Services.New.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.NotificationView = GlobalViews.NotificationView.extend({

                });

                Views.FeedbackFormView = GlobalViews.BaseFormView.extend({
                    template: feedbackFormTpl,

                    keyId: 'support',

                    triggers: {
                        //  'click .js-toggle': 'form:toggle'
                    },

                    events: {
/*                        'click .js-toggle': 'toggleForm',*/
                        'click .js-submit': 'submitClicked'
                    },


                    ui: {
//                        criterion: "input.js-filter-criterion"
                    },

                    onFormDataInvalid: function (errors) {

                        console.log(errors);
                        return false;

                    }

                });

                Views.ContactUpdateFormView = GlobalViews.BaseFormView.extend({
                    template: contactUpdateFormTpl,

                    keyId: 'support',


                    triggers: {
                        //  'click .js-toggle': 'form:toggle'
                    },

                    events: {
                        /*                        'click .js-toggle': 'toggleForm',*/
                        'click .js-submit': 'submitClicked'
                    },


                    ui: {
//                        criterion: "input.js-filter-criterion"
                    },

                    onFormDataInvalid: function (errors) {
                        //console.log(errors);
                        alert('the form has data errors');
                        return false;
                    },

                    onFormDataOk: function(){
                      alert('the form was saved correctley');
                    }

                });

            });

        return IntranetManager.SupportManager.Public.Services.New.Views;
    });
