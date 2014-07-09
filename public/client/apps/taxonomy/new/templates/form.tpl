<i class="close icon"></i>
<div class="ui header">
    Add Category
</div>
<div class="content">
    <div class="ui basic segment">
        <div class="two fields">
            <div class="field">
                <label>Name the Application</label>
                <input placeholder="Application Title" type="text"
                       id="taxonomy_title" name="title" value="<%=obj.title%>">
            </div>

        </div>
        <div class="field">
            <label>Description of category.</label>
            <textarea name="description" id="taxonomy_description"><%=obj
                .description%></textarea>
        </div>
    </div>

</div>
<div class="actions">
    <div class="ui negative labeled black button js-cancel">
        Cancel
    </div>
    <div class="ui positive right labeled icon button js-submit">
        <span class="button-text">Create</span>
        <i class="checkmark icon"></i>
    </div>
</div>

