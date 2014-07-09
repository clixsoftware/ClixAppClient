requirejs.config({
    baseUrl: "/client",
    paths: {
        backbone: "vendor/backbone",
        "backbone.picky": "vendor/backbone.picky",
        "backbone.syphon": "vendor/backbone.syphon",
        "backbone.nested": "vendor/backbone.nested",
        jquery: "vendor/jquery",
        // "jquery-ui": "vendor/jquery-ui",
        json2: "vendor/json2",
        localstorage: "vendor/backbone.localstorage",
        marionette: "vendor/backbone.marionette",
        tpl: "vendor/tpl",
        underscore: "vendor/underscore",
        semantic: "vendor/semanticui/0.11.0/js/semantic",
        bootstrap: "vendor/bootstrap/3.1.1/js/bootstrap",
        moment: "libs/moment.min",
        Q: "vendor/q",
        fancybox: "vendor/fancybox",
        sugar: "libs/sugar",
        pace: "libs/pace.min",
        "jquery-plugins": "libs/jquery-plugins",
        intranetjs: 'libs/intranet',
        "jquery-address": "libs/jquery.address",
        videojs: "vendor/videojs/4.3.0/video.dev",
        cookie: "vendor/jquery.cookie",
        "backbone.validation": 'libs/backbone.validation',
        "backbone.virtual-collection": 'libs/backbone.virtual-collection',
        "backbone.grouped-collection": 'libs/backbone.groupedcollection',
        "backbone.stickit": 'libs/backbone.stickit',
        "simple.pagination": "vendor/simple-pagination/jquery.simplePagination"

    },

    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ["jquery", "underscore", "json2"],
            exports: "Backbone"
        },
        "backbone.picky": ["backbone"],
        "backbone.syphon": ["backbone"],
        "backbone.validation": ["backbone"],
        "backbone.nested": ["backbone"],
        "backbone.virtual-collection": ["backbone"],
        "backbone.stickit": ["backbone"],
        "backbone.grouped-collection": ["backbone", 'backbone.virtual-collection'],
        marionette: {
            deps: ["backbone"],
            exports: "Marionette"
        },
        // "jquery-ui": ["jquery"],
        localstorage: ["backbone"],
        semantic: ["jquery"],
        bootstrap: ["jquery"],
        cookie: ["jquery"],
        "jquery-plugins": ["jquery"],
        "simple.pagination": ["jquery"],
        // "metro-datepicker": ["jquery", "metro-calendar"],
        //"metro-calendar": ["jquery", "metro-global","metro-core", "metro-locale"]

    }
});

require([
    "app",
    'marionette',
    'underscore',
    'bootstrap',
    "apps/header/app",
    "apps/footer/app",
    'backbone.validation'
], function ( IntranetManager, Marionette, _ ) {


// Extend the callbacks to work with Bootstrap, as used in this example
// See: http://thedersen.com/projects/backbone-validation/#configuration/callbacks
    _.extend(Backbone.Validation.callbacks, {

        valid: function ( view, attr, selector ) {
            var $el = view.$('[name=' + attr + ']'),
                $group = $el.closest('.form-group');

            //remove the error div by name
            var $errorDiv = '#' + attr + '-error';

            //alert($errorDiv);

            $($errorDiv).remove();
            $group.removeClass("has-error");

        },
        invalid: function ( view, attr, error, selector ) {

            alert(attr);

            var $errorDiv = '#' + attr + '-error';
            $($errorDiv).remove();

            var $el = view.$('[name=' + attr + ']'),
                $group = $el.closest('.form-group');


            var $errorEl = $("<div id='" + attr + "-error' class='js-error'><span class='help-block'>" + error + "</span></div>");

           $group.append($errorEl).addClass("has-error");

        }
    });

   // Backbone.Model.prototype.trigger = function() {
   //     console.log('Event', arguments);
   //     Backbone.Events.trigger.apply(this, arguments);
   // };

    IntranetManager.start();

});
