define([
    "app",
    "apps/sites/public/entities/sites/show/view"
], function (IntranetManager, ShowViews) {

    IntranetManager.module("PatientManager.Show",
        function (Show, PatientManager, Backbone, Marionette, $, _) {

            Show.Controller = {

                getHeaderView: function () {
                    return new ShowViews.HeaderView();
                },

                displayHomePage: function (alias) {


                    //IntranetManager.siteNavigationBar.show(this.getHeaderView());
                    // IntranetManager.trigger('home:posts:featured');
                    //IntranetManager.trigger('home:news:posts');

                    //alert('Display home page for site ' + alias );
                    var that = this;

                    require(['entities/applications'], function () {

                        var options = {
                            alias: alias,
                            parent_feature: PatientManager.feature.id,
                            feature_alias: 'patients'
                        };

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);

                        console.log('@@ Fetching Current Application using = ' + JSON.stringify(options));

                        fetchingApp.then(function (app) {
                            console.log(app);

                            if (!app) {
                                throw new Error('Intranet Application ' + alias + ' unavailable or not installed.');
                            }

                            IntranetManager.trigger('sites:home:news:posts', alias);
                            IntranetManager.trigger('sites:news:posts:featured', alias);
                            IntranetManager.trigger('sites:home:events:posts', alias);

                            var options = {
                                parent_application_alias: alias,
                                parent_application_feature: 'home'
                            };

                            // IntranetManager.trigger('yp:public:posts:recent', options);

                            IntranetManager.trigger('sites:howdoi:mostactive', alias);
                            IntranetManager.trigger('sites:howdoi:mostrecent', alias);


                            IntranetManager.trigger('dom:title', app.get('title'));
                        })
                            .fail(function (err) {
                                alert(err);
                            });

                    });


                }


            }
        });

    return IntranetManager.PatientManager.Show.Controller;
});

