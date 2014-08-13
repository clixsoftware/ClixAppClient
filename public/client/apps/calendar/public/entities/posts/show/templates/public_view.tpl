<div class="js-media">
 <img src=""
      width="726" height="353" class="img img-responsive js-media-image" alt="<%=obj.title%>">
</div>
 <h1>   <%= title %></h1>

 <p class="news_date"><%=moment(createdAt).format("ddd, DD MMM YYYY")%> </p>
 <%= content %>
 <p>&nbsp;</p>


