<div class="panel panel-primary">
    <div class="panel-heading">
        <h4>Create New Guide/Task</h4>

    </div>
    <div class="panel-body">
        <p>Creating a new task or guide for the How do I?</p>
        <br>

        <form class="form-horizontal">
            <div class="form-group">
                <label for="post_title" class="col-lg-2 col-sm-2 control-label">Title</label>
                <div class="col-lg-10">
                    <input type="email" class="form-control" id="post_title"
                           placeholder="" name="title" value="<%=obj.title%>">
                    <p class="help-block"></p>
                </div>
            </div>

            <div class="form-group">
                <label for="post_description" class="col-lg-2 col-sm-2 control-label">
                    Description
                </label>
                <div class="col-lg-10">
                    <textarea name="description" id="post_description"class="form-control textarea-autosize" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 52px;">
                        <%=obj.description%></textarea>
                    <p class="help-block"></p>
                </div>
            </div>

            <div class="form-group">
                <label for="post_category" class="col-lg-2 col-sm-2 control-label">Category</label>
                <div class="col-lg-10">
                    <input type="text" class="form-control" id="post_category"
                           placeholder="" name="category" value="<%=obj.category%>">
                    <p class="help-block"></p>
                </div>
            </div>

            <div class="form-group">
                <label for="post_tags" class="col-lg-2 col-sm-2 control-label">Tags</label>
                <div class="col-lg-10">
                    <input type="text" class="form-control" id="post_tags" name="tags"
                           placeholder="tags" value="<%=obj.tags%>">
                    <p class="help-block"></p>
                </div>
            </div>


            <div class="form-group">
                <label for="post_content_type" class="col-lg-2 col-sm-2 control-label">
                    Type</label>
                <div class="col-lg-10">
                    <input type="text" class="form-control" id="post_content_type"
                           placeholder="" name="content_type" value="<%=obj.content_type%>">
                    <p class="help-block"></p>
                </div>
            </div>

            <div class="form-group">
                <label for="" class="col-lg-2 col-sm-2 control-label">
                    Content
                </label>
                <div class="col-lg-10">
                    <textarea name="content" id="post_content" class="form-control textarea-autosize"
                              style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 52px;"><%=obj.content%></textarea>
                    <p class="help-block"></p>
                </div>
            </div>

        </form>
    </div>
    <div class="panel-footer">
        <div class="row">
            <div class="col-sm-6 col-sm-offset-3">
                <div class="btn-toolbar">
                    <button class="btn-primary btn js-submit">Submit</button>
                    <button class="btn-default btn js-cancel">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</div>

