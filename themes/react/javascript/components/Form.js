function FormInput(props) {
    return (
        <div className="form-floating mb-3">
            <input
                type={props.type}
                className={props.class}
                id={props.name}
                name={props.name}
                placeholder={props.placeholder}
                onChange={(event) => props.handleChange(event)} />
            <label htmlFor={props.name}>{props.label}</label>
        </div>
    );
}

function FormButton(props) {
    return (
        <button
            type="button"
            className="btn btn-outline-red col-12"
            onClick={(event) => props.onClick(event)}
        >{props.value}</button>
    );
}

function FormHeader(props) {
    return (
        <div>
            <h1 className="text-center color-red">Rocket</h1>
            <h5 className="text-center text-black-50 mb-3">{props.text}</h5>
        </div>
    );
}

function FormFooter(props) {
    let forgotPassword = props.forgotPassword;

    if (forgotPassword == true) {
        forgotPassword = <p style={{ fontSize: 14 }}>Forgotten your password?</p>
    }

    return (
        <div>
            <div className="d-flex justify-content-evenly align-items-center mb-2 mt-1">
                <div className="d-inline-block bg-secondary" style={{ height: 1, width: 40 + '%' }}></div>
                OR
                <div className="d-inline-block bg-secondary" style={{ height: 1, width: 40 + '%' }}></div>
            </div>
            <button type="submit" className="btn btn-outline-red col-12 my-4" id="gSignIn"><i className="fa-brands fa-google me-2"></i>{props.gVal}</button>
            <a href="" className="text-center">{forgotPassword}</a>
            <h6 className="text-center">{props.message} <a href={props.linkUrl} className="text-decoration-none">{props.linkText}</a>
            </h6>
        </div>
    );
}