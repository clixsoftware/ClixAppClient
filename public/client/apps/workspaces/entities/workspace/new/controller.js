/*
 * Application: Workspace
 * Controller: Workspace New Controller
 * Module: WorkspaceManager.New.Controller
 * */


define([
    "app",
    "apps/workspaces/entities/workspace/new/views"
], function(IntranetManager, NewViews){

    IntranetManager.module("WorkspaceManager.New",
        function(New,
                 IntranetManager,
                 Backbone,
                 Marionette,
                 $, _){

    New.Controller = {

        loadNewForm: function(){

        require([
            "apps/workspaces/entities/workspace/model"
        ], function(){

                    var newWorkspace = IntranetManager.request("workspace:entity:new");

                    //alert('new workspace received' + newWorkspace.get('title'));

                    var view = new NewViews.CreateForm({
                        model: newWorkspace
                    });

                    view.on("form:submit", function ( data ) {
                        console.log('handling form submit in controller');
                        if (newWorkspace.save(data)) {
                            console.log('triggering dialog close');
                            console.log('Id of the new model ' + newWorkspace.id);
                            view.trigger("dialog:close");
                            //navigate to workspace
                            IntranetManager.trigger("workspace:home:show", newWorkspace.get('alias'));

                        } else {
                            console.log('form data invalid, trigger form invalid');
                            view.triggerMethod("form:data:invalid", newWorkspace.validationError);
                        }
                    });

                    //var view = NewView.CreateForm();

                    IntranetManager.dialogRegion.show(view);
                    $('.demo.menu .item').tab({
                        history: false
                    });

        });
      }
    };
  });

  return IntranetManager.WorkspaceManager.New.Controller;
});
