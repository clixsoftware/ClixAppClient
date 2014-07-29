    <h3 class="postlist">
        <a href="<%=obj.urls.show.href%>" title="<%=obj.title%>" rel="bookmark"><%=obj.title%></a>
            <small> (<%=parent_application_alias%>)</small>
        </h3>

    <a href="<%=obj.urls.show.href%>">
        <div class="hidden-xs"></div>
    </a>

    <div class="media-body">
        <div><p><span class="listglyph"><i class="glyphicon glyphicon-calendar"></i> <%=moment(updatedAt).format("DD MMM YYYY")%></span> <span
                class="listglyph"><span class="glyphicon glyphicon-stop gb8"></span>&nbsp;Contact</span>&nbsp;&nbsp;
        </p></div>
        <p><%=description%></p>
    </div>
       <hr>

