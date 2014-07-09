var IntranetManager  = new Marionette.Application();

IntranetManager.addRegions({
    mainRegion: "#main-region"
});


IntranetManager.navigate = function(route, options){

    options || (options = {});
    Backbone.history.navigate(route, options);

};

IntranetManager.getCurrentRoute = function(){

    return Backbone.history.fragment;
};

IntranetManager.on('initialize:after', function(){

    if(Backbone.history){

        Backbone.history.start();

        if(this.getCurrentRoute() === ""){
            //this.navigate("contacts");
           // IntranetManager.ContactsApp.List.Controller.listContacts();
            IntranetManager.trigger('contacts:list');
        }
    }


});

