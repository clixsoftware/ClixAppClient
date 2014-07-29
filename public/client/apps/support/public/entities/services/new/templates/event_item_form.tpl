<style type="text/css">
    .form-control {
        margin-bottom: 10px;
    }

</style>
<h1><%=title%></h1>
<p><%=description%></p>
<form enctype="multipart/form-data">
<div class="col-lg-12 col-sm-12 col-md-4 well well-sm">

    <div class="row">
        <div class="col-md-12">
            <div class="form-group">
                <label for="support_title"> Subject or title*</label>
                <input class="form-control" name="title" id="support_title"   type="text" value="<%=obj.title%>" placeholder="<%=obj.title%>">
                <h6 class="pull-right" id="counterTitle">63 characters remaining</h6>
            </div>

            <div class="form-group">
                <label for="support_content"> Event Description*</label>
                <textarea class="form-control"  name="content" id="support_content"  placeholder="Details of the news story" rows="5" required></textarea>
                <h6 class="pull-right" id="counter">500 characters remaining</h6>
            </div>
        </div>
     </div>
    <div class="row">
        <div class="col-md-6 form-group">
            <label for="support_location"> Location</label>

            <input class="form-control" id="support_location" name="custom_fields[location]" placeholder="Contact Name" type="text" autofocus="">
        </div>
        <div class="col-md-6 form-group">
            <label for="support_event_date"> Event Date</label>
            <input class="form-control" name="custom_fields[event_date]" placeholder="Department"
                   id="support_event_date"
                   type="text" required="">
        </div>

    </div>
    <div class="row">
        <div class="col-md-6 form-group">
            <label for="support_organizer_name"> Organizer</label>

            <input class="form-control" id="support_organizer_name" name="custom_fields[organizer_name]" placeholder="Contact Name" type="text" autofocus="">
        </div>
        <div class="col-md-6 form-group">
            <label for="support_organizer_email"> Organizer Email</label>
            <input class="form-control" name="custom_fields[organizer_email]" placeholder="Department"
                   id="support_organizer_email"
                   type="text" required="">
        </div>

    </div>
    <div class=" form-group">
        <label for="support_attachments">Attachment (image/file)</label>
            <input class="form-control" id="support_attachments" name="attachments"  type="file" required="" autofocus="">
    </div>

         <input class="form-control" name="parent_application" id="support_parent_application"  type="hidden" value="<%=obj.parent_application%>">
         <input class="form-control" name="service" id="support_service"  type="hidden" value="<%=obj.service%>">
        <input class="form-control" name="parent_application_alias" id="support_parent_application_alias"  type="hidden" value="<%=obj.parent_application_alias%>">
        <input class="form-control" name="parent_application_feature" id="support_parent_application_feature"  type="hidden" value="<%=obj.parent_application_feature%>">

         <br>
    <label for="">
        Your contact information, so we can get update on your request.</label>
    <div class="row">
<!--        <div class="col-md-6 form-group">
            <input class="form-control" id="support_requestor_name" name="requestor_name" placeholder="Your Name" type="text" required="" autofocus="">
        </div>-->
        <div class="col-md-6 form-group">
            <input class="form-control" name="requestor_email"
                   placeholder="Your Email"
                   id="support_requestor_email"
                   type="text" required="">
        </div>
    </div>
        <br>
        <button class="btn btn-lg btn-primary js-submit " type="submit">
            Submit</button>

</div>
</form>

