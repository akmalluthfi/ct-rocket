class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: this.props.posts,
      // singlePost: {}
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    // ambil id, lalu buat single post dengan id tersebut
    const id = $(event.target).parents("div.btn-detailsModal").data("id");
    const post = this.state.posts.filter((val, i) => {
      return val.Id === id;
    });

    this.setState({
      singlePost: post[0],
    });
  }

  renderPost(post) {
    return (
      <div
        key={post.Id}
        className="col-4 p-1 p-md-3 btn-detailsModal"
        role="button"
        data-bs-toggle="modal"
        data-bs-target="#detailsModal"
        data-id={post.Id}
        onClick={this.handleClick}
      >
        <div className="ratio ratio-1x1">
          <div className="overflow-hidden bg-img shadow border-rounded">
            <div
              className="bg-post w-100 h-100 bg-center"
              style={{ backgroundImage: 'url("' + post.Images[0].Link + '")' }}
            >
              <div className="d-flex justify-content-center align-items-center h-100">
                <button
                  type="button"
                  className="btn btn-outline-grey btn-sm font-12"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const post = this.props.posts.map((post) => this.renderPost(post));
    const noPost = (
      <div>
        <div
          className="mx-auto border border-3 rounded-circle border-dark d-flex justify-content-center align-items-center mt-5"
          style={{ width: 150, height: 150 }}
        >
          <i className="bi bi-camera" style={{ fontSize: 80 }} />
        </div>
        <div className="text-center fs-1 mb-5">No Posts Yet</div>
      </div>
    );
    return (
      <div className="row" style={{ width: 100 + "%" }}>
        {post.length === 0 ? noPost : post}
        {/* <ModalDetail post={this.state.singlePost} user={this.props.user} /> */}
      </div>
    );
  }
}
