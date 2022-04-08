<div class="container bg-white px-0 border-rounded my-4 mx-auto justify-content-evenly d-block d-sm-flex">
    <ul
        class="list-group rounded-0 pe-0 col-sm-3 col-12 border border-end-0 settings-menu align-items-center align-items-sm-start text-center justify-content-between justify-content-sm-start">
        <a href="{$Link}edit"
            class="list-group-item py-sm-3 py-2 px-1 px-sm-4 <% if $active == 'edit' %>list-active<% end_if %>">Edit Profile</a>
        <a href="{$Link}password/change"
            class="list-group-item py-md-3 py-2 px-md-4 px-0 <% if $active == 'passwordchange' %>list-active<% end_if %>">Change
            Password</a>
        <a href="#" class="list-group-item py-sm-3 py-2 px-sm-4 px-1 color-red logout">Logout</a>
    </ul>
    $ContentAccount
</div>

<!-- Modal Change Profile Picture -->
<div class="modal fade" id="modalProfilePicture" tabindex="-1" aria-labelledby="modalProfilePictureLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-rounded overflow-hidden">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title fw-bold" id="modalProfilePictureLabel">Change profile photo</h5>
            </div>
            <div class="modal-body p-0">
                <ul class="list-group text-center">
                    <form action="{$Link}editprofilepicture" enctype="multipart/form-data" method="post"
                        id="formUpdateProfilePicture">
                        <label for="profilePicture" class="list-group-item color-blue" role="button">Upload
                            Photo</label>
                        <input class="form-control visually-hidden" type="file" id="profilePicture"
                            name="profilePicture">
                        <input type="hidden" name="username" value="$CurrentMember.Username">
                    </form>
                    <form action="{$Link}removeProfilePicture" enctype="multipart/form-data" method='post'
                        id="removeProfilePicture">
                        <li class="list-group-item text-danger" role="button">Remove current photo</li>
                    </form>
                    <li class="list-group-item" role="button" data-bs-dismiss="modal">Cancel</li>
                </ul>
            </div>
        </div>
    </div>
</div>

<% require themedJavascript('page/accounts') %>