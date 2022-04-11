<div class="row w-100 justify-content-center">
    <div class="col-6 d-none d-md-block text-center my-auto">
        <img src="themes/my-theme/images/login.svg" alt="brand" class="w-75">
    </div>
    <div class="col col-md-6 px-4" style="max-width:484px">
        <h1 class="text-center color-red">Rocket</h1>
        <h5 class="text-center text-black-50 mb-3">Welcome back astronaut!</h5>
        <form action="login" method="post" id="form-login">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="username" name="username" placeholder="username" minlength="3" required>
                <label for="username">Username or email address</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="password" name="password" placeholder="Password" min-length="8" required>
                <label for="password">Password</label>
            </div>
            <button type="submit" class="btn btn-outline-red col-12">Login</button>
            <div class="mt-3">
                <input type="hidden" class="is-invalid">
                <div class="invalid-feedback text-center"></div>
            </div>
        </form>
        <div class="d-flex justify-content-evenly align-items-center my-4">
            <div class="d-inline-block bg-secondary" style="height: 1px;width: 40%;"></div>
            OR
            <div class="d-inline-block bg-secondary" style="height: 1px;width: 40%"></div>
        </div>
        <button type="submit" class="btn btn-outline-red col-12 mb-3" id="gSignIn"><i
                class="fa-brands fa-google me-2"></i>Login with Google</button>
        <a href="" class="text-center">
            <p style="font-size: small;">Forgotten your password?</p>
        </a>
        <h6 class="text-center">Don't have an account? <a href="register" class="text-decoration-none">Register</a>
        </h6>
    </div>
</div>

<% require themedJavascript('page/login') %>
