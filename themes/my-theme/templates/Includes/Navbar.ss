<nav class="navbar navbar-light bg-light border-bottom sticky-top">
    <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="">
            <img src="images/rocket.png" alt="logo_rocket" width="40px">
            <span class="ms-sm-3 fs-5 ms-0">Rocket</span>
        </a>
        <% if $CurrentMember %>
            <div class="col-4 d-none d-sm-inline">
                <input class="form-control" type="search" placeholder="Search" aria-label="Search" id="search">
            </div>
            <ul class="nav align-items-center">
                <li class="nav-item">
                    <a class="nav-link <% if $URLSegment == 'home' %>active<% end_if %>" aria-current="page" href="">
                        <i class="bi bi-house fs-4"></i>
                    </a>
                </li>
                <li class="nav-item">
                    <!-- Button trigger modal -->
                    <button type="button" class="btn nav-link" data-bs-toggle="modal" data-bs-target="#AddPost">
                        <i class="bi bi-plus-square fs-4"></i>
                    </button>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="$CurrentMember.Picture.Link" alt="$CurrentMember.Username" width="26px" class="img-user rounded-circle nav-profile-user <% if $active == 'user' %>active<% end_if %>" referrerpolicy="no-referrer">
                    </a>
                    <ul class="dropdown-menu nav-dropdown shadow-sm" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="$CurrentMember.Username/"><i class="bi bi-person-circle me-2"></i>Profile</a>
                        </li>
                        <li><a class="dropdown-item" href="accounts/edit"><i class="bi bi-gear-wide me-2"></i>Settings</a>
                        </li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item logout" href="#"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
                    </ul>
                </li>
            </ul>
        <% else %>
            <ul class="nav align-items-center">
                <li class="nav-item">
                    <a class="nav-link p-0 fs-5" aria-current="page" href="login/">
                        <i class="bi bi-box-arrow-in-right"></i>
                        Login
                    </a>
                </li>
            </ul>
        <% end_if %>
    </div>
</nav>
