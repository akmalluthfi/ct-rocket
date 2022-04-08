<div class="col-12 border col-sm-9">
    <div class="row mx-auto mt-4 settings-content">
        <div class="col-auto position-relative text-center">
            <img src="$CurrentMember().Picture().Link()" alt="profile picture $CurrentMember().Username()" width="50px" height="50px" class="rounded-circle object-fit-cover img-user">
            <div class="rounded-circle text-center position-absolute top-0  visually-hidden" id="img-loading"
                style="width: 50px;height: 50px;background-color: rgba(255, 255, 255, 0.75);left: 12px;">
                <div class="spinner-border position-absolute" role="status" style="top: 10px;left: 10px;">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        <div class="mb-3 col">
            <p class="m-0">$CurrentMember.Username</p>
            <!-- Button trigger modal -->
            <a role="button" class="color-blue text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalProfilePicture">Change Profile photo</a>
        </div>
    </div>
    <form class="row mx-auto mt-1 settings-content" action="{$Link}editprofile" method="post" id="updateProfile">
        <div class="mb-3 col-12">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" name="username" value="$CurrentMember.Username" data-val="$CurrentMember.Username" required>
        </div>
        <div class="mb-3 col-12">
            <label for="bio" class="form-label">Bio</label>
            <textarea class="form-control" id="bio" name="bio" rows="3">$CurrentMember.Bio</textarea>
        </div>
        <div class="mb-3 col-12">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" name="email" value="$CurrentMember.Email" data-val="$CurrentMember.Email" required>
        </div>
        <div class="mb-3 col-4">
            <button type="submit" class="btn btn-outline-red w-100" id="btn-updateProfile">Submit</button>
        </div>
    </form>
</div>
