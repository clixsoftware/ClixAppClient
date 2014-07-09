<i class="close icon"></i>
<div class="header">
    Add Application
</div>
    <div class="content">
        <div class="ui basic segment">
        <div class="two fields">
            <div class="field">
                <label>Name the Application</label>
                <input placeholder="Application Title" type="text"
                       id="app_title" name="title">
            </div>

            <div class="field">
                <label>Alias</label>
                <input placeholder="Application alias" name="alias"
                       id="app_alias" type="text">
            </div>
        </div>
        </div>
        <div id="testTab" class="ui pointing secondary demo menu">
            <a class="active red item" data-tab="first">Description</a>
            <a class="blue item" data-tab="second">Project Type</a>
            <a class="green item" data-tab="third">Dates</a>
        </div>
        <div class="ui active basic tab segment" data-tab="first">
            <div class="field">
                <textarea name="description" id="app_description"></textarea>
            </div>
        </div>
        <div class="ui tab basic  segment" data-tab="second">
            <div class="field">
                <label>Public Url</label>
                <input placeholder="O" name="ownerEmail"
                       id="workspace-ownerEmail"
                       type="text">
            </div>
            <div class="field">
                <div class="ui selection dropdown">
                    <input type="hidden" name="workspaceType" id="workspace-workspaceType
                    ">

                    <div class="text">Workspace for a
                        Project
                    </div>
                    <i class="dropdown icon"></i>

                    <div class="menu">
                        <div class="item" data-value="Project">Workspace for a
                            Project
                        </div>
                        <div class="item active"
                             data-value="Workarea">Workspace for a Department
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui two fields basic tab segment" data-tab="third">
            <div class="date field">
                <label>Start Date (optional)</label>
                <input type="text" placeholder="xx/xx/xxxx" name="startDate"
                       id="workspace-startDate">
            </div>
            <div class="date field">
                <label>End Date (optional)</label>
                <input type="text" placeholder="xx/xx/xxxx"
                       name="endDate" id="workspace-endDate">
            </div>
        </div>


    </div>
<div class="actions">
    <div class="ui black button">
        Cancel
    </div>
    <div class="ui positive right labeled icon button">
        Add Photo
        <i class="checkmark icon"></i>
    </div>
</div>

