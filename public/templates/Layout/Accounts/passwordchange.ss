<div class="col-12 col-sm-9 border">
    <form class="row mx-auto mt-4 settings-content" action="{$Link}password/change/" method="post" id="change-password">
        <div class="col-auto text-center mb-3">
            <img src="$CurrentMember().Picture().Link()" alt="profile picture $CurrentMember.Username" width="50px"
                class="rounded-circle object-fit-cover">
        </div>
        <div class="col d-flex align-items-center mb-3">
            <h4 class="m-0">$CurrentMember.Username</h4>
        </div>
        <div class="mb-3 col-12">
            <label for="oldPassword" class="form-label">Old password</label>
            <input type="password" class="form-control" id="oldPassword" name="oldPassword" required minlength="8">
        </div>
        <div class="mb-3 col-12">
            <label for="newPassword" class="form-label">New password</label>
            <input type="password" class="form-control" id="newPassword" name="newPassword" required minlength="8">
        </div>
        <div class="mb-3 col-12">
            <label for="confPassword" class="form-label">Confirm new password</label>
            <input type="password" class="form-control" id="confPassword" name="confPassword" required minlength="8">
        </div>
        <div class="mb-3 col-12">
            <button type="submit" class="btn btn-outline-red" style="min-width:157px">Change Password</button>
        </div>
    </form>
</div>
