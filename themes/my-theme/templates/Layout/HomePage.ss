<!-- Side Bar -->
<aside class="row position-fixed container p-0 d-none d-lg-flex">
    <div class="col-auto me-3" style="max-width: 640px;width: 100%;"></div>
    <div class="col">
        <% if $CurrentMember %>
        <% with $CurrentMember %>
        <div class="row my-4 align-items-center">
            <div class="col-auto">
                <a href="$Username/"><img src="$Picture.Link" alt="$Username" width="56px" class="rounded-circle"></a>
            </div>
            <a class="col d-block" href="$Username">
                <div class="lh-1">$Username</div>
                <div class="fw-500">$FirstName $Surname</div>
            </a>
        </div>
        <% end_with %>
        <% end_if %>
        <div class="fw-500 mt-2 mb-3">Suggestions for you</div>
    </div>
</aside>

<!-- Main Posts -->
<div class="row mt-4 justify-content-center">
    <div class="col-auto" style="z-index: 0;max-width: 640px;width: 100%;">
        <% loop $getPosts() %>
            <%-- cek punya berapa gambar --%>
            <% if $Images().Count == 1 %>
                <% include singleimage %>
            <% else %>
                <% include manyimage %>
            <% end_if %>
        <% end_loop %>
    </div>
    <div class="col d-none d-lg-inline"></div>
</div>


<% require themedJavascript('page/home') %>
