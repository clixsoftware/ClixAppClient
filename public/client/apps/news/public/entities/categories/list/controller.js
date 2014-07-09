define([
    "app",
    "apps/news/public/entities/categories/list/views",
    "moment"
], function ( IntranetManager, ListViews ) {

    IntranetManager.module("NewsManager.Category.List",
        function ( List, NewsManager, Backbone, Marionette, $, _ ) {

            List.Controller = {


                getListView: function (results) {

                    return new ListViews.ListView({
                        collection: results
                    });
                },

                showCategoryList: function(objectId){

                    console.log(objectId);
                    var that = this;

                    require(['entities/taxonomy'], function () {

                        var fetchingCategory = IntranetManager.request('taxonomy:object:terms', objectId);


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

    return IntranetManager.NewsManager.Category.List.Controller;
});

