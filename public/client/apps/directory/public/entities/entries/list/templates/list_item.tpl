<div class="indexcard"><a href="<%=obj.urls.show.href%>">
    <div class="media"><img class="img alignleft"
                            src="/assets/images/no-profile-image.jpg" width="66"
                            height="66" alt="<%=obj.title%>">

        <div class="media-body"><strong><%=obj.title%></strong><br><%=obj.department%><br>
            <span class="small"><%=obj.preferred_job_title%></span>
            <br><span
                    class="small"><i class="glyphicon glyphicon-earphone"></i>
                <%if (obj.work_phone) { %>
                    <%=obj.work_phone%>
                <% } else if (obj.work_ext) { %>
                    Ext - <%=obj.work_ext%>
                <% } %>
            </span><br></div>
    </div>
</a></div>



