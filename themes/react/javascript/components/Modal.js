class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paths: [],
            status: {
                code: 200,
                nameFile: '',
            },
            categories: [],
            images: [],
            description: []
        }

        // This binding is necessary to make `this` work in the callback
        this.handleShare = this.handleShare.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleChangeCaption = this.handleChangeCaption.bind(this);
    }

    componentDidMount() {
        const modal = document.getElementById('AddPost');
        const react = this
        modal.addEventListener('hidden.bs.modal', function () {
            react.setState({
                paths: [],
                status: {
                    code: 200,
                    nameFile: ''
                },
                categories: [],
                images: [],
                description: [],
            })
        })
    }

    handleShare(event) {
        event.preventDefault();

        let fd = new FormData();

        this.state.images.forEach((val, index) => {
            fd.append('image-' + index, val);
        });

        this.state.description.forEach((val, index) => {
            fd.append('description-' + index, val);
        });

        this.state.categories.forEach((val) => {
            fd.append('categories[]', val);
        });

        fd.append('caption', this.state.caption);

        fetch(document.baseURI + 'post', {
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
            const modal = document.getElementById('AddPost');
            modal.getElementsByTagName('button')[0].click();

            if (data.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })

            }
        });
    }

    handleInput(event) {
        // handle input milik caption, description
        const { name, value } = event.target;

        if (name == parseInt(name)) {
            const desc = this.state.description;
            desc[name] = value;
            this.setState({
                description: desc
            });
            return;
        }

        this.setState({
            [name]: value
        });
    }

    handleChangeCaption(event, tag) {
        // handle input categories
        let categories = this.state.categories;

        if (event.target.tagName === 'BUTTON') {
            categories = categories.filter(item => item !== tag);
            console.log(categories);
            this.setState({
                categories: categories
            })
        } else {
            console.log(categories);
            categories.push(tag);
            this.setState({
                categories: categories
            })
        }
    }

    isImage(file) {
        // ambil ekstensi dari file yang dikirimkan 
        let fileType = file.type;
        fileType = fileType.split('/')[1];

        // buat ekstensi valid
        const validType = ['jpg', 'jpeg', 'png'];

        if (validType.includes(fileType)) return true;

        return false;
    }

    handleNext(event) {
        event.preventDefault();

        this.setState({
            status: {
                code: 100,
                nameFile: ''
            }
        })
    }

    handleChange(event) {
        const inputFile = event.target.files[0];

        if (this.isImage(inputFile)) {
            // ambil array state 
            const paths = this.state.paths.slice();
            const images = this.state.images;
            // buat path object 
            let path = URL.createObjectURL(inputFile);
            // simpan dalam state
            paths.push(path);
            images.push(inputFile);

            this.setState({
                paths: paths,
                status: {
                    code: 200,
                    nameFile: ''
                },
                images: images
            });
        } else {
            this.setState({
                status: {
                    code: 400,
                    nameFile: inputFile.name,
                }
            });
        }
    }

    render() {
        return (
            <div className="modal fade" id="AddPost" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                aria-labelledby="addPostLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered justify-content-center modal-lg"
                    style={{ transition: 'all 0.5s' }}
                >
                    <ModalContent
                        paths={this.state.paths}
                        status={this.state.status}
                        handleChange={this.handleChange}
                        handleNext={this.handleNext}
                        handleShare={this.handleShare}
                        handleInput={this.handleInput}
                        handleChangeCaption={this.handleChangeCaption}
                        categories={this.state.categories}
                    />
                </div>
            </div >
        )
    }
}

function ModalContent(props) {
    if (props.status.code === 100) return <ModalNext paths={props.paths} handleShare={props.handleShare} handleInput={props.handleInput} handleChangeCaption={props.handleChangeCaption} categories={props.categories} />

    return (
        <div className="modal-content border-0"
            id="modal-addPost"
            style={{ maxWidth: 390 }}
        >
            <ModalHeader />
            <ModalBody paths={props.paths} status={props.status} handleChange={props.handleChange} />
            <ModalFooter paths={props.paths} handleChange={props.handleChange} handleNext={props.handleNext} />
        </div>
    )
}

