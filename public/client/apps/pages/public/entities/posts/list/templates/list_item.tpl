<h3 class="postlist">
    <a href="<%=obj.urls.show.href%>" title="<%=obj.title%>"
       rel="bookmark"><%=obj.title%></a></h3>
<div class="media"><a href="<%=obj.urls.show.href%>" class="js-media">
    <div class="hidden-xs ">
        <img width="245" height="167"
             src="<%=obj.media.source_url%>"
             class="alignright wp-post-image" alt="file000103102419">
    </div>
</a>

    <div class="media-body">
        <div><p><span class="listglyph"><i class="glyphicon glyphicon-calendar"></i> <%=moment(updatedAt).format("DD MMM YYYY")%></span> <span
                class="listglyph"><span class="glyphicon glyphicon-stop gb8"></span>&nbsp;Evidence and analysis</span>&nbsp;&nbsp;
        </p></div>
        <p><%=description%></p>
    </div>
</div>
<hr>