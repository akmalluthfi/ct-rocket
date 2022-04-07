<div class="modal fade" id="modalUnfollow" tabindex="-1" aria-labelledby="modalUnfollowLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-none border-rounded overflow-hidden">
            <div class="modal-header justify-content-center flex-column">
                <div class="col mb-3">
                    <img src="$User.Picture().Fill(90,90).Link" alt="profile picture $User.Username" class="rounded-circle" width="90px" height="90px">
                </div>
                <div class="col my-3">Unfollow @$User.Username</div>
            </div>
            <div class="modal-body p-0">
                <ul class="list-group text-center">
                    <li class="list-group-item border"><a href="" class="text-danger fw-bold" id="unfollow" data-user-id="$CurrentMember.ID" data-url="user/unfollow" data-followed-id="$User.ID">Unfollow</a></li>
                    <li class="list-group-item border" role="button" data-bs-dismiss="modal">Cancel</li>
                </ul>
            </div>
        </div>
    </div>
</div>