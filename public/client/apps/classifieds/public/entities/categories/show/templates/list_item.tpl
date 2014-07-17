<hr>
<h3>
    <a href="<%=urls.show.href%>" title="<%=title%>" rel="bookmark"><%=title%></a></h3>
<div class="media"><a href="<%=urls.show.href%>">
    <!--    <div class="hidden-xs">
            <img width="245" height="167"
                 src=""
                 class="alignright wp-post-image" alt="file000739935116">
        </div>-->
</a>

    <div class="media-body">
        <div><p><span class="listglyph"><i class="glyphicon glyphicon-calendar"></i> Updated <%=moment(updatedAt).format("DD MMM YYYY")%></span>
        </p></div>
        <p><%=description%> … </p>
    </div>
</div>