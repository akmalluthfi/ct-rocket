class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: ''
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

        if (this.state.username.length < 3) {
            this.setState({
                message: 'Enter a name above 3 characters.'
            });
            return;
        }

        if (this.state.username.length > 30) {
            this.setState({
                message: 'Enter a name under 30 characters.'
            });
            return;
        }

        if (this.state.email === '') {
            this.setState({
                message: 'Email required'
            });
            return;
        }

        if ((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email))) {
            this.setState({
                message: 'You have entered an invalid email address!'
            });
            return;
        }

        if (this.state.password === '') {
            this.setState({
                message: 'Password required'
            });
            return;
        }

        if (this.state.password.length < 8) {
            this.setState({
                message: 'This password is too easy to guess. Please create a new one.'
            });
            return;
        }

        if (this.state.password.length > 255) {
            this.setState({
                message: 'Create a shorter password (less than 255 characters).'
            });
            return;
        }

        this.setState({
            message: ''
        });
        this.store();
    }

    store() {
        const response = fetch(document.baseURI + 'register', {
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
            console.log(data);
            console.log('success');
        });
    }

    render() {
        return (
            <div className="col col-md-6 px-4" style={{ maxWidth: 484 }}>
                <FormHeader text='Register to be an astronaut' />
                <form className="needs-validation">
                    <FormInput
                        name="username"
                        type="text"
                        class="form-control"
                        placeholder="Username"
                        label="Username"
                        handleChange={this.handleChange}
                    />
                    <FormInput
                        name="email"
                        type="email"
                        class="form-control"
                        placeholder="Email address"
                        label="Email address"
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
                    <FormButton value="Register" onClick={this.submitForm}></FormButton>
                    <div className="mt-3">
                        <input type="hidden" className="is-invalid" />
                        <div className="invalid-feedback text-center">{this.state.message}</div>
                    </div>
                </form>
                <FormFooter
                    gVal="Register with Google"
                    forgotPassword={false}
                    message="Already have an account?"
                    linkText="Login"
                    linkUrl="login"
                />
            </div >
        );
    }
}

class Register extends React.Component {
    render() {
        return (
            <div className="row w-100 justify-content-center">
                <HeroImage url={'public/_resources/themes/react/images/register.svg'} text={'Register thumbnail'} />
                <Form />
            </div>
        );
    }
}

ReactDOM.render(<Register />, document.getElementById('root'));