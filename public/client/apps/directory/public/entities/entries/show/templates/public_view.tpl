<h3 class="contacthead">Dept./Div/Section</h3><strong></strong> <a
        href=""><%=obj.department%></a><br><!--<strong>Job
    title: </strong><%=obj.job_title%>-->
<br>

<h3 class="contacthead">
    Contact</h3>


<p class="bbp-user-description"><i class="glyphicon glyphicon-earphone"></i>
    <a href="tel:<%=obj.work_phone%>">Ext - <%=obj.work_ext%></a></p>


<p class="bbp-user-description"><i class="glyphicon glyphicon-phone"></i>
    <a href="tel:<%=obj.mobile_phone%>"><%=obj.work_phone%></a></p>
<%if (obj.work_email) { %>

<p class="bbp-user-description"><a href="mailto:l<%=obj.work_email%>">
    <i class="glyphicon glyphicon-envelope"></i> Email <%=obj.title%></a></p>
<% } %>

<h3 class="contacthead">Working pattern</h3>

<p><%=obj.description%>.</p>

