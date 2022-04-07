<div class="modal fade" id="detailsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="detailsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered justify-content-center modal-xl" style="transition: all 0.5s;">
        <div class="modal-content card border-0">
            <div class="row g-0" id="detailsModalContent">
                <div class="col-lg-7 col-12">
                    <div class="d-flex align-items-center modal-body p-0 ratio ratio-1x1 overflow-hidden"
                        style="background-color: rgb(134, 142, 150);">
                    </div>
                </div>
                <div class="col">
                    <div class="modal-header justify-content-center">
                        <a href="$User.Username"><img src="$User.Picture().Fill(32,32).Link" alt="profile picture $User.Username" class="rounded-circle detail-post-image" width="32px" height="32px"></a>
                        <a href="$User.Username" class="fw-bold ms-3 detail-post-username">$User.Username</a>
                        <% if $CurrentMember %>
                            <%-- cek apakah user melihat profile sendiri/orang lain --%>
                            <% if $CurrentMember.ID != $User.ID %>
                                <i class="bi bi-dot"></i>
                                <%-- cek apakah user sudah difollow --%>
                                <% if $CurrentMember.hasFollow($User.ID) %>
                                    <%-- jika sudah follow --%>
                                    <a role="button" class="fw-bold unfollow">Following</a>
                                <% else %>
                                    <%-- jika belum follow --%>
                                    <a role="button" class="fw-bold follow text-primary" data-user-id="$CurrentMember.ID" data-url="user/follow" data-followed-id="$User.ID">Follow</a>   
                                <% end_if %>
                            <% end_if %>
                        <% else %>
                            <a href="login/" role="button" class="fw-bold text-primary">Follow</a> 
                        <% end_if %>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="card-text px-3"></div>
                    <div class="card-body d-flex">
                        <div class="col-auto">
                            <a href="$User.Username"><img src="$User.Picture().Fill(32,32).Link" alt="profile picture $User.Username" class="rounded-circle detail-post-image" width="32px" height="32px"></a>
                        </div>
                        <div class="col ms-3 detail-post-caption">
                            <span>
                                <a href="$User.Username" class="fw-bold">$User.Username</a>
                                <span></span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>