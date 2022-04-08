<div class="row w-100 justify-content-center">
    <div class="col-6 d-none d-md-block text-center my-auto">
        <img src="images/register.svg" alt="brand" class="w-75">
    </div>
    <div class="col col-md-6 px-4" style="max-width:484px">
        <h1 class="text-center color-red">Rocket</h1>
        <h5 class="text-center text-black-50 mb-3">Register to be an astronaut </h5>
        <form action="register" method="post" id="form-register">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="username" placeholder="username" name="username" minlength="3" required>
                <label for="username" class="form-label">Username</label>
            </div>
            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="email" placeholder="Email address" name="email" required>
                <label for="email">Email address</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="password" placeholder="Password" name="password" minlength="8" required>
                <label for="password">Password</label>
            </div>
            <button type="submit" class="btn btn-outline-red col-12">Register</button>
            <div class="mt-3">
                <input type="hidden" class="is-invalid">
                <div class="invalid-feedback text-center"></div>
            </div>
        </form>
        <div class="d-flex justify-content-evenly align-items-center my-3">
            <div class="d-inline-block bg-secondary" style="height: 1px;width: 40%;"></div>
            OR
            <div class="d-inline-block bg-secondary" style="height: 1px;width: 40%"></div>
        </div>
        <button type="submit" class="btn btn-outline-red col-12 mb-3" id="gSignUp"> Register with Google</button>
        <h6 class="text-center">Already have an account? <a href="login" class="text-decoration-none">Login</a></h6>
    </div>
</div>

<% require themedJavascript('page/register') %>
