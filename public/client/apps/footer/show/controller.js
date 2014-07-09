
define([
    "app",
    "apps/header/show/views"
], function ( IntranetManager, View ) {

        IntranetManager.module("HeaderManager.Show",
            function ( Show,
                       IntranetManager,
                       Backbone,
                       Marionette,
                       $, _ ) {

            Show.Controller = {

                loadHeader: function () {

                    var layout = new View.Layout();

                    //alert('loading the header');
                    var primaryNavigationView = new View.PrimaryNavigation();
                    var secondaryNavigationView = new View.SecondaryNavigation();
                    var signInView = new View.SignIn();
                    var signedInView = new View.SignedIn();

                    //if(IntranetManager.Auth.isAuthenticated){
                        // layout.ownerMenuRegion.show(signedInView);
                       // console.log('Change to user logged in menu');
                    //}

                    layout.on("show", function(){
                        layout.primaryNavigationRegion.show(primaryNavigationView);
                        layout.secondaryNavigationRegion.show(secondaryNavigationView);
                        layout.ownerMenuRegion.show(signedInView);
                        console.log('loading site header and navigation');
                    });

                    signInView.on("navigate:login", function(){
                       console.log('go to login page');
                    });

                    IntranetManager.headerRegion.show(layout);

                    IntranetManager.on("header:change:secondary:menu", function(view){
                        layout.secondaryNavigationRegion.show(view);
                        //IntranetManager.headerRegion.show(view);
                        console.log('triggering view change');
                    });

                    IntranetManager.on("header:change:start:menu", function(view){
                        layout.startMenuRegion.show(view);
                        console.log('Change Start menu Region');
                    });

                    IntranetManager.on("user:logged:in", function(){
                        console.log('Triggered USER LOGGED IN ATTEMPT ' + IntranetManager.Auth.isAuthenticated);
                        if(IntranetManager.Auth.isAuthenticated){
                           // layout.ownerMenuRegion.show(signedInView);
                            console.log('Change to user logged in menu');
                        }
                    });

                    IntranetManager.on("header:change:action:menu", function(view){
                        layout.actionsMenuRegion.show(view);
                          console.log('Change Action Menu Region');
                    });

                    IntranetManager.on("header:change:owner:menu", function(view){
                        layout.ownerMenuRegion.show(view);
                         console.log('Change Owner Menu');
                    });

                }

            }
        });

    return IntranetManager.HeaderManager.Show.Controller;
});

console.log('exit show_controller.js');