define([
    "app",
    "common/views",
    "tpl!apps/support/public/entities/posts/new/templates/feedback_form.tpl"
],
    function ( IntranetManager, GlobalViews, feedbackFormTpl) {

        IntranetManager.module("SupportManager.Public.Posts.New.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

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


            });

        return IntranetManager.SupportManager.Public.Posts.New.Views;
    });
