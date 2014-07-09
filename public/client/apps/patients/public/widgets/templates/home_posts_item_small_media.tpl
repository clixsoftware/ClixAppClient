<h3 class="noborder">
    <a class="" href="<%=urls.show.href%>">
        <%=title%>
    </a>
</h3>

<p><span class="news_date"><%=moment(createdAt).format("ddd, DD MMM YYYY")%></span></p>

<div class="media">
    <a href="<%=urls.show.href%>">

    </a>
<!--
    <a class="pull-right" href="<%=urls.show.href%>">
        <img width="245" height="167"
        src="/assets/images/tabimage9.png"
        class="media-object hidden-xs wp-post-image"
        alt="file000739935116">
    </a>
-->

    <div class="media-body">
        <%=obj.description%> …
        <p class="news_date">
            <a  class="more" href="<%=urls.show.href%>" title="<%=title%>">
                Read more
            </a>
        </p>
    </div>
</div>

<hr class="light">


