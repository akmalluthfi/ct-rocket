<div class="mb-4 shadow-sm bg-white border">
    <!-- header -->
    <div class="card-header ps-sm p-3 bg-light d-flex align-items-center">
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
    <div id="carousel-post-$ID" class="carousel slide carousel-post" data-bs-interval="false">
        <div class="carousel-indicators">
            <% loop $Images() %>
                <% if $First %>
                    <button class="active" aria-current="true" type="button" data-bs-target="#carousel-post-$Up.ID" data-bs-slide-to="$Pos(0)" aria-label="Slide $Pos(1)"></button>
                <% else %>
                    <button type="button" data-bs-target="#carousel-post-2" data-bs-slide-to="$Pos(0)" aria-label="Slide $Pos(1)"></button> 
                <% end_if %>
            <% end_loop %>
        </div>
        <div class="carousel-inner">
            <% loop $Images() %>
                <div class="carousel-item <% if $First %>active<% end_if %>">
                    <div class="ratio ratio-1x1 bg-img-placeholder">
                        <img class="object-fit-cover" src="$Fill(614, 614).Link" alt="<% if $Caption %>$Caption<% else %>$Up.Caption<% end_if %>">
                    </div>
                </div>
            <% end_loop %>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-post-$ID"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel-post-$ID"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    <!-- caption -->
    <div class="card-body">
        <div class="card-text">
            <% if $Categories() %>
                <% loop $Categories() %>
                    <a href="$Link()" class="text-primary text-decoration-none">$Title</a>
                <% end_loop %>
            <% end_if %>
        </div>
        
        <%-- cek apakah image 1 dan ke 2 nilainya null --%>
        <% if $isImageCaptionNull() %>
            <p class="card-text">
                <span class="fw-bold">$author.username</span>
                <span class="collapse" id="collapse-$ID">$Caption</span>
                <span class="hide">$Caption.LimitCharacters(5,'...')</span>
                <a class="fw-light text-decoration-none text-black-50 btn-collapse"
                data-bs-toggle="collapse" data-bs-target="#collapse-$ID" aria-expanded="false" aria-controls="collapse-$ID" role="button">more</a>
            </p>
        <% else %>
            <div id="carousel-post-caption-$ID" class="carousel slide carousel-post-caption" data-bs-interval="false" data-bs-touch="false">
                <div class="carousel-inner">
                    <% loop $Images() %>
                        <div class="carousel-item <% if $First %>active<% end_if %>">
                            <p class="card-text">
                                <span class="fw-bold">$Up.author.username</span>
                                <% if $Caption %>
                                    <span class="collapse" id="collapse-$Up.ID-$Pos">$Caption</span>
                                    <span class="hide">$Caption.LimitCharacters(5,'...')</span>
                                    <a class="fw-light text-decoration-none text-black-50 btn-collapse" data-bs-toggle="collapse" data-bs-target="#collapse-$Up.ID-$Pos" aria-expanded="false"
                                    aria-controls="collapse-$Up.ID-$Pos" role="button">more</a>
                                <% else %>
                                    <span class="collapse" id="collapse-$Up.ID-$Pos">$Up.Caption</span>
                                    <span class="hide">$Up.Caption.LimitCharacters(5,'...')</span>
                                    <a class="fw-light text-decoration-none text-black-50 btn-collapse" data-bs-toggle="collapse" data-bs-target="#collapse-$Up.ID-$Pos" aria-expanded="false"
                                    aria-controls="collapse-$Up.ID-$Pos" role="button">more</a>
                                <% end_if %>
                            </p>
                        </div>
                    <% end_loop %>
                </div>
            </div>      
        <% end_if %>
    </div>
</div>