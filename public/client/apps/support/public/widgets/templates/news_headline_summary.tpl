
    <h3><a href="<%=urls.show.href%>"><%=obj.title%></a></h3>
    <span class="news_date"><%=moment(createdAt).format("DD MMM YYYY")%></span>
    <br><%=obj.description%> … <br>
    <span class="news_date">
        <a class="more"  href="<%=path%>" title="<%=obj.title%>">Read more</a>
    </span>

<div class="clearfix">

</div>
<hr class="light">