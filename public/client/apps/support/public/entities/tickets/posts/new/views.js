define([
    "app",
    "common/views",
    "tpl!apps/support/public/entities/tickets/posts/new/templates/feedback_form.tpl",
    "tpl!apps/support/public/entities/tickets/posts/new/templates/contact_update_form.tpl",
     "tpl!apps/support/public/entities/tickets/posts/new/templates/incident_report_form.tpl",
     "tpl!apps/support/public/entities/tickets/posts/new/templates/news_story_form.tpl",
     "tpl!apps/support/public/entities/tickets/posts/new/templates/job_letter_form.tpl",
     "tpl!apps/support/public/entities/tickets/posts/new/templates/event_item_form.tpl"
],
    function ( IntranetManager, GlobalViews, feedbackFormTpl, contactUpdateFormTpl, incidentReportFormTpl,
        newsStoryFormTpl, jobLetterFormTpl, eventItemFormTpl) {

        IntranetManager.module("SupportManager.Public.Tickets.Posts.New.Views",
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

                    onFormDataInvalid: function (errors) {
                        //console.log(errors);
                        alert('the form has data errors');
                        return false;
                    },

                    onFormDataOk: function(){
                      alert('the form was saved correctley');
                    },

                    onFormReset:function(){
                        alert('resetting the form');
                    }

                });

                Views.IncidentReportForm = GlobalViews.BaseFormView.extend({
                    template: incidentReportFormTpl,

                    keyId: 'support',

                    triggers: {
                        //  'click .js-toggle': 'form:toggle'

                    },

                    events: {
                        /*                        'click .js-toggle': 'toggleForm',*/
                        'click .js-submit': 'submitClicked'
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

                    onFormDataInvalid: function (errors) {
                        //console.log(errors);
                        //alert('the form has data errors');
                        return false;
                    },

                    onFormDataOk: function(){
                        //alert('the form was saved correctley');
                    },

                    onFormReset:function(){
                      //  alert('resetting the form');
                    }

                });

                Views.TicketReportForm = GlobalViews.BaseFormView.extend({

                    keyId: 'support',

                    triggers: {
                        //  'click .js-toggle': 'form:toggle'

                    },

                    events: {
                        /*                        'click .js-toggle': 'toggleForm',*/
                        'click .js-submit': 'submitClicked'
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

                    onFormDataInvalid: function (errors) {
                        //console.log(errors);
                        //alert('the form has data errors');
                        return false;
                    },

                    onFormDataOk: function(){
                        //alert('the form was saved correctley');
                    },

                    onFormReset:function(){
                        //  alert('resetting the form');
                    }

                });

                Views.NewsStoryForm = Views.TicketReportForm.extend({
                    template: newsStoryFormTpl,

                    events: {
                          'click .js-submit': 'submitClicked',
                          'click #support_content': 'startCountingStory',
                         'click #support_title': 'startCountingTitle'
                    },

                    startCountingStory: function(){
                       // alert('rendered');
                        $("#support_content").charCounter(1500,{container: "#counter"});
                    },


                    startCountingTitle: function(){
                        // alert('rendered');
                        $("#support_title").charCounter(63,{container: "#counterTitle"});
                    }

                });

                Views.JobLetterForm = Views.TicketReportForm.extend({
                    template: jobLetterFormTpl

                });

                Views.EventItemForm = Views.TicketReportForm.extend({
                    template: eventItemFormTpl,

                    events: {
                        'click .js-submit': 'submitClicked',
                        'click #support_content': 'startCountingStory',
                        'click #support_title': 'startCountingTitle'
                    },

                    startCountingStory: function(){
                        // alert('rendered');
                        $("#support_content").charCounter(500,{container: "#counter"});
                    },


                    startCountingTitle: function(){
                        // alert('rendered');
                        $("#support_title").charCounter(63,{container: "#counterTitle"});
                    }

                });
            });

        return IntranetManager.SupportManager.Public.Tickets.Posts.New.Views;
    });
