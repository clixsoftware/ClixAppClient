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
        <time itemprop="startDate" datetime="2014-06-09">
            <%=moment(start_date).format("dddd, DD MMM YYYY, hh:mm")%>
        </time>&nbsp; - &nbsp;
        <time itemprop="endDate" datetime="2014-06-11">
            <%=moment(end_date).format("dddd, DD MMM YYYY")%>
        </time>
    </p>

    <p><strong>Location:</strong>
            <%=location%>
       </p>
    <p><strong>Organizer:</strong>
        <%=organizer_name%>		</p>

</div>


<div class="media-body">

    <%= content %>
    <p>&nbsp;</p>
</div>





