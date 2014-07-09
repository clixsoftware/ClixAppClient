console.log('entry workspace show_controller.js');

define([
    "app",
    "apps/site/entities/sites/show/views"
], function ( IntranetManager, ShowViews ) {

    IntranetManager.module("SiteManager.Sites.Show",
        function ( Show, IntranetManager, Backbone, Marionette, $, _ ) {

            Show.Controller = {

                getDisplayPageView: function ( post ) {
                    return new ShowViews.DisplayPageView({
                        model: post
                    })

                },

                getSidebarView: function ( post ) {
                    return new ShowViews.SidebarView({
                        model: post
                    });
                },

                getHeaderView: function ( post ) {
                    var view = new ShowViews.HeaderView({
                        model: post
                    });

                    view.on('form:show:delete', function () {
                        alert('ready to delete');
                    });

                    view.on('form:show:edit', function () {
                        IntranetManager.trigger('sitemanager:site:edit', post.id);
                    });

                    return view;
                },


                getStatsView: function ( post ) {
                    return new ShowViews.StatsView({
                        model: post
                    });
                },

                loadDisplayPage: function ( id ) {
                    var that = this;



                        var firstAction = function(fetchingFeature){
                            $.when(fetchingFeature).done(function ( features ) {

                                if (features != undefined) {
                                    //get the sub app, using
                                    //parent_app and parent_feature field
                                    return features.at[0];

                                } else {
                                    console.log('feature not found');
                                    return undefined;
                                }
                            })
                        } ;


                        var secondAction = function(){
                            alert(model.get('title'));
                        };

                        require([
                            "entities/app"
                        ], function () {
                            var fetchingRecord = IntranetManager.request("appmodel:entity", id);
                        $.when(fetchingRecord).done(function ( fetchedRecord ) {

                            console.log(JSON.stringify(fetchedRecord));

                            if (fetchedRecord !== undefined) {
                                var displayView = that.getDisplayPageView(fetchedRecord);
                                IntranetManager.layoutContent.show(displayView);

                                IntranetManager.layoutZone1.show(that.getSidebarView(fetchedRecord));

                                IntranetManager.layoutHeader.show(that.getHeaderView(fetchedRecord));

                                IntranetManager.layoutZone2.show(that.getStatsView(fetchedRecord));

                                //close out search

                                displayView.on('feature:change', function ( el ) {
                                    var options = {
                                        feature: $(el).attr('data-app'),
                                        enabled: $(el).prop('checked')
                                    };

                                    //check if sub app exist with this type
                                    //get the feature id first
                                    //check the app table
                                    //if enabled (check if availabel, if not create, else set to active)
                                    //if disabled (check if available, if not do nothing, else set to disabled)


                                    //check for the feature
                                    var fetchingFeature = IntranetManager.request('feature:search', 'code=' +  options.feature);

                                    $.when(fetchingFeature).done(function ( features ) {

                                        if (features != undefined) {
                                            //get the sub app, using
                                            //parent_app and parent_feature field

                                           // alert(JSON.stringify(features));
                                            var feature = features.at(0);

                                            //console.log(JSON.stringify(feature));

                                            var fetchingApp = IntranetManager.request('appmodel:search', 'parent_app=' + id +'&parent_feature=' + feature.get('id') );

                                            $.when(fetchingApp).done(function(fetchedApp){

                                                if(fetchedApp != undefined){
                                                    console.log('app found');

                                                    var model = fetchedApp.at(0);

                                                    fetchedRecord.url = IntranetManager.opts.API + 'app/' + fetchedRecord.get('id');

                                                    if(!options.enabled){

                                                        var featuresEnabled = fetchedRecord.get('features_enabled');
                                                        featuresEnabled = featuresEnabled - IntranetManager.appEnums[options.feature];
                                                        fetchedRecord.set('status', 'inactive');
                                                        fetchedRecord.set('features_enabled', featuresEnabled);
                                                        fetchedRecord.save();
                                                    }

                                                    if(options.enabled){
                                                        var featuresEnabled = fetchedRecord.get('features_enabled');
                                                        featuresEnabled = featuresEnabled + IntranetManager.appEnums[options.feature];
                                                        fetchedRecord.set('features_enabled', featuresEnabled);
                                                        fetchedRecord.set('status', 'active');
                                                        fetchedRecord.save();
                                                    }


                                                }else{
                                                   if(options.enabled){

                                                       console.log('app not found');

                                                       //create the application
                                                       require(['entities/app'], function(){

                                                           var newApp = IntranetManager.request('appmodel:entity:new');

                                                           newApp.set('title', options.feature + ' App for Site : ' + fetchedRecord.get('alias') );
                                                           newApp.set('description', 'Description of the new site application');
                                                           newApp.set('edit_url', '/appmanager/');
                                                           newApp.set('admin_url', '/' + options.feature + '/apps/');
                                                           newApp.set('url', '/sites/alias/news');
                                                           newApp.set('path', '/sites/alias/news/');
                                                           newApp.set('alias', fetchedRecord.get('alias') );
                                                           newApp.set('ownedby_user_id', IntranetManager.Auth.userId);
                                                           newApp.set('createdby_user_id', IntranetManager.Auth.userId);
                                                           newApp.set('updatedby_user_id', IntranetManager.Auth.userId);
                                                           newApp.set('parent_feature', feature.get('id'));
                                                           newApp.set('parent_app', fetchedRecord.get('id'));
                                                           newApp.set('parent_app_feature', fetchedRecord.get('parent_feature'));

                                                           if(newApp.save()){

                                                               alert('app saved');
                                                           } else{
                                                               alert('error saveing app');
                                                           }

                                                       });
                                                   }
                                                }

                                            });

                                        } else {
                                            console.log('feature not found');
                                        }




                                    })



                                });


                                IntranetManager.layoutSearch.reset();
                                $('.ui.checkbox').checkbox({
                                    onChange: function () {

                                        displayView.trigger('feature:change', this);
                                    }
                                });


                            } else {

                                console.log('TODO: no record found view');
                            }
                        });

                    });

                }


            }
        });

    return IntranetManager.SiteManager.Sites.Show.Controller;
});

console.log('exit workspace show_controller.js');