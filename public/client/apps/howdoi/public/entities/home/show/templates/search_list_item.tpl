    <h3 class="postlist"><a
            href="<%=urls.show.href%>"
            title="<%=title%>"
            rel="bookmark"><%=title%></a>
        <small></small>
    </h3>
    <a href="<%=urls.show.href%>">
        <div class="hidden-xs"></div>
    </a>

    <div class="media-body"><p><span class="listglyph">
        <% if (obj.content_type === "How Do I - Task") { %>
            <i  class="glyphicon  glyphicon-question-sign"></i>&nbsp;Task</span>&nbsp;&nbsp;
        <% } else { %>
        <i  class="glyphicon glyphicon-book"></i>&nbsp;Guide</span>&nbsp;&nbsp;
        <% } %>
        <span class="listglyph">
            <%  var count= 0;
                    obj.taxonomy.categories.forEach(function(term) {
                        count++
            %>

            <span class="glyphicon glyphicon-stop gb<%=count%>"></span>&nbsp; <%= term.title%>
            <% }); %>

        </span>&nbsp;&nbsp;

    </p>

        <p><%=description%>… </p>
    </div>

