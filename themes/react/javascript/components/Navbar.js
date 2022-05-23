class Navbar extends React.Component {
    logout(event) {
        event.preventDefault();
        Swal.fire({
            icon: 'warning',
            title: 'Logging out?',
            text: "You need to log back in",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(document.baseURI + 'accounts/logout')
                    .then(response => {
                        return response.json();
                    }).then(data => {
                        if (data.status === 200) {
                            document.location.replace(document.baseURI + 'accounts/');
                        }
                        console.error(data.message);
                    });
            }
        })
    }

    componentDidMount() {
        const dropNav = document.getElementById('navbarDropdown');
        const navActive = document.querySelector('.nav-link, .active');

        dropNav.addEventListener('show.bs.dropdown', function () {
            navActive.classList.remove('active');
            this.children[0].classList.add('active');
        });

        dropNav.addEventListener('hide.bs.dropdown', function () {
            navActive.classList.add('active');
            this.children[0].classList.remove('active');
        });

        $('input#search').autocomplete({
            source: document.baseURI + 'post/getPosts',
            select: function (event, ui) {
                let keyword = ui.item.value;

                if (keyword.charAt(0) === '#') {
                    window.location.replace('explore/tags/' + keyword.substring(1));
                } else {
                    window.location.replace(ui.item.value);
                }
            }
        });
    }

    homeItem() {
        const useClass = this.props.active === 'home' ? 'nav-link active' : 'nav-link';

        return (
            <li className="nav-item">
                <a className={useClass} aria-current="page" href="">
                    <i className="bi bi-house fs-4"></i>
                </a>
            </li>
        );
    }

    userItem() {
        const useClass = this.props.active === 'user' ? 'img-user rounded-circle nav-profile-user object-fit-cover active' : 'img-user rounded-circle nav-profile-user object-fit-cover';

        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={window.User.Picture} alt={window.User.Name} width="26px" height="26px" className={useClass} referrerPolicy="no-referrer" />
                </a>
                <ul className="dropdown-menu nav-dropdown shadow-sm" aria-labelledby="navbarDropdown">
                    <li>
                        <a className="dropdown-item" href={window.User.Name}><i className="bi bi-person-circle me-2"></i>Profile</a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="accounts/edit"><i className="bi bi-gear-wide me-2"></i>Settings</a>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <a className="dropdown-item logout" role="button" onClick={this.logout}><i className="bi bi-box-arrow-right me-2"></i>Logout</a>
                    </li>
                </ul>
            </li>
        );
    }

    content() {
        if (window.AccessToken) {
            return (
                <div className="container">
                    <a className="navbar-brand d-flex align-items-center" href="">
                        <img src="public/_resources/themes/react/images/rocket.png" alt="logo_rocket" width="40px" />
                        <span className="ms-sm-3 fs-5 ms-0">Rocket</span>
                    </a>
                    <div className="col-4 d-none d-sm-inline">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" id="search" />
                    </div>
                    <ul className="nav align-items-center">
                        {this.homeItem()}
                        <li className="nav-item">
                            <button type="button" className="btn nav-link" data-bs-toggle="modal" data-bs-target="#AddPost">
                                <i className="bi bi-plus-square fs-4"></i>
                            </button>
                        </li>
                        {this.userItem()}
                    </ul>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <a className="navbar-brand d-flex align-items-center" href="">
                        <img src="public/_resources/themes/react/images/rocket.png" alt="logo_rocket" width="40px" />
                        <span className="ms-sm-3 fs-5 ms-0">Rocket</span>
                    </a>
                    <ul className="nav align-items-center">
                        <li className="nav-item">
                            <a className="nav-link p-0 fs-5" aria-current="page" href="login/">
                                <i className="bi bi-box-arrow-in-right me-1"></i>
                                Login
                            </a>
                        </li>
                    </ul>
                </div>
            );
        }
    }

    render() {
        return (
            <nav className="navbar navbar-light bg-light border-bottom sticky-top">
                {this.content()}
            </nav>
        );
    }
}