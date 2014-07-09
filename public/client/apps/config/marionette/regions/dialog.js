define([
    "marionette",
    "semantic"
], function ( Marionette ) {

    Marionette.Region.Dialog = Marionette.Region.extend({

        onShow: function ( view ) {

            this.listenTo(view, "dialog:close", this.closeDialog);

            var self = this;

            this.$el.modal('setting', {

                closable: false,

                onDeny: function () {
                    console.log('form cancelled from dialog');
                    view.on('form:cancel', function(){
                        return true;
                    });
                },

                onApprove: function () {
                   console.log('submit triggered from dialog');
                   view.on('form:data:invalid', function(){
                       console.log('form data invalid from dialog');
                       return false;
                   })
                }
            })
                .modal('show');

            console.log('showing the modal');
        },

        closeDialog: function () {

            //this.stopListening();
            console.log('triggering dialog close');
            this.$el.modal("hide");

        }
    });

    return Marionette.Region.Dialog;
});