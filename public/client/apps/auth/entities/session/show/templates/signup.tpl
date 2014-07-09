<form id="signup_form">
    <div class="ui fluid form segment">
      <h3 class="ui dividing header">Register</h3>
      <!--<div class="two fields">
        <div class="field">
          <label>First Name</label>
          <input placeholder="First Name" type="text" name="first_name"
                 id="signup_first_name">
        </div>
        <div class="field">
          <label>Last Name</label>
          <input placeholder="Last Name" type="text" name="last_name"
                 id="signup_last_name">
        </div>
      </div>-->
      <div class="two fields">
		  <div class="field">
			<label>Email Address</label>
			<input placeholder="Username" type="text" name="email" id="signup_email">
		  </div>
		  <div class="field">
			<label>Employee ID</label>
			<input placeholder="Employee ID" type="text" name="employee_no"
                   id="signup_employee_no">
		  </div>

	  </div>
      <div class="two fields">
      <div class="field">
        <label>Your password</label>
        <input type="password" name="password" id="signup_password">
      </div>
      <div class="field">
        <label>Confirm password</label>
        <input type="password" name="confirm_password" id="signup_confirm_password">
      </div>
      </div>
      <div class="inline field">
        <div class="ui checkbox">
          <input type="checkbox" id="terms" name="terms_agreed" >
          <label for="terms">I agree to the terms and conditions</label>
        </div>
      </div>
      <div class="ui blue submit button js-submit">Start your experience</div>
    </div>
</form>