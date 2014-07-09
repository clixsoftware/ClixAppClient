<style type="text/css">
    .form-control {
        margin-bottom: 10px;
    }

</style>
<h1><%=title%></h1>
<p><%=description%></p>
<div class="col-lg-12 col-sm-12 col-md-4 well well-sm">

        <div class="row">
            <div class="col-md-6 form-group">
                <input class="form-control" id="support_contact_name" name="contact_name" placeholder="Contact Name" type="text" autofocus="">
            </div>
            <div class="col-md-6 form-group">
                <input class="form-control" name="department" placeholder="Department"
                       id="support_department"
                       type="text" required="">
            </div>
        </div>
        <input class="form-control" id="support_email" name="email" placeholder="Email"
               type="email">
        <input class="form-control" name="extension"  id="support_extension"
               placeholder="Extension"
               type="email">

        <input class="form-control" name="phone" id="support_phone" placeholder="Phone"
               type="text">
    <input class="form-control" name="title" id="support_title"
           type="hidden" value="<%=obj.title%>">

    <div class="form-group">
        <input class="form-control" name="parent_application" id="support_parent_application"  type="hidden" value="<%=obj.parent_application%>">
    </div>
        <input class="form-control" name="service" id="support_service"  type="hidden" value="<%=obj.service%>">
        <input class="form-control" name="parent_application_alias" id="support_parent_application_alias"  type="hidden" value="<%=obj.parent_application_alias%>">
        <input class="form-control" name="parent_application_feature" id="support_parent_application_feature"  type="hidden" value="<%=obj.parent_application_feature%>">

         <br>
    <label for="">
        Your contact information, so we can get intouch.</label>
    <div class="row">
        <div class="col-md-6 form-group">
            <input class="form-control" id="support_requestor_name" name="requestor_name" placeholder="Your Name" type="text" required="" autofocus="">
        </div>
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


