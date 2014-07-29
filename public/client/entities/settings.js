define([
    "app",
    "Q"
], function (IntranetManager, Q) {

    IntranetManager.module("Entities",
        function (Entities, IntranetManager, Backbone, Marionette, $, _) {


            var apiEndPoint = 'settings/current';

            Entities.Settings = Backbone.Model.extend({
                url : apiEndPoint
            });

            var API = {

                getCurrent: function (apiUrl) {

                    var item = new Entities.Settings();
                    item.url = apiUrl + apiEndPoint;

                    return this.getDAOdeferred(item);
                },

                getDAOdeferred: function (queryObject) {

                    return Q(queryObject.fetch())
                        .then(function (data) {
                            //console.log(data);
                            return queryObject;

                        }, function (xhr) {
                            console.error('Unable to retrieve settings for Application');
                            return undefined;
                        }
                    );

                }

            };

            IntranetManager.reqres.setHandler("settings:current", function (url) {
                return API.getCurrent(url);
            });


        });

    return;
});
