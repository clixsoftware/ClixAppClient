<div class="calendar_container">
    <div class="conf_calendar home"><%=moment(start_date).format("MMM")%><br>
        <%=moment(start_date).format("DD")%></div>
    <div class="conf_title home"><p><a class="more" href="<%=urls.show.href%>"><%=obj.title%></a></p></div>
</div>

<!--

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
-->


