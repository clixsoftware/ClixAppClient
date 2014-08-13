<style type="text/css">
    .mini-submenu{
        display:none;
        background-color: rgba(0, 0, 0, 0);
        border: 1px solid rgba(0, 0, 0, 0.9);
        border-radius: 4px;
        padding: 9px;
        /*position: relative;*/
        width: 42px;

    }

    .mini-submenu:hover{
        cursor: pointer;
    }

    .mini-submenu .icon-bar {
        border-radius: 1px;
        display: block;
        height: 2px;
        width: 22px;
        margin-top: 3px;
    }

    .mini-submenu .icon-bar {
        background-color: #000;
    }

    #slide-submenu{
        background: rgba(0, 0, 0, 0.45);
        display: inline-block;
        padding: 0 8px;
        border-radius: 4px;
        cursor: pointer;
    }
</style>

<div class="mini-submenu">
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
</div>
<div class="list-group">
        <span  class="list-group-item active">
            Things you can do
            <span class="pull-right" id="slide-submenu">
                <i class="fa fa-times"></i>
            </span>
        </span>
    <a href="/classifieds" class="list-group-item">
        <i class="fa fa-comment-o"></i>Back to Classifieds Home
    </a>

    <a href="/classifieds/new" class="list-group-item">
        <i class="fa fa-comment-o"></i>Add New Classified
    </a>
</div>