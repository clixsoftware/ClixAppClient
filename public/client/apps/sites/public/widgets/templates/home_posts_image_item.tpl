<a href="<%=urls.show.href%>" class="js-media"><img
        class="img img-responsive "
        src="<%=media_image.source_url%>"
        width="640" height="370" alt="<%=media_image.caption%>"></a>

<h3 class="noborder">
    <a class=""  href="<%=urls.show.href%>">
       <%=title%>
    </a>
</h3>

<p><span class="news_date"><%=moment(createdAt).format("ddd, DD MMM YYYY")%></span></p>

<div class="media-body">
   <%=obj.description%>
    <p class="news_date">
        <a class="more" href="<%=urls.show.href%>" title="<%=title%>">Read more</a>
    </p>

</div>

<hr class="light">


