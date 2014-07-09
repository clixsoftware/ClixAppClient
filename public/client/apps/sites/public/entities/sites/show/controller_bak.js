define([
    "app",
    "apps/home/show/view"
], function ( IntranetManager, ShowViews ) {

        IntranetManager.module("HomeManager.Show",
            function ( Show,
                       IntranetManager,
                       Backbone,
                       Marionette,
                       $, _ ) {

            Show.Controller = {

                getHeaderView: function(alias){
                    return new ShowViews.HeaderView();
                },

                displayHomePage: function (alias) {

                   // alert('displaying home page ' + alias);

                    //IntranetManager.siteNavigationBar.show(this.getHeaderView());

                    IntranetManager.trigger('home:posts:featured', alias);
                    IntranetManager.trigger('home:news:posts', alias );
                    IntranetManager.trigger('home:links');
                    IntranetManager.trigger('home:apps');



/*
                    var $div = $('div');
                    require(["apps/home/entities/homePageItem"], function(){
                        $.get( "/homepage.html", function( data ) {
                            //$div.html( data );
                            //alert( "Load was performed." );
                            var homepageItem = IntranetManager.request("homepage:entity");

                            homepageItem.set("htmlContent", data);

                            var homepageView = new View.HomePage({
                                model: homepageItem
                            });

                            console.log('loaded home page');

                          //  IntranetManager.siteMainContent.show(homepageView);
                            require(["apps/header/app"], function(){

                                //IntranetManager.trigger("headermanager:start");

                            });
                        });*/



                   // });

                }


            }
        });

    return IntranetManager.HomeManager.Show.Controller;
});

