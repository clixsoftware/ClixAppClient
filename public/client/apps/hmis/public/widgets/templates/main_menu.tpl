<style type="text/css">
    .MainTabsWrapper {
        height: auto!important;
        overflow: hidden;
        margin-right: 20px!important;
    }
    .Tabs {
        margin: 0;
        padding: 0;
        height: 53px;
        position: relative;
    }

    .Tabs ul {
        margin: 0;
        padding: 0;
        list-style: none;
        height: 50px;
        border-bottom: 3px solid #DDD;
        position: absolute;
        top: 0;
        left: 20px;
        right: 20px;
    }

    #MainTabs {
        height: auto!important;
        position: static!important;
        margin: 0 0 0 20px!important;
        overflow: hidden;
        border: none!important;
        display: block!important;
        clear: both;
        float: none;
    }
    #MainTabs li {
        border-bottom: 3px solid #DDD!important;
        z-index: 2;
        transition: border-color 500ms;
    }
    .Tabs ul li {
        float: left;
        margin: 0;
        position: relative;
        border-bottom: 3px solid transparent;
    }
    #MainTabs li.sel {
        border-bottom: 3px solid #5cb85c!important;
    }
    #MainTabs li {
        border-bottom: 3px solid #DDD!important;
        z-index: 2;
        transition: border-color 500ms;
    }
    .Tabs ul li.sel {
        border-color: #5cb85c;
    }
    .Tabs ul li {
        float: left;
        margin: 0;
        position: relative;
        border-bottom: 3px solid transparent;
    }

    .Tabs ul li a:hover {
        color: #000;
    }
    .Tabs ul li a {
        display: inline-block;
        height: 50px;
        text-decoration: none;
        color: #9B9B9B;
        line-height: 56px;
        text-transform: uppercase;
        padding: 0 10px;
        width: 100%;
        float: none;
        font: 400 13px/56px ProximaNova-SemiBold,helvetica,arial,sans-serif;
        transition: color 100ms;
    }
</style>

<div id="Tabs" class="Tabs MainTabsWrapper">
    <ul id="MainTabs" class=" nav nav-pills">
        <li id="tab_overview" class="first"><a href="projects/102372-hmis/overview"
                                               class="ql">Overview</a><span
                class="nipple"></span></li>
        <li id="tab_tasks" class="first sel"><a href="projects/102372-hmis/tasks"
                                                class="ql tipped">Tasks</a><span
                class="nipple"></span></li>
        <li id="tab_milestones" class="first"><a href="projects/102372-hmis/milestones"
                                                 class="ql">Milestones</a><span
                class="nipple"></span></li>
        <li id="tab_messages" class="first"><a href="projects/102372-hmis/messages"
                                               class="ql">Messages</a><span
                class="nipple"></span></li>
        <li id="tab_files" class="first"><a href="projects/102372-hmis/files" class="ql">Files</a><span
                class="nipple"></span></li>
        <li id="tab_time" class="first"><a href="projects/102372-hmis/time" class="ql">Time</a><span
                class="nipple"></span></li>
        <li id="tab_notebooks" class="first"><a href="projects/102372-hmis/notebooks"
                                                class="ql">Notebooks</a><span
                class="nipple"></span></li>
        <li id="tab_riskregister" class="first"><a
                href="projects/102372-hmis/riskregister" class="ql">Risks</a><span
                class="nipple"></span></li>
        <li id="tab_links" class="first"><a href="projects/102372-hmis/links" class="ql">Links</a><span
                class="nipple"></span></li>
        <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-cogs"></i> More <b class="caret"></b></a>
            <ul class="dropdown-menu" style="display: none;">
                <li><a href="#iconified-pill3" tabindex="-1" data-toggle="tab">@fat</a></li>
                <li><a href="#iconified-pill4" tabindex="-1" data-toggle="tab">@mdo</a></li>
            </ul>
        </li>
    </ul>
</div>