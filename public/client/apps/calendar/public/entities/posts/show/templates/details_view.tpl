<style type="text/css">
    .conference_sub {
        width: auto;
        background-color: #d6dde9;
        padding: 1em;
        border-top: 5px solid #657a93;
        min-height: 100px;
    }
</style>

<h1> <a href="<%=obj.urls.show.href%>"></a><%=title%></h1>

<div class="conference_sub">
    <a href="/venues/wiston-house">
    <!--    <img itemprop="photo" src="https://www.wiltonpark.org.uk/wp-content/uploads/2012/11/house-a3-100x100.jpeg" class="alignright" alt="Wiston House">-->
    </a>
    <p><strong>Date:</strong>
        <time itemprop="startDate" datetime="<%=start_date%>">
            <%=moment(start_date).format("dddd, DD MMM YYYY, hh:mm")%>
        </time>&nbsp; - &nbsp;
        <time itemprop="endDate" datetime="<%=expiry_date%>">
            <%=moment(expiry_date).format("dddd, DD MMM YYYY")%>
        </time>
    </p>

    <% if (obj.custom_fields) { %>
    <p><strong>Location:</strong>
            <%=obj.custom_fields.attributes.location%>
       </p>
    <% } %>
    <% if (obj.custom_fields) { %>
    <p><strong>Organizer:</strong>
        <%=obj.custom_fields.attributes.organizer_name%>		</p>
    <% } %>
