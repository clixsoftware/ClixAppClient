<div class="panel panel-primary">
    <div class="panel-heading">
        <h4>Profile Entry</h4>

    </div>
    <div class="panel-body">
        <p>Create a new profile entry?</p>
        <br>

        <form class="form-horizontal">

            <div class="form-group">
                <label for="post_first_name" class="col-lg-2 col-sm-2 control-label">First Name</label>
                <div class="col-lg-10">
                    <input type="text" class="form-control" id="post_first_name"
                           placeholder="" name="first_name" value="<%=obj.first_name%>">
                    <p class="help-block"></p>
                </div>
            </div>

            <div class="form-group">
                <label for="post_last_name" class="col-lg-2 col-sm-2 control-label">Last Name</label>
                <div class="col-lg-10">
                    <input type="text" class="form-control" id="post_last_name"
                           placeholder="" name="last_name" value="<%=obj.last_name%>">
                    <p class="help-block"></p>
                </div>
            </div>

            <div class="form-group">
                <label for="post_work_email" class="col-lg-2 col-sm-2 control-label">
                    Email</label>
                <div class="col-lg-10">
                    <input type="text" class="form-control" id="post_work_email"
                           placeholder="" name="work_email" value="<%=obj.work_email%>">
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
                <label for="post_user_alias" class="col-lg-2 col-sm-2 control-label">User Alias</label>
                <div class="col-lg-10">
                    <input type="text" class="form-control" id="post_user_alias"
                           placeholder="" name="user_alias" value="<%=obj.user_alias%>">
                    <p class="help-block"></p>
                </div>
            </div>


            <div class="form-group">
                <label for="post_department" class="col-lg-2 col-sm-2 control-label">Department</label>
                <div class="col-lg-10">
                    <input type="text" class="form-control" id="post_department"
                           placeholder="" name="department" value="<%=obj.department%>">
                    <p class="help-block"></p>
                </div>
            </div>

            <div class="form-group">
                <label for="post_job_title" class="col-lg-2 col-sm-2 control-label">Job Title</label>
                <div class="col-lg-10">
                    <input type="text" class="form-control" id="post_job_title"
                           placeholder="" name="job_title" value="<%=obj.job_title%>">
                    <p class="help-block"></p>
                </div>
            </div>

            <div class="form-group">
                <label for="post_work_phone" class="col-lg-2 col-sm-2 control-label">Phone</label>
                <div class="col-lg-10">
                    <input type="text" class="form-control" id="post_work_phone" name="work_phone"
                           placeholder="tags" value="<%=obj.work_phone%>">
                    <p class="help-block"></p>
                </div>
            </div>

            <div class="form-group">
                <label for="post_mobile_phone" class="col-lg-2 col-sm-2 control-label">
                    Mobile</label>
                <div class="col-lg-10">
                    <input type="text" class="form-control" id="post_mobile_phone"
                           placeholder="" name="mobile_phone" value="<%=obj.mobile_phone%>">
                    <p class="help-block"></p>
                </div>
            </div>

            <div class="form-group">
                <label for="post_profile_type" class="col-lg-2 col-sm-2 control-label">
                    Profile Type</label>
                <div class="col-lg-10">
                    <input type="text" class="form-control" id="post_profile_type"
                           placeholder="" name="profile_type" value="<%=obj.profile_type%>">
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

