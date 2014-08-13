
<h3><a href="<%=urls.show.href%>"><%=obj.title%></a><small> (in <%=parent_application_alias%>)</small></h3>
<p><%=obj.description%><span class="news_date"><%=moment(createdAt).format("DD MMM YYYY")%></span></p>
<span class="news_date">
        <a class="more"  href="<%=urls.show.href%>" title="<%=obj.title%>">Read more</a>
    </span>

<hr class="light">

