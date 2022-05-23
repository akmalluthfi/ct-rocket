class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    submitForm = (event) => {
        if (this.state.username === '') {
            this.setState({
                message: 'Username required'
            });
            return;
        }

        if (this.state.password === '') {
            this.setState({
                message: 'Password required'
            });
            return;
        }

        const button = event.target;
        button.innerHTML = `
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span class="visually-hidden">Loading...</span>
        `;

        this.authenticate(button);
    }

    authenticate(button) {
        fetch(document.baseURI + 'login', {
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
            button.innerHTML = 'Login';

            if (data.status === 200) {
                window.location.replace('');
                this.setState({
                    username: '',
                    password: '',
                });
                return;
            }

            document.getElementById('password').value = '';
            this.setState({
                message: data.message
            });
        });
    }

    render() {
        return (
            <div className="col col-md-6 px-4 my-auto" style={{ maxWidth: 484 }}>
                <FormHeader text='Welcome back astronaut!' />
                <form>
                    <FormInput
                        name="username"
                        type="text"
                        class="form-control"
                        placeholder="Username..."
                        label="Username or email address"
                        handleChange={this.handleChange}
                    />
                    <FormInput
                        name="password"
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        label="Password"
                        handleChange={this.handleChange}
                    />
                    <FormButton value="Login" onClick={this.submitForm}></FormButton>
                    <div className="mt-3">
                        <input type="hidden" className="is-invalid" />
                        <div className="invalid-feedback text-center">{this.state.message}</div>
                    </div>
                </form >
                <FormFooter
                    gVal="Login with Google"
                    forgotPassword={true}
                    message="Don't have an account?"
                    linkText="Register"
                    linkUrl="register"
                />
            </div >
        );
    }
}

class Login extends React.Component {
    render() {
        return (
            <div className="row w-100 justify-content-center vh-100">
                <HeroImage url={'public/_resources/themes/react/images/login.svg'} text={'Login thumbnail'} />
                <Form />
            </div>
        );
    }
}

ReactDOM.render(<Login />, document.getElementById('root'));