function AccessibilityTab(props) {
    const path = props.path;
    let miniImg = path.map((val, i) =>
        <div key={i} className="row row-cols-2 justify-content-center">
            <div className="col-auto mb-3 ps-4 pe-0">
                <div className="p-0 ratio ratio-1x1"
                    style={{ minWidth: 44 }}>
                    <div className="modal-uploadImage"
                        style={{ backgroundImage: `url(${val})` }}
                    />
                </div>
            </div>
            <div className="col-sm-10 col-9 mb-3 pe-4 ps-1">
                <input type="text"
                    className="w-100 h-100"
                    placeholder="Write alt text"
                    name={i}
                    onChange={props.handleInput}
                />
            </div>
        </div>
    );

    return (
        <div className="col-12 p-0">
            <div style={{ borderTop: '1px solid rgba(206, 212, 218)' }}>
                <div className="py-2 text-center fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseModal"
                    aria-expanded="false"
                    aria-controls="collapseModal"
                >Accessibility</div>
                <div className="collapse"
                    id="collapseModal">
                    {miniImg}
                </div>
            </div>
        </div>
    );
}

function ModalMultipleImage(props) {
    const paths = props.paths;
    let carouselButton = paths.map((val, i) =>
        <button key={i}
            type="button"
            data-bs-target="#carouselMultipleImage"
            data-bs-slide-to={i} className={(i == 0) ? 'active' : ''}
            aria-label={'Slide' + (i + 1)}
        />
    );

    let carouselImage = paths.map((val, i) =>
        <div key={i}
            className={(i == 0) ? 'carousel-item active' : 'carousel-item '}
        >
            <div className="p-0 ratio ratio-1x1">
                <div className="modal-uploadImage"
                    style={{ backgroundImage: `url(${val})` }}
                ></div>
            </div>
        </div >
    );

    return (
        <div id="carouselMultipleImage"
            className="carousel slide modal-body-carousel"
            data-bs-interval="false"
        >
            <div className="carousel-indicators">
                {carouselButton}
            </div>
            <div className="carousel-inner">
                {carouselImage}
            </div>
            <button className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselMultipleImage"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon"
                    aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next"
                type="button"
                data-bs-target="#carouselMultipleImage"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon"
                    aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

function ModalSingleImage(props) {
    return (
        <div className='modal-body p-0 ratio ratio-1x1'>
            <div className="modal-uploadImage"
                style={{ backgroundImage: `url(${props.path})` }}
            />
        </div >
    );
}

function FirstUpload(props) {
    return (
        <div className="modal-body d-flex align-items-center flex-column justify-content-center overflow-hidden" style={{ minHeight: 388 }}>
            <div className="text-center">
                <i className="bi bi-images"
                    style={{ fontSize: 96, lineHeight: '94px' }}
                />
            </div>
            <form className="formUploadImage my-4"
                encType="multipart/form-data"
                onChange={props.handleChange}
            >
                <label htmlFor="uploadImage"
                    className="btn btn-primary"
                    role="button"
                > Select from computer</label>
                <input className="form-control visually-hidden uploadImage"
                    type="file"
                    id="uploadImage"
                    name="uploadImage"
                />
            </form>
        </div>
    );
}

function FailedUpload(props) {
    return (
        <div className="modal-body d-flex align-items-center flex-column justify-content-center overflow-hidden"
            style={{ minHeight: 388 }}
        >
            <div className="text-center">
                <i className="bi bi-exclamation-circle"
                    style={{ fontSize: 96, lineHeight: '94px' }}
                />
                <h3 className="fw-light mt-3 mb-0">This file is not supported</h3>
                <p className="mt-3 mb-0">{props.nameFile} could not be uploaded</p>
            </div>
            <form className="formUploadImage my-4"
                encType="multipart/form-data"
                onChange={props.handleChange}
            >
                <label htmlFor="uploadImage"
                    className="btn btn-primary"
                    role="button"
                >Select Other Files</label>
                <input className="form-control visually-hidden uploadImage"
                    type="file"
                    id="uploadImage"
                    name="uploadImage"
                />
            </form>
        </div>
    );
}

function ModalNext(props) {

    const image = (props.paths.length === 1) ? < ModalSingleImage path={props.paths[0]} /> : <ModalMultipleImage paths={props.paths} />;

    React.useEffect(() => {
        //Input category
        const cat = document.getElementById('categories');
        if (cat.innerHTML === '') {
            let categories = new Taggle('categories', {
                tags: props.categories,
                duplicateTagClass: 'bounce',
                placeholder: 'Tags (Enter comma-separated values)',
                onTagAdd: function (event, tag) {
                    props.handleChangeCaption(event, tag);
                },
                onTagRemove: function (event, tag) {
                    props.handleChangeCaption(event, tag);
                }
            });
        } else {
            cat.innerHTML = '';
            let categories = new Taggle('categories', {
                tags: props.categories,
                duplicateTagClass: 'bounce',
                placeholder: 'Tags (Enter comma-separated values)',
                onTagAdd: function (event, tag) {
                    props.handleChangeCaption(event, tag);
                },
                onTagRemove: function (event, tag) {
                    props.handleChangeCaption(event, tag);
                }
            });
        }
    });

    return (
        <div className="modal-content border-0"
            id="modal-addPost"
        >
            <ModalHeader />
            <div className="modal-body p-0 d-lg-flex"
                style={{ minHeight: 388 }}
            >
                <div className="col-auto p-0 ratio ratio-1x1 mx-auto"
                    style={{ maxWidth: 388 }}
                >
                    {image}
                </div>
                <div className="col"
                    style={{ overflowX: 'hidden', overflowY: 'auto' }}>
                    <form className="row h-75 m-0"
                        action="{$Link}uploadPost"
                        id="sendPost">
                        <div className="col-2 text-center mt-3">
                            <img src={window.User.Picture}
                                alt={"profile picture " + window.User.Name}
                                width="28px"
                                height="28px"
                                className="rounded-circle object-fit-cover"
                            />
                        </div>
                        <div className="col-10 d-flex align-items-center ps-0 mt-3">
                            <h6 className="m-0">{window.User.Name}</h6>
                        </div>
                        <div className="col-12 my-3 p-0">
                            <div className="border rounded h-100 position-relative p-2" id="categories"></div>
                        </div>
                        <div className="h-100 col-12 mb-0 p-0">
                            <textarea className="form-control h-100"
                                id="caption"
                                name="caption"
                                rows=""
                                style={{ border: 'none' }}
                                placeholder="Write a caption..."
                                required
                                onChange={props.handleInput}
                            />
                        </div>
                        <AccessibilityTab path={props.paths}
                            handleInput={props.handleInput}
                        />
                    </form>
                </div>
            </div>
            <div className="modal-footer p-0">
                <a role="button" className="text-primary px-3 py-2 create" onClick={props.handleShare}>Share</a>
            </div>
        </div>
    );
}

function ModalBody(props) {
    if (props.paths.length === 0) {
        if (props.status.code === 400) return <FailedUpload nameFile={props.status.nameFile} handleChange={props.handleChange} />
        return <FirstUpload handleChange={props.handleChange} />
    } else if (props.paths.length === 1) {
        return <ModalSingleImage path={props.paths[0]} />
    } else {
        return <ModalMultipleImage paths={props.paths} />
    }
}

function ModalHeader() {
    return (
        <div className="modal-header justify-content-center">
            <h5 className="modal-title col text-center"
                id="addPostLabel"
            >Create new post</h5>
            <button type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            />
        </div>
    );
}

function ModalFooter(props) {

    if (props.paths.length === 0) return '';

    return (
        <div className="modal-footer p-0">
            <form className="reUpload"
                onChange={props.handleChange}
            >
                <label htmlFor="postImage">
                    <i className="bi bi-plus-circle fs-2"
                        role="button"
                    />
                </label>
                <input className="form-control visually-hidden uploadImage"
                    type="file"
                    id="postImage"
                    name="postImage"
                />
            </form>
            <a role="button" className="text-primary px-3" onClick={props.handleNext}>Next</a>
        </div>
    );
}