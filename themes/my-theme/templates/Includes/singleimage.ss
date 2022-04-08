<div class="mb-4 shadow-sm bg-white border">
    <!-- header -->
    <div class="ps-sm card-header p-3 bg-light d-flex align-items-center">
        <a class="card-header-img text-decoration-none" href="$author.username/">
            <div class="ratio ratio-1x1 rounded-circle bg-img-placeholder overflow-hidden" style="width: 32px;">
                <img class="object-fit-cover" src="$author.pictureLink" alt="profile picture $author.username">
            </div>
        </a>
        <div class="card-body p-0 ms-3">
            <a href="$author.username/" class="card-title m-0 text-decoration-none">$author.username</a>
        </div>
    </div>
    <!-- image -->
    <div class="ratio ratio-1x1 bg-img-placeholder">
        <img class="object-fit-cover" src="$Images().First().Fill(614, 614).Link" alt="<% if $Caption %>$Caption<% else %>$imagesList.First().Caption<% end_if %>">
    </div>
    <!-- caption -->
    <div class="card-body">
        <div class="card-text">
            <% loop $Categories() %>
                <a href="$Link()" class="text-primary text-decoration-none">$Title</a>
            <% end_loop %>
        </div>
        <p class="card-text">
            <span class="fw-bold">$author.username</span>
            <span class="collapse" id="collapse-$ID">$Caption</span>
            <span class="hide">$Caption.LimitCharacters(5,'...')</span>
            <a class="fw-light text-decoration-none text-black-50 btn-collapse" data-bs-toggle="collapse" data-bs-target="#collapse-$ID" aria-expanded="false" aria-controls="collapse-$ID" role="button">more</a>
        </p>
    </div>
</div>