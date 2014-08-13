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
<!-- apple store button -->
<div class="blockquote-box blockquote-primary clearfix">
    <div class="square pull-left">
        <span class="glyphicon glyphicon-tasks glyphicon-lg"></span>
    </div>
    <h4>
        Have an How Do I?</h4>
    <p>
        Want to contribute see more  &nbsp;   <a href="">Posting a new How Do I</a>. &nbsp;
    </p>
</div>

