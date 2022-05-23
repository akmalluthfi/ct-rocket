class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: window.User.Name,
            email: window.User.Email,
            bio: window.User.Bio
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate() {
        const button = document.getElementById('btn-updateProfile');
        button.removeAttribute("disabled");
        if (this.state.username === '' || this.state.email === '') button.setAttribute('disabled', 'disabled');
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        // effect loading 
        const button = document.getElementById('btn-updateProfile')

        button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;

        const accountToast = document.getElementById('accountToast');
        const toast = new bootstrap.Toast(accountToast);

        if (this.state.username.length < 3) {
            this.setState({
                username: window.User.Name
            });
            accountToast.getElementsByClassName('toast-body')[0].innerHTML = 'Enter a name above 3 characters.';
            toast.show();
            return;
        }

        if (this.state.username.length > 30) {
            this.setState({
                username: window.User.Name,
            });
            accountToast.getElementsByClassName('toast-body')[0].innerHTML = 'Enter a name under 30 characters.';
            toast.show();
            return;
        }

        if (this.state.bio.length > 150) {
            this.setState({
                bio: window.User.Bio,
            });
            accountToast.getElementsByClassName('toast-body')[0].innerHTML = 'Your bio must be 150 characters or less.';
            toast.show();
            return;
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))) {
            this.setState({
                email: window.User.Email,
            });
            accountToast.getElementsByClassName('toast-body')[0].innerHTML = 'You have entered an invalid email address!';
            toast.show();
            return;
        }

        fetch(document.baseURI + 'accounts/edit', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            button.innerHTML = 'Submit';
            button.setAttribute('disabled', 'disabled')

            accountToast.getElementsByClassName('toast-body')[0].innerHTML = data.message;
            toast.show();
        });
    }

    render() {
        return (
            <div className="col-12 border col-sm-9">
                <div className="row mx-auto mt-4 settings-content">
                    <div className="col-auto position-relative text-center">
                        <img src={window.User.Picture}
                            alt={"profile picture " + window.User.Name}
                            width="50px"
                            height="50px"
                            className="rounded-circle object-fit-cover img-user"
                            id="profile-picture"
                        />
                        {this.props.load}
                    </div>
                    <div className="mb-3 col">
                        <p className="m-0">{window.User.Name}</p>
                        <a role="button" className="color-blue text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalProfilePicture">Change Profile photo</a>
                    </div>
                </div>
                <form className="row mx-auto mt-1 settings-content" method="post" id="updateProfile" onSubmit={this.handleSubmit}>
                    <div className="mb-3 col-12">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" name="username" value={this.state.username} data-val={window.User.Name} required onChange={this.handleChange} />
                    </div>
                    <div className="mb-3 col-12">
                        <label htmlFor="bio" className="form-label">Bio</label>
                        <textarea className="form-control" id="bio" name="bio" rows="3" onChange={this.handleChange} value={this.state.bio} />
                    </div>
                    <div className="mb-3 col-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" className="form-control" id="email" name="email" value={this.state.email} data-val={window.User.Email} required onChange={this.handleChange} />
                    </div>
                    <div className="mb-3 col-4">
                        <button type="submit" className="btn btn-outline-red w-100" id="btn-updateProfile" disabled>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            oldPassword: null,
            newPassword: null,
            confPassword: null,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate() {
        if (this.state.oldPassword &&
            this.state.newPassword &&
            this.state.confPassword) {
            document.getElementById('btn-changePassword').removeAttribute('disabled');
        } else {
            document.getElementById('btn-changePassword').setAttribute('disabled', '');
        }
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const button = document.getElementById('btn-changePassword');
        button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="visually-hidden">Loading...</span>`;

        const accountToast = document.getElementById('accountToast');
        const toast = new bootstrap.Toast(accountToast);

        fetch(document.baseURI + 'accounts/changepassword', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            button.innerHTML = 'Change Password';

            if (data.status === 200) {
                button.setAttribute('disabled', 'disabled');

                accountToast.getElementsByClassName('toast-body')[0].innerHTML = data.message;
                toast.show();
                this.setState({
                    oldPassword: null,
                    newPassword: null,
                    confPassword: null,
                });
            } else {
                accountToast.getElementsByClassName('toast-body')[0].innerHTML = data.message;
                toast.show();
            }
        });

    }

    render() {
        return (
            <div className="col-12 col-sm-9 border">
                <form className="row mx-auto mt-4 settings-content" onSubmit={this.handleSubmit} id="change-password">
                    <div className="col-auto text-center mb-3">
                        <img src={window.User.Picture} alt={"profile picture " + window.User.Name} width="50px" className="rounded-circle object-fit-cover img-user" />
                    </div>
                    <div className="col d-flex align-items-center mb-3">
                        <h4 className="m-0">{window.User.Name}</h4>
                    </div>
                    <div className="mb-3 col-12">
                        <label htmlFor="oldPassword" className="form-label">Old password</label>
                        <input type="password" className="form-control" id="oldPassword" name="oldPassword" required onChange={this.handleChange} />
                    </div>
                    <div className="mb-3 col-12">
                        <label htmlFor="newPassword" className="form-label">New password</label>
                        <input type="password" className="form-control" id="newPassword" name="newPassword" required onChange={this.handleChange} />
                    </div>
                    <div className="mb-3 col-12">
                        <label htmlFor="confPassword" className="form-label">Confirm new password</label>
                        <input type="password" className="form-control" id="confPassword" name="confPassword" required onChange={this.handleChange} />
                    </div>
                    <div className="mb-3 col-12">
                        <button type="submit" id="btn-changePassword" className="btn btn-outline-red" style={{ minWidth: 157 }} disabled>Change Password</button>
                    </div>
                </form>
            </div>
        );
    }
}

class Accounts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: props.active,
            load: false,
            file: {}
        };

        this.navigation = this.navigation.bind(this);
        this.updateProfilePicture = this.updateProfilePicture.bind(this);
    }

    updateProfilePicture(event) {
        event.preventDefault();

        event.target.parentElement.parentElement.lastChild.click();

        this.setState(state => ({
            load: !state.load
        }));

        const modal = new Modal;

        if (!modal.isImage(event.target.files[0])) {
            // jika false 
            this.setState(state => ({
                load: !state.load
            }));
            return;
        }

        // jika true
        let fd = new FormData();

        fd.append('profilePicture', event.target.files[0]);

        fetch(document.baseURI + 'accounts/editprofilepicture', {
            method: 'POST',
            body: fd,
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {

            this.setState(state => ({
                load: !state.load
            }));

            if (data.status === 200) {
                const profilePicture = document.getElementsByClassName('img-user');

                for (let i = 0; i < profilePicture.length; i++) {
                    profilePicture[i].setAttribute('src', data.url);
                }
            }

            const accountToast = document.getElementById('accountToast');
            const toast = new bootstrap.Toast(accountToast);

            accountToast.getElementsByClassName('toast-body')[0].innerHTML = data.message;
            toast.show();
        });
    }

    navigation(event) {
        event.preventDefault();
        this.setState({
            active: event.target.dataset.nav
        })
        window.history.pushState('', '', window.link + event.target.dataset.nav);
    }

    render() {
        const loadImage = (this.state.load) ? (
            <div className="rounded-circle text-center position-absolute top-0"
                id="img-loading"
                style={{ width: 50, height: 50, backgroundColor: 'rgba(255, 255, 255, 0.75)', left: 12 }}>
                <div className="spinner-border position-absolute" role="status" style={{ top: 10, left: 10 }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        ) : null;

        const content = (this.state.active === 'edit') ? <Edit load={loadImage} /> : <ChangePassword />;

        return (
            <div className="container">
                <ModalEdit updateProfilePicture={this.updateProfilePicture} />
                <div className="container bg-white px-0 border-rounded my-4 mx-auto justify-content-evenly d-block d-sm-flex">
                    <ul className="list-group rounded-0 pe-0 col-sm-3 col-12 border border-end-0 settings-menu align-items-center align-items-sm-start text-center justify-content-between justify-content-sm-start">
                        <a href={this.props.link + "edit"} className={"list-group-item py-sm-3 py-2 px-1 px-sm-4" + ((this.state.active === 'edit') ? ' list-active' : '')} onClick={this.navigation} data-nav="edit">Edit Profile</a>
                        <a href={this.props.link + "password."} className={"list-group-item py-md-3 py-2 px-md-4 px-0" + ((this.state.active === 'password/change') ? ' list-active' : '')} onClick={this.navigation} data-nav="password/change">Change Password</a>
                        <a href="#" className="list-group-item py-sm-3 py-2 px-sm-4 px-1 color-red logout">Logout</a>
                    </ul>
                    {content}
                </div>
            </div>
        );
    }
}

function ModalEdit(props) {
    return (
        <div className="modal fade" id="modalProfilePicture" tabIndex="-1" aria-labelledby="modalProfilePictureLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content border-rounded overflow-hidden">
                    <div className="modal-header justify-content-center">
                        <h5 className="modal-title fw-bold" id="modalProfilePictureLabel">Change profile photo</h5>
                    </div>
                    <div className="modal-body p-0">
                        <ul className="list-group text-center">
                            <form id="formUpdateProfilePicture" onChange={props.updateProfilePicture}>
                                <label htmlFor="profilePicture" className="list-group-item color-blue" role="button">Upload Photo</label>
                                <input className="form-control visually-hidden" type="file" id="profilePicture" name="profilePicture" />
                                <input type="hidden" name="username" value="$CurrentMember.Username" />
                            </form>
                            <li className="list-group-item text-danger border-top" role="button">Remove current photo</li>
                            <li className="list-group-item border-top" role="button" data-bs-dismiss="modal">Cancel</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(
    <div>
        <Navbar />
        <Accounts active={window.active} link={window.link} />
        <div id="accountToast" className="toast align-items-center text-white bg-black border-0 position-absolute bottom-0 w-100 rounded-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
                <div className="toast-body">
                    Hello, world! This is a toast message.
                </div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>
    , document.getElementById('root'));