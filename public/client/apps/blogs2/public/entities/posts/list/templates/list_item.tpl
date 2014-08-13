<hr><h3 class="postlist">
    <a href="<%=urls.show.href%>" title="<%=title%>"
       rel="bookmark"><%=title%></a></h3>
<div class="media"><a
        href="<%=urls.show.href%>">
    <div class="hidden-xs"></div>
</a>

    <div class="media-body"><p><span class="listglyph"><i
            class="glyphicon glyphicon-calendar"></i><%=moment(createdAt).format("DD MMM YYYY")%></span>&nbsp;<a
            class=""
            href="<%=obj.created_by.path%>">
        <img alt="" src="" class="avatar avatar-32 photo" height="32" width="32">
    </a>&nbsp;<a class="" href="<%=obj.created_by.path%>"><span class="listglyph"><%=obj.created_by.title%></span></a>
    </p>

        <p><%=description%> … </p>
    </div>
</div>



