
<div class="row">
    <div class="col-lg-12"><a
            href="<%=urls.show.href%>"><!--<img
            class="img img-responsive js-media" src="<%=obj.media.source_url%>"
            width="726"
            height="353" alt="<%=obj.title%>">--></a>

        <h3 class="postlist"><a href="<%=urls.show.href%>"><%=obj.title%></a></h3>

        <div class="media-body">
            <div><p><span class="listglyph"><i class="glyphicon glyphicon-calendar"></i> <%=moment(updatedAt).format("DD MMM YYYY")%></span></p></div>
            <p><%=obj.description%>… </p>
        </div>
    </div>
</div>
<hr>