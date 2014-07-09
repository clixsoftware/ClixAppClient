define([
    "marionette",
    "semantic"
], function(Marionette){

  Marionette.Region.Sidebar = Marionette.Region.extend({

    onShow: function(view){



      var self = this;

      //alert($(this.$el).hasClass('left'));
      var overlay = $(this.$el).hasClass('left');

  //    if()

      if(overlay){
          $(this.$el).css("z-index", "80");
      }
      this.$el.sidebar({
          overlay: !overlay
      }).sidebar('toggle');


      this.listenTo(view, "sidebar:close",  function(){
         // alert('close the sidebar');
          this.$el.sidebar('hide');
      });

        console.log('showing the sidebar');
    },

    closeDialog: function(){

      this.stopListening();
      //this.close();
        alert('closing the modal');
      //this.$el.modal("hide");

    }
  });

  return Marionette.Region.Sidebar;
});