define([
    "app",
    "common/views",
    "tpl!apps/classifieds/public/entities/posts/new/templates/post_new_form.tpl"
],
    function ( IntranetManager, GlobalViews, postNewFormTpl) {

        IntranetManager.module("ClassifiedsManager.Public.Posts.New.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.NotificationView = GlobalViews.NotificationView.extend({
                });

                 Views.PostNewFormView = GlobalViews.BaseFormView.extend({
                    template: postNewFormTpl,

                    keyId: 'ad',

                    triggers: {
                        //  'click .js-toggle': 'form:toggle'

                    },

                    events: {
                        'click .js-submit': 'submitClicked',
                        'click #ad_content': 'startCountingStory',
                        'click #ad_title': 'startCountingTitle'
                    },

                     startCountingStory: function(){
                         // alert('rendered');
                         $("#ad_content").charCounter(200 ,{container: "#counter"});
                     },


                     startCountingTitle: function(){
                         // alert('rendered');
                         $("#ad_title").charCounter(58,{container: "#counterTitle"});
                       // $('#available_date').datepicker({});
                     },

                    tagName: "div",

                    submitClicked: function (e) {

                        e.preventDefault();
                        //alert('submit clicked');
                        var data = Backbone.Syphon.serialize(this);
                        //console.log('backbone syphon - ' + data);
                        this.trigger("form:submit", data);

                    },

                    ui: {
//                        criterion: "input.js-filter-criterion"
                    },

                     onRender: function(){
                        // alert('form has been rendered');
                         //console.log($('#available_date'));

                     },

                    onFormDataInvalid: function (errors) {
                        //console.log(errors);
                      //  alert('the form has data errors');
                        return false;
                    },

                    onFormDataOk: function(){
                      //alert('the form was saved correctley');
                    },

                    onFormReset:function(){
                        //alert('resetting the form');
                    }

                });

            });

        return IntranetManager.ClassifiedsManager.Public.Posts.New.Views;
    });
