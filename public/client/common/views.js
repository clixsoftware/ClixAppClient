/*
 * Application: Intranet, Hospital Net
 * Views: Common Views
 * Module: IntranetManager.Common.Views
 *
 * */

define([
    "app",
    "tpl!common/templates/form.tpl",
    "tpl!common/templates/app_2_col_layout.tpl",
    "tpl!common/templates/listbak.tpl",
    "tpl!common/templates/app_list.tpl",
    "tpl!common/templates/app_list_item.tpl",
    "tpl!common/templates/content_2_col_layout.tpl",
    "tpl!common/templates/search.tpl",
    "tpl!common/templates/form_new_header.tpl",
    "tpl!common/templates/list_header.tpl",
    "tpl!common/templates/list_no_records.tpl",
    "tpl!common/templates/blank.tpl",
    "tpl!common/templates/blank_help.tpl",
    "tpl!common/templates/widget.tpl",
    "tpl!apps/home/widgets/templates/no_item_found.tpl",
    "backbone.syphon"
], function (IntranetManager, formTpl, appLayoutTpl, listTpl, appListTpl, appListItemTpl, twoColumnLayout, searchTpl,
             formNewHeaderTpl, listHeaderTpl, listNoRecordsTpl, blankTpl, blankhelpTpl, widgetViewTpl, noItemTpl) {
    IntranetManager.module("Globals.Common.Views",
        function (Views, IntranetManager, Backbone, Marionette, $, _) {

            Views.NotificationView = Marionette.ItemView.extend({
            //var NotificationView = Backbone.View.extend({

                targetElement: '#form-message',

                tagName: 'div',

                className: 'notification alert',

                defaultMessages: {
                    'success': 'Success!',
                    'error': 'Sorry! An error occurred in the process',
                    'warning': 'Are you sure you want to take this action?',
                    'information': 'An unknown event occurred'
                },

                cssClasses: {
                    'success': 'accepted',
                    'error': 'cancel',
                    'warning': 'warning',
                    'information': 'information'
                },

                events: {
                    "click" : "closeNotification",
                },

                automaticClose: true,

                initialize: function(options){

                    // defaults
                    var type = 'information';
                    var text = this.defaultMessages[type];
                    var target = this.targetElement;

                    // if any options were set, override defaults
                    if(options && options.hasOwnProperty('type'))
                        type = options.type;
                    if(options && options.hasOwnProperty('text'))
                        text = options.text;
                    if(options && options.hasOwnProperty('target'))
                        target = options.target;

                    if(options && options.hasOwnProperty('automaticClose'))
                        this.automaticClose = options.automaticClose;

                    // is message already displayed in view? if yes, don't show again
                    if($('.notification:contains('+text+')').length === 0) {
                        this.render(type, text, target);
                    }

                },

                render: function(type, text, target){

                    //alert('inside of notification view');

                    var self = this;
                    this.$el.addClass(this.cssClasses[type]);
                    this.$el.addClass('alert-' + this.cssClasses[type]);
                    this.$el.text(text);
                    this.$el.prependTo(this.targetElement);

                    // Automatically close after set time. also closes on click
                    if(this.automaticClose) {
                        setTimeout(function(){
                            self.closeNotification();
                        }, 3000);
                    }
                },

                closeNotification: function() {

                    var self = this;

                    $(this.el).fadeOut(function() {
                        self.unbind();
                        self.remove();
                    });
                }

            });

            Views.BaseFormView = Marionette.ItemView.extend({

                template: formTpl,

                keyId: 'ff',

                events: {
                    "click .js-submit": "submitClicked"
                },

                tagName: 'form',

                className: 'ui form segment',

                submitClicked: function (e) {
                    e.preventDefault();
                    //alert('submit clicked');
                    var data = Backbone.Syphon.serialize(this);
                   // var photo = new Photo({
                        //file: $("#imageUpload")[0].files[0],
                     //   caption: $("#imageCaption").val()
                   // });
//                    alert($("#support_image_upload").html());
                    //console.log($("#support_image_upload").html());

                    //data.file = $("#support_image_upload")[0].files[0];
                    //alert(data.file);
                    //console.log('backbone syphon - ' + data);
                    this.trigger("form:submit", data);

                },

                /*,  onFormDataInvalid: function(errors){
                    return false;

                }
                 */

                onFormDataInvalid: function (errors) {
                    var that  = this;
                    var $view = this.$el;

                    var clearFormErrors = function () {
                        var $form = $view.find("form");
                        $form.find(".ui.js-error").each(function () {
                            $(this).remove();
                        });
                        $form.find(".field.error").each(function () {
                            $(this).removeClass("error");
                        });
                    };

                    var markErrors = function (value, key) {
                        //alert(that.keyId + key);
                        var $controlGroup = $view.find(that.keyId + key).parent();

                        var $errorEl = $("<div>", { class: "ui red pointing above ui label  js-error", text: value });
                        $controlGroup.append($errorEl).addClass("error");
                    };

                    clearFormErrors();
                    _.each(errors, markErrors); //use each to mark errors

                    //alert('form data invalid');
                }


            });

            Views.AppLayoutView = Marionette.LayoutView.extend({

                template: appLayoutTpl,

                onBeforeRender: function () {
                    // set up final bits just before rendering the view's `el`
                  $('body').addClass('app layout view');
                    //$('#site-main').addClass('app');
                },

                regions: {


                    sidebarTopRegion: "#app-sidebar-top",
                    sidebarBottomRegion: "#app-sidebar-bottom",
                    navigationRegion: "#app-navigation",
                    headerRegion: "#app-header",
                    searchRegion: "#app-search",
                    contentRegion: "#app-content",
                    footerRegion: "#app-footer"
                }

            });

            Views.Content2ColLayoutView = this.AppLayoutView.extend({

                template: twoColumnLayout,

                onBeforeRender: function () {
                    // set up final bits just before rendering the view's `el`
                    $('body').addClass('2-col-layout').removeClass('app');
                    $('#site-main').addClass('2-col-layout').removeClass('app');
                },

                regions: {
                    sidebarTopRegion: "#app-sidebar-top",
                    sidebarBottomRegion: "#app-sidebar-bottom",
                    navigationRegion: "#app-navigation",
                    headerRegion: "#app-header",
                    searchRegion: "#app-search",
                    contentRegion: "#app-content",
                    footerRegion: "#app-footer"
                }

            });

            Views.ListItemView =  Marionette.ItemView.extend({
                tagName: "tr",

                className: "selectable ",

                events: {
                    "click td a.js-item-show": "showClicked",
                    "click td a.js-item-edit": "editClicked",
                    "click td a.js-item-delete": "deleteClicked"
                },

                template: appListItemTpl,

/*                showClicked: function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    this.trigger("list:model:show", this.model);
                },

                editClicked: function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    this.trigger("list:model:edit", this.model.get('title'));
                },

                deleteClicked: function(e){
                    e.stopPropagation();
                    this.trigger("list:model:delete", this.model);
                },

                remove: function(){
                    var self = this;
                    this.$el.fadeOut(function(){
                        Marionette.ItemView.prototype.remove.call(self);
                    });
                },*/

                onRender: function(){
                    //console.log('rendering model ' + this.model.get('id'));
                }
            }) ;

            Views.ListView = Marionette.CompositeView.extend({

                //tagName: "table",

                className: "ui table segment",

                template: appListTpl,

                itemView: Views.ListItemView,

                itemViewContainer: "tbody#listings"
                /*,

                 initialize: function () {
                 // this.listenTo(this.collection, "reset", function(){
                 this.appendHtml = function ( collectionView, itemView, index ) {
                 collectionView.$el.append(itemView.el);
                 };
                 // });

                 },

                 onCompositeCollectionRendered: function () {
                 this.appendHtml = function ( collectionView, itemView, index ) {
                 collectionView.$el.prepend(itemView.el);
                 }
                 }*/
            });

            Views.NoItemFoundView = Marionette.ItemView.extend({
                template: noItemTpl,

                onRender: function(){
                    console.log('<< Views.NoItemFoundView - Loaded ***DONE ***  >>');
                }
            });

            Views.SearchView = Marionette.ItemView.extend({

                className: "ui grid",

                template: searchTpl,


                events: {
                    "click .js-command-list-search": "listSearch"
                },

                ui: {
                    'criterion': "input.js-list-search-criterion"
                },

                listSearch: function(e){
                    e.preventDefault();
                    var criterion = this.ui.criterion.val();
                    this.trigger("list:search", criterion);
                   // alert(criterion);
                },

                onSetFilterCriterion: function(criterion){
                    this.ui.criterion.val(criterion);
                },

                onRender: function(){

                    console.log('<< SearchView : LOADED >>');
                }

            });

            Views.FormNewHeaderView = Marionette.ItemView.extend({

                initialize: function () {
                    //alert('init workspace form');
                },

                className: "form new header",

                template: formNewHeaderTpl

            });

            Views.ListHeaderView = Marionette.ItemView.extend({

                initialize: function () {
                    //alert('init workspace form');
                },

                className: "listing header view",

                template: listHeaderTpl,

                onRender: function(){
                    this.$(".ui.view.header").text(this.model.get('_page_header_'));
                    this.$(".js-command-new").text("Add Posting");
                }

            });

            Views.ListNoRecordsView = Marionette.ItemView.extend({

                initialize: function () {
                    //alert('init workspace form');
                },

                triggers: {
                    "click .js-list-all": "list:command:all"
                },

                template: listNoRecordsTpl

            });

            Views.BlankHelpView =  Marionette.ItemView.extend({
                className: "widget",
                template: blankhelpTpl,
                onRender: function(){
                    console.log('Rendering the Blank Help View');
                }
            }) ;

            Views.BlankView =  Marionette.ItemView.extend({
                className: "ui widget basic center aligned segment",

                template: blankTpl,

                triggers: {
                    'click .js-add-record': 'command:form:new'
                },

                onRender: function(){
                    console.log('Rendering the Blank View');
                }
            }) ;


        });

    return IntranetManager.Globals.Common.Views;
});
