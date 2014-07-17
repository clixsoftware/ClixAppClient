<!--
<div class="ui fluid form segment">
  <h3 class="ui dividing header">Log in</h3>
  <div class="two fields">
  <div class="field">
	<label>Email address or username</label>
	<input placeholder="Username" type="text" name="email" placeholder="email" id="session_email">
  </div>
  <div class="field">
	<label>Password</label>
	<input type="password" name="password" placeholder="password"  id="session_password">
  </div>
  </div>
  <div>
  <div class="ui blue submit button js-submit">Login</div> <a href="/auth/forget">
  Forget
  Password? </a> / Don't have an account? <a href="/auth/signup">Sign up now</a>

  </div>
</div>
-->
<style type="text/css">
    body {
        background: url('http://www.bing.com/az/hprichbg/rb/AizhaiBridge_ROW8653665204_1366x768.jpg') no-repeat center center fixed;
        /*    background: url('../assets/images/bgs/gallery-bg-2.jpg') no-repeat center center fixed;*/

        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }

    #content, #content-wrapper {
        background: none;
    }

    #footerwrapper {
        border: 0;
        background: none;;
    }

    .panel-default {
        opacity: 0.9;
        margin-top: 30px;
    }

    .form-group.last {
        margin-bottom: 0px;
    }

</style>
<div class="container">
    <div class="row">
        <div class="col-md-4 col-md-offset-7">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <span class="glyphicon glyphicon-lock"></span> Login
                </div>
                <div class="panel-body">
                    <div class="form-horizontal" role="form">
                        <div class="form-group">
                            <label for="session_email" class="col-sm-3 control-label">
                                Email</label>

                            <div class="col-sm-9">
                                <input type="email" class="form-control" name="email" id="session_email"
                                       placeholder="Email" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="session_password" class="col-sm-3 control-label">
                                Password</label>

                            <div class="col-sm-9">
                                <input type="password" class="form-control" name="password" placeholder="password"
                                       id="session_password" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-3 col-sm-9">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox"/>
                                        Remember me
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group last">
                            <div class="col-sm-offset-3 col-sm-9">
                                <button type="submit" class="btn btn-success btn-sm js-submit">
                                    Sign in
                                </button>
                                <button type="reset" class="btn btn-default btn-sm">
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    Not Registred? <a href="http://localhost:3001/auth/signup">Register here</a></div>
            </div>
        </div>
    </div>
</div>
