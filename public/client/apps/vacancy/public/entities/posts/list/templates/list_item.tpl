<h3 class="postlist">
    <a href="<%=obj.urls.show.href%>" title="<%=obj.title%>"
       rel="bookmark"><%=obj.title%></a></h3>
<div class="media"><a href="<%=obj.urls.show.href%>" class="js-media">

    <div class="hidden-xs ">
        <img width="245" height="167"
             src=""
             class="alignright wp-post-image js-media-image" alt="file000103102419">
    </div>

</a>

    <div class="media-body">
        <div><!--<span class="listglyph">
            <i class="glyphicon glyphicon-vacancy"></i> <%=moment(updatedAt).format("DD MMM YYYY")%>
        </span>-->
        <span class="listglyph">
            <%  var count= 0;
                    obj.taxonomy.categories.forEach(function(term) {
                        count++
            %>

            <span class="glyphicon glyphicon-stop gb<%=count%>"></span>&nbsp; <%= term.title%>
            <% }); %>

        </span>&nbsp;&nbsp;

            &nbsp;&nbsp;
        </div>
        <p><%=description%></p>
    </div>
</div>
<hr>