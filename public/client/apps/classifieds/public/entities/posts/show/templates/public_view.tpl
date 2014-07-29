<style type="text/css">
    .conference_sub {
        width: auto;
        background-color: #d6dde9;
        padding: 1em;
        border-top: 5px solid #657a93;
        min-height: 100px;
    }
</style>


<div class="js-media">
<!--
 <img src=""
      width="726" height="353" class="img img-responsive js-media-image" alt="<%=obj.title%>">
-->
</div>
 <h1>   <%= title %><small><i class="glyphicon glyphicon-question-sign"></i> <%=parent_application_alias%></small></h1>

 <p class="news_date">Posted: <%=moment(createdAt).format("dddd, DD MMM YYYY, hh:mm")%> </p>
<%= content %>
<p>&nbsp;</p>
<div class="conference_sub">
    <!--<a href="/venues/wiston-house">-->
         <!--<img itemprop="photo" src="https://www.wiltonpark.org.uk/wp-content/uploads/2012/11/house-a3-100x100.jpeg" class="alignright" alt="Wiston House">-->
    <!--</a>-->

    <% if (obj.custom_fields) { %>
    <p><strong>Contact Advertiser::</strong>
        <%=obj.custom_fields.author_email%>
    </p>
    <% } %>
    <% if (obj.custom_fields) { %>
    <p><strong>Price:</strong>
        <%=obj.custom_fields.price%>		</p>
    <% } %>
</div>



