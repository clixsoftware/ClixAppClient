<div class="well">
    <h1>How do I?</h1>

    <p>Tasks and guides to help you do your job.</p>

    <form class="form-horizontal" role="form">
        <label for="cat">Search in: </label>


        <div class="form-group input-md">
            <select name="cat" id="cat" class="form-control input-md">
                <option value="0" selected="selected">All tasks and guides</option>
                     <% items.each(function(term) { %>
                                <option value="<%= term.get('uuid') %>" class="level-0"><%= term.get('title') %></option>
                     <% }); %>
            </select>
        </div>
        <div class="form-group input-md">
            <input type="text" value="" class="multi-cat form-control input-md js-filter-criterion"
                   placeholder="How do I..." name="how-search-field"
                   id="how-search-field">
        </div>
        <div class="form-group input-md">
            <button type="submit" class="btn btn-primary input-md" id="how-search-submit">Search</button>
        </div>
    </form>

</div>
<!--
<div class="well well-sm">
    <form class="form-horizontal"
          name="news-category" id="sbc-search">
        <div class="input-group input-md">
            <input type="text" value="" class="form-control js-filter-criterion" name="s" id="sbc-s"
                                                 placeholder="Search news...">
            <span class="input-group-btn">
                <button type="submit" class="btn btn-primary input-md" id="news-search-submit">
                    <i class="glyphicon glyphicon-search"></i>
                </button>
            </span>
            <input   type="hidden" value="facilities" name="cat">
            <input type="hidden" value="news" name="post_type">
        </div>
    </form>
</div>
-->
