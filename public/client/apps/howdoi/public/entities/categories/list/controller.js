define([
    "app",
    "apps/yp/public/entities/categories/list/views",
    "moment"
], function ( IntranetManager, ListViews ) {

    IntranetManager.module("YPManager.Category.List",
        function ( List, YPManager, Backbone, Marionette, $, _ ) {

            List.Controller = {


                getListView: function (results) {

                    return new ListViews.ListView({
                        collection: results
                    });
                },

                showCategoryList: function(options){

                    console.log(options);
                    var that = this;

                    require(['entities/taxonomy'], function () {

                        var fetchingCategory = IntranetManager.request('taxonomy:search:app', options);


                        fetchingCategory.then(function ( categories ) {
                            IntranetManager.layoutZone2.reset();
                            IntranetManager.layoutZone2.show(that.getListView(categories));

                        })
                            .fail(function ( error ) {
                                alert(error);
                            });


                    });

                }


            }
        });

    return IntranetManager.YPManager.Category.List.Controller;
});

