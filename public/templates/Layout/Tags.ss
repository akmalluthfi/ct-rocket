<header class="d-flex my-4">
    <div class="col-auto">
        <img src="$Posts.Sort(ID, DESC).First().Images.First().Fill(77, 77).Link()" alt="" class="mx-3 rounded-circle object-fit-content" width="77px" height="77px">
    </div>
    <div class="col">
        <div class="fs-3">$CategoryName</div>
        <div class="">$Posts.Count posts</div>
    </div>
</header>

<!-- Post header -->
<div class="text-black-50 fw-bold mb-3">Posts</div>

<article class="row">
    <% if $Posts() %>
        <% loop $Posts.Sort(ID, DESC) %>
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
</article>

<%-- Modal Posts Details--%>
<% loop $Posts %>
    <% include ModalDetailPost %>
<% end_loop %>

<!-- Modal Unfollow -->
<% include ModalUnfollow %>

<% require themedJavascript('page/user') %>
