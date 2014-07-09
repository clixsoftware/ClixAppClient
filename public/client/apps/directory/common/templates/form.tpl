        <div class="fluid field">
            <label>Feature Name</label>
            <input placeholder="feature name" type="text" name="title"
                   id="feature_title" value="<%=obj.title%>">
        </div>

        <div class="two fields">
            <div class="field">
                <label>Public Code</label>
                <input placeholder="feature name" type="text" name="code"
                       id="feature_code" value="<%=obj.code%>">
            </div>
            <div class="field">
                <label>Alias</label>
                <input placeholder="alias" type="text" name="app_alias"
                       id="feature_app_alias" value="<%=obj.app_alias%>">
            </div>
        </div>

        <div class="two fields">
            <div class="field">
                <label>Edit URL</label>
                <input placeholder="edit url" type="text" name="edit_url"
                       id="feature_edit_url" value="<%=obj.edit_url%>">
            </div>
            <div class="field">
                <label>Admin URL</label>
                <input placeholder="admin" type="text" name="admin_url"
                       id="feature_admin_url" value="<%=obj.admin_url%>">
            </div>
        </div>

        <div class="field">
            <label>Description</label>
            <textarea name="description" id="feature_description"><%=obj
                .description%></textarea>
        </div>


    <div class="actions">
        <div class="ui buttons">
            <div class="ui blue button js-submit">Post this article</div>
            <div class="or"></div>
            <div class="ui  basic button js-cancel">Cancel</div>
        </div>
    </div>

