<link rel="stylesheet" href="/client/vendor/govintranet/css/datepicker.css">

<style type="text/css">
    .form-control {
        margin-bottom: 10px;
    }

</style>

<h1><%=title%></h1>
<form enctype="multipart/form-data">
    <div class="col-lg-12 col-sm-12 col-md-4 well well-sm">

        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="ad_title"> Subject or title*</label>
                    <input class="form-control" name="title" id="ad_title"   type="text" value="<%=obj.title%>" placeholder="<%=obj.title%>">
                    <h6 class="pull-right" id="counterTitle">58 characters remaining</h6>
                </div>

                <div class="form-group">
                    <label for="ad_content"> Item Description*</label>
                    <textarea class="form-control"  name="content" id="ad_content"  placeholder="Short description of the item " rows="5" required></textarea>
                    <h6 class="pull-right" id="counter">200 characters remaining</h6>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 form-group">
                <label for="ad_parent_application"> Category</label>
                <select  id="ad_parent_application" name="parent_application" class="form-control input-md">
                    <% categories.each(function(category) { %>
                    <option value="<%= category.get('id') %>" class="level-0"><%= category.get('title') %></option>
                    <% }); %>
                </select>
                <!--<input class="form-control" id="support_location" name="custom_fields[location]" placeholder="Contact Name" type="text" autofocus="">-->
            </div>
            <div class="col-md-6 form-group">
                <label for="ad_price"> Price</label>
                <input class="form-control" name="custom_fields[price]" placeholder="0.00"
                       id="ad_price"
                       type="text" required="">
            </div>

        </div>
<!--        <div class="row">
            <div class="col-md-6 form-group">
                <label for="available_date"> Available Date</label>
                <div class="input-group date">
                    <input type="text" class="form-control" id="available_date"><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
                </div>
                &lt;!&ndash;<input class="form-control" id="support_organizer_name" name="custom_fields[organizer_name]" placeholder="Contact Name" type="text" autofocus="">&ndash;&gt;
            </div>
            <div class="col-md-6 form-group">
                <label for="support_organizer_email">Type</label>
                <input class="form-control" name="custom_fields[organizer_email]" placeholder="Department"
                       id="support_organizer_email"
                       type="text" required="">
            </div>

        </div>-->
        <div class=" form-group">
            <label for="ad_attachments">Attachment (image/file)</label>
            <input class="form-control" id="ad_attachments" name="attachments"  type="file" required="" autofocus="">
        </div>

        <input class="form-control" name="feature_alias" id="ad_feature_alias"  type="hidden" value="classifieds">
        <input class="form-control" name="moderation_status" id="ad_moderation_status"  type="hidden" value="1">

        <br>
        <label for="">
            Your contact information, for feedback on your ad..</label>
        <div class="row">
            <!--        <div class="col-md-6 form-group">
                        <input class="form-control" id="support_requestor_name" name="requestor_name" placeholder="Your Name" type="text" required="" autofocus="">
                    </div>-->
            <div class="col-md-6 form-group">
                <input class="form-control" name="custom_fields[author_email]"
                       placeholder="Your Email"
                       id="ad_author_email"
                       type="text" required="">
            </div>
        </div>
        <br>
        <button class="btn btn-lg btn-primary js-submit " type="submit">
            Submit</button>

    </div>
</form>
