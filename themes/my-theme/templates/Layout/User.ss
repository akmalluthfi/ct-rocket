<!-- profile -->
<div class="row mt-4 mb-5">
    <div class="col-auto col-md-4 px-2 text-center">
        <img src="$User.Picture.Link" alt="$Username-profile picture"
            class="rounded-circle user-profile object-fit-cover">
    </div>
    <div class="col col-md-8">
        <div class="row mb-3 align-items-center">
            <div class="col-12 col-sm-auto fs-3">$User.Username</div>
            <% if CurrentMember %>
                <% if $CurrentMember.ID == $User.ID %>
                    <div class="col-auto">
                        <a href="accounts/edit" class="btn btn-outline-red py-1 px-2">Edit Profile</a>
                    </div>
                    <div class="col-auto fs-4">
                        <a href="accounts/edit"><i class="bi bi-gear" role="button"></i></a>
                    </div>
                <% else %>
                    <div class="col-auto info-followed">
                        <%-- cek apakah user sudah difollow atau belum --%>
                        <% if $CurrentMember.hasFollow($User.ID) %>
                            <%-- jika sudah --%>
                                <a class="btn px-4 py-1 unfollow border border-secondary"><i class="bi bi-person-check-fill mx-2 text-muted" style="min-width:100px"></i></a>
                        <% else %>
                                <%-- jika belum --%>
                                <a class="btn follow btn-outline-red px-4 py-1" data-user-id="$CurrentMember.ID" data-url="user/follow" data-followed-id="$User.ID" style="min-width:100px">Follow</a>
                        <% end_if %> 
                    </div>
                <% end_if %>    
            <% else %>
                <div class="col-auto info-followed">
                   <%-- jika belum --%>
                    <a href="login/" class="btn btn-outline-red px-4 py-1" style="min-width:100px">Follow</a>
                </div>
            <% end_if %>
        </div>
        <%-- Follower --%>
        <div class="row mb-3 justify-content-between justify-content-sm-start">
            <div class="col-auto me-sm-4 text-center text-lg-start ps-3 px-0 px-sm-3">
                <div class="fw-bold d-sm-inline">$User.Posts().Count()</div>
                <span class="fw-light">Posts</span>
            </div>
            <div class="col-auto me-sm-4 text-center text-lg-start px-0 px-sm-3">
                <div class="fw-bold d-sm-inline" id="followers">$User.Followers()</div>
                <span class="fw-light">Followers</span>
            </div>
            <div class="col-auto text-center text-lg-start px-0 pe-3 px-sm-3">
                <div class="fw-bold d-sm-inline">$User.UserFollowed().Count()</div>
                <span class="fw-light">Following</span>
            </div>
        </div>
        <%-- Bio --%>
        <div class="">
            <div class="fw-bold d-sm-none">$User.Username</div>
            <div class="d-none d-sm-block  fw-bold">$User.FirstName $User.Surname</div>
            <div class="">$User.Bio</div>
        </div>
    </div>
</div>

<!-- Post header -->
<div class="text-center border-top row justify-content-center">
    <div class="col-auto px-0 pt-3 border-top text-center border-dark" style="margin-top: -1px;"><i class="bi bi-grid-3x3 me-2"></i>Posts</div>
</div>

<!-- Post Content -->
<div class="row">
    <% if $User.Posts() %>
    <% loop $User.Posts.Sort(ID, DESC) %>
    <div class="col-4 p-1 p-md-3 btn-detailsModal" role="button" data-bs-toggle="modal" data-bs-target="#detailsModal"
        data-id="$ID">
        <div class="ratio ratio-1x1">
            <div class="overflow-hidden bg-img shadow border-rounded">
                <div class="bg-post w-100 h-100 bg-center"
                    style="background-image: url('$Images.First().Fill(614, 614).Link()');">
                    <div class="d-flex justify-content-center align-items-center h-100">
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-outline-grey btn-sm font-12">Details</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <% end_loop %>
    <% else %>
    <div class="mx-auto border border-3 rounded-circle border-dark d-flex justify-content-center align-items-center mt-5"
        style="width: 150px;height: 150px;">
        <i class="bi bi-camera" style="font-size: 80px;"></i>
    </div>
    <div class="text-center fs-1 mb-5">No Posts Yet</div>
    <% end_if %>
</div>

<%-- Modal Posts Details--%>
<% include ModalDetailPost %>

<!-- Modal Unfollow -->
<% include ModalUnfollow %>

<% require themedJavascript('page/user') %>
