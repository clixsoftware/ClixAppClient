<div class="data-display page">
<div class="ui  selection list">
    <a class="item">
        <div class="ui red horizontal label">Title</div>
        <%=obj.title%>
    </a>
    <a class="item">
        <div class="ui purple horizontal label">Url</div>
        <%=obj.url%>
    </a>
    <a class="item">
        <div class="ui red horizontal label">Content</div>
        <div class="ui segment">
            <%=obj.content%>
        </div>
    </a>

</div>

<h3 class="ui header">Media</h3>
<div class="ui  selection list">
    <a class="item">
        <div class="ui red horizontal label">Cover Image</div>
        <%=obj.title%>
    </a>
    <a class="item">
        <div class="ui purple horizontal label">Thumbnail</div>
        <%=obj.url%>
    </a>
</div>

<div class="ui divider"></div>
<h3 class="ui header">Meta & Search</h3>
<div class="ui  selection list">
    <a class="item">
        <div class="ui red horizontal label">Tags</div>
        <%=obj.tags%>
    </a>
    <a class="item">
        <div class="ui purple horizontal label">Short link</div>
        <%=obj.short_title%>
    </a>
    <a class="item">
        <div class="ui purple horizontal label">Summary</div>
        <div class="ui segment">
        <%=obj.description%>
            </div>
    </a>
</div>

</div>