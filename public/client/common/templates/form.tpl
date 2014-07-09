<form>
<label for="title">Title: </label><input id="title" name="title" type="text" />
<label for="alias">Alias: </label><input id="alias" name="alias" type="text" />
<button id="add" class="js-submit">Add</button>
</form>
<div class="ui error form segment">
  <div class="ui error message">
    <div class="header">Action Forbidden</div>
    <p>You can only sign up for an account once with a given e-mail address.</p>
  </div>
  <div class="two fields">
    <div class="field">
      <label>First Name</label>
      <input placeholder="First Name" type="text">
    </div>
    <div class="field">
      <label>Last Name</label>
      <input placeholder="Last Name" type="text">
    </div>
  </div>
  <div class="field">
    <label>Username</label>
    <input placeholder="Username" type="text">
  </div>
  <div class="field">
    <label>Password</label>
    <input type="password">
  </div>
  <div class="inline field">
    <div class="ui checkbox">
      <input type="checkbox">
      <label>I agree to the Terms and Conditions</label>
    </div>
  </div>
  <div class="ui blue submit button">Submit</div>
</div>