//AppManager.Apps.Show.Controller

define([
    "app",
    "apps/appmanager/entities/apps/show/views"
], function ( IntranetManager, ShowViews) {

    IntranetManager.module("AppManager.Apps.Show",
        function ( Show,
                   IntranetManager,
                   Backbone,
                   Marionette,
                   $, _ ) {

            Show.Controller = {

                getDisplayPageView: function(post){
                    return new ShowViews.DisplayPageView({
                        model: post
                    })

                },

                getSidebarView: function(post){
                    return new ShowViews.SidebarView({
                        model: post
                    })  ;
                },

                getHeaderView: function(post){
                    var view =new ShowViews.HeaderView({
                        model: post
                    });

                    view.on('form:show:delete', function(){
                        alert('ready to delete');
                    });

                    view.on('form:show:edit', function(){
                        IntranetManager.trigger('featuremanager:feature:edit', post.id );
                    });

                    return view;
                },


                getStatsView: function(post){
                    return new ShowViews.StatsView({
                        model: post
                    });
                },

                loadDisplayPage: function(id){

                    //alert('Show Record for ID ' + id);

                    var that = this;

                    require([
                        "entities/app"
                    ], function(){

                        var fetchingRecord = IntranetManager.request("appmodel:entity", id);


                        $.when(fetchingRecord).done(function(fetchedRecord){

                            console.log(JSON.stringify(fetchedRecord));

                            if(fetchedRecord !== undefined){

                                IntranetManager.layoutContent.show(that.getDisplayPageView(fetchedRecord) );

                                IntranetManager.layoutZone1.show(that.getSidebarView(fetchedRecord) );

                                IntranetManager.layoutHeader.show(that.getHeaderView(fetchedRecord));

                                IntranetManager.layoutZone2.show(that.getStatsView(fetchedRecord) );

                                //close out search

                                IntranetManager.layoutSearch.reset();

                            }else{

                                console.log('TODO: no record found view');
                            }
                        });

                    });

                }


            }
        });

    return IntranetManager.AppManager.Apps.Show.Controller;
});

