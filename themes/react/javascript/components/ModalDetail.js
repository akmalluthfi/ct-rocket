function ModalHeaderPost(props) {
    // jika user tidak aktif
    let status;
    if (props.user.id != window.User.ID) {
        if (window.hasFollow === 'false') {
            status = (
                <div>
                    <i className="bi bi-dot"></i>
                    <a role="button" className="fw-bold follow text-primary" data-user-id="sa" data-url="user/follow" data-followed-id="$User.ID">Follow</a>
                </div>
            );
        } else {
            status = (
                <div>
                    <i className="bi bi-dot"></i>
                    <a role="button" className="fw-bold unfollow">Following</a>
                </div>
            );
        }
    }

    // kalau user belum login
    // <a href="login/" role="button" className="fw-bold text-primary">Follow</a>

    return (
        <div className="modal-header justify-content-center">
            <a href={props.user.username}><img src={props.user.picture} alt={"profile picture " + props.user.username} className="rounded-circle detail-post-image" width="32px" height="32px" /></a>
            <a href={props.user.username} className="fw-bold ms-3 detail-post-username">{props.user.username}</a>
            {status}
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
    );
}

class ModalDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.user);
        const images = (this.props.post) ? <div className="modal-uploadImage" style={{ backgroundImage: `url("${this.props.post.Images[0].Link}")` }}></div> : '';

        const caption = (this.props.post) ? (this.props.post.Caption) ? this.props.post.Caption : this.props.post.Images[0].Caption : '';

        // const username = (this.props.user) ? this.props.user.username

        return (
            <div className="modal fade" id="detailsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered justify-content-center modal-xl" style={{ transition: 'all 0.5s' }}>
                    <div className="modal-content card border-0">
                        <div className="row g-0" id="detailsModalContent">
                            <div className="col-lg-7 col-12">
                                <div className="d-flex align-items-center modal-body p-0 ratio ratio-1x1 overflow-hidden" style={{ backgroundColor: 'rgb(134, 142, 150)' }}>
                                    {images}
                                </div>
                            </div>
                            <div className="col">
                                <ModalHeaderPost user={this.props.user} />
                                <div className="card-text px-3"></div>
                                <div className="card-body d-flex">
                                    <div className="col-auto">
                                        <a href={this.props.user.username}><img src={this.props.user.picture} alt={"profile picture " + this.props.user.username} className="rounded-circle detail-post-image" width="32px" height="32px" /></a>
                                    </div>
                                    <div className="col ms-3 detail-post-caption">
                                        <span>
                                            <a href={this.props.user.username} className="fw-bold">{this.props.user.username}</a>
                                            <span> {caption}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}