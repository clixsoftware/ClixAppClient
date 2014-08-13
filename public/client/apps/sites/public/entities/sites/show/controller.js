define([
    "app",
    "apps/sites/public/entities/sites/show/view"
], function ( IntranetManager, ShowViews ) {

    IntranetManager.module("SiteManager.Show",
        function ( Show, SiteManager, Backbone, Marionette, $, _ ) {

            Show.Controller = {

                displayHomePage: function ( alias ) {

                    var that = this;

                    require(['entities/applications'], function () {

                        var options = {
                            alias: alias,
                            parent_feature: SiteManager.feature.id,
                            feature_alias: 'sites'
                        };

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);

                        console.log('@@ Fetching Current Application using = ' + JSON.stringify(options));

                        fetchingApp.then(function(app){

                            if(!app){
                                throw new Error('Intranet Application ' + alias + ' unavailable or not installed.');
                            }

                            IntranetManager.trigger('sites:home:news:posts', alias);
                            IntranetManager.trigger('sites:news:posts:featured', alias);
                            IntranetManager.trigger('sites:events:posts:upcoming', alias);

                            var options =    {
                                parent_application_alias: alias,
                                parent_application_feature: 'home'
                            };

                            IntranetManager.trigger('sites:content:popular');
                            IntranetManager.trigger('sites:content:recent');
                            IntranetManager.trigger('core:display:ad', {zone: 'adZone1', feature: 'sites'});
                            IntranetManager.trigger('core:display:ad', {zone: 'adZone2', feature: 'sites'});
                            IntranetManager.trigger('dom:title', app.get('title'));
                        })
                            .fail(function(err){
                                alert(err);
                            });

                    });


                }


            }
        });

    return IntranetManager.SiteManager.Show.Controller;
});

